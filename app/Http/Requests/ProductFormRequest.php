<?php

namespace App\Http\Requests;

use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ProductFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'price' => ['required', 'numeric', 'min:100'],
            'description' => ['required', 'string'],
            'stock' => ['required', 'integer', 'min:1'],
            'brand' => ['required', 'string', 'max:255'],
        ];

        // Règle pour l'image : requise pour la création, ignorée pour la modification
        if ($this->method() === 'POST') {
            $rules['image'] = ['required', 'file', 'mimes:jpg,png,jpeg,webp'];
            $rules['slug'] = ['required', 'string', 'max:255', 'unique:products,slug'];
            $rules['product_ref'] = ['required', 'string', 'max:255', 'unique:products,product_ref'];
        } else {
            // Pour la modification, l'image et la référence sont ignorées
            $product = $this->route('product');
            $rules['image'] = ['nullable']; // L'image n'est pas requise
            $rules['slug'] = ['required', 'string', 'max:255', Rule::unique('products', 'slug')->ignore($product->id)];
            // On retire la règle 'required' pour product_ref afin qu'il soit ignoré
            // mais on garde la règle unique pour éviter une erreur si l'input est passé
            $rules['product_ref'] = [Rule::unique('products', 'product_ref')->ignore($product->id)];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Le nom du produit est requis.',
            'slug.required' => 'Le slug du produit est requis.',
            'slug.unique' => 'Le slug du produit doit être unique (ce produit existe déjà).',
            'product_ref.required' => 'La référence du produit est requise.',
            'product_ref.unique' => 'La référence du produit doit être unique.',
            'category_id.exists' => 'Cette catégorie n\'existe pas.',
            'price.required' => 'Le prix du produit est requis.',
            'description.required' => 'La description du produit est requise.',
            'stock.required' => 'Le stock est requis.',
            'brand.required' => 'La marque est requise.',
            'image.required' => 'L\'image est requise.',
            'image.file' => 'L\'image doit être un fichier.',
            'image.mimes' => 'L\'image doit être au format JPG, PNG, JPEG, WEBP.',
        ];
    }

    /**
     * Generate a unique product reference based on the provided logic.
     */
    private function generateProductRef(string $name): string
    {
        $words = explode(' ', $name);
        $prefix = '';

        // Partie 1: 3 premières lettres du premier mot
        if (isset($words[0])) {
            $prefix .= strtoupper(substr($words[0], 0, 3));
        }

        // Partie 2: 2 premières lettres du deuxième mot, si il existe
        if (isset($words[1])) {
            $prefix .= '-' . strtoupper(substr($words[1], 0, 2));
        }

        // Partie 3: Identifiant unique (3 lettres + 2 chiffres)
        $randomLetters = strtoupper(Str::random(3));
        $randomNumbers = Str::random(2, '0123456789');
        $uniqueId = $randomLetters . $randomNumbers;

        return $prefix . '-' . $uniqueId;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Génère une nouvelle référence de produit UNIQUEMENT lors de la création
        if ($this->method() === 'POST') {
            $productRef = $this->generateProductRef($this->input('name'));
            $this->merge([
                'product_ref' => $productRef
            ]);
        }
        // Sinon, le champ `product_ref` est déjà dans la requête et ne sera pas touché
    }
}
