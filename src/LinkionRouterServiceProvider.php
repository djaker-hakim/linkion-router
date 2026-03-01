<?php

namespace Linkion\Router;

use Illuminate\Support\ServiceProvider;

class LinkionRouterServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // load linkion router script
        $this->loadRoutesFrom(__DIR__ . '/routes/web.php');
    }
}
