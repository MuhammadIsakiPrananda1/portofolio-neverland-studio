<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Seeder;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@neverlandstudio.com')->first();

        if (!$admin) {
            return;
        }

        $posts = [
            [
                'title' => 'Top 10 Security Best Practices for 2026',
                'excerpt' => 'Essential security practices every organization should implement',
                'content' => 'In this comprehensive guide, we explore the most critical security practices...',
                'category' => 'Security',
                'tags' => ['security', 'best-practices', 'cybersecurity'],
                'read_time' => 8,
                'status' => 'published',
                'published_at' => now(),
                'featured' => true,
            ],
            [
                'title' => 'Understanding Zero Trust Architecture',
                'excerpt' => 'A deep dive into Zero Trust security model',
                'content' => 'Zero Trust is a security framework that requires all users...',
                'category' => 'Architecture',
                'tags' => ['zero-trust', 'security', 'architecture'],
                'read_time' => 12,
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'featured' => true,
            ],
            [
                'title' => 'Laravel API Development Tips',
                'excerpt' => 'Best practices for building robust APIs with Laravel',
                'content' => 'Laravel provides excellent tools for building APIs...',
                'category' => 'Development',
                'tags' => ['laravel', 'api', 'php', 'development'],
                'read_time' => 10,
                'status' => 'published',
                'published_at' => now()->subDays(10),
                'featured' => false,
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::firstOrCreate(
                ['slug' => \Str::slug($post['title'])],
                array_merge($post, ['author_id' => $admin->id])
            );
        }
    }
}
