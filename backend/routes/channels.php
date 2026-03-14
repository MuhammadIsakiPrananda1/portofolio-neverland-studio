<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
| 
| Note: Authentication is handled by Supabase on frontend.
| These channels are currently simplified for public access.
| Implement Supabase JWT verification for private channels if needed.
|--------------------------------------------------------------------------
*/

// Public channel for analytics updates
Broadcast::channel('analytics', function () {
    return true;
});

// Public channel for dashboard stats
Broadcast::channel('dashboard', function () {
    return true;
});

// Note: User-specific and admin channels commented out
// until Supabase JWT verification is implemented
/*
Broadcast::channel('user.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});

Broadcast::channel('admin-dashboard', function ($user) {
    // TODO: Implement Supabase role check
    return true;
});
*/

// Channel for real-time messages
Broadcast::channel('messages', function ($user) {
    return $user->hasRole(['admin', 'editor']);
});

// Channel for project updates
Broadcast::channel('projects', function () {
    return true;
});

// Channel for blog updates  
Broadcast::channel('blog', function () {
    return true;
});

// Private channel for chat
Broadcast::channel('chat.{roomId}', function ($user, $roomId) {
    // Add your authorization logic here
    return true;
});

// Presence channel for online users
Broadcast::channel('online', function ($user) {
    return [
        'id' => $user->id,
        'name' => $user->name,
        'avatar' => $user->avatar ?? null,
    ];
});
