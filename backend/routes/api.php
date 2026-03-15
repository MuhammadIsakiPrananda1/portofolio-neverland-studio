<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OAuthController;
use App\Http\Controllers\Api\SessionController;
use App\Http\Controllers\Api\TwoFactorController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Health Check
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toIso8601String(),
        'service' => 'Neverland Studio API'
    ]);
});

// Authentication Routes
Route::prefix('v1/auth')->group(function () {
    // Email/Password Auth
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password',  [AuthController::class, 'resetPassword']);

    // OAuth (Google & GitHub)
    Route::get('/google',          [OAuthController::class, 'redirectToGoogle']);
    Route::get('/google/callback', [OAuthController::class, 'handleGoogleCallback']);
    Route::get('/github',          [OAuthController::class, 'redirectToGithub']);
    Route::get('/github/callback', [OAuthController::class, 'handleGithubCallback']);

    // 2FA Login Verification (no auth token required — uses temp 2fa_token)
    Route::post('/2fa/verify-login', [TwoFactorController::class, 'verifyLogin']);

    // Protected Auth Routes (require Sanctum token)
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout',         [AuthController::class, 'logout']);
        Route::get('/user',            [AuthController::class, 'user']);
        Route::put('/profile',         [AuthController::class, 'updateProfile']);
        Route::put('/password',        [AuthController::class, 'updatePassword']);

        // Active Sessions
        Route::get('/sessions',              [SessionController::class, 'index']);
        Route::delete('/sessions/{id}',      [SessionController::class, 'revoke']);
        Route::delete('/sessions',           [SessionController::class, 'revokeAll']);

        // Two-Factor Authentication
        Route::get('/2fa/status',            [TwoFactorController::class, 'status']);
        Route::post('/2fa/setup',            [TwoFactorController::class, 'setup']);
        Route::post('/2fa/confirm',          [TwoFactorController::class, 'confirm']);
        Route::post('/2fa/disable',          [TwoFactorController::class, 'disable']);
        Route::get('/2fa/recovery-codes',    [TwoFactorController::class, 'recoveryCodes']);
        Route::post('/2fa/recovery-codes',   [TwoFactorController::class, 'regenerateRecoveryCodes']);
    });
});

// Public Routes
Route::prefix('v1')->group(function () {
    
    // Public Services
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{id}', [ServiceController::class, 'show']);

    // Public Projects
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{id}', [ProjectController::class, 'show']);
    Route::get('/projects/category/{category}', [ProjectController::class, 'byCategory']);

    // Public Blog
    Route::get('/blog', [BlogController::class, 'index']);
    Route::get('/blog/{slug}', [BlogController::class, 'show']);
    Route::get('/blog/category/{category}', [BlogController::class, 'byCategory']);
    Route::get('/blog/tag/{tag}', [BlogController::class, 'byTag']);

    // Public Team Members
    Route::get('/team', [TeamMemberController::class, 'index']);
    Route::get('/team/{id}', [TeamMemberController::class, 'show']);

    // Public Testimonials
    Route::get('/testimonials', [TestimonialController::class, 'index']);
    
    // Contact Form (Public)
    Route::post('/contact', [ContactController::class, 'submit']);

    // Portfolio Public
    Route::get('/portfolio', [PortfolioController::class, 'index']);
    Route::get('/portfolio/{id}', [PortfolioController::class, 'show']);
    
    // Virtual Machine Management (Public - Rate Limited)
    Route::prefix('vm')->controller(\App\Http\Controllers\VMController::class)->group(function () {
        Route::post('/start', 'start');                          // Start new VM container
        Route::post('/{container}/stop', 'stop');                // Stop VM container
        Route::get('/{container}/status', 'status');             // Get VM status
        Route::post('/{container}/execute', 'execute');          // Execute command
        Route::post('/{container}/extend', 'extend');            // Extend session
        Route::get('/vpn-config', 'vpnConfig');                  // Get VPN connection info (rotating IP)
        Route::get('/vpn-config/download', 'downloadVpnConfig'); // Download .ovpn config file
    });
});

