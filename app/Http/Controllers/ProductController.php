<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductFormRequest;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductImages;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

use function PHPSTORM_META\map;

class ProductController extends Controller
{
    //
    public function index()
    {
        $products = Product::with(['images', 'category'])->orderBy('name')->get();
        $categories = Category::orderBy('name')->get();
        //   dd($products);
        return inertia(
            'Products/Index',
            [
                'products' => $products,
                'categories' => $categories
            ]
        );
    }

    public function create()
    {
        $categories = Category::orderby('name')->get();
        return inertia('Products/Create', ['categories' => $categories]);
    }

    public function edit(Product $product)
    {
        return inertia('Products/Edit', ['product' => $product]);
    }

    public function store(ProductFormRequest $request)
    {
        // La validation est gérée par ProductFormRequest
        $data = $request->validated();

        // Gestion du téléchargement de l'image
        if ($request->hasFile('image')) {
            // Définir le chemin de destination pour le stockage
            $folder = 'assets/images/products';

            // Stocke le fichier et récupère le nom généré
            $imageName = $request->file('image')->store($folder, 'public');

            // Extraire uniquement le nom du fichier du chemin complet
            $fileName = Str::afterLast($imageName, '/');

            // Assigner le nom du fichier aux données pour la base de données
            $data['image'] = $fileName;
        }

        // Crée le nouveau produit avec les données validées
        Product::create($data);

        // Redirige l'utilisateur
        return redirect()->back()->with('success', 'Produit ajouté avec succès.');
    }

    function update(ProductFormRequest $request, Product $product)
    {

        $data = $request->validated();

        if ($request->hasFile('image')) {
            $folder = 'assets/images/products';
            $imageName = $request->file('image')->store($folder, 'public');
            $fileName = Str::afterLast($imageName, '/');
            $data['image'] = $fileName;
        }

        $product->update($data);
        //dd($data);

        return redirect()->back()->with('success', 'Produit modifié avec succès.');
    }

    public function storeImage(Product $product, Request $request)
    {

        $data = $request->validate([
            'image' => ['required', 'image']
        ]);

        // Gestion du téléchargement de l'image
        if ($request->hasFile('image')) {
            // Définir le chemin de destination pour le stockage
            $folder = 'assets/images/products/images';

            // Stocke le fichier et récupère le nom généré
            $imageName = $request->file('image')->store($folder, 'public');

            // Extraire uniquement le nom du fichier du chemin complet
            $fileName = Str::afterLast($imageName, '/');

            // Assigner le nom du fichier aux données pour la base de données
            $data['image'] = $fileName;
        }

        //ajouter l'image à ce produit
        $product->images()->create([
            'url' => $data['image']
        ]);

        return redirect()->back()->with('success', 'Image ajouté avec succès');
    }


    public function destroy(Product $product)
    {
        //supprimer toute les images associées au produit ainsi que le produit lui même
        $product_images = $product->images;

        ($product_images->each(function ($image) {
            //suppression des images dans le storage
            Storage::disk('public')->delete('assets/images/products/images/' . $image->url);
            //suppression de l'image du produit de la BD
            $image->delete();
        }));

        //suppression de l'image du produit
        Storage::disk('public')->delete('assets/images/products/' . $product->image);


        // 2. Suppression du produit
        $product->delete();

        // 3. Rediriger l'utilisateur
        return redirect()->back()->with('success', 'Produit supprimé avec succès, y compris ses images.');
    }
    public function destroyImage($id)
    {
        $image = ProductImages::findOrFail($id);
        $imageName = $image->url;
        $image->delete();
        Storage::disk('public')->delete('assets/images/products/images/' . $imageName);
        return redirect()->back()->with('success', 'L\'image a été supprimé avec success');
    }

    public function UpdateProductImage(Product $product, Request $request)
    {

        $image = $product->image;
        /** 1- uploader la nouvelle image */

        $data = $request->validate([
            'image' => ['required', 'image']
        ]);

        // Gestion du téléchargement de l'image
        if ($request->hasFile('image')) {
            // Définir le chemin de destination pour le stockage
            $folder = 'assets/images/products';

            // Stocke le fichier et récupère le nom généré
            $imageName = $request->file('image')->store($folder, 'public');

            // Extraire uniquement le nom du fichier du chemin complet
            $fileName = Str::afterLast($imageName, '/');

            // Assigner le nom du fichier aux données pour la base de données
            $data['image'] = $fileName;
        }

        /* 2. Supprimer l'ancienne image */
        // supprimer l'image du produit dans le storage
        Storage::disk('public')->delete('assets/images/products/' . $image);
        /** 3. Mettre a jour l'image du produit */

        $product->update([
            'image' => $data['image']
        ]);

        return redirect()->back()->with('success', 'L\'image du produit a été modifié avec success');
    }

    public function updateIsActive(Request $request, Product $product)
    {
        $request->validate([
            'is_active' => 'required|boolean',
        ]);

        $product->is_active = $request->input('is_active');
        $product->save();
    }
}
