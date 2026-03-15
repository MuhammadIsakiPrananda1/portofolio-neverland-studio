<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeamMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'sometimes|string|unique:team_members,slug',
            'role' => 'required|string|max:255',
            'bio' => 'required|string',
            'image' => 'nullable|string',
            'expertise' => 'nullable|array',
            'social' => 'nullable|array',
            'social.linkedin' => 'nullable|url',
            'social.twitter' => 'nullable|url',
            'social.github' => 'nullable|url',
            'email' => 'nullable|email',
            'order' => 'nullable|integer',
            'status' => 'sometimes|in:active,inactive',
        ];
    }
}
