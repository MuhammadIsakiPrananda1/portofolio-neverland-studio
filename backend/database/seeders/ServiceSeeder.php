<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => 'Penetration Testing',
                'description' => 'Comprehensive security testing to identify vulnerabilities',
                'content' => 'Our penetration testing services help identify security weaknesses before attackers do.',
                'icon' => 'Shield',
                'features' => ['Network Testing', 'Web Application Testing', 'API Testing', 'Social Engineering'],
                'color' => 'primary',
                'order' => 1,
                'status' => 'active',
            ],
            [
                'title' => 'Security Audit',
                'description' => 'In-depth analysis of your security infrastructure',
                'content' => 'Complete security audit services to ensure your systems are compliant and secure.',
                'icon' => 'Search',
                'features' => ['Compliance Audit', 'Code Review', 'Configuration Audit', 'Policy Review'],
                'color' => 'secondary',
                'order' => 2,
                'status' => 'active',
            ],
            [
                'title' => 'Cloud Security',
                'description' => 'Secure your cloud infrastructure and applications',
                'content' => 'Expert cloud security services for AWS, Azure, and Google Cloud.',
                'icon' => 'Cloud',
                'features' => ['Cloud Configuration', 'Identity Management', 'Data Encryption', 'Compliance'],
                'color' => 'accent',
                'order' => 3,
                'status' => 'active',
            ],
            [
                'title' => 'IT Infrastructure',
                'description' => 'Build and maintain robust IT infrastructure',
                'content' => 'Complete IT infrastructure services from planning to implementation.',
                'icon' => 'Server',
                'features' => ['Network Design', 'Server Setup', 'Monitoring', 'Maintenance'],
                'color' => 'primary',
                'order' => 4,
                'status' => 'active',
            ],
            [
                'title' => 'Web Development',
                'description' => 'Modern web applications with cutting-edge technology',
                'content' => 'Custom web development services tailored to your business needs.',
                'icon' => 'Code',
                'features' => ['React/Vue', 'Node.js/Laravel', 'API Development', 'Database Design'],
                'color' => 'secondary',
                'order' => 5,
                'status' => 'active',
            ],
        ];

        foreach ($services as $service) {
            Service::firstOrCreate(
                ['slug' => \Str::slug($service['title'])],
                $service
            );
        }
    }
}
