<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginForm;
use App\Models\Administrator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException; // Ajout

class AuthController extends Controller
{
    public function login()
    {
        // Administrator::create([
        //     'name' => 'Admin',
        //     'email' => 'admin@authentica.cm',
        //     'password' => 'Admin_authentica777'
        // ]);
        return inertia('Auth/Login');
    }

    public function doLogin(LoginForm $request)
    {
        // 1. Définition du Guard
        $guard = Auth::guard('admin'); // <-- Utilisez le guard 'admin'

        // 2. Récupération des données validées
        $credentials = $request->only('email', 'password');

        // 3. Tentative de connexion de l'administrateur
        if ($guard->attempt($credentials)) { // Utilisez $guard->attempt() au lieu de Auth::attempt()
            // La connexion a réussi.

            $request->session()->regenerate();

            // Redirection vers le tableau de bord administrateur (ou /)
            return redirect()->route('dashboard');
        }

        // 4. La connexion a échoué (Email ou mot de passe incorrect)
        throw ValidationException::withMessages([ // Meilleure pratique pour les erreurs de connexion
            'password' => 'Email ou mot de passe incorrect.',
        ]);
    }

    public function logout(Request $request)
    {

        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('auth.login')->with('success', 'Déconnexion réussie !');
    }
}
