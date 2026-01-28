<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Promotion extends Model
{
    // 

    protected $fillable = ['reference', 'percentage', 'description', 'started_at', 'finished_at'];

    /**
     * Une Promotion peut concerner plusieurs Catégories.
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
        // Laravel déduit automatiquement la table pivot 'category_promotion'
    }
}
