<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Gate::define('access-admin', function (User $user) {
            return $user->hasRole('ADMIN');
        });

        Gate::define('view-users', function () {
            Gate::allows('access-admin');
        });

        Gate::define('invite-users', function () {
            Gate::allows('access-admin');
        });

        Gate::define('remove-users', function () {
            Gate::allows('access-admin');
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('environment.app_env') === 'production') {
            URL::forceScheme('https');
        }

        Vite::prefetch(concurrency: 3);
        View::share([
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'buildId' => config('version.build_id', ""),
        ]);
    }
}
