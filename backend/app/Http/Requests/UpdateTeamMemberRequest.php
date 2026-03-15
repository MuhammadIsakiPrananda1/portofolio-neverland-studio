<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTeamMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $memberId = $this->route('id');

        return [
            'name' => 'sometimes|string|max:255',
            'slug' => "sometimes|string|unique:team_members,slug,{$memberId}",
            'role' => 'sometimes|string|max:255',
            'bio' => 'sometimes|string',
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
