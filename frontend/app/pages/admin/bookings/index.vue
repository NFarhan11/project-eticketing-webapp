<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Bookings Management</h1>

    <!-- Filters -->
    <UCard class="mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Event</label>
          <USelect v-model="selectedEvent" :options="eventOptions" placeholder="All Events" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
          <USelect v-model="selectedStatus" :options="statusOptions" placeholder="All Statuses" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <UInput v-model="searchQuery" placeholder="Search by user name or email"
            icon="i-heroicons-magnifying-glass" />
        </div>
      </div>
    </UCard>

    <!-- Bookings Table -->
    <UCard>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tickets
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="booking in filteredBookings" :key="booking.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">#{{ booking.id }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ booking.user.name }}</div>
                  <div class="text-sm text-gray-500">{{ booking.user.email }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ booking.event.name }}</div>
                  <div class="text-sm text-gray-500">{{ formatDate(booking.event.event_date) }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ booking.num_of_tickets }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${{ booking.total_ticket_price }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(booking.created_at) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <UButton size="xs" variant="ghost" color="blue" icon="i-heroicons-eye" @click="viewBooking(booking)">
                    View
                  </UButton>
                  <UButton size="xs" variant="ghost" color="red" icon="i-heroicons-x-mark"
                    @click="cancelBooking(booking.id)">
                    Cancel
                  </UButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ filteredBookings.length }} of {{ bookings.length }} bookings
          </div>
          <div class="flex space-x-2">
            <UButton size="sm" variant="ghost" color="gray" disabled>
              Previous
            </UButton>
            <UButton size="sm" variant="ghost" color="gray" disabled>
              Next
            </UButton>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
// Mock data for now - in real app, this would come from API
const bookings = ref([
  {
    id: 1,
    user: { name: "John Doe", email: "john@example.com" },
    event: { name: "Summer Music Festival", event_date: "2024-08-15" },
    num_of_tickets: 2,
    total_ticket_price: 120.00,
    created_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    user: { name: "Jane Smith", email: "jane@example.com" },
    event: { name: "Tech Conference 2024", event_date: "2024-09-20" },
    num_of_tickets: 1,
    total_ticket_price: 75.00,
    created_at: "2024-01-15T09:15:00Z"
  },
  {
    id: 3,
    user: { name: "Mike Johnson", email: "mike@example.com" },
    event: { name: "Art Exhibition", event_date: "2024-10-05" },
    num_of_tickets: 3,
    total_ticket_price: 45.00,
    created_at: "2024-01-14T16:45:00Z"
  },
  {
    id: 4,
    user: { name: "Sarah Wilson", email: "sarah@example.com" },
    event: { name: "Food & Wine Festival", event_date: "2024-11-12" },
    num_of_tickets: 4,
    total_ticket_price: 180.00,
    created_at: "2024-01-13T14:20:00Z"
  }
])

const selectedEvent = ref('')
const selectedStatus = ref('')
const searchQuery = ref('')

const eventOptions = [
  { label: 'All Events', value: '' },
  { label: 'Summer Music Festival', value: '1' },
  { label: 'Tech Conference 2024', value: '2' },
  { label: 'Art Exhibition', value: '3' },
  { label: 'Food & Wine Festival', value: '4' }
]

const statusOptions = [
  { label: 'All Statuses', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Cancelled', value: 'cancelled' }
]

const filteredBookings = computed(() => {
  let filtered = bookings.value

  if (selectedEvent.value) {
    filtered = filtered.filter(booking => booking.event.name === eventOptions.find(e => e.value === selectedEvent.value)?.label)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(booking =>
      booking.user.name.toLowerCase().includes(query) ||
      booking.user.email.toLowerCase().includes(query)
    )
  }

  return filtered
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const viewBooking = (booking: any) => {
  // Show booking details modal or navigate to detail page
  alert(`Booking #${booking.id} details:\nUser: ${booking.user.name}\nEvent: ${booking.event.name}\nTickets: ${booking.num_of_tickets}\nTotal: $${booking.total_ticket_price}`)
}

const cancelBooking = (bookingId: number) => {
  if (confirm('Are you sure you want to cancel this booking?')) {
    // In real app, call API to cancel booking
    bookings.value = bookings.value.filter(b => b.id !== bookingId)
    alert('Booking cancelled successfully!')
  }
}
</script>
