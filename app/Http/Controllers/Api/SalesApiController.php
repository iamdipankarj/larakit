<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class SalesApiController extends Controller
{
    protected ApiService $apiService;

    public function __construct(ApiService $apiService)
    {
        $this->apiService = $apiService;
    }

    private function renderJson(string $fileName) {
        try {
            $filePath = storage_path('data/' . $fileName);

            if (!file_exists($filePath)) {
                return response()->json(['error' => 'File not found'], 404);
            }

            // Get file contents and return as JSON
            $salesData = json_decode(file_get_contents($filePath), true);

            return response()->json($salesData);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getSales(Request $request): JsonResponse {
        return $this->renderJson('sales.json');
    }

    public function salesMetrics(Request $request): JsonResponse {
        return $this->renderJson('salesMetrics.json');
    }

    public function salesVolumeMetrics(Request $request): JsonResponse {
        return $this->renderJson('salesVolumeMetrics.json');
    }

    public function activeSalesMetrics(Request $request): JsonResponse
    {
        return $this->renderJson('gmv.json');
    }

    public function generateReport(Request $request): JsonResponse
    {
        return $this->renderJson('success.json');
    }

    public function generateCSVReport(Request $request) {
        try {

            $responseData = $this->getSales($request);
            $data = $responseData->getData()->sales;

            if (empty($data) || !is_array($data)) {
                return response()->view('errors.no-data', [], 400);
            }

            // Define CSV headers
            $headers = array_map(function ($key) {
                return ucwords(str_replace('_', ' ', $key));
            }, array_keys((array)$data[0]));

            // Create a temporary file in memory
            $file = fopen('php://temp', 'w');

            // Add the headers to the CSV file
            fputcsv($file, $headers);

            // Add data rows to the CSV file
            foreach ($data as $row) {
                fputcsv($file, (array)$row);
            }

            // Reset the file pointer to the beginning
            rewind($file);

            // Capture the CSV content
            $csvContent = stream_get_contents($file);

            // Close the file pointer
            fclose($file);

            $filename = now()->format('M_d_Y') . "_sales_report.csv";

            // Define the response headers
            $responseHeaders = [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => "attachment; filename=\"{$filename}\"",
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
                'Pragma' => 'no-cache',
                'Expires' => '0'
            ];

            // Return the response with the CSV content
            return Response::make($csvContent, 200, $responseHeaders);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
