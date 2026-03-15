<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use App\Services\MailService;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function __construct(protected MailService $mailService)
    {
    }

    /**
     * Get all contacts (for dashboard - protected)
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 15);
        $status = $request->get('status');

        $contacts = Contact::query()
            ->when($status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->latest()
            ->paginate($perPage);

        return ContactResource::collection($contacts);
    }

    /**
     * Get single contact
     */
    public function show($id)
    {
        $contact = Contact::findOrFail($id);
        return new ContactResource($contact);
    }

    /**
     * Submit contact form (public)
     */
    public function submit(StoreContactRequest $request)
    {
        $contact = Contact::create([
            ...$request->validated(),
            'status' => 'new',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        // Send email notification
        try {
            $this->mailService->sendContactNotification($contact);
        } catch (\Exception $e) {
            \Log::error('Failed to send contact notification: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Thank you for contacting us. We will get back to you soon.',
            'data' => new ContactResource($contact),
        ], 201);
    }

    /**
     * Mark contact as read
     */
    public function markAsRead($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->markAsRead();

        return response()->json([
            'success' => true,
            'message' => 'Contact marked as read',
            'data' => new ContactResource($contact->fresh()),
        ]);
    }

    /**
     * Mark contact as replied
     */
    public function markAsReplied($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->markAsReplied();

        return response()->json([
            'success' => true,
            'message' => 'Contact marked as replied',
            'data' => new ContactResource($contact->fresh()),
        ]);
    }

    /**
     * Delete contact
     */
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json([
            'success' => true,
            'message' => 'Contact deleted successfully',
        ]);
    }
}
