<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'file_name',
        'mime_type',
        'path',
        'disk',
        'size',
        'metadata',
        'user_id',
    ];

    protected $casts = [
        'metadata' => 'array',
        'size' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getUrlAttribute()
    {
        return \Storage::disk($this->disk)->url($this->path);
    }

    public function getSizeInKbAttribute()
    {
        return round($this->size / 1024, 2);
    }

    public function getSizeInMbAttribute()
    {
        return round($this->size / (1024 * 1024), 2);
    }
}
