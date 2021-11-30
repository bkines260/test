<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //App\Models\
        \App\Models\User::create([
            'name'=>'ayat amine',
            'email'=>'amine@gmail.com',
            'password'=>bcrypt('123456'),
            'profile_img'=>'profile_img1.jpg'
        ]);
    }
}
