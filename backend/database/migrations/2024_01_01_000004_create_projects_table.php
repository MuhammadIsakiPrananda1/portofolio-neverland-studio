<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('industry')->nullable();
            $table->text('challenge')->nullable();
            $table->text('solution')->nullable();
            $table->json('results')->nullable();
            $table->json('technologies')->nullable();
            $table->string('image')->nullable();
            $table->json('gallery')->nullable();
            $table->enum('category', [
                'penetration-testing',
                'security-audit',
                'network-security',
                'cloud-security',
                'it-infrastructure',
                'web-development',
                'mobile-development',
                'other'
            ])->default('other');
            $table->string('client_name')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->integer('views')->default(0);
            $table->boolean('featured')->default(false);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['category', 'status']);
            $table->index('featured');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
