<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'sometimes|string|unique:projects,slug',
            'industry' => 'nullable|string|max:255',
            'challenge' => 'nullable|string',
            'solution' => 'nullable|string',
            'results' => 'nullable|array',
            'technologies' => 'nullable|array',
            'image' => 'nullable|string',
            'gallery' => 'nullable|array',
            'category' => 'required|in:penetration-testing,security-audit,network-security,cloud-security,it-infrastructure,web-development,mobile-development,other',
            'client_name' => 'nullable|string|max:255',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'sometimes|in:draft,published,archived',
            'featured' => 'sometimes|boolean',
        ];
    }
}
