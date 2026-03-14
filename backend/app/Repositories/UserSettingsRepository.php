<?php

namespace App\Repositories;

use App\Models\UserSettings;
use Illuminate\Database\Eloquent\Model;

class UserSettingsRepository extends BaseRepository
{
    public function __construct(UserSettings $model)
    {
        parent::__construct($model);
    }

    /**
     * Get settings by user ID
     */
    public function getByUserId(int $userId): ?Model
    {
        return $this->findBy('user_id', $userId);
    }

    /**
     * Create or update settings for a user
     */
    public function createOrUpdate(int $userId, array $data): Model
    {
        $settings = $this->getByUserId($userId);

        if ($settings) {
            $settings->update($data);
            return $settings->fresh();
        }

        return $this->create(array_merge($data, ['user_id' => $userId]));
    }

    /**
     * Update profile information
     */
    public function updateProfile(int $userId, array $data): bool
    {
        $settings = $this->getByUserId($userId);
        
        if (!$settings) {
            $settings = $this->create(['user_id' => $userId]);
        }

        return $settings->update([
            'avatar' => $data['avatar'] ?? $settings->avatar,
            'phone' => $data['phone'] ?? $settings->phone,
            'company' => $data['company'] ?? $settings->company,
            'position' => $data['position'] ?? $settings->position,
            'bio' => $data['bio'] ?? $settings->bio,
            'website' => $data['website'] ?? $settings->website,
            'location' => $data['location'] ?? $settings->location,
        ]);
    }

    /**
     * Update social media links
     */
    public function updateSocialMedia(int $userId, array $data): bool
    {
        $settings = $this->getByUserId($userId);
        
        if (!$settings) {
            $settings = $this->create(['user_id' => $userId]);
        }

        return $settings->update([
            'github_url' => $data['github_url'] ?? $settings->github_url,
            'linkedin_url' => $data['linkedin_url'] ?? $settings->linkedin_url,
            'twitter_url' => $data['twitter_url'] ?? $settings->twitter_url,
            'instagram_url' => $data['instagram_url'] ?? $settings->instagram_url,
            'facebook_url' => $data['facebook_url'] ?? $settings->facebook_url,
        ]);
    }

    /**
     * Update notification preferences
     */
    public function updateNotifications(int $userId, array $data): bool
    {
        $settings = $this->getByUserId($userId);
        
        if (!$settings) {
            $settings = $this->create(['user_id' => $userId]);
        }

        return $settings->update([
            'email_notifications' => $data['email_notifications'] ?? $settings->email_notifications,
            'push_notifications' => $data['push_notifications'] ?? $settings->push_notifications,
            'sms_notifications' => $data['sms_notifications'] ?? $settings->sms_notifications,
            'notification_new_message' => $data['notification_new_message'] ?? $settings->notification_new_message,
            'notification_new_project' => $data['notification_new_project'] ?? $settings->notification_new_project,
            'notification_new_comment' => $data['notification_new_comment'] ?? $settings->notification_new_comment,
            'notification_system_updates' => $data['notification_system_updates'] ?? $settings->notification_system_updates,
        ]);
    }

    /**
     * Update privacy settings
     */
    public function updatePrivacy(int $userId, array $data): bool
    {
        $settings = $this->getByUserId($userId);
        
        if (!$settings) {
            $settings = $this->create(['user_id' => $userId]);
        }

        return $settings->update([
            'profile_public' => $data['profile_public'] ?? $settings->profile_public,
            'show_email' => $data['show_email'] ?? $settings->show_email,
            'show_phone' => $data['show_phone'] ?? $settings->show_phone,
            'show_activity' => $data['show_activity'] ?? $settings->show_activity,
        ]);
    }

    /**
     * Update display preferences
     */
    public function updateDisplayPreferences(int $userId, array $data): bool
    {
        $settings = $this->getByUserId($userId);
        
        if (!$settings) {
            $settings = $this->create(['user_id' => $userId]);
        }

        return $settings->update([
            'theme' => $data['theme'] ?? $settings->theme,
            'language' => $data['language'] ?? $settings->language,
            'timezone' => $data['timezone'] ?? $settings->timezone,
            'date_format' => $data['date_format'] ?? $settings->date_format,
            'time_format' => $data['time_format'] ?? $settings->time_format,
        ]);
    }

    /**
     * Update security settings
     */
    public function updateSecurity(int $userId, array $data): bool
    {
        $settings = $this->getByUserId($userId);
        
        if (!$settings) {
            $settings = $this->create(['user_id' => $userId]);
        }

        return $settings->update([
            'two_factor_enabled' => $data['two_factor_enabled'] ?? $settings->two_factor_enabled,
            'two_factor_secret' => $data['two_factor_secret'] ?? $settings->two_factor_secret,
            'login_notifications' => $data['login_notifications'] ?? $settings->login_notifications,
            'trusted_devices' => $data['trusted_devices'] ?? $settings->trusted_devices,
        ]);
    }
}
