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
        Schema::create('detail_quickcounts', function (Blueprint $table) {
            $table->id();
            $table->string('quickcount_id');
            $table->unsignedBigInteger('calon_id');
            $table->bigInteger('total_suara_calon');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_quickounts');
    }
};
