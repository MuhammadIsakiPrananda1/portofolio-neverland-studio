<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::active()
            ->ordered()
            ->get();

        return ServiceResource::collection($services);
    }

    public function show($id)
    {
        $service = Service::findOrFail($id);

        return new ServiceResource($service);
    }

    public function store(StoreServiceRequest $request)
    {
        $service = Service::create($request->validated());

        return new ServiceResource($service);
    }

    public function update(UpdateServiceRequest $request, $id)
    {
        $service = Service::findOrFail($id);
        $service->update($request->validated());

        return new ServiceResource($service);
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json([
            'message' => 'Service deleted successfully',
        ]);
    }
}
