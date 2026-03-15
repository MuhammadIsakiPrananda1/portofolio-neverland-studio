<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'sometimes|string|unique:services,slug',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'icon' => 'nullable|string|max:100',
            'features' => 'nullable|array',
            'color' => 'required|in:primary,secondary,accent',
            'image' => 'nullable|string',
            'order' => 'nullable|integer',
            'status' => 'sometimes|in:active,inactive',
        ];
    }
}
