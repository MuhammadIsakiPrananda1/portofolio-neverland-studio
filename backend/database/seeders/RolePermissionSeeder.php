<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'view-dashboard',
            'manage-users',
            'manage-projects',
            'manage-blog',
            'manage-services',
            'manage-clients',
            'manage-messages',
            'manage-team',
            'manage-testimonials',
            'manage-settings',
            'manage-media',
            'view-analytics',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign permissions
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());

        $editor = Role::firstOrCreate(['name' => 'editor']);
        $editor->givePermissionTo([
            'view-dashboard',
            'manage-projects',
            'manage-blog',
            'manage-media',
            'view-analytics',
        ]);

        $user = Role::firstOrCreate(['name' => 'user']);
        $user->givePermissionTo(['view-dashboard']);
    }
}
