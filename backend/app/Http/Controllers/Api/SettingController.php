<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->groupBy('group');

        return response()->json($settings);
    }

    public function show($key)
    {
        $setting = Setting::where('key', $key)->firstOrFail();

        return response()->json($setting);
    }

    public function store(Request $request)
    {
        $request->validate([
            'key' => 'required|string|unique:settings,key',
            'value' => 'required',
            'type' => 'required|in:string,number,boolean,json',
            'group' => 'sometimes|string',
            'description' => 'sometimes|string',
        ]);

        $setting = Setting::create($request->all());

        return response()->json($setting, 201);
    }

    public function update(Request $request, $key)
    {
        $setting = Setting::where('key', $key)->firstOrFail();

        $request->validate([
            'value' => 'required',
        ]);

        $setting->update($request->only('value', 'description'));

        return response()->json($setting);
    }
}
