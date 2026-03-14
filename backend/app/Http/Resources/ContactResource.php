<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'company' => $this->company,
            'phone' => $this->phone,
            'message_type' => $this->message_type,
            'message' => $this->message,
            'status' => $this->status,
            'ip_address' => $this->when(auth()->check(), $this->ip_address),
            'user_agent' => $this->when(auth()->check(), $this->user_agent),
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}
