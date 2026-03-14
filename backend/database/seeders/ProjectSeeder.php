<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Enterprise Security Assessment',
                'industry' => 'Finance',
                'challenge' => 'The client needed a comprehensive security assessment of their enterprise infrastructure.',
                'solution' => 'We conducted a thorough penetration test and security audit.',
                'results' => ['Identified 15 critical vulnerabilities', 'Improved security posture by 85%', 'Zero incidents post-implementation'],
                'technologies' => ['Kali Linux', 'Burp Suite', 'Metasploit', 'Nessus'],
                'category' => 'penetration-testing',
                'status' => 'published',
                'featured' => true,
            ],
            [
                'title' => 'Cloud Migration Security',
                'industry' => 'E-commerce',
                'challenge' => 'Secure migration of legacy systems to cloud infrastructure.',
                'solution' => 'Implemented secure cloud architecture with proper access controls.',
                'results' => ['100% uptime during migration', 'Enhanced security', 'Reduced costs by 40%'],
                'technologies' => ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
                'category' => 'cloud-security',
                'status' => 'published',
                'featured' => true,
            ],
            [
                'title' => 'Custom Web Application',
                'industry' => 'Healthcare',
                'challenge' => 'Build a HIPAA-compliant patient management system.',
                'solution' => 'Developed a secure, scalable web application with modern tech stack.',
                'results' => ['HIPAA compliant', '99.9% uptime', 'Improved efficiency by 60%'],
                'technologies' => ['React', 'Laravel', 'PostgreSQL', 'Redis'],
                'category' => 'web-development',
                'status' => 'published',
                'featured' => false,
            ],
        ];

        foreach ($projects as $project) {
            Project::firstOrCreate(
                ['slug' => \Str::slug($project['title'])],
                $project
            );
        }
    }
}
