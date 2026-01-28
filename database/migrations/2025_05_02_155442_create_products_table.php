<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->references('id')->on('categories')->onDelete('set null');
            $table->string('name'); // Nom du produit
            $table->string('slug')->unique(); // URL conviviale du produit (pour le SEO)
            $table->string('product_ref')->unique(); // reference du produit
            $table->text('description')->nullable(); // Description détaillée du produit
            $table->decimal('price', 10, 2); // Prix du produit (10 chiffres au total, 2 après la virgule)
            $table->integer('stock')->default(0); // Quantité en stock
            $table->string('brand')->nullable(); // marque du produit
            $table->string('image')->nullable(); // Chemin vers l'image du produit
            $table->double('rating')->default(4.0);
            $table->boolean('is_active')->default(true); // Indique si le produit est actif et visible
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
