<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class CategoryFormRequest extends FormRequest
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
        // Détecte la méthode de la requête pour différencier création et modification
        $method = $this->method();
        $category = $this->route('category'); // Récupère l'instance de la catégorie si elle existe

        $rules = [
            'parent_id' => ['nullable', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
        ];

        // Règle pour l'image : requise pour la création, ignorée pour la modification
        if ($method === 'POST') {
            $rules['image'] = ['required', 'file', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'];
        } else {
            $rules['image'] = ['nullable'];
        }

        // Règles uniques pour le nom et le slug, ignorées pour la modification
        if ($method === 'PUT' || $method === 'PATCH') {
            $rules['name'][] = Rule::unique('categories', 'name')->ignore($category->id);
            $rules['slug'] = ['nullable', Rule::unique('categories', 'slug')->ignore($category->id)];
        } else {
            $rules['name'][] = 'unique:categories,name';
            $rules['slug'] = ['required', 'unique:categories,slug'];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'parent_id.exists' => 'La catégorie parente n\'existe pas.',
            'name.required' => 'Le nom de la catégorie est requis.',
            'name.unique' => 'Le nom de la catégorie doit être unique.',
            'description.required' => 'La description de la catégorie est requise.',
            'slug.required' => 'Le slug de la catégorie est requis.',
            'slug.unique' => 'Le slug de la catégorie doit être unique.',
            'image.required' => 'L\'image de la catégorie est requise.',
            'image.file' => 'Le fichier doit être une image.',
            'image.mimes' => 'Le format de l\'image n\'est pas supporté (jpeg, png, jpg, gif, svg, webp).',
            'image.max' => 'La taille de l\'image ne doit pas dépasser 2MB.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Génère le slug à partir du nom de la catégorie
        $this->merge([
            'slug' => Str::slug($this->input('name'))
        ]);
    }
}
 //fusionner (merger) les noms des categorie pour creer un slug
    /*  public function prepareForValidation()
    {
        $this->merge([
            'slug' => str_replace(' ', '-', $this->name),
        ]);
    }
        */