<?php

use App\Http\Controllers\InstructorController;
use App\Http\Controllers\SubjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth-api'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::controller(InstructorController::class)
    ->prefix("instructor")
    ->name("instructor.")
    ->group(function () {
        Route::get('/', 'index')->name("index");
    });

    Route::controller(SubjectController::class)
    ->prefix("subject")
    ->name("subject.")
    ->group(function () {
        Route::get('/', 'index')->name("index");
        Route::post('/store', 'store')->name('store');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
