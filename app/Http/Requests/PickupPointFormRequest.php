<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PickupPointFormRequest extends FormRequest
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
        return [
            //
            'region' => ['required'],
            'city' => ['required'],
            'address' => ['required'],
        ];
    }

    public function messages()
    {
        return [
            'region.required' => 'Région est obligatoire',
            'city.required' => 'Ville est obligatoire',
            'address.required' => 'L\'Adresse est obligatoire',
        ];
    }
}
