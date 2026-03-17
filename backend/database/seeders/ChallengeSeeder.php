<?php

namespace Database\Seeders;

use App\Models\Challenge;
use Illuminate\Database\Seeder;

class ChallengeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $challenges = [
            // Web Challenges
            [
                'title' => 'XSS Basics',
                'description' => 'Find and exploit a reflected XSS vulnerability in the search form.',
                'flag' => 'flag{xss_is_dangerous}',
                'category' => 'web',
                'difficulty' => 'Easy',
                'initial_points' => 100,
                'minimum_points' => 25,
                'decay' => 2,
                'is_active' => true,
                'hints' => 'Try injecting HTML tags in the search parameter. Look for <script> or event handlers.',
            ],
            [
                'title' => 'SQL Injection in Login',
                'description' => 'Bypass the login form using SQL injection.',
                'flag' => 'flag{sql_injection_pwned}',
                'category' => 'web',
                'difficulty' => 'Easy',
                'initial_points' => 150,
                'minimum_points' => 50,
                'decay' => 3,
                'is_active' => true,
                'hints' => 'Try entering " OR "1"="1 in the username field. Comment out the password check with --',
            ],
            [
                'title' => 'Directory Traversal',
                'description' => 'Use path traversal to read sensitive files.',
                'flag' => 'flag{directory_traversal_success}',
                'category' => 'web',
                'difficulty' => 'Medium',
                'initial_points' => 200,
                'minimum_points' => 75,
                'decay' => 5,
                'is_active' => true,
                'hints' => 'Try using ../ to navigate up directories. Look for configuration files like config.php or .env',
            ],
            [
                'title' => 'Command Injection RCE',
                'description' => 'Execute arbitrary commands on the server.',
                'flag' => 'flag{rce_achieved}',
                'category' => 'web',
                'difficulty' => 'Hard',
                'initial_points' => 300,
                'minimum_points' => 100,
                'decay' => 8,
                'is_active' => true,
                'hints' => 'Try chaining commands with ; or && operators. Look for user input in system calls.',
            ],
            [
                'title' => 'Authentication Bypass',
                'description' => 'Bypass multi-factor authentication to gain access.',
                'flag' => 'flag{mfa_bypassed}',
                'category' => 'web',
                'difficulty' => 'Hard',
                'initial_points' => 350,
                'minimum_points' => 125,
                'decay' => 10,
                'is_active' => true,
                'hints' => 'Check if 2FA validation is properly implemented. Look for logic flaws in token verification.',
            ],

            // Crypto Challenges
            [
                'title' => 'Caesar Cipher Decryption',
                'description' => 'Decrypt a message encrypted with Caesar cipher.',
                'flag' => 'flag{caesar_cipher_solved}',
                'category' => 'crypto',
                'difficulty' => 'Easy',
                'initial_points' => 75,
                'minimum_points' => 20,
                'decay' => 2,
                'is_active' => true,
                'hints' => 'Try all 26 rotations. The correct one will reveal English text.',
            ],
            [
                'title' => 'Base64 Decoding',
                'description' => 'Decode multiple layers of Base64 encoding.',
                'flag' => 'flag{base64_decoded}',
                'category' => 'crypto',
                'difficulty' => 'Easy',
                'initial_points' => 100,
                'minimum_points' => 30,
                'decay' => 2,
                'is_active' => true,
                'hints' => 'Use online Base64 decoders or Python: import base64; base64.b64decode(...)',
            ],
            [
                'title' => 'MD5 Hash Cracking',
                'description' => 'Crack an MD5 hash to find the original message.',
                'flag' => 'flag{md5_cracked}',
                'category' => 'crypto',
                'difficulty' => 'Medium',
                'initial_points' => 150,
                'minimum_points' => 50,
                'decay' => 3,
                'is_active' => true,
                'hints' => 'Use online hash lookup tools like hashcat or MD5 databases.',
            ],
            [
                'title' => 'RSA Encryption Weakness',
                'description' => 'Exploit weak RSA parameters to decrypt a message.',
                'flag' => 'flag{rsa_weakness_found}',
                'category' => 'crypto',
                'difficulty' => 'Hard',
                'initial_points' => 250,
                'minimum_points' => 100,
                'decay' => 5,
                'is_active' => true,
                'hints' => 'Look for small primes or weak key generation. Use factorization tools.',
            ],

            // Binary Exploitation
            [
                'title' => 'Buffer Overflow Basic',
                'description' => 'Overflow a buffer to overwrite return address.',
                'flag' => 'flag{buffer_overflow_worked}',
                'category' => 'binary',
                'difficulty' => 'Hard',
                'initial_points' => 300,
                'minimum_points' => 100,
                'decay' => 8,
                'is_active' => true,
                'hints' => 'Start with simple inputs to crash the program. Use gdb or radare2 to analyze the binary.',
            ],
            [
                'title' => 'Format String Vulnerability',
                'description' => 'Use format strings to read memory.',
                'flag' => 'flag{format_string_leak}',
                'category' => 'binary',
                'difficulty' => 'Hard',
                'initial_points' => 350,
                'minimum_points' => 120,
                'decay' => 10,
                'is_active' => true,
                'hints' => 'Try %x, %s, and %n format specifiers. Stack layout matters!',
            ],

            // Forensics
            [
                'title' => 'Hidden File Recovery',
                'description' => 'Recover deleted files from a disk image.',
                'flag' => 'flag{file_recovered}',
                'category' => 'forensics',
                'difficulty' => 'Medium',
                'initial_points' => 200,
                'minimum_points' => 75,
                'decay' => 4,
                'is_active' => true,
                'hints' => 'Use tools like autopsy or testdisk to recover deleted files.',
            ],
            [
                'title' => 'PCAP Analysis',
                'description' => 'Analyze a network capture to find sensitive information.',
                'flag' => 'flag{pcap_analyzed}',
                'category' => 'forensics',
                'difficulty' => 'Medium',
                'initial_points' => 250,
                'minimum_points' => 90,
                'decay' => 5,
                'is_active' => true,
                'hints' => 'Use Wireshark to open the PCAP file. Look for unencrypted protocols.',
            ],
        ];

        foreach ($challenges as $challenge) {
            Challenge::firstOrCreate(
                ['title' => $challenge['title']],
                $challenge
            );
        }

        $this->command->info('✓ ' . count($challenges) . ' challenges seeded successfully');
    }
}
