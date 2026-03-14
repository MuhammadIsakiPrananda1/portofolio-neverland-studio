<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

// Repositories
use App\Contracts\RepositoryInterface;
use App\Repositories\BaseRepository;
use App\Repositories\ProjectRepository;
use App\Repositories\MessageRepository;
use App\Repositories\AnalyticsRepository;
use App\Repositories\UserSettingsRepository;

// Services
use App\Services\ProjectService;
use App\Services\MessageService;
use App\Services\AnalyticsService;
use App\Services\UserSettingsService;
use App\Services\DashboardService;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Bind Repositories
        $this->app->singleton(ProjectRepository::class, function ($app) {
            return new ProjectRepository(new \App\Models\Project());
        });

        $this->app->singleton(MessageRepository::class, function ($app) {
            return new MessageRepository(new \App\Models\Contact());
        });

        $this->app->singleton(AnalyticsRepository::class, function ($app) {
            return new AnalyticsRepository(new \App\Models\Analytics());
        });

        $this->app->singleton(UserSettingsRepository::class, function ($app) {
            return new UserSettingsRepository(new \App\Models\UserSettings());
        });

        // Bind Services
        $this->app->singleton(ProjectService::class, function ($app) {
            return new ProjectService($app->make(ProjectRepository::class));
        });

        $this->app->singleton(MessageService::class, function ($app) {
            return new MessageService($app->make(MessageRepository::class));
        });

        $this->app->singleton(AnalyticsService::class, function ($app) {
            return new AnalyticsService($app->make(AnalyticsRepository::class));
        });

        $this->app->singleton(UserSettingsService::class, function ($app) {
            return new UserSettingsService($app->make(UserSettingsRepository::class));
        });

        $this->app->singleton(DashboardService::class, function ($app) {
            return new DashboardService();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
