<?php

namespace App\Console\Commands;

use App\Http\Controllers\Api\CyberNewsController;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CacheCyberNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cache:cyber-news
                            {--feeds=6 : Number of primary feeds to cache}
                            {--limit=10 : Number of items per feed}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cache cyber news feeds in Redis/Cache for fast frontend retrieval';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $feedCount = $this->option('feeds');
        $itemLimit = $this->option('limit');

        $this->info("🔄 Starting Cyber News feed caching...");
        $this->info("Feeds to cache: {$feedCount} | Items per feed: {$itemLimit}");

        // Primary feeds to cache
        $primaryFeeds = [
            'https://feeds.feedburner.com/TheHackersNews',
            'https://www.bleepingcomputer.com/feed/',
            'https://krebsonsecurity.com/feed/',
            'https://news.sophos.com/en-us/feed/',
            'https://www.cisa.gov/cybersecurity-advisories/all.xml',
            'https://www.darkreading.com/rss.xml',
        ];

        $successCount = 0;
        $failureCount = 0;

        foreach (array_slice($primaryFeeds, 0, $feedCount) as $feedUrl) {
            try {
                $this->info("📰 Caching: {$feedUrl}");

                // Fetch feed
                $response = Http::timeout(10)->withOptions(['verify' => false])->get($feedUrl);

                if (!$response->successful()) {
                    $this->warn("❌ Failed to fetch: {$feedUrl}");
                    $failureCount++;
                    continue;
                }

                // Parse and cache
                $xmlString = $response->body();
                $xml = @simplexml_load_string($xmlString, 'SimpleXMLElement', LIBXML_NOCDATA);

                if (!$xml) {
                    $this->warn("❌ Failed to parse: {$feedUrl}");
                    $failureCount++;
                    continue;
                }

                $items = [];
                $count = 0;

                // Handle RSS
                if (isset($xml->channel->item)) {
                    foreach ($xml->channel->item as $item) {
                        if ($count >= $itemLimit) break;
                        $items[] = $this->parseItem($item);
                        $count++;
                    }
                }
                // Handle Atom
                elseif (isset($xml->entry)) {
                    foreach ($xml->entry as $entry) {
                        if ($count >= $itemLimit) break;
                        $items[] = $this->parseAtomEntry($entry);
                        $count++;
                    }
                }

                // Cache the results
                $cacheKey = 'cyber_news_feed_' . md5($feedUrl) . '_v1';
                $cacheTTL = 600; // 10 minutes

                Cache::put($cacheKey, $items, $cacheTTL);

                $this->line("✅ Cached {$count} items from {$feedUrl}");
                $successCount++;

            } catch (\Exception $e) {
                $this->error("❌ Error: " . $e->getMessage());
                Log::error("Cyber News Caching Error for {$feedUrl}: " . $e->getMessage());
                $failureCount++;
            }
        }

        $this->info("\n📊 Caching Complete!");
        $this->info("✅ Success: {$successCount}");
        $this->info("❌ Failed: {$failureCount}");

        if ($successCount > 0) {
            $this->info("\n✨ Feeds are now cached and ready for frontend requests");
        }
    }

    private function parseItem($item)
    {
        $description = (string) $item->description;

        $img = null;
        if (isset($item->children('media', true)->content)) {
            $attributes = $item->children('media', true)->content->attributes();
            if (isset($attributes['url'])) {
                $img = (string) $attributes['url'];
            }
        } elseif (isset($item->enclosure)) {
            $attributes = $item->enclosure->attributes();
            if (isset($attributes['type']) && str_starts_with((string)$attributes['type'], 'image/')) {
                $img = (string) $attributes['url'];
            }
        }

        if (!$img && preg_match('/<img[^>]+src=[\'"]([^\'"]+)[\'"][^>]*>/i', $description, $matches)) {
            $img = $matches[1];
        }

        $cleanDescription = strip_tags($description);
        $cleanDescription = preg_replace('/\s+/', ' ', $cleanDescription);
        $cleanDescription = trim($cleanDescription);

        return [
            'title' => trim((string) $item->title),
            'link' => trim((string) $item->link),
            'description' => substr($cleanDescription, 0, 500),
            'pubDate' => (string) $item->pubDate,
            'image' => $img,
        ];
    }

    private function parseAtomEntry($entry)
    {
        $summary = (string) $entry->summary;
        $content = (string) $entry->content;

        $img = null;
        if (preg_match('/<img[^>]+src=[\'"]([^\'"]+)[\'"][^>]*>/i', $content ?: $summary, $matches)) {
            $img = $matches[1];
        }

        $link = '';
        if (isset($entry->link)) {
            foreach ($entry->link as $l) {
                if ((string)$l['rel'] == 'alternate' || !(string)$l['rel']) {
                    $link = (string)$l['href'];
                    break;
                }
            }
            if (!$link && isset($entry->link[0])) {
                $link = (string)$entry->link[0]['href'];
            }
        }

        $published = (string) $entry->published ?: (string) $entry->updated;

        $cleanDescription = strip_tags($summary ?: $content);
        $cleanDescription = preg_replace('/\s+/', ' ', $cleanDescription);
        $cleanDescription = trim($cleanDescription);

        return [
            'title' => trim((string) $entry->title),
            'link' => $link,
            'description' => substr($cleanDescription, 0, 500),
            'pubDate' => $published,
            'image' => $img,
        ];
    }
}
