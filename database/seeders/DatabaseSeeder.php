<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\PickupPoint;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        User::factory()->create([
            'name' => 'Brice Taketsa',
            'phone' => '696031156',
            'email' => 'joeltaketsa2@gmail.com',
            'password' => Hash::make('12345678'),
        ]);
        User::factory()->create([
            'name' => 'Ananfack Joel',
            'phone' => '680861872',
            'email' => 'joel@gmail.com',
            'password' => Hash::make('12345678'),
        ]);

        Category::create([
            'name' => 'ELECTRONIQUE',
            'slug' => 'electronique',
            'is_active' => true,
            'image' => 'electronique.jpg',
            'description' => 'Electronique',
        ]);
        Category::create([
            'name' => 'MAISON ET JARDIN',
            'slug' => 'maison-et-jardin',
            'is_active' => true,
            'image' => 'mode_et_jardin.jpg',
            'description' => 'Mode et jardin',
        ]);
        Category::create([
            'name' => 'ELECTROMENAGER',
            'slug' => 'telephonie',
            'is_active' => true,
            'image' => 'telephonie.jpg',
            'description' => 'Telephonie',
        ]);
        Category::create([
            'name' => 'BEAUTE ET SOINS PERSONNELS',
            'slug' => ' beaute-et-soins-personnels',
            'is_active' => true,
            'image' => 'beaute_et_soins_personnels.jpg',
            'description' => 'Beaute et soins personnels',
        ]);
        Category::create([
            'name' => 'SANTE ET BIEN-ETRE',
            'slug' => 'sante-et-bien-etre',
            'is_active' => true,
            'image' => 'sante_et_bien_etre.jpg',
            'description' => 'Sante et bien etre',
        ]);
        Category::create([
            'name' => 'MODE ET HABILLEMENT',
            'slug' => 'mode-et-habillement',
            'is_active' => true,
            'image' => 'mode_et_habillement.jpg',
            'description' => 'Mode et habillement',
        ]);

        Product::create([
            'category_id' => 1, //dynamique
            'name' => 'Ordinateur Portable Ultra Slim Pro 15',
            'slug' => 'Ordinateur-Portable-Ultra-Slim-Pro-15',
            'product_ref' => '123456789',
            'description' => 'Ordinateur Portable Ultra Slim Pro 15',
            'price' => 850000,
            'stock' => 20,
            'brand' => 'MACBOOK PRO',
            'image' => "laptop_gaming.jpeg",
            'is_active' => true,
            'rating' => 4.5,

        ]);
        Product::create([
            'category_id' => 1,
            'name' => "Smartphone Android X Pro Max 256GB",
            'image' => "smarthphone_android_x_pro_max.jpg",
            'price' => 450000,
            'product_ref' => '1234567898',
            'slug' => 'Smartphone-Android-X-Pro-Max-256GB',
            'description' => 'Smartphone Android X Pro Max 256GB',
            'stock' => 18,
            'brand' => 'HUAWEI',
            'is_active' => true,
            'rating' => 4.0,

        ]);
        Product::create([
            'category_id' => 2,
            'name' => 'Casque Audio Bluetooth Pro Silence',
            'slug' => 'Casque-Audio-Bluetooth-Pro-Silence',
            'description' => 'Casque Audio Bluetooth Pro Silence',
            'price' => 75000,
            'product_ref' => '123456789-sas',
            'stock' => 30,
            'brand' => 'ORAIMO',
            'image' =>  "casque_oraimo.jpeg",
            'is_active' => true,
            'rating' => 5.0,

        ]);
        Product::create([
            'category_id' => 2,
            'name' => 'Smartwatch Sport GPS Edition',
            'slug' => 'Smartwatch-Sport-GPS-Edition',
            'description' => 'Smartwatch Sport GPS Edition',
            'price' => 120000,
            'product_ref' => '123456789-basd',
            'stock' => 5,
            'brand' => 'APPLE',
            'image' => "dark-black-gps-smartwatch.jpg",
            'is_active' => true,
            'rating' => 4.2,

        ]);
        Product::create([
            'category_id' => 3,
            'name' => 'Clavier Mécanique RGB Gamer',
            'slug' => 'Clavier-Mécanique-RGB-Gamer',
            'description' => 'Clavier-Mécanique-RGB-Gamer',
            'price' => 90000,
            'product_ref' => '1234567wq9-sas',
            'stock' => 10,
            'brand' => 'DELL',
            'image' =>  "clavier-mecanique-led-rgb-xpert-k700-ref-cla-xk700.jpg",
            'is_active' => true,
            'rating' => 4.7,

        ]);
        Product::create([
            'category_id' => 4,
            'name' => 'Souris Gaming Haute Précision',
            'slug' => 'Souris-Gaming-Haute-Précision',
            'description' => 'Souris Gaming Haute Précision',
            'price' => 35000,
            'product_ref' => '1234asd67wq9-sas',
            'stock' => 0,
            'brand' => 'ASUS',
            'image' =>  "souris_gaming_haute_precision.jpeg",
            'is_active' => false,
            'rating' => 3.5,

        ]);

        $categories = Category::factory(10)->create(); // CREATION DE 5 CATEGORIES
        $categories->each(function ($category) {
            Product::factory(10)->create(['category_id' => $category->id]); //create 10 products for each category
        });

        PickupPoint::create(
            [
                'region' => 'Centre',
                'address' => '123 Rue de la Paix, ',
                'city' => 'Yaoundé',
            ],
            [
                'region' => 'Centre',
                'address' => '456 Rue de la Libération,',
                'city' => 'Mbalmayo',
            ],
            [
                'region' => 'Littoral',
                'address' => '789 Rue de la Paix',
                'city' => 'Douala',
            ],
            [
                'region' => 'Littoral',
                'address' => '101 Rue de la Libération, ',
                'city' => 'Edea',
            ]
        );


        /*
       
        */
    }
}
