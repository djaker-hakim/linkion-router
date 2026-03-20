<?php

namespace Linkion\Router;

use Illuminate\Support\ServiceProvider;
use Linkion\Core\Linkion;
use Linkion\Router\Console\LinkionRouterMakeCommand;
use Linkion\Router\LinkionComponents\PageError;

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

        // Register the Linkion component
        Linkion::component('page-error', PageError::class);

        // Load the component's views
        $this->loadViewsFrom(__DIR__ . '/views', 'lnkn');
       
        // loading linkion arisan commands
        $this->commands([
            LinkionRouterMakeCommand::class
        ]);
    }
}
