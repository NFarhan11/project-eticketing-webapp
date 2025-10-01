<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- Loading State -->
    <div v-if="!event" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
        <p class="text-gray-600">Loading event details...</p>
      </div>
    </div>
    <!-- Event Content -->
    <div v-else>
      <!-- Hero Section -->
      <div class="relative h-96 bg-gradient-to-r from-slate-700 to-blue-600 overflow-hidden">
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div class="text-white">
            <div class="flex items-center space-x-2 mb-4">
              <UButton to="/events" variant="ghost" size="sm"
                class="text-white border-white/30 hover:bg-white/20 hover:border-white">
                <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
                Back to Events
              </UButton>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ event.name }}</h1>
            <div class="flex flex-wrap items-center space-x-6 text-lg">
              <div class="flex items-center space-x-2">
                <UIcon name="i-heroicons-calendar-days" class="w-5 h-5" />
                <span>{{ formatDate(event.event_date) }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <UIcon name="i-heroicons-map-pin" class="w-5 h-5" />
                <span>{{ event.venue }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <UIcon name="i-heroicons-ticket" class="w-5 h-5" />
                <span>{{ event.available_tickets }} / {{ event.total_tickets }} available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Event Details -->
          <div class="lg:col-span-2 space-y-8">
            <!-- About Event -->
            <UCard class="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <template #header>
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 class="text-xl font-semibold text-gray-900">About This Event</h2>
                    <p class="text-sm text-gray-600">Everything you need to know</p>
                  </div>
                </div>
              </template>

              <div class="prose max-w-none text-gray-700">
                <p class="text-lg leading-relaxed">
                  <!-- {{ event.description }} -->
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur praesentium velit ut?
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 not-prose">
                  <div class="bg-blue-50 rounded-lg p-4">
                    <div class="flex items-center space-x-2 mb-2">
                      <UIcon name="i-heroicons-clock" class="w-5 h-5 text-blue-600" />
                      <span class="font-medium text-gray-900">Event Duration</span>
                    </div>
                    <p class="text-gray-600">
                      <!-- {{ event.duration }} --> Lorem ipsum dolor sit amet.
                    </p>
                  </div>

                  <div class="bg-green-50 rounded-lg p-4">
                    <div class="flex items-center space-x-2 mb-2">
                      <UIcon name="i-heroicons-users" class="w-5 h-5 text-green-600" />
                      <span class="font-medium text-gray-900">Age Requirement</span>
                    </div>
                    <p class="text-gray-600">
                      <!-- {{ event.ageRequirement }} -->
                      Lorem ipsum dolor sit.
                    </p>
                  </div>

                  <div class="bg-purple-50 rounded-lg p-4">
                    <div class="flex items-center space-x-2 mb-2">
                      <UIcon name="i-heroicons-musical-note" class="w-5 h-5 text-purple-600" />
                      <span class="font-medium text-gray-900">Genre</span>
                    </div>
                    <p class="text-gray-600">
                      <!-- {{ event.genre }} -->
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum culpa et dicta molestiae, sit
                      temporibus.
                    </p>
                  </div>

                  <div class="bg-orange-50 rounded-lg p-4">
                    <div class="flex items-center space-x-2 mb-2">
                      <UIcon name="i-heroicons-building-storefront" class="w-5 h-5 text-orange-600" />
                      <span class="font-medium text-gray-900">Organizer</span>
                    </div>
                    <p class="text-gray-600">
                      <!-- {{ event.organizer }} -->
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates cum id molestiae!
                    </p>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Venue Details -->
            <UCard class="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <template #header>
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <UIcon name="i-heroicons-building-office-2" class="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 class="text-xl font-semibold text-gray-900">Venue Information</h2>
                    <p class="text-sm text-gray-600">Location details and directions</p>
                  </div>
                </div>
              </template>

              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p class="font-medium text-gray-900">{{ event.venue }}</p>
                    <p class="text-gray-600">
                      <!-- {{ event.address }} -->
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat reiciendis itaque vel vitae
                      exercitationem
                      consequuntur nesciunt eum tempore officiis libero?
                    </p>
                  </div>
                </div>

                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="font-medium text-gray-900 mb-2">Getting There</h4>
                  <div class="space-y-2 text-sm text-gray-600">
                    <p><strong>By Car:</strong>
                      <!-- {{ event.directions.car }} -->
                      Lorem ipsum dolor sit amet.
                    </p>
                    <p><strong>By Public Transport:</strong>
                      <!-- {{ event.directions.transport }} -->
                      Lorem ipsum dolor sit amet.
                    </p>
                    <p><strong>Parking:</strong>
                      <!-- {{ event.directions.parking }} -->
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>
              </div>
            </UCard>
          </div>

          <!-- Booking Sidebar -->
          <div class="lg:col-span-1">
            <div class="sticky top-8">
              <UCard class="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <template #header>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-gray-900 mb-2">
                      RM{{ event.ticket_price.toFixed(2) }}
                    </div>
                    <p class="text-sm text-gray-600">per ticket</p>
                  </div>
                </template>

                <div class="space-y-6">
                  <!-- Availability Status -->
                  <div class="text-center">
                    <div class="flex items-center justify-center space-x-2 mb-2">
                      <div class="w-3 h-3 rounded-full" :class="isSoldOut ? 'bg-red-400' : 'bg-green-400'"></div>
                      <span class="text-sm font-medium" :class="isSoldOut ? 'text-red-700' : 'text-green-700'">
                        {{ isSoldOut ? 'Sold Out' : 'Available' }}
                      </span>
                    </div>
                    <p class="text-sm" :class="isSoldOut ? 'text-red-600 font-semibold' : 'text-gray-600'">
                      <template v-if="isSoldOut">
                        All tickets have been sold
                      </template>
                      <template v-else>
                        {{ event.available_tickets }} of {{ event.total_tickets }} tickets remaining
                      </template>
                    </p>
                  </div>

                  <!-- Progress Bar -->
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                      :style="`width: ${((event.total_tickets - event.available_tickets) / event.total_tickets) * 100}%`">
                    </div>
                  </div>

                  <!-- Ticket Quantity Selector -->
                  <div class="space-y-3">
                    <label class="block text-sm font-medium text-gray-900">Number of Tickets</label>
                    <div class="flex items-center space-x-3">
                      <UButton variant="outline" size="sm" @click="decrementTickets"
                        :disabled="ticketQuantity <= 1 || isSoldOut">
                        <UIcon name="i-heroicons-minus" class="w-4 h-4" />
                      </UButton>
                      <div class="flex-1 text-center">
                        <span class="text-xl font-semibold">{{ ticketQuantity }}</span>
                      </div>
                      <UButton variant="outline" size="sm" @click="incrementTickets"
                        :disabled="ticketQuantity >= Math.min(8, event.available_tickets)">
                        <UIcon name="i-heroicons-plus" class="w-4 h-4" />
                      </UButton>
                    </div>
                    <p class="text-xs text-gray-500 text-center">Maximum 8 tickets per order</p>
                  </div>

                  <!-- Total Price -->
                  <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm text-gray-600">{{ ticketQuantity }} × RM{{ event.ticket_price }}</span>
                      <span class="text-lg font-semibold text-gray-900">
                        RM{{ (ticketQuantity * event.ticket_price).toFixed(2) }}
                      </span>
                    </div>
                  </div>

                  <!-- Book Now Button -->
                  <UButton size="lg" block :disabled="isSoldOut"
                    :class="isSoldOut
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105'"
                    @click="bookTickets">
                    <UIcon :name="isSoldOut ? 'i-heroicons-x-circle' : 'i-heroicons-ticket'" class="w-5 h-5 mr-2" />
                    <span v-if="isSoldOut">Sold Out</span>
                    <span v-else>Book {{ ticketQuantity > 1 ? 'Tickets' : 'Ticket' }} Now</span>
                  </UButton>

                  <!-- Additional Info -->
                  <div class="text-center space-y-2 text-xs text-gray-500">
                    <p>✓ Instant confirmation</p>
                    <p>✓ Mobile tickets</p>
                    <p>✓ 24/7 customer support</p>
                  </div>
                </div>
              </UCard>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';

const route = useRoute();
const eventId = route.params.id;

const ticketQuantity = ref(1);

// Check if event is sold out
const isSoldOut = computed(() => {
  return event.value?.available_tickets === 0;
});

// Mock event data - replace with actual API call later
// const event = ref({
//   id: eventId,
//   name: "Summer Music Festival 2024",
//   date: "2024-07-15T19:00:00Z",
//   venue: "KLCC Convention Centre",
//   address: "Kuala Lumpur Convention Centre, Kuala Lumpur City Centre, 50088 Kuala Lumpur",
//   total_tickets: 500,
//   available_tickets: 342,
//   ticket_price: 89.90,
//   description: "Join us for an unforgettable evening of music, entertainment, and community at the Summer Music Festival 2024. Featuring renowned local and international artists, this event promises to be the highlight of your summer. Experience world-class performances in a vibrant atmosphere surrounded by fellow music enthusiasts.",
//   duration: "6 hours (7:00 PM - 1:00 AM)",
//   ageRequirement: "18+ (ID required)",
//   genre: "Pop, Rock, Electronic",
//   organizer: "EventCo Productions",
//   directions: {
//     car: "Take the KLCC exit from Jalan Ampang. Parking available at KLCC parking levels B1-B4.",
//     transport: "Take LRT to KLCC station. The venue is a 3-minute walk from the station.",
//     parking: "RM5 per hour. Valet parking available for RM20."
//   }
// });

// Define validation schema
const bookingSchema = z.object({
  user_id: z.number().min(1, 'User authentication required'),
  event_id: z.number().min(1, 'Invalid event'),
  num_of_tickets: z
    .number()
    .min(1, 'At least 1 ticket required')
    .max(8, 'Maximum 8 tickets per order'),
  total_ticket_price: z
    .number()
    .min(0.01, 'Invalid ticket price')
});

type BookingSchema = z.output<typeof bookingSchema>;

// Load event
const event = ref<AppEvent>();
const loadEvent = async () => {
  try {
    const response = await $fetch(`/api/events/${eventId}`, {
      method: 'GET'
    });

    event.value = response.event;
    console.log('event loaded...');
  } catch (error) {
    console.error('Failed to fetch event: ', error);
  }
};

const toast = useToast();

// Book ticket
const bookTickets = async () => {
  try {
    const payload: BookingSchema = {
      user_id: 1, // placeholder
      event_id: Number(eventId),
      num_of_tickets: ticketQuantity.value,
      total_ticket_price: Number((ticketQuantity.value * (event.value?.ticket_price ?? 0)).toFixed(2))
    };

    // validate the data (manual zod)
    const validated = bookingSchema.parse(payload);

    const response = await $fetch('/api/bookings', {
      method: 'POST',
      body: validated
    });

    toast.add({
      title: 'Success',
      description: `Successfully booked ${ticketQuantity.value} ticket${ticketQuantity.value > 1 ? 's' : ''}!`,
      color: 'success'
    });

    // Reset ticket quantity
    ticketQuantity.value = 1;

    // Redirect to bookings page after a short delay
    setTimeout(() => {
      navigateTo('/bookings');
    }, 1500);

  } catch (error: any) {
    console.error('Booking failed:', error);

    if (error.name === 'ZodError') {
      // Handle validation errors
      toast.add({
        title: 'Validation Error',
        description: error.errors[0]?.message || 'Invalid booking data',
        color: 'error'
      });
    } else {
      // Handle API errors
      toast.add({
        title: 'Booking Failed',
        description: error.data?.message || 'Unable to process booking',
        color: 'error'
      });
    }
  }
};

const incrementTickets = () => {
  if (ticketQuantity.value < Math.min(8, event.value?.available_tickets ?? 0)) {
    ticketQuantity.value++;
  }
};

const decrementTickets = () => {
  if (ticketQuantity.value > 1) {
    ticketQuantity.value--;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-MY', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Set page meta
definePageMeta({
  layout: "default",
});

onMounted(async () => {
  await loadEvent();
})
</script>