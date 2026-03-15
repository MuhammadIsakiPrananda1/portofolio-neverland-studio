<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'long_description' => 'nullable|string',
            'category' => 'required|string|in:web-development,mobile-app,cloud-infrastructure,cybersecurity,api-development,ui-ux-design,e-commerce,consulting',
            'client_name' => 'nullable|string|max:255',
            'project_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'technologies' => 'required|array',
            'technologies.*' => 'string',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'thumbnail' => 'nullable|string',
            'status' => 'nullable|in:draft,published,archived',
            'is_featured' => 'nullable|boolean',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'published_at' => 'nullable|date',
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Project title is required',
            'description.required' => 'Project description is required',
            'category.required' => 'Category is required',
            'category.in' => 'Invalid category selected',
            'technologies.required' => 'At least one technology is required',
            'project_url.url' => 'Project URL must be a valid URL',
            'github_url.url' => 'GitHub URL must be a valid URL',
            'end_date.after_or_equal' => 'End date must be after or equal to start date',
        ];
    }
}
