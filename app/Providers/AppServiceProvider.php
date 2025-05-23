<?php

namespace App\Providers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Http::macro('server', function () {
            return Http::withHeaders([
                "Content-Type" => 'application/json',
                "Accept" => 'application/json'
            ])->baseUrl('http://scheduling-web.test/api');
        });

        Http::macro('auth', function () {   
            return Http::server()->withToken(session('api_token'));
        });
    }
}
