<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Testimonial extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'client_name',
        'client_role',
        'client_company',
        'content',
        'rating',
        'client_image',
        'project_id',
        'featured',
        'status',
    ];

    protected $casts = [
        'rating' => 'integer',
        'featured' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
