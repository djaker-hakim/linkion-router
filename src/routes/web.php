<?php

use Illuminate\Support\Facades\Route;

Route::get('/linkion/router/script', function () {
    $file = dirname(__DIR__).'/js/main.min.js';
    abort_unless(file_exists($file), 404);

    return response()->file($file, [
        'Content-Type' => 'application/javascript',
        // 'Cache-Control' => 'public, max-age=604800',
    ]);

});
