<?php

namespace App\Http\Middleware;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $orgList = [];
        $currentOrg = [];
        $isAcmeUser = false;

        if (Auth::check()) {
            $isAcmeUser = $request->user()->isAcmeUser();
            if ($isAcmeUser) {
                $orgList = config('org.org_list');
            }

            $organization = $request->user()->organization;

            if (isset($organization)) {
                $currentOrg = [
                    'name' => $organization->name,
                    'slug' => $organization->slug,
                    'code' => $organization->code
                ];
            }

            $currentUser = User::with('roles')->find($request->user()->id);
        } else {
            $currentUser = $request->user();
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $currentUser,
                'acme_user' => $isAcmeUser,
            ],
            'org_list' => $orgList,
            'current_org' => $currentOrg,
            'flash' => [
                'info' => fn() => $request->session()->get('info'),
                'status' => fn() => $request->session()->get('status'),
                'error' => fn() => $request->session()->get('error')
            ]
        ];
    }
}
