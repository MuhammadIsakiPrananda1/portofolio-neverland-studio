<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use App\Services\MailService;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function __construct(protected MailService $mailService)
    {
    }

    public function index(Request $request)
    {
        $messages = Contact::query()
            ->when($request->status, fn($q, $status) => $q->where('status', $status))
            ->when($request->type, fn($q, $type) => $q->where('message_type', $type))
            ->latest()
            ->paginate($request->get('per_page', 20));

        return ContactResource::collection($messages);
    }

    public function show($id)
    {
        $message = Contact::findOrFail($id);

        // Auto mark as read when viewed
        if ($message->status === 'new') {
            $message->markAsRead();
        }

        return new ContactResource($message);
    }

    public function markAsRead($id)
    {
        $message = Contact::findOrFail($id);
        $message->markAsRead();

        return new ContactResource($message);
    }

    public function markAsUnread($id)
    {
        $message = Contact::findOrFail($id);
        $message->update(['status' => 'new']);

        return new ContactResource($message);
    }

    public function destroy($id)
    {
        $message = Contact::findOrFail($id);
        $message->delete();

        return response()->json([
            'message' => 'Message deleted successfully',
        ]);
    }

    public function reply($id, Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::findOrFail($id);

        try {
            $this->mailService->sendReply($contact, $request->subject, $request->message);
            $contact->markAsReplied();

            return response()->json([
                'message' => 'Reply sent successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to send reply',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
