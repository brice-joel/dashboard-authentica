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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('order_id')->references('id')->on('orders')->onDelete('cascade');

            $table->string('payment_ref')->unique();
            $table->string('payment_method');
            $table->string('payment_operator');
            $table->string('payment_status')->default('PENDING'); // 'PENDING', 'PAID', 'UNPAID'
            $table->string('payment_amount');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
