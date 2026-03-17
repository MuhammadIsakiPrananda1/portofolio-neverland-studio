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
        Schema::create('virtual_machines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            
            // Container info
            $table->string('container_id')->unique()->nullable(); // Docker container ID
            $table->string('container_name')->unique();            // Docker container name (vm_user_X)
            $table->integer('vnc_port')->unique();                 // VNC port (5901, 5902, etc)
            $table->integer('web_port')->unique();                 // Web port for noVNC (6080, 6081, etc)
            
            // VM metadata
            $table->enum('status', ['stopped', 'starting', 'running', 'stopping', 'error'])->default('stopped');
            $table->text('error_message')->nullable();
            $table->integer('cpu_cores')->default(1);              // CPU cores limit
            $table->integer('memory_mb')->default(1024);           // Memory in MB
            $table->integer('storage_gb')->default(20);            // Storage in GB
            
            // VNC authentication
            $table->string('vnc_password')->default('neverland2024');
            $table->string('session_token')->unique()->nullable(); // Session token for noVNC access
            
            // Timestamps
            $table->timestamp('started_at')->nullable();
            $table->timestamp('stopped_at')->nullable();
            $table->timestamp('last_activity_at')->nullable();    // For auto-cleanup
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('user_id');
            $table->index('status');
            $table->index('last_activity_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('virtual_machines');
    }
};
