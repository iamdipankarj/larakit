<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class);
    }

    public function invitations(): BelongsToMany {
        return $this->belongsToMany(Invitation::class, 'role_invitation');
    }
}
