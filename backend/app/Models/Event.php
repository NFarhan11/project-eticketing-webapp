<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'name',
        'event_date',
        'venue',
        'total_tickets',
        'available_tickets',
        'ticket_price',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'event_id');
    }
}
