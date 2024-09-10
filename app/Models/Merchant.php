<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use App\Services\Global\UploadService;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Merchant extends Authenticatable
{
    use HasFactory,  Notifiable, HasApiTokens, HasRoles, InteractsWithSockets;

    protected string $guard_name = 'sanctum';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'avatar',
        'address',
        'password',
        'id_number',
        'gender',
        'is_active',
        'birth_date',
        'last_login',
    ];

    protected $hidden = ['password', 'remember_token'];

     /*
    |--------------------------------------------------------------------------
    | Casts && Set Custom Attributes
    |--------------------------------------------------------------------------
    */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'last_login' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function avatar(): Attribute
    {
        return Attribute::make(get: static fn($value) => UploadService::url($value));
    }

    protected function password(): Attribute
    {
        return Attribute::make(set: static fn($value) => bcrypt($value));
    }
}