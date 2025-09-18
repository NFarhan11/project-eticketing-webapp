<template>
  <div>
    <div class="flex items-center mb-8">
      <UButton to="/admin/events" variant="ghost" icon="i-heroicons-arrow-left" class="text-gray-500 mr-4">
        Back to Events
      </UButton>
      <h1 class="text-3xl font-bold text-gray-900">Create New Event</h1>
    </div>

    <UCard class="max-w-2xl">
      <form @submit.prevent="createEvent" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
          <UInput v-model="form.name" placeholder="Enter event name" :error="errors.name" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
          <UInput v-model="form.date" type="date" :error="errors.date" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Venue</label>
          <UInput v-model="form.venue" placeholder="Enter venue name" :error="errors.venue" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Total Tickets</label>
            <UInput v-model="form.total_tickets" type="number" placeholder="Enter total tickets"
              :error="errors.total_tickets" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ticket Price ($)</label>
            <UInput v-model="form.ticket_price" type="number" step="0.01" placeholder="Enter ticket price"
              :error="errors.ticket_price" />
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <UButton to="/admin/events" variant="ghost" class="text-gray-500 hover:bg-gray-100">
            Cancel
          </UButton>
          <UButton type="submit" :loading="isSubmitting" class="bg-blue-500 hover:bg-blue-700 text-white">
            Create Event
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
const form = ref({
  name: '',
  date: '',
  venue: '',
  total_tickets: '',
  ticket_price: ''
})

const errors = ref({})
const isSubmitting = ref(false)

const createEvent = async () => {
  isSubmitting.value = true
  errors.value = {}

  try {
    // Validate form
    if (!form.value.name) errors.value.name = 'Event name is required'
    if (!form.value.date) errors.value.date = 'Event date is required'
    if (!form.value.venue) errors.value.venue = 'Venue is required'
    if (!form.value.total_tickets) errors.value.total_tickets = 'Total tickets is required'
    if (!form.value.ticket_price) errors.value.ticket_price = 'Ticket price is required'

    // Check if date is in the future
    if (form.value.date && new Date(form.value.date) <= new Date()) {
      errors.value.date = 'Event date must be in the future'
    }

    if (Object.keys(errors.value).length > 0) {
      isSubmitting.value = false
      return
    }

    // In real app, call API to create event
    // const response = await $fetch('/api/events', {
    //   method: 'POST',
    //   body: form.value
    // })

    // For now, just show success message and redirect
    alert('Event created successfully!')
    navigateTo('/admin/events')
  } catch (error) {
    console.error('Error creating event:', error)
    alert('Error creating event. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
