<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirectToGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback() {
        try {
            $googleUser = Socialite::driver('google')->user();
            $isSuperAdmin = $googleUser->getEmail() === 'iamdipankarj@gmail.com';

            if ($isSuperAdmin) {
                $organization = Organization::where(['code' => 'ACME'])->first();
                $user = User::updateOrCreate(
                    ['email' => $googleUser->getEmail()],
                    [
                        'name' => $googleUser->getName(),
                        'email' => $googleUser->getEmail(),
                        'avatar' => $googleUser->getAvatar(),
                        'google_id' => $googleUser->getId(),
                        'organization_id' => $organization->id,
                        'google_token' => $googleUser->token,
                        'google_refresh_token' => $googleUser->refreshToken
                    ]
                );

                $adminRole = Role::where('code', 'ADMIN')->first();
                if (isset($adminRole) && !empty($adminRole && !$user->roles()->where('code', 'ADMIN')->exists())) {
                    $user->roles()->attach($adminRole);
                }
                Auth::login($user);

                return redirect()->route('dashboard');
            } else {
                // If some other user, allow them to login and update their OAUTH creds.
                $user = User::where(['email' => $googleUser->getEmail()])->first();

                if (isset($user)) {
                    $user->update([
                        'avatar' => $googleUser->getAvatar(),
                        'google_id' => $googleUser->getId(),
                        'google_token' => $googleUser->token,
                        'google_refresh_token' => $googleUser->refreshToken
                    ]);
                    Auth::login($user);

                    return redirect()->route('dashboard');
                }
            }

            return redirect()->route('login')->with('error', 'You are not authorized to login. Please ask your administrator to send you an invitation.');
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', $e->getMessage() || 'Failed to authenticate with Google');
        }
    }
}
