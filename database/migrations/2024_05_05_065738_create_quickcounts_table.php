<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quickcounts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tps_id');
            $table->unsignedBigInteger('kecamatan_id');
            $table->unsignedBigInteger('kabupaten_id');
            $table->unsignedBigInteger('desa_id');
            $table->unsignedBigInteger('saksi_id');
            $table->bigInteger('suara_sah');
            $table->bigInteger('suara_tidak_sah');
            $table->bigInteger('total_suara');
            $table->string('file');
            $table->integer('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quickcounts');
    }
};
