<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class BookingController extends Controller
{
    public function index(Request $request) {

        $userId = $request->input('user_id');
        
        $bookings = Booking::with('event')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json([
            'bookings' => $bookings
        ], 200);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|integer',
                'event_id' => 'required|integer',
                'num_of_tickets' => 'required|integer|min:1',
                'total_ticket_price' => 'required|decimal:0,2|min:0.01'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            // Check ticket availability
            $event = Event::findOrFail($validated['event_id']);
            if ($event->available_tickets < $validated['num_of_tickets']) {
                DB::rollBack();
                return response()->json([
                    'message' => 'Not enough tickets available',
                    'available' => $event->available_tickets,
                    'requested' => $validated['num_of_tickets']
                ], 400);

            }

            // Create booking record
            $booking = Booking::create([
                'user_id' => $validated['user_id'],
                'event_id' => $validated['event_id'],
                'num_of_tickets' => $validated['num_of_tickets'],
                'total_ticket_price' => $validated['total_ticket_price']
            ]);

            // Reduce available ticket count
            $event->decrement('available_tickets', $validated['num_of_tickets']);

            DB::commit();

            return response()->json([
                'message' => 'Booking created successfully',
                'booking' => $booking
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create booking',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $booking = Booking::findOrFail($id);

            // Return tickets to event
            $event = Event::findOrFail($booking->event_id);
            $event->increment('available_tickets', $booking->num_of_tickets);

            // Delete booking
            $booking->delete();

            DB::commit();

            return response()->json([
                'message' => 'Booking deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to delete booking',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
