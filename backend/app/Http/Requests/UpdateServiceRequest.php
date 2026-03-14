<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $serviceId = $this->route('id');

        return [
            'title' => 'sometimes|string|max:255',
            'slug' => "sometimes|string|unique:services,slug,{$serviceId}",
            'description' => 'sometimes|string',
            'content' => 'nullable|string',
            'icon' => 'nullable|string|max:100',
            'features' => 'nullable|array',
            'color' => 'sometimes|in:primary,secondary,accent',
            'image' => 'nullable|string',
            'order' => 'nullable|integer',
            'status' => 'sometimes|in:active,inactive',
        ];
    }
}
