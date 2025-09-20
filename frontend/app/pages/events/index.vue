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

interface Event {
  id: number
  name: string
  event_date: string
  venue: string
  total_tickets: number
  available_tickets: number
  ticket_price: number
}

const events = ref<Event[]>([]);

const loadEvents = async () => {
  try {
    const response = await $fetch('/api/events', {
      method: 'GET'
    });

    events.value = response.events;
    console.log('events loaded...');
  } catch (error) {
    console.error('Failed to fetch events: ', error);
  }
};

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

onMounted(async () => {
  await loadEvents()
})
</script>
