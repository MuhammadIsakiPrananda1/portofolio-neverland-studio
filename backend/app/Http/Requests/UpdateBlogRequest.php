<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBlogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $blogId = $this->route('id');

        return [
            'title' => 'sometimes|string|max:255',
            'slug' => "sometimes|string|unique:blog_posts,slug,{$blogId}",
            'excerpt' => 'sometimes|string',
            'content' => 'sometimes|string',
            'category' => 'sometimes|string|max:100',
            'tags' => 'nullable|array',
            'featured_image' => 'nullable|string',
            'read_time' => 'nullable|integer|min:1',
            'status' => 'sometimes|in:draft,published,archived',
            'featured' => 'sometimes|boolean',
            'seo' => 'nullable|array',
            'seo.title' => 'nullable|string|max:255',
            'seo.description' => 'nullable|string',
            'seo.keywords' => 'nullable|array',
        ];
    }
}
