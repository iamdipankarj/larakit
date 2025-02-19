<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\OrganizationUserController;

Route::middleware('auth')->group(function () {
    Route::get('/organizations/users', [OrganizationUserController::class, 'index'])
        ->name('organizations.users.index');
    Route::middleware(['role:ADMIN'])->group(function () {
        Route::get('/organizations/users/create', [OrganizationUserController::class, 'create'])
            ->name('organizations.users.create');
        Route::post('/organizations/users', [OrganizationUserController::class, 'store'])
            ->name('organizations.users.store');
        Route::delete('/organizations/users/{id}', [OrganizationUserController::class, 'destroy'])
            ->name('organizations.users.destroy');
    });
    Route::get('/organizations/create', [OrganizationController::class, 'create'])
        ->name('organizations.create');
    Route::get('/organizations', [OrganizationController::class, 'index'])
        ->name('organizations.index');
    Route::post('/organizations', [OrganizationController::class, 'store'])
        ->name('organizations.store');
});
