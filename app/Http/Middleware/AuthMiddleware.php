<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthMiddleware
{
    /**
     * Gère une requête entrante.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string|null  ...$guards Le ou les guards à vérifier (ex: 'admin', 'web')
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        // Si aucun guard n'est spécifié, utiliser le guard par défaut ('web' ou celui de 'Auth')
        $guards = empty($guards) ? [null] : $guards;
        $isAuthenticated = false;

        // 1. Boucle à travers tous les guards spécifiés
        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                $isAuthenticated = true;
                break; // Un seul guard suffit pour authentifier l'utilisateur
            }
        }

        // 2. Vérification de l'authentification
        if (! $isAuthenticated) {
            // Si l'utilisateur n'est PAS connecté via AUCUN des guards

            // Définir la route de redirection
            // Utilisez 'auth.login' comme vous l'avez spécifié,
            // ou bien la route de connexion spécifique à l'admin si elle est différente.
            $loginRoute = 'auth.login';

            // 3. Vérification pour les requêtes AJAX (API)
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Non authentifié.'], 401);
            }

            // 4. Redirection pour les requêtes Web classiques
            return redirect()->route($loginRoute)->with('error', 'Veuillez vous connecter pour accéder à cette page.');
        }

        // Si l'utilisateur est connecté via un des guards, continuez
        return $next($request);
    }
}
