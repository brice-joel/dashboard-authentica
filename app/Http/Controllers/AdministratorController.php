<?php

namespace App\Http\Controllers;

use App\Models\Administrator;
use Illuminate\Http\Request;

class AdministratorController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:administrators',
            'password' => 'required|string|min:8|confirmed',
        ]);

        Administrator::create([
            'name' => 'Brice TAKETSA', // $request->name,
            'email' => 'joeltaketsa2@gmail.com', //$request->email,
            'password' => '1234' // $request->password, // Sera haché automatiquement grâce au casting dans le modèle
        ]);

        return redirect()->back()->with('success', 'Nouvel administrateur créé.');
    }
}
