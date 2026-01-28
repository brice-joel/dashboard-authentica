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
        Schema::create('promotions', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->string('reference')->unique();
            $table->integer('percentage'); // pourcentage de la promotion
            $table->text('description');
            $table->timestamp('started_at'); // date et heure de début 
            $table->timestamp('finished_at')->nullable(); // date et heure de fin                      
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};
