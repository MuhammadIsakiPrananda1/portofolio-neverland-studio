<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        // Profile
        'avatar',
        'phone',
        'company',
        'position',
        'bio',
        'website',
        'location',
        // Social media
        'github_url',
        'linkedin_url',
        'twitter_url',
        'instagram_url',
        'facebook_url',
        // Notifications
        'email_notifications',
        'push_notifications',
        'sms_notifications',
        'notification_new_message',
        'notification_new_project',
        'notification_new_comment',
        'notification_system_updates',
        // Privacy
        'profile_public',
        'show_email',
        'show_phone',
        'show_activity',
        // Display
        'theme',
        'language',
        'timezone',
        'date_format',
        'time_format',
        // Security
        'two_factor_enabled',
        'two_factor_secret',
        'login_notifications',
        'trusted_devices',
    ];

    protected $casts = [
        'email_notifications'         => 'boolean',
        'push_notifications'          => 'boolean',
        'sms_notifications'           => 'boolean',
        'notification_new_message'    => 'boolean',
        'notification_new_project'    => 'boolean',
        'notification_new_comment'    => 'boolean',
        'notification_system_updates' => 'boolean',
        'profile_public'              => 'boolean',
        'show_email'                  => 'boolean',
        'show_phone'                  => 'boolean',
        'show_activity'               => 'boolean',
        'two_factor_enabled'          => 'boolean',
        'login_notifications'         => 'boolean',
        'trusted_devices'             => 'array',
    ];

    protected $hidden = [
        'two_factor_secret',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
