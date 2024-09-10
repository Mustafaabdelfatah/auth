<?php

namespace App\Http\Resources\Global;

use Illuminate\Http\Resources\Json\JsonResource;

class BasicUserResource extends JsonResource
{
    public function toArray($request): array
    {

        return [
            'id' => $this->id,
            'name' => $this->name,
            'avatar' => $this->avatar,
            'phone' => $this->phone,
            'email' => $this->email,
        ];
    }
}
