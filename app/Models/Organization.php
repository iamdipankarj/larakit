<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Organization extends Model
{
    /** @use HasFactory<\Database\Factories\OrganizationFactory> */
    use HasFactory;

    protected $fillable = ['name', 'code', 'slug'];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function invitations(): HasMany {
        return $this->hasMany(Invitation::class);
    }
}
