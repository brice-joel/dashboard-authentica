<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PromotionFormRequest extends FormRequest
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
        // Récupérer la date de fin pour la validation de la date de début
        $finishedAt = $this->input('finished_at');

        return [
            // categories_ids doit être un tableau
            'categories_ids' => ['required', 'array'],

            // Chaque élément du tableau doit être un ID existant dans la table 'categories'
            'categories_ids.*' => ['required', 'integer', 'exists:categories,id'],

            'percentage' => ['required', 'numeric', 'min:1', 'max:99'],
            'description' => ['required'],
            'started_at' => ['required', 'date', 'after_or_equal:now', 'before_or_equal:' . $finishedAt],
            'finished_at' => ['required', 'date', 'after_or_equal:now', 'after:started_at'],
        ];
    }

    public function messages(): array
    {
        return [
            'categories_ids.required' => 'Au moins une catégorie est obligatoire pour la promotion.',
            'categories_ids.array' => 'Les catégories sélectionnées doivent être un tableau valide.',
            // Message d'erreur pour les IDs individuels dans le tableau
            'categories_ids.*.required' => 'L\'un des identifiants de catégorie est manquant.',
            'categories_ids.*.integer' => 'L\'un des identifiants de catégorie doit être un nombre entier.',
            'categories_ids.*.exists' => 'L\'une des catégories sélectionnées n\'existe pas dans la base de données.',

            'percentage.required' => 'Le pourcentage de la promotion est obligatoire.',
            'percentage.numeric' => 'Le pourcentage doit être un nombre.',
            'percentage.min' => 'Le pourcentage doit être au moins de 1%.',
            'percentage.max' => 'Le pourcentage ne peut excéder 99%.',

            'description.required' => 'La description de la promotion est obligatoire.',

            'started_at.required' => 'La date et heure de début sont obligatoires.',
            'started_at.date' => 'La date de début n\'est pas un format de date valide.',
            'started_at.after_or_equal' => 'La date de début ne peut pas être antérieure à maintenant.',
            'started_at.before_or_equal' => 'La date de début ne peut pas être après la date de fin.',

            'finished_at.required' => 'La date et heure de fin sont obligatoires.',
            'finished_at.date' => 'La date de fin n\'est pas un format de date valide.',
            'finished_at.after' => 'La date de fin doit être postérieure à la date de début.',
        ];
    }
}
