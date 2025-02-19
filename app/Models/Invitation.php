<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Invitation extends Model
{
    /** @use HasFactory<\Database\Factories\InvitationFactory> */
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'email',
        'token',
        'expires_at',
        'accepted_at',
    ];

    protected $hidden = [
        'updated_at'
    ];

    public function roles(): BelongsToMany {
        return $this->belongsToMany(Role::class, 'role_invitation');
    }

    protected $dates = ['expires_at', 'accepted_at'];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class, 'organization_id');
    }

    public function isExpired(): bool {
        return now()->greaterThan($this->expires_at);
    }

    public function isAccepted()
    {
        return $this->accepted_at !== null;
    }
}
