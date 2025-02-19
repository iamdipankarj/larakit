<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrganizationUserController extends Controller
{
    public function index(Request $request) {
        $organization = $request->user()->organization;

        if ($request->user()->isAcmeAdmin()) {
            $users = User::with('roles')->get();
        } else {
            $users = $organization->users->load('roles');
        }
        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    public function create(Request $request) {
        $orgList = Organization::all()->map(function ($org) {
            return [
                'id' => $org->id,
                'name' => $org->name,
                'code' => $org->code
            ];
        });
        return Inertia::render('Invitations/Create', [
            'query' => $request->query(),
            'org_list' => $orgList,
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'roles' => ['required', 'array'],
            'roles.*' => ['required', 'string', 'in:ADMIN,MEMBER']
        ]);

        $requestOrganizationId = $request->get('organizationId');
        if ($requestOrganizationId) {
            $organization = Organization::where('id', $requestOrganizationId)->firstOrFail();
        } else {
            $organization = $request->user()->organization;
        }

        // Ensure the currently authenticated user can invite
        if (!$this->userCanInvite($request->user(), $organization)) {
            abort(403, 'Unauthorized');
        }

        try {
            $roles = $validated['roles'];

            $invitation = $organization->invitations()->create([
                'email' => $validated['email'],
                'token' => Str::random(60),
                'expires_at' => now()->addDays(3),
            ]);

            $chosenRoles = Role::whereIn('code', $roles)->get();

            $invitation->roles()->attach($chosenRoles);

            $invitationLink = url('/invitations/accept?token=' . $invitation->token);

            return response()->json([
                'status' => 'Invitation created successfully!',
                'invitation_link' => $invitationLink,
            ]);

            // Send invitation email @TODO Send email to user
    //        Mail::to($request->email)->send(
    //            new OrganizationInvitationMail($invitation, $request->name, $organization)
    //        );
    //
    //        return back()->with('status', 'Invitation sent successfully!');

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while creating the invitation.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function userCanInvite(User $user, Organization $organization)
    {
        // Implement your logic to determine if the user can invite others to this organization
        if ($user->isAcmeAdmin()) {
            return true;
        }

        return $user->organization_id === $organization->id && $this->isOrgAdmin($user);
    }

    private function isOrgAdmin(User $user)
    {
        // Implement your logic for checking if a user is an organization admin
        return true; // Example only
    }

    public function destroy($id): JsonResponse
    {
        try {
            $user = User::findOrFail($id);

            $user->delete();

            return response()->json([
                'status' => 'User Deleted.',
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
