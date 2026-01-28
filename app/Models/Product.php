<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable =  ['product_ref', 'category_id', 'name', 'slug', 'description', 'price', 'stock', 'brand', 'image', 'rating', 'is_active'];


    //un produit peut etre contenu dans une categorie
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // un produit peut etre contenue dans zero ou plusieurs paniers
    public function carts()
    {
        return $this->belongsToMany(Cart::class, 'carts_products'); //->withPivot('quantity');
    }
    // un produit peut avoir zero ou plusieurs images
    public function images()
    {
        return $this->hasMany(ProductImages::class);
    }

    // un produit peut etre associé à plusieurs commandes 
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'orders_products')->withPivot('quantity_purchased', 'price_purchased', 'name_purchased')
            ->withTimestamps();
    }

    //un produit est associe a 0 ou plusieurs commentaires
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * The users that have favorited this product.
     */
    public function favoritedBy()
    {
        // un produit peut et peut être favoris de plusieurs utilisateurs
        // la table favorites est une table pivot entre les tables users et products
        // Les arguments sont similaires mais inversés par rapport au modèle User
        return $this->belongsToMany(User::class, 'favorites_users_products', 'product_id', 'user_id')
            ->withTimestamps();
    }

    //récupération de l'URL de maniere dynamique
    public function getImageUrlAttribute()
    {
        return asset('assets/images/products/' . $this->image);
    }
}
