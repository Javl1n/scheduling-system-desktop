<?php

use App\Http\Controllers\BlockController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\RoomController;
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

    // Route::get("");

    Route::controller(InstructorController::class)
    ->prefix("instructor")
    ->name("instructor.")
    ->group(function () {
        Route::get('/', 'index')->name("index");
        Route::get('/create', 'create')->name("create");
        Route::post('/store', 'store')->name("store");
    });

    Route::controller(SubjectController::class)
    ->prefix("subject")
    ->name("subject.")
    ->group(function () {
        Route::get('/', 'index')->name("index");
        Route::post('/store', 'store')->name('store');
    });

    Route::controller(RoomController::class)
    ->prefix("room")
    ->name("room.")
    ->group(function () {
        Route::get('/', 'index')->name("index");
        Route::post('/store', 'store')->name('store');
    });

    Route::controller(BlockController::class)
    ->prefix("block")
    ->name("block.")
    ->group(function () {
        Route::get('/', 'index')->name("index");
        Route::get('/create', 'create')->name("create");
        // Route::post('/store', 'store')->name('store');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
