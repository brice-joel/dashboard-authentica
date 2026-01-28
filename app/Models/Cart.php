<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    // /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    // un panier doit etre detenu par un et un seul utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    /* relation: un panier peut avoir zero ou plusieurs produits  */
    public function products()
    {
        return $this->belongsToMany(Product::class, 'carts_products'); //->withPivot('quantity');
    }
}
