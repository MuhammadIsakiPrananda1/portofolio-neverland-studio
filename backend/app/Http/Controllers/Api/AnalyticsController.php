<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Analytics;
use App\Models\Project;
use App\Models\BlogPost;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function overview()
    {
        $totalProjects = Project::count();
        $publishedProjects = Project::where('status', 'published')->count();
        $totalBlogPosts = BlogPost::count();
        $totalMessages = Contact::count();
        $newMessages = Contact::where('status', 'new')->count();
        $totalUsers = User::count();

        $projectViews = Project::sum('views');
        $blogViews = BlogPost::sum('views');

        return response()->json([
            'stats' => [
                'total_projects' => $totalProjects,
                'published_projects' => $publishedProjects,
                'total_blog_posts' => $totalBlogPosts,
                'total_messages' => $totalMessages,
                'new_messages' => $newMessages,
                'total_users' => $totalUsers,
                'project_views' => $projectViews,
                'blog_views' => $blogViews,
                'total_views' => $projectViews + $blogViews,
            ],
        ]);
    }

    public function visitors(Request $request)
    {
        $days = $request->get('days', 30);

        $visitors = Analytics::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(DISTINCT ip_address) as unique_visitors'),
                DB::raw('COUNT(*) as total_views')
            )
            ->where('created_at', '>=', now()->subDays($days))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return response()->json($visitors);
    }

    public function projectsStats()
    {
        $projectsByCategory = Project::select('category', DB::raw('count(*) as total'))
            ->groupBy('category')
            ->get();

        $projectsByStatus = Project::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->get();

        $topProjects = Project::orderBy('views', 'desc')
            ->take(10)
            ->get(['id', 'title', 'views', 'category']);

        return response()->json([
            'by_category' => $projectsByCategory,
            'by_status' => $projectsByStatus,
            'top_projects' => $topProjects,
        ]);
    }

    public function messagesStats()
    {
        $messagesByType = Contact::select('message_type', DB::raw('count(*) as total'))
            ->groupBy('message_type')
            ->get();

        $messagesByStatus = Contact::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->get();

        $recentMessages = Contact::latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'message_type', 'status', 'created_at']);

        return response()->json([
            'by_type' => $messagesByType,
            'by_status' => $messagesByStatus,
            'recent' => $recentMessages,
        ]);
    }

    public function topServices()
    {
        // Get most requested services from contact messages
        $services = Contact::select('message_type', DB::raw('count(*) as requests'))
            ->where('message_type', '!=', 'general')
            ->groupBy('message_type')
            ->orderBy('requests', 'desc')
            ->get();

        return response()->json($services);
    }
}
