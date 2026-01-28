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
        Schema::create('category_promotion', function (Blueprint $table) {
            // $table->id();
            $table->foreignId('promotion_id')->references('id')->on('promotions')->onDelete('cascade');
            $table->foreignId('category_id')->references('id')->on('categories')->onDelete('cascade');
            /*
                // Clés étrangères vers les deux tables
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('promotion_id')->constrained()->onDelete('cascade');

            // Définir la paire des deux clés comme clé primaire composite,
            // pour garantir l'unicité des liaisons (une catégorie n'est liée qu'une fois à une promotion)
            */
            $table->primary(['category_id', 'promotion_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_promotion');
    }
};
