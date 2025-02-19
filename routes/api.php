<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SalesApiController;

Route::middleware('auth')->group(function () {
    Route::post('/api/getSales', [SalesApiController::class, 'getSales']);
    Route::post('/api/generateReport', [SalesApiController::class, 'generateReport']);

    Route::post('/api/salesMetrics', [SalesApiController::class, 'salesMetrics']);
    Route::post('/api/salesVolumeMetrics', [SalesApiController::class, 'salesVolumeMetrics']);
    Route::post('/api/activeSalesMetrics', [SalesApiController::class, 'activeSalesMetrics']);

    Route::get('/api/generateCSV', [SalesApiController::class, 'generateCSVReport']);
});
