<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $clientId = $this->route('client');

        return [
            'name' => 'sometimes|string|max:255',
            'company' => 'sometimes|string|max:255',
            'email' => "sometimes|email|unique:clients,email,{$clientId}",
            'phone' => 'nullable|string|max:20',
            'website' => 'nullable|url|max:255',
            'address' => 'nullable|string',
            'logo' => 'nullable|string',
            'notes' => 'nullable|string',
            'status' => 'sometimes|in:active,inactive,prospect',
        ];
    }
}
