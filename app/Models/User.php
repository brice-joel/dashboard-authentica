<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /* un utilisateur peut avoir zero ou un seul panier */
    public function cart()
    {
        return $this->hasOne(Cart::class);
    }

    /* un utilisateur peut avoir zero ou plusieurs commandes */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    // un utilisateur peut avoir zero ou plusieurs commentaires
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * The products that belong to the user's favorites.
     */
    public function favorites()
    // un utilisateur peut avoir zero ou plusieurs produits en favoris
    // la table favorite est la table pivot entre les tables products et users

    {
        // Le premier argument est le modèle lié (Product)
        // Le deuxième argument est le nom de la table pivot (product_user)
        // Le troisième argument est la clé étrangère de ce modèle (user_id) dans la table pivot
        // Le quatrième argument est la clé étrangère du modèle lié (product_id) dans la table pivot
        return $this->belongsToMany(Product::class, 'favorites_users_products', 'user_id', 'product_id')
            ->withTimestamps(); // Pour que created_at et updated_at soient gérés automatiquement sur la table pivot
    }


    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
