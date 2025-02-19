<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrganizationRequest;
use App\Http\Requests\UpdateOrganizationRequest;
use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    protected function getOrgConfig() {
        return config('org.org_list');
    }

    protected function convertToSlug(string $value) {
        // Convert to lowercase
        $value = strtolower($value);

        // Replace spaces with hyphens
        // Return the converted string
        return str_replace(' ', '-', $value);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orgList = Organization::all()->map(function ($org) {
            return [
                'id' => $org->id,
                'name' => $org->name,
                'code' => $org->code,
                'created_at' => $org->created_at,
            ];
        });
        return Inertia::render('Organizations/Index', [
            'org_list' => $orgList
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // Ensure user is Acme admin before showing the form
        if (!$request->user()->isAcmeUser()) {
            abort(403, 'You are not authorized to create organizations.');
        }

        return Inertia::render('Organizations/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrganizationRequest $request)
    {
        // Ensure user is Acme admin before proceeding

        if (!$request->user()->isAcmeUser()) {
            abort(403, 'You are not authorized to create organizations.');
        }


        // Validate input
        $allowedOrgCodes = array_keys($this->getOrgConfig());
        $request->validate([
            'code' => ['required', 'in:' . implode(',', $allowedOrgCodes)],
        ]);

        $readableName = $this->getOrgConfig()[$request->code];

        $organizationExists = Organization::where('code', $request->code)->exists();

        if ($organizationExists) {
            return redirect()->route('organizations.create')->with('error', 'Organization already exists!');
        }

        try {
            Organization::create([
                'name' => $readableName,
                'slug' => $this->convertToSlug($readableName),
                'code' => $request->code
            ]);
        } catch (\Exception $e) {
            return redirect()->route('organizations.create')->with('error', $e->getMessage());
        }

        return redirect()->to(route('organizations.users.create'))->with('status', 'Organization ' . $readableName .' created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Organization $organization)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Organization $organization)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrganizationRequest $request, Organization $organization)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organization $organization)
    {
        //
    }
}
