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
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->string('log_name')->nullable();
            $table->text('description');
            $table->string('subject_type')->nullable();
            $table->unsignedBigInteger('subject_id')->nullable();
            $table->string('causer_type')->nullable();
            $table->unsignedBigInteger('causer_id')->nullable();
            $table->json('properties')->nullable();
            $table->string('event')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();

            $table->index(['subject_type', 'subject_id']);
            $table->index(['causer_type', 'causer_id']);
            $table->index('log_name');
            $table->index('created_at');
        });

        Schema::create('dashboard_stats', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->integer('visitors')->default(0);
            $table->integer('page_views')->default(0);
            $table->integer('new_messages')->default(0);
            $table->integer('new_projects')->default(0);
            $table->integer('new_users')->default(0);
            $table->integer('active_sessions')->default(0);
            $table->json('hourly_visitors')->nullable();
            $table->json('top_pages')->nullable();
            $table->json('referrers')->nullable();
            $table->timestamps();

            $table->unique('date');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
        Schema::dropIfExists('dashboard_stats');
    }
};
