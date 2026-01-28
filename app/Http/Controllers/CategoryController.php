<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryFormRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;



class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $categories = Category::with('parent')->orderBy('name')->get(); // en ordre alphabétique
        //  dd($categories);
        return inertia('Categories/Index', ['categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return inertia('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(CategoryFormRequest $request)
    {
        // 1. Validation des données
        $validatedData = $request->validated();

        // 2. Création de l'instance de la catégorie
        $category = new Category;
        $category->name = $validatedData['name'];
        $category->parent_id = $validatedData['parent_id'];
        $category->slug = $validatedData['slug'];
        $category->description = $validatedData['description'];

        // 3. Gestion de l'upload de l'image
        if ($request->hasFile('image')) {
            // Définir le chemin de destination à l'intérieur du disque 'public'
            $destinationPath = 'assets/images/categories';

            // Obtenir l'objet fichier
            $file = $request->file('image');

            // Générer un nom de fichier unique pour éviter les conflits
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();

            // Enregistrer l'image dans le chemin spécifié, sur le disque 'public'.
            // `storeAs` déplace le fichier temporaire et retourne le chemin complet du fichier stocké.
            // Le disque 'public' est configuré dans `config/filesystems.php`.
            Storage::disk('public')->putFileAs($destinationPath, $file, $filename);

            // 4. Insérer uniquement le nom du fichier dans la base de données
            // Ce nom de fichier est le seul élément nécessaire pour reconstruire l'URL.
            $category->image = $filename;
        }

        // 5. Sauvegarde de la catégorie en base de données
        $category->save();

        // 6. Redirection vers la page précédente avec un message de succès
        return redirect()->back()->with('success', 'Catégorie ajoutée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryFormRequest $request, Category $category)
    {
        $data = $request->validated();
        $category->update($data);
        //dd($data);

        return redirect()->back()->with('success', 'Catégorie modifiée avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //supprimer l'image du produit dans le storage
        Storage::disk('public')->delete('assets/images/categories/' . $category->image);


        // 2. Supprimer le produit de la base de données
        $category->delete();

        // 3. Rediriger l'utilisateur
        return redirect()->back()->with('success', 'Catégorie supprimé avec succès, y compris son image.');
    }

    public function UpdateCategoryImage(Category $category, Request $request)
    {

        $image = $category->image;
        /** 1- uploader la nouvelle image */

        $data = $request->validate([
            'image' => ['required', 'image']
        ]);

        // Gestion du téléchargement de l'image
        if ($request->hasFile('image')) {
            // Définir le chemin de destination pour le stockage
            $folder = 'assets/images/categories';

            // Stocke le fichier et récupère le nom généré
            $imageName = $request->file('image')->store($folder, 'public');

            // Extraire uniquement le nom du fichier du chemin complet
            $fileName = Str::afterLast($imageName, '/');

            // Assigner le nom du fichier aux données pour la base de données
            $data['image'] = $fileName;
        }

        /* 2. Supprimer l'ancienne image */
        // supprimer l'image de la categorie dans le storage
        Storage::disk('public')->delete('assets/images/categories/' . $image);
        /** 3. Mettre a jour l'image de la categorie */

        $category->update([
            'image' => $data['image']
        ]);

        return redirect()->back()->with('success', 'L\'image de la catégorie a été modifiée avec success');
    }
    public function updateIsActive(Request $request, Category  $category)
    {
        $request->validate([
            'is_active' => 'required|boolean',
        ]);

        $category->is_active = $request->input('is_active');
        $category->save();
    }
}
