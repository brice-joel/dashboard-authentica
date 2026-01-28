<?php

namespace App\Http\Controllers;

use App\Http\Requests\PromotionFormRequest;
use App\Models\Category;
use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    //
    public function index()
    {
        $promotions = Promotion::with('categories')->orderBy('finished_at', 'asc')->get();
        // dd($promotions);
        return inertia('Promotions/Index', [
            'promotions' => $promotions,
            'categories' => Category::orderBy('name', 'asc')->get()
        ]);
    }
    public function store(PromotionFormRequest $request)
    {
        try {
            $data = $request->validated();
            $data['reference'] = $this->generateReference(5); //reference
            $categoriesIds = $data['categories_ids'];  // get all categories ids
            $promotion = Promotion::create($data); // create promotion       
            $promotion->categories()->attach($categoriesIds);  // Pour lier une promotion a  plusieurs categories.
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Une erreur s\'est produite lors de la création de la promotion');
        }
        return redirect()->back()->with('success', 'La promotion a été crée avec success');
    }
    public function destroy(Promotion $promotion)
    {
        $promotion->delete();
        return redirect()->back()->with('success', 'La promotion a ete supprimee avec success');
    }
    /**
     * Génère une référence unique composée de lettres majuscules et de chiffres.
     *
     * @param int $length La longueur souhaitée pour la référence.
     * @return string La référence unique générée.
     */
    public  function generateReference(int $length = 5): string
    {
        // Définir les caractères possibles (Lettres majuscules A-Z et chiffres 0-9)
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';

        // Générer une chaîne de caractères aléatoire de la longueur spécifiée
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }

        return $randomString;
    }
}
