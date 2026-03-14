<?php

namespace App\Services;

use App\Repositories\UserSettingsRepository;
use App\Events\SettingsUpdated;
use App\Events\ProfileUpdated;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserSettingsService
{
    public function __construct(
        private UserSettingsRepository $repository
    ) {}

    /**
     * Get user settings
     */
    public function getUserSettings(int $userId): ?Model
    {
        return $this->repository->getByUserId($userId);
    }

    /**
     * Create or update all settings
     */
    public function updateSettings(int $userId, array $data): Model
    {
        $settings = $this->repository->createOrUpdate($userId, $data);
        
        // Broadcast settings update
        broadcast(new SettingsUpdated($settings))->toOthers();
        
        return $settings;
    }

    /**
     * Update profile information
     */
    public function updateProfile(int $userId, array $data): bool
    {
        $updated = $this->repository->updateProfile($userId, $data);
        
        if ($updated) {
            $settings = $this->repository->getByUserId($userId);
            broadcast(new ProfileUpdated($settings))->toOthers();
        }
        
        return $updated;
    }

    /**
     * Update avatar (with file upload)
     */
    public function updateAvatar(int $userId, $file): ?string
    {
        // Get current settings
        $settings = $this->repository->getByUserId($userId);
        
        // Delete old avatar if exists
        if ($settings && $settings->avatar) {
            Storage::disk('public')->delete($settings->avatar);
        }
        
        // Store new avatar
        $path = $file->store('avatars', 'public');
        
        // Update settings
        $this->repository->updateProfile($userId, ['avatar' => $path]);
        
        // Broadcast update
        $settings = $this->repository->getByUserId($userId);
        broadcast(new ProfileUpdated($settings))->toOthers();
        
        return $path;
    }

    /**
     * Update social media links
     */
    public function updateSocialMedia(int $userId, array $data): bool
    {
        $updated = $this->repository->updateSocialMedia($userId, $data);
        
        if ($updated) {
            $settings = $this->repository->getByUserId($userId);
            broadcast(new SettingsUpdated($settings))->toOthers();
        }
        
        return $updated;
    }

    /**
     * Update notification preferences
     */
    public function updateNotificationPreferences(int $userId, array $data): bool
    {
        $updated = $this->repository->updateNotifications($userId, $data);
        
        if ($updated) {
            $settings = $this->repository->getByUserId($userId);
            broadcast(new SettingsUpdated($settings))->toOthers();
        }
        
        return $updated;
    }

    /**
     * Update privacy settings
     */
    public function updatePrivacySettings(int $userId, array $data): bool
    {
        $updated = $this->repository->updatePrivacy($userId, $data);
        
        if ($updated) {
            $settings = $this->repository->getByUserId($userId);
            broadcast(new SettingsUpdated($settings))->toOthers();
        }
        
        return $updated;
    }

    /**
     * Update display preferences
     */
    public function updateDisplayPreferences(int $userId, array $data): bool
    {
        $updated = $this->repository->updateDisplayPreferences($userId, $data);
        
        if ($updated) {
            $settings = $this->repository->getByUserId($userId);
            broadcast(new SettingsUpdated($settings))->toOthers();
        }
        
        return $updated;
    }

    /**
     * Update security settings
     */
    public function updateSecuritySettings(int $userId, array $data): bool
    {
        $updated = $this->repository->updateSecurity($userId, $data);
        
        if ($updated) {
            $settings = $this->repository->getByUserId($userId);
            broadcast(new SettingsUpdated($settings))->toOthers();
        }
        
        return $updated;
    }

    /**
     * Update user password
     */
    public function updatePassword(User $user, string $currentPassword, string $newPassword): bool
    {
        // Verify current password
        if (!Hash::check($currentPassword, $user->password)) {
            return false;
        }

        // Update password
        $user->update([
            'password' => Hash::make($newPassword),
        ]);

        // Update last password change timestamp
        $this->repository->updateSecurity($user->id, [
            'last_password_change' => now(),
        ]);

        return true;
    }

    /**
     * Update user email
     */
    public function updateEmail(User $user, string $newEmail): bool
    {
        $user->update([
            'email' => $newEmail,
            'email_verified_at' => null, // Require re-verification
        ]);

        return true;
    }

    /**
     * Update user name
     */
    public function updateName(User $user, string $name): bool
    {
        return $user->update(['name' => $name]);
    }

    /**
     * Enable two-factor authentication
     */
    public function enableTwoFactor(int $userId, string $secret): bool
    {
        return $this->repository->updateSecurity($userId, [
            'two_factor_enabled' => true,
            'two_factor_secret' => encrypt($secret),
        ]);
    }

    /**
     * Disable two-factor authentication
     */
    public function disableTwoFactor(int $userId): bool
    {
        return $this->repository->updateSecurity($userId, [
            'two_factor_enabled' => false,
            'two_factor_secret' => null,
        ]);
    }

    /**
     * Get default settings
     */
    public function getDefaultSettings(): array
    {
        return [
            'theme' => 'light',
            'language' => 'en',
            'timezone' => 'UTC',
            'date_format' => 'Y-m-d',
            'time_format' => 'H:i',
            'email_notifications' => true,
            'push_notifications' => true,
            'sms_notifications' => false,
            'notification_new_message' => true,
            'notification_new_project' => true,
            'notification_new_comment' => true,
            'notification_system_updates' => true,
            'profile_public' => false,
            'show_email' => false,
            'show_phone' => false,
            'show_activity' => true,
            'two_factor_enabled' => false,
            'login_notifications' => true,
        ];
    }
}
