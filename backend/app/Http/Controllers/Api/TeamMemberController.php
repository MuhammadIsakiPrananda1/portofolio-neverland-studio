<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeamMemberResource;
use App\Http\Requests\StoreTeamMemberRequest;
use App\Http\Requests\UpdateTeamMemberRequest;
use App\Models\TeamMember;

class TeamMemberController extends Controller
{
    public function index()
    {
        $members = TeamMember::active()
            ->ordered()
            ->get();

        return TeamMemberResource::collection($members);
    }

    public function show($id)
    {
        $member = TeamMember::findOrFail($id);

        return new TeamMemberResource($member);
    }

    public function store(StoreTeamMemberRequest $request)
    {
        $member = TeamMember::create($request->validated());

        return new TeamMemberResource($member);
    }

    public function update(UpdateTeamMemberRequest $request, $id)
    {
        $member = TeamMember::findOrFail($id);
        $member->update($request->validated());

        return new TeamMemberResource($member);
    }

    public function destroy($id)
    {
        $member = TeamMember::findOrFail($id);
        $member->delete();

        return response()->json([
            'message' => 'Team member deleted successfully',
        ]);
    }
}
