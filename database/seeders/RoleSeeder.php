<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::updateOrCreate(
            ['code' => 'ADMIN'],
            ['name' => 'Administrator']
        );

        Role::updateOrCreate(
            ['code' => 'MEMBER'],
            ['name' => 'Member']
        );
    }
}
