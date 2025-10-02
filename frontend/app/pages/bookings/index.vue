<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- Hero Header -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-700 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <UIcon name="i-heroicons-ticket" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 class="text-4xl font-bold text-white">My Bookings</h1>
              <p class="text-indigo-100 mt-2">View and manage your ticket bookings</p>
            </div>
          </div>
          <UButton to="/events" variant="ghost" size="lg"
            class="text-white border-white/30 hover:bg-white/20 hover:border-white">
            <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 mr-2" />
            Back to Events
          </UButton>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-[400px]">
      <div class="text-center">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
        <p class="text-gray-600">Loading your bookings...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Empty State -->
      <div v-if="bookings.length === 0" class="text-center py-16">
        <UCard class="shadow-xl border-0 bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
          <div class="py-12">
            <div
              class="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-heroicons-ticket" class="w-10 h-10 text-gray-500" />
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-3">No Bookings Yet</h3>
            <p class="text-gray-600 mb-8">You haven't made any ticket bookings. Explore our events and book your first
              ticket!</p>
            <UButton to="/events" size="lg"
              class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
              <UIcon name="i-heroicons-calendar-days" class="w-5 h-5 mr-2" />
              Browse Events
            </UButton>
          </div>
        </UCard>
      </div>

      <!-- Bookings List -->
      <div v-else class="space-y-6">
        <!-- Summary Card -->
        <UCard class="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Total Bookings</h3>
                <p class="text-sm text-gray-600">{{ bookings.length }} {{ bookings.length === 1 ? 'booking' : 'bookings'
                  }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600 mb-1">Total Spent</p>
              <p class="text-2xl font-bold text-gray-900">
                RM{{ totalSpent.toFixed(2) }}
              </p>
            </div>
          </div>
        </UCard>

        <!-- Booking Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UCard v-for="booking in bookings" :key="booking.id"
            class="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <div class="space-y-4">
              <!-- Header -->
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">{{ booking.event.name }}</h3>
                  <div class="flex items-center space-x-2 text-sm text-gray-600">
                    <UIcon name="i-heroicons-calendar-days" class="w-4 h-4" />
                    <span>{{ formatDate(booking.event.event_date) }}</span>
                  </div>
                </div>
                <div class="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  Confirmed
                </div>
              </div>

              <!-- Divider -->
              <div class="border-t border-gray-200"></div>

              <!-- Details Grid -->
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <div class="flex items-center space-x-2 text-gray-600">
                    <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
                    <span class="text-sm font-medium">Venue</span>
                  </div>
                  <p class="text-sm text-gray-900 font-semibold pl-6">{{ booking.event.venue }}</p>
                </div>

                <div class="space-y-1">
                  <div class="flex items-center space-x-2 text-gray-600">
                    <UIcon name="i-heroicons-ticket" class="w-4 h-4" />
                    <span class="text-sm font-medium">Tickets</span>
                  </div>
                  <p class="text-sm text-gray-900 font-semibold pl-6">{{ booking.num_of_tickets }} {{
                    booking.num_of_tickets === 1 ? 'ticket' : 'tickets' }}</p>
                </div>

                <div class="space-y-1">
                  <div class="flex items-center space-x-2 text-gray-600">
                    <UIcon name="i-heroicons-currency-dollar" class="w-4 h-4" />
                    <span class="text-sm font-medium">Total Price</span>
                  </div>
                  <p class="text-sm text-gray-900 font-semibold pl-6">
                    RM{{ Number(booking.total_ticket_price).toFixed(2) }}
                  </p>
                </div>

                <div class="space-y-1">
                  <div class="flex items-center space-x-2 text-gray-600">
                    <UIcon name="i-heroicons-clock" class="w-4 h-4" />
                    <span class="text-sm font-medium">Booked On</span>
                  </div>
                  <p class="text-sm text-gray-900 font-semibold pl-6">{{ formatBookingDate(booking.created_at) }}</p>
                </div>
              </div>

              <!-- Divider -->
              <div class="border-t border-gray-200"></div>

              <!-- Footer -->
              <div class="flex items-center justify-between">
                <div class="text-xs text-gray-500">
                  Booking ID: #{{ booking.id }}
                </div>
                <div class="flex items-center space-x-2">
                  <UButton :to="`/events/${booking.event.id}`" variant="outline" size="sm">
                    <UIcon name="i-heroicons-eye" class="w-4 h-4 mr-2" />
                    View Event
                  </UButton>
                  <UButton @click="bookingId = booking.id; isOpen = true" label="Cancel" color="error" variant="outline"
                    size="sm" icon="i-heroicons-x-mark" />
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
    <!-- Cancel Booking Modal -->
    <UModal v-model:open="isOpen" title="Cancel Booking"
      description="Are you sure you want to cancel this booking? This action cannot be undone.">
      <template #body>
        <div class="bg-red-50 border border-red-100 rounded-lg p-4">
          <div class="flex items-start space-x-3">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-10 h-10 text-red-600" />
            <div>
              <p class="text-gray-600">Are you sure you want to cancel this booking?</p>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Keep Booking" variant="outline" @click="isOpen = false" />
        <UButton label="Cancel Booking" color="error" @click="deleteBooking" :loading="loading" />
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "default",
});

const isOpen = ref<boolean>(false)
const bookings = ref<AppBooking[]>([]);
const loading = ref<boolean>(true);
const bookingId = ref<number | null>(null);

// Load bookings
const loadBookings = async () => {
  loading.value = true;
  try {
    const response = await $fetch('/api/bookings', {
      method: 'GET',
      query: {
        user_id: 1 // TODO: authentication
      }
    });

    bookings.value = response.bookings;
    console.log('bookings loaded...');
  } catch (error) {
    console.error('Failed to fetch bookings: ', error);
  } finally {
    loading.value = false;
  }
};

// Computed total spent
const totalSpent = computed(() => {
  let sum = 0;
  bookings.value.forEach(booking => {
    sum += Number(booking.total_ticket_price);
  });
  return sum;
});

// Format event date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-MY', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format booking date
const formatBookingDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Cancel booking
const deleteBooking = async () => {
  if (!bookingId.value) return;

  loading.value = true;
  try {
    await $fetch(`/api/bookings/${bookingId.value}`, {
      method: 'DELETE'
    });

    // Remove booking from list
    bookings.value = bookings.value.filter(b => b.id !== bookingId.value);

    // Close modal
    isOpen.value = false;
    bookingId.value = null;

    console.log('Booking cancelled successfully');
  } catch (error) {
    console.error('Failed to cancel booking:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await loadBookings();
});
</script>