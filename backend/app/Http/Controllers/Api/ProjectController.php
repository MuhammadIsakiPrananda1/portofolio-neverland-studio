<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $projects = QueryBuilder::for(Project::class)
            ->allowedFilters([
                'title',
                'category',
                'industry',
                AllowedFilter::exact('status'),
                AllowedFilter::exact('featured'),
            ])
            ->allowedSorts(['created_at', 'updated_at', 'title', 'views'])
            ->when(!auth()->check(), function ($query) {
                $query->where('status', 'published');
            })
            ->paginate($request->get('per_page', 12));

        return ProjectResource::collection($projects);
    }

    public function show($id)
    {
        $project = Project::findOrFail($id);

        if ($project->status !== 'published' && !auth()->check()) {
            abort(404);
        }

        $project->incrementViews();

        return new ProjectResource($project);
    }

    public function byCategory($category)
    {
        $projects = Project::where('category', $category)
            ->where('status', 'published')
            ->latest()
            ->paginate(12);

        return ProjectResource::collection($projects);
    }

    public function store(StoreProjectRequest $request)
    {
        $project = Project::create($request->validated());

        return new ProjectResource($project);
    }

    public function update(UpdateProjectRequest $request, $id)
    {
        $project = Project::findOrFail($id);
        $project->update($request->validated());

        return new ProjectResource($project);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully',
        ]);
    }

    public function publish($id)
    {
        $project = Project::findOrFail($id);
        $project->update(['status' => 'published']);

        return new ProjectResource($project);
    }

    public function unpublish($id)
    {
        $project = Project::findOrFail($id);
        $project->update(['status' => 'draft']);

        return new ProjectResource($project);
    }
}
