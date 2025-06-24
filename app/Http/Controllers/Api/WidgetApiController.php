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
        try {

            $layout = $request->input('layout');

            // upsert logic — only one row
            $dashboard = Dashboard::firstOrNew(['id' => 1]);
            $dashboard->layout = $layout;
            $dashboard->save();

            return response()->json(['status' => 'ok'], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Prevent redirect on validation error
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Throwable $e) {
            // Prevent redirect on any other error
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
