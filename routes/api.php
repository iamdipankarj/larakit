<?php

use App\Http\Controllers\Api\WidgetApiController;
use App\Http\Controllers\Api\WidgetChatController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', [WidgetApiController::class, 'getDashboard']);
Route::post('/dashboard', [WidgetApiController::class, 'saveDashboard']);

Route::get('/widgets', function () {
    return response()->json([
        ['type' => 'weather', 'name' => 'Weather', 'description' => 'Shows weather for a location'],
        ['type' => 'stock', 'name' => 'Stocks', 'description' => 'Track stock prices'],
        ['type' => 'news', 'name' => 'News', 'description' => 'Latest headlines from news sources'],
    ]);
});

Route::post('/widget-chat', [WidgetChatController::class, 'handle']);

