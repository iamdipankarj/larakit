<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dashboard extends Model
{
    protected $fillable = ['layout'];

    protected $casts = [
        'layout' => 'array',
    ];
}
