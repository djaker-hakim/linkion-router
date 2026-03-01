<?php

namespace Linkion\Router\Core;


use Illuminate\Support\Facades\Route;

class LinkionRouteController {



    public static function catchAll($view, $prefix = ''){
        
        Route::get($prefix . '/{any}', function() use($view) {
            return view($view);
        })->where('any', '.*');

        
    }


}