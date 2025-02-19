<?php

namespace App\Services;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

class ApiService
{
    protected string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.larakit.base_url');
    }

    /**
     * @throws \Exception
     */
    public function makePostRequest(string $endpoint, array $data)
    {
        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json'
            ])->post($this->baseUrl . $endpoint, $data);
        } catch (ConnectionException $e) {
            return $e->getMessage();
        }

        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception('API request failed: ' . $response->body());
    }
}
