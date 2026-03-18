<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Users Table Migration - MySQL Native Authentication
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('phone')->nullable();
            $table->text('avatar')->nullable();
            $table->enum('role', ['admin', 'user'])->default('user');
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            
            // ===== SECURITY FIELDS =====
            // Login attempt tracking (brute force protection)
            $table->unsignedInteger('failed_login_attempts')->default(0);
            $table->timestamp('locked_until')->nullable(); // Account lock timestamp
            $table->timestamp('last_login_at')->nullable();
            $table->string('last_login_ip')->nullable();
            
            // CTF fields
            $table->unsignedBigInteger('score')->default(0)->index();
            
            // OAuth
            $table->string('google_id')->nullable()->unique();
            $table->string('github_id')->nullable()->unique();
            
            // 2FA
            $table->text('two_factor_secret')->nullable();
            $table->text('two_factor_recovery_codes')->nullable();
            $table->timestamp('two_factor_confirmed_at')->nullable();
            
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes for performance
            $table->index('email');
            $table->index('status');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
