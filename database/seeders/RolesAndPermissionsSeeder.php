<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {

        $guardName = 'sanctum';


        $permissions = ['edit employees', 'delete employees', 'publish employees', 'view employees'];

        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission,
                'guard_name' => $guardName,
            ]);
        }


        $rootRole = Role::create([
            'name' => 'root',
            'guard_name' => $guardName,
        ]);
        $rootRole->givePermissionTo(Permission::all());

        $adminRole = Role::create([
            'name' => 'admin',
            'guard_name' => $guardName,
        ]);
        $adminRole->givePermissionTo(['edit employees', 'view employees']);
    }
}
