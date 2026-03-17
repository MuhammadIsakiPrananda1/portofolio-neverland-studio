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
     * Submit flag for a challenge
     */
    public function submitFlag(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->validate([
            'challenge_id' => 'required|exists:challenges,id',
            'flag' => 'required|string',
        ]);

        $userId = Auth::id();
        $challengeId = $request->input('challenge_id');
        $submittedFlag = trim($request->input('flag'));
        $ipAddress = $request->ip();

        $user = User::find($userId);
        $challenge = Challenge::find($challengeId);

        // ==================== RATE LIMITING & BRUTE FORCE PROTECTION ====================
        // Check rate limiting (max 10 submissions per minute per user)
        $recentSubmissions = Submission::getSubmissionsInLastMinutes($userId, 1);
        if ($recentSubmissions >= 10) {
            return response()->json([
                'status' => 'error',
                'message' => 'Too many attempts. Please wait 1 minute before trying again.',
                'remaining' => 60 - (int)now()->diffInSeconds(now()->addMinutes(1)),
            ], 429);
        }

        // Check if user is temporarily blocked (50+ wrong submissions in 10 minutes)
        $wrongCount = Submission::getRecentWrongSubmissions($userId, 10);
        $blockKey = "challenge:blocked:{$userId}:{$challengeId}";
        if (Cache::has($blockKey)) {
            return response()->json([
                'status' => 'error',
                'message' => 'This challenge is temporarily locked due to too many wrong attempts. Try again in 5 minutes.',
            ], 429);
        }

        if ($wrongCount >= 50) {
            Cache::put($blockKey, true, now()->addMinutes(5));
            return response()->json([
                'status' => 'error',
                'message' => 'Too many wrong attempts. Challenge locked for 5 minutes.',
            ], 429);
        }

        // Check if user already solved this challenge
        if (ChallengeSolve::isSolvedByUser($userId, $challengeId)) {
            // Record submission anyway
            Submission::create([
                'user_id' => $userId,
                'challenge_id' => $challengeId,
                'submitted_flag' => $submittedFlag,
                'status' => 'wrong',
                'ip_address' => $ipAddress,
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'status' => 'already_solved',
                'message' => 'You have already solved this challenge!',
            ], 200);
        }

        // ==================== FLAG VERIFICATION ====================
        $isCorrect = strtolower(trim($submittedFlag)) === strtolower(trim($challenge->flag));

        // Record submission
        Submission::create([
            'user_id' => $userId,
            'challenge_id' => $challengeId,
            'submitted_flag' => $submittedFlag,
            'status' => $isCorrect ? 'correct' : 'wrong',
            'ip_address' => $ipAddress,
            'user_agent' => $request->userAgent(),
        ]);

        if ($isCorrect) {
            return DB::transaction(function () use ($user, $challenge, $userId, $challengeId) {
                // ==================== DYNAMIC SCORING ====================
                $points = $challenge->getCurrentPoints();

                // ==================== FIRST BLOOD CHECK ====================
                $isFirstBlood = false;
                if (!$challenge->first_blood_user_id) {
                    $challenge->update([
                        'first_blood_user_id' => $userId,
                        'first_blood_at' => now(),
                    ]);
                    $isFirstBlood = true;
                    
                    // Bonus points for first blood (10% of initial points)
                    $points += intval($challenge->initial_points * 0.1);
                }

                // ==================== SAVE SOLVE & UPDATE SCORE ====================
                ChallengeSolve::markAsSolved($userId, $challengeId, $points);
                
                // Update challenge solve count
                $challenge->increment('solve_count');

                // Update user score
                $user->increment('score', $points);

                // Invalidate cache
                Cache::forget("scoreboard:all");
                Cache::forget("user:score:{$userId}");

                return response()->json([
                    'status' => 'correct',
                    'message' => 'Challenge solved successfully!',
                    'points' => $points,
                    'first_blood' => $isFirstBlood,
                    'total_score' => $user->score + $points,
                ], 200);
            });
        } else {
            return response()->json([
                'status' => 'incorrect',
                'message' => 'Incorrect flag. Try again!',
                'remaining_attempts' => 10 - (Submission::getSubmissionsInLastMinutes($userId, 1) + 1),
            ], 200);
        }
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
