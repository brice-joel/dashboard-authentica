<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;
    // une commande est associé a un seul utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    // une commande est associé à plusieurs paiements
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    // une commande est associé à plusieurs produits
    public function products()
    {
        return $this->belongsToMany(Product::class, 'orders_products')->withPivot('quantity_purchased', 'price_purchased', 'name_purchased')
            ->withTimestamps();;
    }

    //fillable
    protected $fillable = [
        'user_id',
        'order_ref',
        'client_name',
        'client_email',
        'client_phone',
        'client_country',
        'order_amount',
        'pickup_city',
        'pickup_address',
        'order_status',

    ];
}
