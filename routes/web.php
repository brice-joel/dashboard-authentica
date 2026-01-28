<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PickupPointController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class, 'dashboard'])->middleware('auth.admin:admin')->name('dashboard');

Route::prefix('auth')->controller(AuthController::class)->name('auth.')->group(function () {
    Route::get('/login',  'login')->name('login')->middleware('logout.auth:admin');
    Route::post('/dologin',  'doLogin')->name('dologin')->middleware('logout.auth:admin');
    Route::post('/logout',  'logout')->name('logout')->middleware('auth.admin:admin');
});

Route::prefix('users')->controller(UserController::class)->middleware('auth.admin:admin')->name('user.')->group(function () {
    Route::get('/',   'index')->name('index');
});

Route::prefix('products')->controller(ProductController::class)->middleware('auth.admin:admin')->name('product.')->group(function () {
    Route::get('/',   'index')->name('index');
    Route::get('/create',   'create')->name('create');
    Route::get('/{product}/edit',   'edit')->name('edit');
    Route::post('/store',   'store')->name('store');
    Route::put('/{product}/update',   'update')->name('update');
    Route::delete('/{product}/destroy',   'destroy')->name('destroy');
    Route::patch('/{product}/update/is_active',   'updateIsActive')->name('update.is_active');

    Route::post('/{product}/image/store', 'storeImage')->name('image.store');
    Route::delete('/{id}/image/destroy',   'destroyImage')->name('image.destroy');
    Route::post('/{product}/update/product-image',   'UpdateProductImage')->name('product-image.update');
});

Route::prefix('orders')->controller(OrderController::class)->middleware('auth.admin:admin')->name('order.')->group(function () {
    Route::get('/',   'index')->name('index');
    Route::put('/{id}/{type}/update',   'update')->name('update');
});
Route::prefix('payments')->controller(PaymentController::class)->middleware('auth.admin:admin')->name('payment.')->group(function () {
    Route::get('/',   'index')->name('index');
});
Route::prefix('categories')->controller(CategoryController::class)->middleware('auth.admin:admin')->name('category.')->group(function () {
    Route::get('/',   'index')->name('index');
    Route::get('/create',   'create')->name('create');
    Route::put('/{category}/update',   'update')->name('update');
    Route::post('/store', 'store')->name('store');
    Route::delete('/{category}/destroy',   'destroy')->name('destroy');

    Route::patch('/{category}/update/is_active',   'updateIsActive')->name('update.is_active');
    Route::post('/{category}/update/category-image',   'UpdateCategoryImage')->name('category-image.update');
});

Route::prefix('promotions')->controller(PromotionController::class)->middleware('auth.admin:admin')->name('promotion.')->group(function () {
    Route::post('/store',   'store')->name('store');
    Route::delete('/{promotion}/destroy',   'destroy')->name('destroy');
    Route::get('/',   'index')->name('index');
});

Route::prefix('pickup-points')->controller(PickupPointController::class)->middleware('auth.admin:admin')->name('pickup-point.')->group(function () {
    Route::get('/',   'index')->name('index');
    Route::post('/store',   'store')->name('store');
    Route::put('/{id}/update',   'update')->name('update');
    Route::delete('/{pickup_point}/destroy',   'destroy')->name('destroy');
});
