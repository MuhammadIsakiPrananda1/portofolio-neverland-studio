<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TestimonialResource;
use App\Http\Requests\StoreTestimonialRequest;
use App\Http\Requests\UpdateTestimonialRequest;
use App\Models\Testimonial;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::active()
            ->with('project')
            ->latest()
            ->get();

        return TestimonialResource::collection($testimonials);
    }

    public function store(StoreTestimonialRequest $request)
    {
        $testimonial = Testimonial::create($request->validated());

        return new TestimonialResource($testimonial);
    }

    public function update(UpdateTestimonialRequest $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->update($request->validated());

        return new TestimonialResource($testimonial);
    }

    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();

        return response()->json([
            'message' => 'Testimonial deleted successfully',
        ]);
    }
}
