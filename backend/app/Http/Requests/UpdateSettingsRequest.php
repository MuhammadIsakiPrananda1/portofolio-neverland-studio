<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Profile
            'avatar' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:1000',
            'website' => 'nullable|url',
            'location' => 'nullable|string|max:255',
            
            // Social Media
            'github_url' => 'nullable|url',
            'linkedin_url' => 'nullable|url',
            'twitter_url' => 'nullable|url',
            'instagram_url' => 'nullable|url',
            'facebook_url' => 'nullable|url',
            
            // Notifications
            'email_notifications' => 'boolean',
            'push_notifications' => 'boolean',
            'sms_notifications' => 'boolean',
            'notification_new_message' => 'boolean',
            'notification_new_project' => 'boolean',
            'notification_new_comment' => 'boolean',
            'notification_system_updates' => 'boolean',
            
            // Privacy
            'profile_public' => 'boolean',
            'show_email' => 'boolean',
            'show_phone' => 'boolean',
            'show_activity' => 'boolean',
            
            // Display
            'theme' => 'in:light,dark,auto',
            'language' => 'string|max:5',
            'timezone' => 'string|timezone',
            'date_format' => 'string',
            'time_format' => 'string',
        ];
    }
}
