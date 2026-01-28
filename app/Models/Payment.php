<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Payment extends Model
{
    //
    use HasFactory;

    //fillable
    protected $fillable = [
        'order_id',
        'payment_ref',
        'payment_method',
        'payment_status',
        'payment_amount'
    ];

    // un paiement est associé a une seule commande
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
