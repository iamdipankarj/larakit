<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'organization_id',
        'avatar',
        'google_id',
        'google_token',
        'google_refresh_token'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'google_id',
        'google_token',
        'google_refresh_token',
        'updated_at',
        'email_verified_at'
    ];

    public function roles(): BelongsToMany {
        return $this->belongsToMany(Role::class);
    }

    public function hasRole(string $role): bool {
        return $this->roles->contains('code', $role);
    }

    public function hasAnyRole(array $roles): bool {
        return $this->roles()->whereIn('code', $roles)->exists();
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isAcmeUser(): bool {
        $organization = Organization::where(['code' => 'ACME'])->first();
        return $this->organization()->is($organization);
    }

    public function isAcmeAdmin(): bool {
        return $this->isAcmeUser() && $this->hasAnyRole(['ADMIN']);
    }

    public function organization(): BelongsTo {
        return $this->belongsTo(Organization::class, 'organization_id');
    }
}
