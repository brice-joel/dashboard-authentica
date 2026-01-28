<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name =  $this->faker->sentence(3);
        $slug = Str::slug($name); // Crée un slug à partir du nom

        return [
            'category_id' => Category::factory(),
            'name' => $name, // Génère une phrase de 3 mots pour le nom
            'slug' => $slug,
            'product_ref' => $this->faker->ean13,
            'description' => $this->faker->paragraph(5), // Génère un paragraphe de 5 phrases pour la description
            'price' => $this->faker->randomFloat(2, 10, 500),            // Génère un prix entre 10 et 500 avec 2 décimales
            'stock' => $this->faker->numberBetween(0, 100), // Génère un nombre entier pour le stock entre 0 et 100,
            'brand' => $this->faker->text(8),
            'image' => "default_image.svg", //$this->faker->imageUrl(640, 480, 'products', true), // Génère une URL d'image aléatoire
            'is_active' => $this->faker->boolean(80), // Génère un booléen (80% de chances d'être true)
            'rating' => $this->faker->randomFloat(1, 0, 5), // Génère un nombre de likes entre 0 et 5
        ];
    }
}
