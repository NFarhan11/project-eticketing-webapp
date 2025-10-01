<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- Hero Header -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex items-center space-x-4">
          <div
            class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
            <UIcon name="i-heroicons-ticket" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-4xl font-bold text-white">Browse Events</h1>
            <p class="text-blue-100 mt-2">Discover amazing events happening near you</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Events Table -->
      <UCard class="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <template #header>
          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">Available Events</h2>
              <p class="text-sm text-gray-600">Click on any event to view details and book tickets</p>
            </div>
          </div>
        </template>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-gray-50 to-blue-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div class="flex items-center space-x-2">
                    <UIcon name="i-heroicons-musical-note" class="w-4 h-4 text-blue-600" />
                    <span>Event</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div class="flex items-center space-x-2">
                    <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 text-green-600" />
                    <span>Date</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div class="flex items-center space-x-2">
                    <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-purple-600" />
                    <span>Venue</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div class="flex items-center space-x-2">
                    <UIcon name="i-heroicons-ticket" class="w-4 h-4 text-indigo-600" />
                    <span>Availability</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div class="flex items-center space-x-2">
                    <UIcon name="i-heroicons-currency-dollar" class="w-4 h-4 text-orange-600" />
                    <span>Price</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white/50 backdrop-blur-sm divide-y divide-gray-100">
              <tr v-for="event in events" :key="event.id"
                class="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] transform"
                @click="navigateTo(`/events/${event.id}`)">
                <td class="px-6 py-5">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                      <UIcon name="i-heroicons-calendar-days" class="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div class="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {{ event.name }}
                      </div>
                      <div class="text-sm text-gray-500 group-hover:text-blue-600">Click to view details</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <div class="flex items-center space-x-2">
                    <UIcon name="i-heroicons-clock"
                      class="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors" />
                    <div class="text-sm font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                      {{ formatDate(event.event_date) }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <div class="flex items-center space-x-2">
                    <UIcon name="i-heroicons-building-office-2"
                      class="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                    <div class="text-sm font-medium text-gray-900 group-hover:text-purple-700 transition-colors">
                      {{ event.venue }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <div class="space-y-2">
                    <div class="flex items-center justify-between text-sm">
                      <span class="font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">
                        {{ event.available_tickets }} / {{ event.total_tickets }}
                      </span>
                      <span class="text-xs text-gray-500">
                        {{ Math.round((Number(event.available_tickets) / Number(event.total_tickets)) * 100) }}% left
                      </span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        class="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 group-hover:from-blue-600 group-hover:to-indigo-700"
                        :style="{ width: `${(Number(event.total_tickets) - Number(event.available_tickets)) / Number(event.total_tickets) * 100}%` }">
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <div class="flex items-center space-x-2">
                    <div class="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      RM{{ Number(event.ticket_price).toFixed(2) }}
                    </div>
                    <div
                      class="px-2 py-1 bg-green-100 group-hover:bg-green-200 text-green-800 text-xs font-medium rounded-full transition-colors">
                      Available
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </UCard>
    </div>
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
  return new Date(dateString).toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

onMounted(async () => {
  await loadEvents();
});
</script>
