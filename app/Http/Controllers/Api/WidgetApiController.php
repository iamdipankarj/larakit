<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dashboard;
use App\Services\ApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class WidgetApiController extends Controller
{
    protected ApiService $apiService;

    public function __construct(ApiService $apiService)
    {
        $this->apiService = $apiService;
    }

    public function getDashboard(): JsonResponse
    {
        $dashboard = Dashboard::first();
        return response()->json($dashboard ? $dashboard->layout : []);
    }

    public function saveDashboard(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'layout' => 'required|array'
        ]);

        // upsert logic — only one row
        $dashboard = Dashboard::firstOrNew(['id' => 1]);
        $dashboard->layout = $validated['layout'];
        $dashboard->save();

        return response()->json(['status' => 'ok']);
    }
}
