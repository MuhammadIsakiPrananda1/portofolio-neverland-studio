<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('analytics', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // page_view, project_view, blog_view, etc.
            $table->string('path')->nullable();
            $table->foreignId('trackable_id')->nullable();
            $table->string('trackable_type')->nullable();
            $table->ipAddress('ip_address')->nullable();
            $table->text('user_agent')->nullable();
            $table->string('referer')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamp('created_at');

            $table->index(['type', 'created_at']);
            $table->index(['trackable_type', 'trackable_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('analytics');
    }
};
