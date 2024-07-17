<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Quickcount extends Model
{
    use HasFactory;
    protected $guarded = [""];
    protected function file(): Attribute
    {
        return Attribute::make(
            get: fn ($ktp) => asset('/storage/quickcounts/' . $ktp),
        );
    }
}
