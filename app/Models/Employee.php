<?php

namespace App\Models;

use App\Scopes\User\UserScopes;
use Laravel\Sanctum\HasApiTokens;
use App\Services\Global\UploadService;
use Spatie\Permission\Traits\HasRoles;
use App\Trait\Global\CreatedByObserver;
use Illuminate\Notifications\Notifiable;
use App\Enum\User\UserAttachmentTypeEnum;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Notifications\UserPasswordResetNotification;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Employee extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected string $guard_name = 'sanctum';


    protected $fillable = [
        'name',
        'email',
        'phone',
        'avatar',
        'password',
    ];

    protected $hidden = ['password'];

    /*
    |--------------------------------------------------------------------------
    | Casts && Set Custom Attributes
    |--------------------------------------------------------------------------
    */
    protected function casts(): array
    {
        return [
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

    /*
    |--------------------------------------------------------------------------
    | Helper methods
    |--------------------------------------------------------------------------
    */
    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new UserPasswordResetNotification($token));
    }

    public function addAttachments(array $attachments)
    {
        //loop
        foreach ($attachments as $attachment) {
            $filePath = UploadService::store($attachment['file'], 'user_files');

            $this->attachments()->create([
                'name' => $attachment['file']->getClientOriginalName(),
                'path' => $filePath,
                'type' => UserAttachmentTypeEnum::resolve($attachment['type']),
            ]);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Relations methods
    |--------------------------------------------------------------------------
    */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }

    public function logics(): MorphMany
    {
        return $this->morphMany(LogicModel::class, 'model');
    }
    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class);
    }

    public function logicTasks() : BelongsToMany
    {
        return $this->belongsToMany(LogicTask::class, 'logic_task_users');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(__CLASS__, 'created_by');
    }

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(UserAttatchment::class);
    }
}
