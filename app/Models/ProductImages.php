<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImages extends Model
{
    //
    protected $fillable = ['url', 'product_id'];
    //une image appartient a un produit
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
