<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Employee;
use Illuminate\Database\Seeder;
use App\Services\Global\RoleService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EmployeeTableSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Root user
        $rootEmployee = Employee::create([
            'name' => 'Root User',
            'email' => 'root@example.com',
            'password' => bcrypt('password'),
        ]);
        $rootEmployee->assignRole('root');

        // Admin user
        $adminEmployee = Employee::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);
        $adminEmployee->assignRole('admin');
    }
}