<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'api/health'],
    'allowed_methods' => ['*'],
    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:5173,http://localhost:3000,http://localhost:8001,http://localhost:80,http://portfolio:80')),
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => ['Authorization', 'Content-Type', 'X-Requested-With'],
    'max_age' => env('CORS_MAX_AGE', 86400),
    'supports_credentials' => true,
];
