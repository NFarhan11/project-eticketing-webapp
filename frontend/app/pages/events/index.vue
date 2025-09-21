<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Events Management</h1>
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

const events = ref<AppEvent[]>([]);

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

onMounted(async () => {
  await loadEvents()
})
</script>
