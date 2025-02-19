<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvitationRequest;
use App\Http\Requests\UpdateInvitationRequest;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class InvitationController extends Controller
{
    public function showAcceptForm(Request $request)
    {
        if ($request->user()) {
            return redirect('/dashboard')
                ->with('info', 'You are already logged in.');
        }

        $token = $request->query('token');
        $invitation = Invitation::where('token', $token)->firstOrFail();

        if ($invitation->isExpired()) {
            return Inertia::render('Invitations/Expired');
        }

        if ($invitation->isAccepted()) {
            return redirect('/login')->with('status', 'This invitation is already used.');
        }

        $organizationName = $invitation->organization->name;

        return Inertia::render('Auth/Register', [
            'invitationToken' => $invitation->token,
            'invitationEmail' => $invitation->email,
            'organizationName' => $organizationName
        ]);
    }

    public function accept(Request $request)
    {
        $request->validate([
            'invitation_token' => 'required',
            'name' => 'required|string|max:255',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                ->letters()
                ->mixedCase()
                ->numbers()
                ->symbols()
            ],
        ]);

        $invitation = Invitation::where('token', $request->invitation_token)->firstOrFail();

        if ($invitation->isExpired()) {
            return redirect()->route('invitations.accept', ['token' => $invitation->token])->withErrors([
                'token' => 'This invitation has expired.',
            ]);
        }

        if ($invitation->isAccepted()) {
            return redirect('/login')->withErrors([
                'token' => 'This invitation was already used.',
            ]);
        }

        // Create the new User
        $user = User::create([
            'organization_id' => $invitation->organization_id,
            'name' => $request->name,
            'email' => $invitation->email,
            'password' => Hash::make($request->password),
        ]);

        $user->roles()->attach($invitation->roles->pluck('id'));

        // Mark invitation as accepted
        $invitation->update(['accepted_at' => now()]);

        // Log the user in
        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user()->isAcmeUser()) {
            $invitations = Invitation::with('roles')->get();
        } else {
            $invitations = Invitation::where('organization_id', $request->user()->organization_id)->with('roles')->get();
        }
        return Inertia::render('Invitations/Index', [
            'invitations' => $invitations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvitationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Invitation $invitation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invitation $invitation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvitationRequest $request, Invitation $invitation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        try {
            $invitation = Invitation::findOrFail($id);

            $invitation->delete();

            return response()->json([
                'status' => 'Invitation Deleted.',
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
