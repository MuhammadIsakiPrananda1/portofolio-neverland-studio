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
        Schema::create('challenges', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->text('description');
            $table->string('flag');
            $table->string('category')->index(); // web, crypto, forensics, pwn, misc
            $table->enum('difficulty', ['Easy', 'Medium', 'Hard', 'Expert'])->default('Medium');
            $table->integer('initial_points')->default(500);
            $table->integer('minimum_points')->default(100);
            $table->integer('decay')->default(10); // points reduce per solve
            
            // First Blood tracking
            $table->foreignId('first_blood_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('first_blood_at')->nullable();
            
            // Status and metadata
            $table->boolean('is_active')->default(true)->index();
            $table->integer('solve_count')->default(0)->index();
            $table->text('hints')->nullable();
            $table->string('attachment_path')->nullable();
            
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['category', 'difficulty']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('challenges');
    }
};
