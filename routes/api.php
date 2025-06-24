<?php

use App\Http\Controllers\Api\WidgetApiController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', [WidgetApiController::class, 'getDashboard']);
Route::post('/dashboard', [WidgetApiController::class, 'saveDashboard']);
