<?php

namespace App\Services;

use App\Models\Contact;
use Illuminate\Support\Facades\Mail;

class MailService
{
    public function sendContactNotification(Contact $contact): void
    {
        // Send email to admin
        Mail::send('emails.contact-notification', ['contact' => $contact], function ($message) use ($contact) {
            $message->to(config('mail.admin_email', 'admin@neverlandstudio.com'))
                ->subject('New Contact Form Submission from ' . $contact->name);
        });

        // Send auto-reply to user
        Mail::send('emails.contact-auto-reply', ['contact' => $contact], function ($message) use ($contact) {
            $message->to($contact->email)
                ->subject('Thank you for contacting Neverland Studio');
        });
    }

    public function sendReply(Contact $contact, string $subject, string $messageBody): void
    {
        Mail::send('emails.contact-reply', [
            'contact' => $contact,
            'messageBody' => $messageBody
        ], function ($message) use ($contact, $subject) {
            $message->to($contact->email)
                ->subject($subject);
        });
    }

    public function sendWelcomeEmail($user): void
    {
        Mail::send('emails.welcome', ['user' => $user], function ($message) use ($user) {
            $message->to($user->email)
                ->subject('Welcome to Neverland Studio');
        });
    }

    public function sendPasswordResetEmail($user, string $token): void
    {
        $url = config('app.frontend_url') . '/reset-password?token=' . $token . '&email=' . $user->email;

        Mail::send('emails.password-reset', [
            'user' => $user,
            'url' => $url
        ], function ($message) use ($user) {
            $message->to($user->email)
                ->subject('Reset Your Password');
        });
    }
}
