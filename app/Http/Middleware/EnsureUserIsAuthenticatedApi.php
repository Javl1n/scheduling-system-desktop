<?php

namespace App\Http\Middleware;

use Closure;
use Http;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAuthenticatedApi
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Http::auth()->get('user')->unauthorized()) {
            session()->put("api_token", "");   
            return redirect('login');
        }

        return $next($request);
    }
}
