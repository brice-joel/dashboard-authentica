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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete('cascade');
            $table->string('order_ref')->unique();
            $table->string('client_name');
            $table->string('client_email');
            $table->string('client_phone');
            $table->string('client_country');
            $table->string('order_amount');

            $table->string('pickup_city');
            $table->string('pickup_address');
            $table->string('order_status')->default('PENDING'); //pending, delivered, cancelled
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
