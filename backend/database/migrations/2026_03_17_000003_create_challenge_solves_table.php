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
        Schema::create('challenge_solves', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('challenge_id')->constrained('challenges')->cascadeOnDelete();
            $table->integer('points_awarded')->default(0);
            $table->timestamp('solved_at')->useCurrent();
            $table->timestamps();

            // Unique constraint: one user can only solve each challenge once
            $table->unique(['user_id', 'challenge_id']);
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('challenge_id');
            $table->index('solved_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('challenge_solves');
    }
};