// Protected Routes (Authentication handled by Supabase on frontend)
// TODO: Implement Supabase JWT verification middleware for additional backend security if needed
Route::prefix('v1')->group(function () {
    
    // User Settings
    Route::prefix('settings')->controller(SettingController::class)->group(function () {
        Route::get('/', 'index');                           // Get all settings
        Route::put('/profile', 'updateProfile');            // Update profile
        Route::post('/avatar', 'uploadAvatar');             // Upload avatar
        Route::put('/social-media', 'updateSocialMedia');   // Update social media
        Route::put('/notifications', 'updateNotifications'); // Update notifications
        Route::put('/privacy', 'updatePrivacy');            // Update privacy
        Route::put('/display', 'updateDisplay');            // Update display preferences
        Route::put('/password', 'updatePassword');          // Update password
        Route::put('/email', 'updateEmail');                // Update email
        Route::post('/2fa/enable', 'enableTwoFactor');      // Enable 2FA
        Route::post('/2fa/disable', 'disableTwoFactor');    // Disable 2FA
    });

    // Dashboard Real-time
    Route::prefix('dashboard')->controller(DashboardController::class)->group(function () {
        Route::get('/', 'index');                           // Dashboard overview
        Route::get('/stats', 'getStats');                   // Dashboard statistics
        Route::get('/contacts', 'getContacts');             // Get all contacts
        Route::get('/users', 'getUsers');                   // Get all users
        Route::get('/realtime', 'realtimeStats');           // Real-time stats
        Route::get('/visitor-chart', 'visitorChart');       // Visitor chart data
        Route::get('/hourly-visitors', 'hourlyVisitors');   // Hourly visitors
        Route::get('/activity-feed', 'activityFeed');       // Activity feed
        Route::get('/top-pages', 'topPages');               // Top pages
        Route::get('/device-stats', 'deviceStats');         // Device statistics
        Route::get('/browser-stats', 'browserStats');       // Browser statistics
        Route::get('/quick-stats', 'quickStats');           // Quick stats widgets
        Route::post('/clear-cache', 'clearCache');          // Clear cache
    });

    // Contact Management (for Dashboard)
    Route::prefix('contacts')->controller(ContactController::class)->group(function () {
        Route::get('/', 'index');                           // Get all contacts
        Route::get('/{id}', 'show');                        // Get single contact
        Route::put('/{id}/read', 'markAsRead');             // Mark as read
        Route::put('/{id}/replied', 'markAsReplied');       // Mark as replied
        Route::delete('/{id}', 'destroy');                  // Delete contact
    });

    // Dashboard Analytics
    Route::get('/analytics/overview', [AnalyticsController::class, 'overview']);
    Route::get('/analytics/visitors', [AnalyticsController::class, 'visitors']);
    Route::get('/analytics/projects-stats', [AnalyticsController::class, 'projectsStats']);
    Route::get('/analytics/messages-stats', [AnalyticsController::class, 'messagesStats']);
    Route::get('/analytics/top-services', [AnalyticsController::class, 'topServices']);

    // Projects Management
    // TODO: Add Supabase-based authorization checks
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
    Route::post('/projects/{id}/publish', [ProjectController::class, 'publish']);
    Route::post('/projects/{id}/unpublish', [ProjectController::class, 'unpublish']);

    // Blog Management
    // TODO: Add Supabase-based authorization checks
    Route::post('/blog', [BlogController::class, 'store']);
    Route::put('/blog/{id}', [BlogController::class, 'update']);
    Route::delete('/blog/{id}', [BlogController::class, 'destroy']);
    Route::post('/blog/{id}/publish', [BlogController::class, 'publish']);
    Route::post('/blog/{id}/unpublish', [BlogController::class, 'unpublish']);

    // Services Management
    // TODO: Add Supabase-based authorization checks
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    // Clients Management
    Route::apiResource('clients', ClientController::class);

    // Messages Management
    Route::get('/messages', [MessageController::class, 'index']);
    Route::get('/messages/{id}', [MessageController::class, 'show']);
    Route::put('/messages/{id}/read', [MessageController::class, 'markAsRead']);
    Route::put('/messages/{id}/unread', [MessageController::class, 'markAsUnread']);
    Route::delete('/messages/{id}', [MessageController::class, 'destroy']);
    Route::post('/messages/{id}/reply', [MessageController::class, 'reply']);

    // Team Members Management
    // TODO: Add Supabase-based authorization checks
    Route::post('/team', [TeamMemberController::class, 'store']);
    Route::put('/team/{id}', [TeamMemberController::class, 'update']);
    Route::delete('/team/{id}', [TeamMemberController::class, 'destroy']);

    // Testimonials Management
    // TODO: Add Supabase-based authorization checks
    Route::post('/testimonials', [TestimonialController::class, 'store']);
    Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
    Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);

    // Settings Management
    // TODO: Add Supabase-based authorization checks
    Route::get('/settings', [SettingController::class, 'index']);
    Route::get('/settings/{key}', [SettingController::class, 'show']);
    Route::put('/settings/{key}', [SettingController::class, 'update']);
    Route::post('/settings', [SettingController::class, 'store']);

    // Media Management
    Route::post('/media/upload', [MediaController::class, 'upload']);
    Route::delete('/media/{id}', [MediaController::class, 'destroy']);
    Route::get('/media', [MediaController::class, 'index']);
});
