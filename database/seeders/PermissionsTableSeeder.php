<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        //permission users
        Permission::create(['name' => 'users.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.delete', 'guard_name' => 'web']);

        //permission roles
        Permission::create(['name' => 'roles.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.delete', 'guard_name' => 'web']);

        //permission permissions
        Permission::create(['name' => 'permissions.index', 'guard_name' => 'web']);

        //permission categories
        Permission::create(['name' => 'categories.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'categories.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'categories.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'categories.delete', 'guard_name' => 'web']);

         //permission calons
         Permission::create(['name' => 'calons.index', 'guard_name' => 'web']);
         Permission::create(['name' => 'calons.create', 'guard_name' => 'web']);
         Permission::create(['name' => 'calons.edit', 'guard_name' => 'web']);
         Permission::create(['name' => 'calons.delete', 'guard_name' => 'web']);

          //permission desas
        Permission::create(['name' => 'desas.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'desas.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'desas.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'desas.delete', 'guard_name' => 'web']);

         //permission kabupatens
         Permission::create(['name' => 'kabupatens.index', 'guard_name' => 'web']);
         Permission::create(['name' => 'kabupatens.create', 'guard_name' => 'web']);
         Permission::create(['name' => 'kabupatens.edit', 'guard_name' => 'web']);
         Permission::create(['name' => 'kabupatens.delete', 'guard_name' => 'web']);

          //permission kecamatans
        Permission::create(['name' => 'kecamatans.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'kecamatans.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'kecamatans.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'kecamatans.delete', 'guard_name' => 'web']);

         //permission pemilihs
         Permission::create(['name' => 'pemilihs.index', 'guard_name' => 'web']);
         Permission::create(['name' => 'pemilihs.create', 'guard_name' => 'web']);
         Permission::create(['name' => 'pemilihs.edit', 'guard_name' => 'web']);
         Permission::create(['name' => 'pemilihs.delete', 'guard_name' => 'web']);

          //permission saksis
        Permission::create(['name' => 'saksis.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'saksis.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'saksis.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'saksis.delete', 'guard_name' => 'web']);

         //permission tpses
         Permission::create(['name' => 'tpses.index', 'guard_name' => 'web']);
         Permission::create(['name' => 'tpses.create', 'guard_name' => 'web']);
         Permission::create(['name' => 'tpses.edit', 'guard_name' => 'web']);
         Permission::create(['name' => 'tpses.delete', 'guard_name' => 'web']);

          //permission quickcounts
        Permission::create(['name' => 'quickcounts.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'quickcount-lists.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'quickcounts.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'quickcounts.delete', 'guard_name' => 'web']);

        //permission dashboard
        Permission::create(['name' => 'dashboard.index', 'guard_name' => 'web']);

    }
}