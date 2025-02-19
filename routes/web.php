<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/about', function () {
    return view('about');
})->name('about');

Route::get('/help', function () {
    return view('help');
})->name('help');

Route::get('/changelog', function () {
    return view('changelog');
})->name('changelog');

Route::get('/tos', function () {
    return view('terms');
})->name('terms');

Route::get('/privacy', function () {
    return view('privacy');
})->name('privacy');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function (Request $request) {
        return Inertia::render('Dashboard', [
            'query' => $request->query(),
        ]);
    })->name('dashboard');

    Route::get('/dashboard/sales', function (Request $request) {
        return Inertia::render('SalesList', [
            'query' => $request->query(),
        ]);
    })->name('dashboard.sales');

    Route::get('/reports', function () {
        return Inertia::render('Reports');
    })->name('reports');

    Route::get('/reports/{report_type}', function ($report_type) {
        $reportTypes = config('reports.report_types');

        if (!isset($reportTypes[$report_type])) {
            abort(404);
        }

        return Inertia::render('ReportDetail', [
            'reportType' => $reportTypes[$report_type],
        ]);
    })->name('reports.report_type');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/oauth.php';
require __DIR__.'/api.php';
require __DIR__.'/organizations.php';
require __DIR__.'/invitations.php';
