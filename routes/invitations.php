<?php

use App\Http\Controllers\InvitationController;
use Illuminate\Support\Facades\Route;

Route::get('/invitations/accept', [InvitationController::class, 'showAcceptForm'])->name('invitations.accept');
Route::post('/invitations/accept', [InvitationController::class, 'accept'])->name('invitations.postAccept');

Route::middleware('auth')->group(function () {
    Route::middleware(['role:ADMIN'])->group(function () {
        Route::get('/invitations', [InvitationController::class, 'index'])->name('invitations.index');
        Route::delete('/invitations/{id}', [InvitationController::class, 'destroy'])->name('invitations.destroy');
    });
});
