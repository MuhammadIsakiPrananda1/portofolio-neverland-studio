<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChallengeSolve;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ScoreboardController extends Controller
{
    /**
     * Get global scoreboard (leaderboard)
     */
    public function getScoreboard(Request $request)
    {
        $limit = $request->query('limit', 100);
        $offset = $request->query('offset', 0);

        // Cache scoreboard for 1 minute to reduce database load
        $cacheKey = "scoreboard:all";
        $scoreboard = Cache::remember($cacheKey, now()->addMinutes(1), function () {
            return DB::table('users')
                ->leftJoin('challenge_solves', 'users.id', '=', 'challenge_solves.user_id')
                ->select(
                    'users.id',
                    'users.name as username',
                    DB::raw('COUNT(DISTINCT challenge_solves.challenge_id) as solved_count'),
                    DB::raw('COALESCE(SUM(challenge_solves.points_awarded), 0) as total_score')
                )
                ->where('users.deleted_at', null)
                ->groupBy('users.id', 'users.name')
                ->orderByDesc('total_score')
                ->orderByDesc('solved_count')
                ->get();
        });

        // Add ranking
        $rankedScoreboard = $scoreboard->map(function ($item, $index) {
            return [
                'rank' => $index + 1,
                'user_id' => $item->id,
                'username' => $item->username,
                'score' => (int)$item->total_score,
                'solved' => (int)$item->solved_count,
            ];
        });

        // Paginate results
        $paginated = $rankedScoreboard
            ->slice($offset, $limit)
            ->values();

        return response()->json([
            'status' => 'success',
            'data' => $paginated,
            'total' => count($rankedScoreboard),
            'limit' => $limit,
            'offset' => $offset,
        ]);
    }

    /**
     * Get user ranking
     */
    public function getUserRank(int $userId)
    {
        $userScore = DB::table('users')
            ->leftJoin('challenge_solves', 'users.id', '=', 'challenge_solves.user_id')
            ->where('users.id', $userId)
            ->groupBy('users.id')
            ->select(
                'users.name as username',
                DB::raw('COALESCE(SUM(challenge_solves.points_awarded), 0) as total_score'),
                DB::raw('COUNT(DISTINCT challenge_solves.challenge_id) as solved_count')
            )
            ->first();

        if (!$userScore) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found',
            ], 404);
        }

        // Count users with higher score
        $rank = DB::table('users')
            ->leftJoin('challenge_solves', 'users.id', '=', 'challenge_solves.user_id')
            ->where('users.deleted_at', null)
            ->groupBy('users.id')
            ->havingRaw('COALESCE(SUM(challenge_solves.points_awarded), 0) > ?', [(int)$userScore->total_score])
            ->count() + 1;

        return response()->json([
            'status' => 'success',
            'data' => [
                'rank' => $rank,
                'user_id' => $userId,
                'username' => $userScore->username,
                'score' => (int)$userScore->total_score,
                'solved' => (int)$userScore->solved_count,
            ],
        ]);
    }

    /**
     * Get category leaderboard
     */
    public function getCategoryLeaderboard(string $category, Request $request)
    {
        $limit = $request->query('limit', 50);
        $offset = $request->query('offset', 0);

        $cacheKey = "scoreboard:category:{$category}";
        $scoreboard = Cache::remember($cacheKey, now()->addMinutes(1), function () use ($category) {
            return DB::table('users')
                ->leftJoin('challenge_solves', 'users.id', '=', 'challenge_solves.user_id')
                ->leftJoin('challenges', 'challenge_solves.challenge_id', '=', 'challenges.id')
                ->where('challenges.category', $category)
                ->where('users.deleted_at', null)
                ->select(
                    'users.id',
                    'users.name as username',
                    DB::raw('COUNT(DISTINCT challenge_solves.challenge_id) as solved_count'),
                    DB::raw('COALESCE(SUM(challenge_solves.points_awarded), 0) as total_score')
                )
                ->groupBy('users.id', 'users.name')
                ->orderByDesc('total_score')
                ->orderByDesc('solved_count')
                ->get();
        });

        // Add ranking
        $rankedScoreboard = $scoreboard->map(function ($item, $index) {
            return [
                'rank' => $index + 1,
                'user_id' => $item->id,
                'username' => $item->username,
                'score' => (int)$item->total_score,
                'solved' => (int)$item->solved_count,
            ];
        });

        // Paginate
        $paginated = $rankedScoreboard
            ->slice($offset, $limit)
            ->values();

        return response()->json([
            'status' => 'success',
            'category' => $category,
            'data' => $paginated,
            'total' => count($rankedScoreboard),
        ]);
    }

    /**
     * Get first blood leaderboard
     */
    public function getFirstBloodLeaderboard(Request $request)
    {
        $limit = $request->query('limit', 50);
        $offset = $request->query('offset', 0);

        $firstBloods = DB::table('challenges')
            ->join('users', 'challenges.first_blood_user_id', '=', 'users.id')
            ->select(
                'users.id',
                'users.name as username',
                DB::raw('COUNT(*) as first_blood_count')
            )
            ->where('challenges.first_blood_user_id', '!=', null)
            ->groupBy('users.id', 'users.name')
            ->orderByDesc('first_blood_count')
            ->get();

        // Add ranking
        $ranked = $firstBloods->map(function ($item, $index) {
            return [
                'rank' => $index + 1,
                'user_id' => $item->id,
                'username' => $item->username,
                'first_blood_count' => $item->first_blood_count,
            ];
        });

        $paginated = $ranked
            ->slice($offset, $limit)
            ->values();

        return response()->json([
            'status' => 'success',
            'data' => $paginated,
            'total' => count($ranked),
        ]);
    }

    /**
     * Get challenge statistics
     */
    public function getChallengeStats()
    {
        $cacheKey = "stats:challenges";
        $stats = Cache::remember($cacheKey, now()->addMinutes(5), function () {
            return DB::table('challenges')
                ->where('is_active', true)
                ->select(
                    'category',
                    'difficulty',
                    DB::raw('COUNT(*) as total'),
                    DB::raw('SUM(solve_count) as total_solves'),
                    DB::raw('AVG(solve_count) as avg_solves')
                )
                ->groupBy('category', 'difficulty')
                ->get();
        });

        return response()->json([
            'status' => 'success',
            'data' => $stats,
        ]);
    }
}
