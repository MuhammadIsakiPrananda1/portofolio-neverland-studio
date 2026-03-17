# Challenge Solve System - Implementation Guide

## Overview
This system implements persistent challenge completion tracking for your CTF/Playground challenges. When users solve challenges, their completion status is saved in the database and persists across:
- Page refreshes
- Browser closures
- Logout/login cycles
- Different devices (for the same account)

## Backend Implementation

### 1. Database Migration
Created: `database/migrations/2026_03_17_000001_create_challenge_solves_table.php`

**Tables created:**
```sql
challenge_solves
  - id (primary key)
  - user_id (foreign key → users.id)
  - challenge_id (string) - e.g., 'xss-001', 'crypto-2'
  - category (string) - e.g., 'web', 'crypto', 'forensics'
  - solved_at (timestamp) - when challenge was solved
  - created_at, updated_at (timestamps)
  - Unique constraint on (user_id, challenge_id)
```

**Run migration:**
```bash
php artisan migrate
```

### 2. Eloquent Model
Created: `app/Models/ChallengeSolve.php`

**Key methods:**
- `getSolvedByUser($userId)` - Get all challenge IDs solved by a user
- `isSolvedByUser($userId, $challengeId)` - Check if user solved a specific challenge
- `markAsSolved($userId, $challengeId, $category)` - Mark challenge as solved (no duplicates)

### 3. API Controller
Created: `app/Http/Controllers/Api/ChallengeController.php`

**Endpoints:**
- `GET /api/v1/challenges/solved` - Get user's solved challenges
- `POST /api/v1/challenges/submit` - Submit flag for verification
- `GET /api/v1/challenges/stats` - Get user's challenge statistics

### 4. API Routes
Added to: `routes/api.php`

```php
Route::prefix('challenges')->controller(ChallengeController::class)->middleware('auth:sanctum')->group(function () {
    Route::get('/solved', 'getSolvedChallenges');
    Route::post('/submit', 'submitFlag');
    Route::get('/stats', 'getUserStats');
});
```

## Frontend Implementation

### 1. Challenge Service
Created: `src/services/challenge.service.ts`

**Methods:**
- `getSolvedChallenges()` - Fetch list of solved challenges from backend
- `submitFlag(request)` - Submit challenge flag for verification
- `getUserStats()` - Get user's statistics

### 2. React Component Updates
Updated: `src/pages/Playground/PlaygroundWeb/PlaygroundWeb.tsx` (template applies to all challenge pages)

**Key changes:**
1. **Load solved challenges on mount:**
   ```typescript
   useEffect(() => {
     if (isAuthenticated) {
       loadSolvedChallenges();
     }
   }, [isAuthenticated]);
   ```

2. **Submit flags to backend:**
   ```typescript
   const response = await challengeService.submitFlag({
     challenge_id: selectedChallenge.id,
     flag: userInput.trim(),
     category: 'web',
   });
   ```

3. **Handle responses:**
   - `correct` - Challenge solved successfully
   - `incorrect` - Flag is wrong
   - `already_solved` - User already solved this challenge
   - `error` - Server error

## Configuration

### Setting Challenge Flags
In `backend/app/Http/Controllers/Api/ChallengeController.php`, update the `getChallengeFlag()` method:

```php
private function getChallengeFlag(string $challengeId): ?string
{
    $challenges = [
        'xss-001' => 'flag{xss_vulnerability}',
        'xss-002' => 'flag{dom_based_xss}',
        'crypto-1' => 'flag{caesar_cipher}',
        // Add all your challenges here
    ];

    return $challenges[$challengeId] ?? null;
}
```

**Note:** Implement this from a secure source (environment variables, database, etc. rather than hardcoding)

## Usage Flow

### For Users
1. User navigates to a challenge page (e.g., `/playground/web-security`)
2. **On load:** Browser fetches solved challenges from API
3. Solved challenges show "Completed ✓" badge and locked state
4. User submits a flag
5. **On submit:** Frontend sends flag to backend API
6. Backend verifies flag and saves to database if correct
7. **Immediately:** UI updates without page reload
8. **On refresh/login:** Solved status persists from database

### For Administrators
1. Update challenge flags in `getChallengeFlag()` method
2. Run migration to create table: `php artisan migrate`
3. Test submission flow with a user account

## API Response Examples

### GET `/api/v1/challenges/solved`
```json
{
  "status": "success",
  "solved": ["xss-001", "xss-002", "xss-005"],
  "count": 3
}
```

### POST `/api/v1/challenges/submit`
Request:
```json
{
  "challenge_id": "xss-001",
  "flag": "flag{xss_vulnerability}",
  "category": "web"
}
```

Response (Correct):
```json
{
  "status": "correct",
  "message": "Challenge solved successfully!",
  "solved": true
}
```

Response (Incorrect):
```json
{
  "status": "incorrect",
  "message": "Flag is incorrect. Try again!",
  "solved": false
}
```

### GET `/api/v1/challenges/stats`
```json
{
  "status": "success",
  "total_solved": 5,
  "by_category": [
    { "category": "web", "count": 3 },
    { "category": "crypto", "count": 2 }
  ]
}
```

## Implementing on Other Challenge Pages

To apply this to other challenge categories (Crypto, Forensics, etc.):

1. **Copy the pattern from PlaygroundWeb.tsx:**
   - Import `challengeService`
   - Add same `useEffect` hooks
   - Update `handleSubmit` function
   - Update submit button with loading state

2. **Example for PlaygroundCrypto:**
   ```typescript
   const response = await challengeService.submitFlag({
     challenge_id: selectedChallenge.id,
     flag: userInput.trim(),
     category: 'crypto',  // Change category
   });
   ```

3. **Repeat for:**
   - PlaygroundSQL → category: 'sql'
   - PlaygroundForensics → category: 'forensics'
   - PlaygroundBinary → category: 'binary'
   - etc.

## Security Considerations

1. **Flag Verification:** Currently hardcoded in controller - consider moving to:
   - Database table with flags
   - Environment variables
   - Secure configuration service

2. **Rate Limiting:** Add rate limiting to `/submit` endpoint to prevent brute force
   ```php
   Route::post('/submit', 'submitFlag')->middleware('throttle:10,1');
   ```

3. **Authentication:** All endpoints require `auth:sanctum` middleware

4. **Validation:** Server-side flag comparison is case-insensitive by default

## Troubleshooting

### Solved challenges not persisting
1. Verify migration ran: `php artisan migrate:status`
2. Check user is authenticated: `auth()->check()`
3. Verify token is being sent: Check Network tab in DevTools

### "Already Solved" status showing incorrectly
1. Clear browser localStorage: `localStorage.clear()`
2. Check database for duplicate entries
3. Verify unique constraint on (user_id, challenge_id)

### Flag verification failing
1. Check flag format in `getChallengeFlag()`
2. Verify case-insensitive comparison
3. Test with exact flag value

## Database Backup & Restore

### Backup
```bash
php artisan tinker
>>> DB::table('challenge_solves')->get()
```

### Check user progress
```bash
php artisan tinker
>>> App\Models\ChallengeSolve::where('user_id', 1)->get()
```

## Next Steps

1. Run database migration
2. Update all challenge components (or provide template)
3. Set up secure flag storage
4. Test with user accounts
5. Monitor challenge_solves table growth
6. Consider implementing leaderboard based on this data
