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
        Schema::table('users', function (Blueprint $table) {
            // Add OAuth provider fields if not exists
            if (!Schema::hasColumn('users', 'google_id')) {
                $table->string('google_id')->unique()->nullable()->after('email');
            }
            
            if (!Schema::hasColumn('users', 'github_id')) {
                $table->string('github_id')->unique()->nullable()->after('google_id');
            }

            // Make password nullable for OAuth users
            if (Schema::hasColumn('users', 'password')) {
                $table->string('password')->nullable()->change();
            }

            // Add provider field to track OAuth method
            if (!Schema::hasColumn('users', 'provider')) {
                $table->enum('provider', ['email', 'google', 'github'])->nullable()->after('github_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['google_id']);
            $table->dropUnique(['github_id']);
            $table->dropColumn('google_id', 'github_id', 'provider');
        });
    }
};
