<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'industry',
        'challenge',
        'solution',
        'results',
        'technologies',
        'image',
        'gallery',
        'category',
        'client_name',
        'start_date',
        'end_date',
        'status',
        'views',
        'featured',
    ];

    protected $casts = [
        'results' => 'array',
        'technologies' => 'array',
        'gallery' => 'array',
        'start_date' => 'date',
        'end_date' => 'date',
        'views' => 'integer',
        'featured' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function testimonials()
    {
        return $this->hasMany(Testimonial::class);
    }

    public function incrementViews()
    {
        $this->increment('views');
    }
}
