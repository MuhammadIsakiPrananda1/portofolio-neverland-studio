<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $posts = QueryBuilder::for(BlogPost::class)
            ->with('author')
            ->allowedFilters([
                'title',
                'category',
                AllowedFilter::exact('status'),
                AllowedFilter::exact('featured'),
            ])
            ->allowedSorts(['created_at', 'published_at', 'title', 'views'])
            ->when(!auth()->check(), function ($query) {
                $query->published();
            })
            ->paginate($request->get('per_page', 12));

        return BlogPostResource::collection($posts);
    }

    public function show($slug)
    {
        $post = BlogPost::where('slug', $slug)->with('author')->firstOrFail();

        if ($post->status !== 'published' && !auth()->check()) {
            abort(404);
        }

        $post->incrementViews();

        return new BlogPostResource($post);
    }

    public function byCategory($category)
    {
        $posts = BlogPost::byCategory($category)
            ->published()
            ->with('author')
            ->latest('published_at')
            ->paginate(12);

        return BlogPostResource::collection($posts);
    }

    public function byTag($tag)
    {
        $posts = BlogPost::byTag($tag)
            ->published()
            ->with('author')
            ->latest('published_at')
            ->paginate(12);

        return BlogPostResource::collection($posts);
    }

    public function store(StoreBlogRequest $request)
    {
        $post = BlogPost::create([
            ...$request->validated(),
            'author_id' => auth()->id(),
        ]);

        return new BlogPostResource($post);
    }

    public function update(UpdateBlogRequest $request, $id)
    {
        $post = BlogPost::findOrFail($id);
        $post->update($request->validated());

        return new BlogPostResource($post);
    }

    public function destroy($id)
    {
        $post = BlogPost::findOrFail($id);
        $post->delete();

        return response()->json([
            'message' => 'Blog post deleted successfully',
        ]);
    }

    public function publish($id)
    {
        $post = BlogPost::findOrFail($id);
        $post->update([
            'status' => 'published',
            'published_at' => now(),
        ]);

        return new BlogPostResource($post);
    }

    public function unpublish($id)
    {
        $post = BlogPost::findOrFail($id);
        $post->update(['status' => 'draft']);

        return new BlogPostResource($post);
    }
}
