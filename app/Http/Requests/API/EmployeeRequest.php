<?php

namespace App\Http\Requests\API;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'name'     => 'required|string|max:255',
            'email'     => 'required|email',
            'password'  => 'required',
            'avatar' => 'sometimes|nullable|' . v_image(),
        ];
    }
}