<?php

use App\Http\Controllers\Api\WidgetApiController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', [WidgetApiController::class, 'getDashboard']);
Route::post('/dashboard', [WidgetApiController::class, 'saveDashboard']);

Route::get('/widgets', function () {
    return response()->json([
        ['type' => 'weather', 'name' => 'Weather', 'description' => 'Shows weather for a location'],
        ['type' => 'stocks', 'name' => 'Stocks', 'description' => 'Track stock prices'],
        ['type' => 'news', 'name' => 'News', 'description' => 'Latest headlines from news sources'],
    ]);
});
