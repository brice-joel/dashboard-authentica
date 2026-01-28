<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class LogoutIfAuthPage
{
    /**
     * Gère une requête entrante.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string|null  $guard Le guard à vérifier (doit être 'admin' dans votre cas).
     */
    public function handle(Request $request, Closure $next, string $guard = 'admin'): Response
    {
        if (Auth::guard('admin')->check()) {
            Auth::guard('admin')->logout();
        }
        // // Vérifie si l'utilisateur est actuellement connecté via le guard spécifié
        // if (Auth::guard($guard)->check()) {

        //     // 1. Déconnexion explicite de l'utilisateur
        //     Auth::guard($guard)->logout();

        //     // 2. Invalidation de la session et régénération du token (pour la sécurité)
        //     $request->session()->invalidate();
        //     $request->session()->regenerateToken();

        //     // 3. Redirection vers la même route ('auth.login') après la déconnexion forcée.
        //     // Ceci garantit un état de "déconnecté" propre avant le rendu de la page.
        //     // Utiliser 'route()' ou un chemin direct dépend de la configuration.
        //     return redirect()->route('auth.login');
        // }

        // Si l'utilisateur n'est pas connecté, continuer vers la page de connexion
        return $next($request);
    }
}
