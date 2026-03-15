<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\UserSettingsService;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateSettingsRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function __construct(
        private UserSettingsService $service
    ) {}

    /**
     * Get current user settings
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $userId = $request->user()->id;
            $settings = $this->service->getUserSettings($userId);

            if (!$settings) {
                // Create default settings if not exists
                $defaultSettings = $this->service->getDefaultSettings();
                $settings = $this->service->updateSettings($userId, $defaultSettings);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'email' => $request->user()->email,
                        'avatar' => $settings->avatar ?? null,
                    ],
                    'settings' => $settings,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch settings',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update profile information
     */
    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        try {
            $userId = $request->user()->id;
            $data = $request->validated();

            // Update user name if provided
            if (isset($data['name'])) {
                $this->service->updateName($request->user(), $data['name']);
            }

            // Update profile settings
            $updated = $this->service->updateProfile($userId, $data);

            if (!$updated) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update profile',
                ], 400);
            }

            $settings = $this->service->getUserSettings($userId);

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => [
                    'user' => $request->user()->fresh(),
                    'settings' => $settings,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update profile',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Upload avatar
     */
    public function uploadAvatar(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $userId = $request->user()->id;
            $path = $this->service->updateAvatar($userId, $request->file('avatar'));

            return response()->json([
                'success' => true,
                'message' => 'Avatar uploaded successfully',
                'data' => [
                    'avatar' => $path,
                    'url' => asset('storage/' . $path),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload avatar',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update social media links
     */
    public function updateSocialMedia(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'github_url' => 'nullable|url',
                'linkedin_url' => 'nullable|url',
                'twitter_url' => 'nullable|url',
                'instagram_url' => 'nullable|url',
                'facebook_url' => 'nullable|url',
            ]);

            $userId = $request->user()->id;
            $updated = $this->service->updateSocialMedia($userId, $request->all());

            if (!$updated) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update social media links',
                ], 400);
            }

            $settings = $this->service->getUserSettings($userId);

            return response()->json([
                'success' => true,
                'message' => 'Social media links updated successfully',
                'data' => $settings,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update social media',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update notification preferences
     */
    public function updateNotifications(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'email_notifications' => 'boolean',
                'push_notifications' => 'boolean',
                'sms_notifications' => 'boolean',
                'notification_new_message' => 'boolean',
                'notification_new_project' => 'boolean',
                'notification_new_comment' => 'boolean',
                'notification_system_updates' => 'boolean',
            ]);

            $userId = $request->user()->id;
            $updated = $this->service->updateNotificationPreferences($userId, $request->all());

            if (!$updated) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update notification preferences',
                ], 400);
            }

            $settings = $this->service->getUserSettings($userId);

            return response()->json([
                'success' => true,
                'message' => 'Notification preferences updated successfully',
                'data' => $settings,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update notifications',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update privacy settings
     */
    public function updatePrivacy(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'profile_public' => 'boolean',
                'show_email' => 'boolean',
                'show_phone' => 'boolean',
                'show_activity' => 'boolean',
            ]);

            $userId = $request->user()->id;
            $updated = $this->service->updatePrivacySettings($userId, $request->all());

            if (!$updated) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update privacy settings',
                ], 400);
            }

            $settings = $this->service->getUserSettings($userId);

            return response()->json([
                'success' => true,
                'message' => 'Privacy settings updated successfully',
                'data' => $settings,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update privacy',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update display preferences
     */
    public function updateDisplay(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'theme' => 'in:light,dark,auto',
                'language' => 'string|max:5',
                'timezone' => 'string|timezone',
                'date_format' => 'string',
                'time_format' => 'string',
            ]);

            $userId = $request->user()->id;
            $updated = $this->service->updateDisplayPreferences($userId, $request->all());

            if (!$updated) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update display preferences',
                ], 400);
            }

            $settings = $this->service->getUserSettings($userId);

            return response()->json([
                'success' => true,
                'message' => 'Display preferences updated successfully',
                'data' => $settings,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update display',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update password
     */
    public function updatePassword(UpdatePasswordRequest $request): JsonResponse
    {
        try {
            $updated = $this->service->updatePassword(
                $request->user(),
                $request->current_password,
                $request->new_password
            );

            if (!$updated) {
                return response()->json([
                    'success' => false,
                    'message' => 'Current password is incorrect',
                ], 400);
            }

            return response()->json([
                'success' => true,
                'message' => 'Password updated successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update password',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update email
     */
    public function updateEmail(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'email' => 'required|email|unique:users,email,' . $request->user()->id,
            ]);

            $updated = $this->service->updateEmail($request->user(), $request->email);

            if (!$updated) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update email',
                ], 400);
            }

            return response()->json([
                'success' => true,
                'message' => 'Email updated successfully. Please verify your new email.',
                'data' => $request->user()->fresh(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update email',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Enable two-factor authentication
     */
    public function enableTwoFactor(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'secret' => 'required|string',
            ]);

            $userId = $request->user()->id;
            $updated = $this->service->enableTwoFactor($userId, $request->secret);

            if (!$updated) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to enable two-factor authentication',
                ], 400);
            }

            return response()->json([
                'success' => true,
                'message' => 'Two-factor authentication enabled successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to enable two-factor',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Disable two-factor authentication
     */
    public function disableTwoFactor(Request $request): JsonResponse
    {
        try {
            $userId = $request->user()->id;
            $updated = $this->service->disableTwoFactor($userId);

            if (!$updated) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to disable two-factor authentication',
                ], 400);
            }

            return response()->json([
                'success' => true,
                'message' => 'Two-factor authentication disabled successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to disable two-factor',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
