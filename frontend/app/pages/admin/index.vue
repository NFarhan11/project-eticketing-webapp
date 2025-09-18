<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <UCard>
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <UIcon name="i-heroicons-calendar-days" class="w-6 h-6" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Events</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.totalEvents }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <UIcon name="i-heroicons-ticket" class="w-6 h-6" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Bookings</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.totalBookings }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-600">
            <UIcon name="i-heroicons-users" class="w-6 h-6" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Users</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.totalUsers }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Revenue</p>
            <p class="text-2xl font-semibold text-gray-900">${{ stats.totalRevenue }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Events -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900">Recent Events</h3>
        </template>
        <div class="space-y-4">
          <div v-for="event in recentEvents" :key="event.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-900">{{ event.name }}</p>
              <p class="text-sm text-gray-600">{{ event.venue }} • {{ formatDate(event.event_date) }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900">{{ event.available_tickets }}/{{ event.total_tickets }}</p>
              <p class="text-xs text-gray-500">tickets left</p>
            </div>
          </div>
          <UButton to="/admin/events" variant="ghost" color="blue" class="w-full">
            View All Events
          </UButton>
        </div>
      </UCard>

      <!-- Recent Bookings -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900">Recent Bookings</h3>
        </template>
        <div class="space-y-4">
          <div v-for="booking in recentBookings" :key="booking.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-900">{{ booking.event?.name }}</p>
              <p class="text-sm text-gray-600">{{ booking.user?.name }} • {{ booking.num_of_tickets }} tickets</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900">${{ booking.total_ticket_price }}</p>
              <p class="text-xs text-gray-500">{{ formatDate(booking.created_at) }}</p>
            </div>
          </div>
          <UButton to="/admin/bookings" variant="ghost" color="blue" class="w-full">
            View All Bookings
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

// Mock data for now - in real app, this would come from API
const stats = ref({
  totalEvents: 12,
  totalBookings: 156,
  totalUsers: 89,
  totalRevenue: 12450.00
})

const recentEvents = ref([
  {
    id: 1,
    name: "Summer Music Festival",
    venue: "Central Park",
    event_date: "2024-08-15",
    total_tickets: 500,
    available_tickets: 120
  },
  {
    id: 2,
    name: "Tech Conference 2024",
    venue: "Convention Center",
    event_date: "2024-09-20",
    total_tickets: 200,
    available_tickets: 45
  },
  {
    id: 3,
    name: "Art Exhibition",
    venue: "Museum of Modern Art",
    event_date: "2024-10-05",
    total_tickets: 100,
    available_tickets: 78
  }
])

const recentBookings = ref([
  {
    id: 1,
    event: { name: "Summer Music Festival" },
    user: { name: "John Doe" },
    num_of_tickets: 2,
    total_ticket_price: 120.00,
    created_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    event: { name: "Tech Conference 2024" },
    user: { name: "Jane Smith" },
    num_of_tickets: 1,
    total_ticket_price: 75.00,
    created_at: "2024-01-15T09:15:00Z"
  },
  {
    id: 3,
    event: { name: "Art Exhibition" },
    user: { name: "Mike Johnson" },
    num_of_tickets: 3,
    total_ticket_price: 45.00,
    created_at: "2024-01-14T16:45:00Z"
  }
])

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
