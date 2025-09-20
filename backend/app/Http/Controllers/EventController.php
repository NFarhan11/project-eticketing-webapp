<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class EventController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Event::query();

            // Get events ordered by event date
            $events = $query->orderBy('event_date', 'asc')->get();
            
            return response()->json([
                'message' => 'Events retrieved successfully',
                'events' => $events,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve events',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'date' => 'required|date|after:today',
                'venue' => 'required|string|max:255',
                'total_tickets' => 'required|integer|min:1',
                'ticket_price' => 'required|decimal:0,2|min:0.01'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            $event = Event::create([
                'name' => $validated['name'],
                'event_date' => $validated['date'],
                'venue' => $validated['venue'],
                'total_tickets' => $validated['total_tickets'],
                'available_tickets' => $validated['total_tickets'],
                'ticket_price' => $validated['ticket_price'],
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Event created successfully',
                'event' => $event
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create event',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
