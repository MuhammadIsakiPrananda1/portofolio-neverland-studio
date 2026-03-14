<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@neverlandstudio.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'status' => 'active',
            ]
        );
        $admin->assignRole('admin');

        $editor = User::firstOrCreate(
            ['email' => 'editor@neverlandstudio.com'],
            [
                'name' => 'Editor User',
                'password' => Hash::make('password'),
                'status' => 'active',
            ]
        );
        $editor->assignRole('editor');
    }
}
