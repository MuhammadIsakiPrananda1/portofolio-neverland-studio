<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MediaResource;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $media = Media::query()
            ->when($request->mime_type, fn($q, $type) => $q->where('mime_type', 'like', "$type%"))
            ->latest()
            ->paginate($request->get('per_page', 20));

        return MediaResource::collection($media);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240', // 10MB max
            'name' => 'sometimes|string|max:255',
        ]);

        $file = $request->file('file');
        $filename = Str::random(40) . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('uploads', $filename, 'public');

        $media = Media::create([
            'name' => $request->name ?? $file->getClientOriginalName(),
            'file_name' => $filename,
            'mime_type' => $file->getMimeType(),
            'path' => $path,
            'disk' => 'public',
            'size' => $file->getSize(),
            'user_id' => auth()->id(),
        ]);

        return new MediaResource($media);
    }

    public function destroy($id)
    {
        $media = Media::findOrFail($id);

        // Delete file from storage
        Storage::disk($media->disk)->delete($media->path);

        $media->delete();

        return response()->json([
            'message' => 'Media deleted successfully',
        ]);
    }
}
