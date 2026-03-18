<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\ChallengeSolve;
use App\Models\Submission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ChallengeController extends Controller
{
    /**
     * Get all active challenges with user progress
     */
    public function index(Request $request)
    {
        $category = $request->query('category');
        $difficulty = $request->query('difficulty');
        $userId = Auth::id();

        // Try to get from cache first
        $cacheKey = "challenges:list:{$category}:{$difficulty}";
        $challenges = Cache::remember($cacheKey, now()->addMinutes(5), function () use ($category, $difficulty) {
            $query = Challenge::where('is_active', true)
                ->select('id', 'title', 'description', 'category', 'difficulty', 'initial_points', 'minimum_points', 'decay', 'solve_count', 'first_blood_user_id', 'first_blood_at');

            if ($category) {
                $query->where('category', $category);
            }
            if ($difficulty) {
                $query->where('difficulty', $difficulty);
            }

            return $query->orderBy('category')->orderBy('difficulty')->get();
        });

        // Add user-specific data
        $solvedIds = $userId ? ChallengeSolve::getSolvedByUser($userId) : [];

        return response()->json([
            'status' => 'success',
            'data' => $challenges->map(function ($challenge) use ($solvedIds, $userId) {
                return [
                    'id' => $challenge->id,
                    'title' => $challenge->title,
                    'description' => $challenge->description,
                    'category' => $challenge->category,
                    'difficulty' => $challenge->difficulty,
                    'points' => $challenge->getCurrentPoints(),
                    'solve_count' => $challenge->solve_count,
                    'solved' => in_array($challenge->id, $solvedIds),
                    'first_blood' => $challenge->first_blood_user_id ? [
                        'user_id' => $challenge->first_blood_user_id,
                        'at' => $challenge->first_blood_at,
                    ] : null,
                ];
            }),
        ]);
    }

    /**
     * Get single challenge details
     */
    public function show(Challenge $challenge)
    {
        if (!$challenge->is_active) {
            return response()->json(['error' => 'Challenge not found'], 404);
        }

        $userId = Auth::id();
        $solved = $userId ? ChallengeSolve::isSolvedByUser($userId, $challenge->id) : false;

        return response()->json([
            'status' => 'success',
            'data' => [
                'id' => $challenge->id,
                'title' => $challenge->title,
                'description' => $challenge->description,
                'category' => $challenge->category,
                'difficulty' => $challenge->difficulty,
                'points' => $challenge->getCurrentPoints(),
                'solve_count' => $challenge->solve_count,
                'solved' => $solved,
                'hints' => $challenge->hints,
                'attachment_path' => $challenge->attachment_path,
                'first_blood' => $challenge->first_blood_user_id ? [
                    'username' => $challenge->firstBloodUser->name ?? 'Unknown',
                    'at' => $challenge->first_blood_at,
                ] : null,
            ],
        ]);
    }

    /**
     * Submit flag for a challenge (public endpoint — auth optional for guest mode)
     * Route: POST /api/v1/challenges/{challenge}/submit
     * 
     * Security considerations:
     * - Rate limiting prevents brute force
     * - Constant-time comparison prevents timing attacks
     * - Transaction ensures data consistency
     * - Proper error handling for all cases
     */
    public function submit(Request $request, Challenge $challenge)
    {
        try {
            if (!$challenge->is_active) {
                return response()->json(['error' => 'Challenge not found'], 404);
            }

            $validated = $request->validate([
                'flag' => ['required', 'string', 'max:500'],
            ], [
                'flag.required' => 'Flag is required',
                'flag.max' => 'Flag cannot exceed 500 characters',
            ]);

            $submittedFlag = trim($validated['flag']);
            $ipAddress = $request->ip();
            $userId = Auth::id();

            // ==================== GUEST MODE ====================
            // If not authenticated, just verify and return result without saving
            if (!$userId) {
                $isCorrect = \App\Services\CTFChallengeValidator::validate(
                    $submittedFlag,
                    $challenge,
                    'direct'
                );

                return response()->json([
                    'status' => $isCorrect ? 'correct' : 'incorrect',
                    'message' => $isCorrect
                        ? 'Correct! Login to save your progress and earn points.'
                        : 'Incorrect flag. Try again!',
                    'guest' => true,
                ], 200);
            }

            $user = User::find($userId);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            // Check if user is suspended
            if ($user->isSuspended()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Your account has been suspended.',
                ], 403);
            }

            // ==================== RATE LIMITING & BRUTE FORCE PROTECTION ====================
            $recentSubmissions = Submission::getSubmissionsInLastMinutes($userId, 1);
            if ($recentSubmissions >= 10) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Too many attempts. Please wait 1 minute before trying again.',
                    'retry_after' => 60,
                ], 429);
            }

            // Check if challenge is temporarily blocked
            $blockKey = "challenge:blocked:{$userId}:{$challenge->id}";
            if (cache()->has($blockKey)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Challenge locked due to too many wrong attempts. Try again in 5 minutes.',
                    'retry_after' => 300,
                ], 429);
            }

            // Count wrong submissions in last 10 minutes
            $wrongCount = Submission::getRecentWrongSubmissions($userId, 10);
            if ($wrongCount >= 50) {
                cache()->put($blockKey, true, now()->addMinutes(5));
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Too many wrong attempts. Challenge locked for 5 minutes.',
                    'retry_after' => 300,
                ], 429);
            }

            // ==================== ALREADY SOLVED ====================
            if (ChallengeSolve::isSolvedByUser($userId, $challenge->id)) {
                // Log the attempt (for audit)
                Submission::create([
                    'user_id'        => $userId,
                    'challenge_id'   => $challenge->id,
                    'submitted_flag' => $submittedFlag,
                    'status'         => 'already_solved',
                    'ip_address'     => $ipAddress,
                    'user_agent'     => $request->userAgent(),
                ]);

                return response()->json([
                    'status'  => 'already_solved',
                    'message' => 'You have already solved this challenge!',
                ], 200);
            }

            // ==================== FLAG VERIFICATION ====================
            // Use CTFChallengeValidator service for secure validation
            $isCorrect = \App\Services\CTFChallengeValidator::validate(
                $submittedFlag,
                $challenge,
                'direct'  // Can detect format and use appropriate method
            );

            // Record submission (before transaction to avoid lock issues)
            $submission = Submission::create([
                'user_id'        => $userId,
                'challenge_id'   => $challenge->id,
                'submitted_flag' => $submittedFlag,
                'status'         => $isCorrect ? 'correct' : 'wrong',
                'ip_address'     => $ipAddress,
                'user_agent'     => $request->userAgent(),
            ]);

            // If correct, process the solve within a transaction
            if ($isCorrect) {
                return DB::transaction(function () use ($user, $challenge, $userId) {
                    // Verify user hasn't solved while we were processing
                    if (ChallengeSolve::isSolvedByUser($userId, $challenge->id)) {
                        throw new \Exception('Challenge already solved by another request');
                    }

                    // Calculate points
                    $points = $challenge->getCurrentPoints();
                    $isFirstBlood = false;

                    // First blood bonus
                    if (!$challenge->first_blood_user_id) {
                        $challenge->update([
                            'first_blood_user_id' => $userId,
                            'first_blood_at' => now(),
                        ]);
                        $isFirstBlood = true;
                        $points += intval($challenge->initial_points * 0.1); // 10% bonus
                    }

                    // Record the solve
                    ChallengeSolve::create([
                        'user_id' => $userId,
                        'challenge_id' => $challenge->id,
                        'points_awarded' => $points,
                        'solved_at' => now(),
                    ]);

                    // Update challenge solve count
                    $challenge->increment('solve_count');

                    // Update user score
                    $user->increment('score', $points);

                    // Clear caches
                    cache()->forget("scoreboard:all");
                    cache()->forget("user:score:{$userId}");
                    cache()->forget("challenges:list:user_solved");
                    cache()->forget("user:solved:{$userId}");

                    return response()->json([
                        'status'        => 'correct',
                        'message'       => 'Challenge solved! Points awarded.',
                        'points'        => $points,
                        'first_blood'   => $isFirstBlood,
                        'total_score'   => $user->fresh()->score,
                    ], 200);
                });
            }

            // Incorrect submission
            return response()->json([
                'status'  => 'incorrect',
                'message' => 'Incorrect flag. Try again!',
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Challenge submission error: ' . $e->getMessage(), [
                'user_id' => Auth::id(),
                'challenge_id' => $challenge->id ?? null,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while submitting. Please try again.',
            ], 500);
        }
    }
            'status'         => $isCorrect ? 'correct' : 'wrong',
            'ip_address'     => $ipAddress,
            'user_agent'     => $request->userAgent(),
        ]);

        if ($isCorrect) {
            return DB::transaction(function () use ($user, $challenge, $userId) {
                $points = $challenge->getCurrentPoints();

                // First blood
                $isFirstBlood = false;
                if (!$challenge->first_blood_user_id) {
                    $challenge->update([
                        'first_blood_user_id' => $userId,
                        'first_blood_at'      => now(),
                    ]);
                    $isFirstBlood = true;
                    $points += intval($challenge->initial_points * 0.1);
                }

                ChallengeSolve::markAsSolved($userId, $challenge->id, $points);
                $challenge->increment('solve_count');
                $user->increment('score', $points);

                Cache::forget("scoreboard:all");
                Cache::forget("user:score:{$userId}");
                Cache::forget("challenges:list::");
                Cache::forget("user:solved:{$userId}");

                return response()->json([
                    'status'      => 'correct',
                    'message'     => 'Challenge solved! Points awarded.',
                    'points'      => $points,
                    'first_blood' => $isFirstBlood,
                    'total_score' => $user->score + $points,
                ], 200);
            });
        }

        return response()->json([
            'status'  => 'incorrect',
            'message' => 'Incorrect flag. Try again!',
        ], 200);
    }

    /**
     * Get user's solved challenges
     */
    public function getSolvedChallenges()
    {
        if (!Auth::check()) {
            return response()->json([
                'status' => 'success',
                'solved' => [],
            ], 200);
        }

        $userId = Auth::id();
        $cacheKey = "user:solved:{$userId}";

        $solved = Cache::remember($cacheKey, now()->addMinutes(5), function () use ($userId) {
            return ChallengeSolve::where('user_id', $userId)
                ->pluck('challenge_id')
                ->toArray();
        });

        return response()->json([
            'status' => 'success',
            'solved' => $solved,
            'count' => count($solved),
        ]);
    }

    /**
     * Get user progress
     */
    public function getUserProgress()
    {
        if (!Auth::check()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $userId = Auth::id();
        $cacheKey = "user:progress:{$userId}";

        $progress = Cache::remember($cacheKey, now()->addMinutes(5), function () use ($userId) {
            $totalChallenges = Challenge::where('is_active', true)->count();
            $solved = ChallengeSolve::where('user_id', $userId)->count();
            $score = ChallengeSolve::where('user_id', $userId)->sum('points_awarded');

            $byCategory = DB::table('challenge_solves')
                ->join('challenges', 'challenges.id', '=', 'challenge_solves.challenge_id')
                ->where('challenge_solves.user_id', $userId)
                ->groupBy('challenges.category')
                ->select('challenges.category', DB::raw('count(*) as count'))
                ->pluck('count', 'category')
                ->toArray();

            return [
                'total_challenges' => $totalChallenges,
                'solved' => $solved,
                'score' => $score ?? 0,
                'categories' => $byCategory,
            ];
        });

        return response()->json([
            'status' => 'success',
            'data' => $progress,
        ]);
    }

    /**
     * Get user statistics
     */
    public function getUserStats()
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $userId = Auth::id();
        $user = User::find($userId);

        return response()->json([
            'status' => 'success',
            'data' => [
                'total_score' => $user->getTotalScore(),
                'solved_count' => $user->getSolvedCount(),
                'first_blood_count' => $user->getFirstBloodCount(),
                'recent_solves' => ChallengeSolve::getSolvedByUserWithDetails($userId, 5),
            ],
        ]);
    }
}
