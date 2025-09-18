<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Events Management</h1>
      <UButton to="/admin/events/create" color="warning" icon="i-heroicons-plus">
        Create New Event
      </UButton>
    </div>

    <!-- Events Table -->
    <UCard>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Venue
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tickets
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="event in events" :key="event.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ event.name }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(event.event_date) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ event.venue }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ event.available_tickets }} / {{ event.total_tickets }}
                  <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div class="bg-blue-600 h-2 rounded-full"
                      :style="{ width: `${(event.total_tickets - event.available_tickets) / event.total_tickets * 100}%` }">
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${{ event.ticket_price }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <UButton size="xs" variant="ghost" icon="i-heroicons-pencil" @click="editEvent(event)"
                    class="text-blue-500 hover:bg-blue-100">
                    Edit
                  </UButton>
                  <UButton size="xs" variant="ghost" icon="i-heroicons-trash" @click="deleteEvent(event.id)"
                    class="text-red-500 hover:bg-red-100">
                    Delete
                  </UButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
// Mock data for now - in real app, this would come from API
const events = ref([
  {
    id: 1,
    name: "Summer Music Festival",
    event_date: "2024-08-15",
    venue: "Central Park",
    total_tickets: 500,
    available_tickets: 120,
    ticket_price: 60.00
  },
  {
    id: 2,
    name: "Tech Conference 2024",
    event_date: "2024-09-20",
    venue: "Convention Center",
    total_tickets: 200,
    available_tickets: 45,
    ticket_price: 75.00
  },
  {
    id: 3,
    name: "Art Exhibition",
    event_date: "2024-10-05",
    venue: "Museum of Modern Art",
    total_tickets: 100,
    available_tickets: 78,
    ticket_price: 15.00
  },
  {
    id: 4,
    name: "Food & Wine Festival",
    event_date: "2024-11-12",
    venue: "Downtown Plaza",
    total_tickets: 300,
    available_tickets: 300,
    ticket_price: 45.00
  }
])

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const editEvent = (event: any) => {
  // Navigate to edit page
  navigateTo(`/admin/events/${event.id}/edit`)
}

const deleteEvent = (eventId: number) => {
  // Show confirmation dialog and delete event
  if (confirm('Are you sure you want to delete this event?')) {
    // In real app, call API to delete
    events.value = events.value.filter(e => e.id !== eventId)
  }
}
</script>
