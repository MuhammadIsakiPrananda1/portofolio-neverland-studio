<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'     => 'sometimes|string|max:255',
            'avatar'   => 'sometimes|nullable|string',
            'phone'    => 'sometimes|nullable|string|max:30',
            'company'  => 'sometimes|nullable|string|max:255',
            'position' => 'sometimes|nullable|string|max:255',
            'bio'      => 'sometimes|nullable|string|max:2000',
            'website'  => 'sometimes|nullable|url|max:255',
            'location' => 'sometimes|nullable|string|max:255',
        ];
    }
}
