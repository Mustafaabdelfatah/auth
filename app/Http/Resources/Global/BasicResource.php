<?php

namespace App\Http\Resources\Global;

use Illuminate\Http\Resources\Json\JsonResource;

class BasicResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'children' => $this->whenLoaded('children', fn() => BasicUserResource::collection($this->children), []),
        ];
    }
}
