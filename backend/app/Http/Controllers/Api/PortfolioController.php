<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::published()
            ->when($request->featured, fn($q) => $q->featured())
            ->when($request->category, fn($q, $cat) => $q->where('category', $cat))
            ->latest()
            ->paginate($request->get('per_page', 9));

        return ProjectResource::collection($projects);
    }

    public function show($id)
    {
        $project = Project::where('status', 'published')
            ->findOrFail($id);

        $project->incrementViews();

        return new ProjectResource($project);
    }
}
