<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Saksi extends Model
{
    use HasFactory;
    protected $guarded = [""];

    protected function ktp(): Attribute
    {
        return Attribute::make(
            get: fn ($ktp) => asset('/storage/saksis/' . $ktp),
        );
    }
}
