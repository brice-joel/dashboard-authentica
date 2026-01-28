<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;
    protected $fillable = ['name', 'parent_id', 'slug', 'description', 'image'];

    // Relation avec une catégorie parente
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }
    //relation avec les sous catégories
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
    //une categorie a zero ou plusieurs produits
    public function products()
    {
        return $this->hasMany(Product::class);
    }
    // une categorie est associé a une et une seule promotion
    public function promotion()
    {
        return $this->belongsTo(Promotion::class);
    }
    /**
     * Une Catégorie peut avoir plusieurs Promotions.
     */
    public function promotions(): BelongsToMany
    {
        return $this->belongsToMany(Promotion::class);
        // Laravel déduit automatiquement la table pivot 'category_promotion'
    }
}
