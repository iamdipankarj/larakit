<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;

class WidgetChatController extends Controller
{
    public function handle(Request $request)
    {
        $message = $request->input('message');

        $response = OpenAI::chat()->create([
            'model' => 'gpt-4-0613',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a smart dashboard assistant. Always respond using the execute_instruction function. Only use "widget" values from: weather, news, or stock. Place things like city, stock symbol, or news source inside config.'],
                ['role' => 'user', 'content' => $message]
            ],
            'functions' => [[
                'name' => 'execute_instruction',
                'description' => 'Perform actions on the smart dashboard using structured JSON',
                'parameters' => [
                    'type' => 'object',
                    'properties' => [
                        'action' => [
                            'type' => 'string',
                            'enum' => ['add', 'remove', 'update', 'clear'],
                            'description' => 'What to do: add/remove/update/clear widgets'
                        ],
                        'widget' => [
                            'type' => 'string',
                            'enum' => ['weather', 'news', 'stock'],
                            'description' => 'Type of widget (e.g., weather, news, stock)'
                        ],
                        'config' => [
                            'type' => 'object',
                            'description' => 'Optional widget configuration (like city, stock symbol)',
                            'properties' => [
                                'location' => ['type' => 'string'],
                                'symbol' => ['type' => 'string'],
                                'source' => ['type' => 'string']
                            ]
                        ]
                    ],
                    'required' => ['action', 'widget']
                ]
            ]],
            'function_call' => 'auto'
        ]);

        $functionCall = $response->choices[0]->message->functionCall ?? null;

        if (!$functionCall || empty($functionCall->arguments)) {
            return response()->json([
                'error' => 'Could not parse instruction from LLM.',
                'raw' => $response->choices[0]->message
            ], 422);
        }

        return response()->json([
            'instruction' => json_decode($functionCall->arguments, true)
        ]);
    }
}
