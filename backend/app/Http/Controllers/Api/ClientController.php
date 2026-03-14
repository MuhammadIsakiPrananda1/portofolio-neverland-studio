<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $clients = Client::query()
            ->when($request->status, fn($q, $status) => $q->where('status', $status))
            ->latest()
            ->paginate($request->get('per_page', 15));

        return ClientResource::collection($clients);
    }

    public function show($id)
    {
        $client = Client::findOrFail($id);

        return new ClientResource($client);
    }

    public function store(StoreClientRequest $request)
    {
        $client = Client::create($request->validated());

        return new ClientResource($client);
    }

    public function update(UpdateClientRequest $request, $id)
    {
        $client = Client::findOrFail($id);
        $client->update($request->validated());

        return new ClientResource($client);
    }

    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->delete();

        return response()->json([
            'message' => 'Client deleted successfully',
        ]);
    }
}
