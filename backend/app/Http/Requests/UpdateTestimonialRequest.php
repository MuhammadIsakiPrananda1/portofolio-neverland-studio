<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_name' => 'sometimes|string|max:255',
            'client_role' => 'nullable|string|max:255',
            'client_company' => 'nullable|string|max:255',
            'content' => 'sometimes|string',
            'rating' => 'sometimes|integer|min:1|max:5',
            'client_image' => 'nullable|string',
            'project_id' => 'nullable|exists:projects,id',
            'featured' => 'sometimes|boolean',
            'status' => 'sometimes|in:active,inactive',
        ];
    }
}
