<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <UButton to="/admin/events" variant="ghost" icon="i-heroicons-arrow-left"
              class="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
              Back to Events
            </UButton>
            <div class="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Create New Event</h1>
              <p class="text-sm text-gray-600 mt-1">Fill in the details to create a new event for your audience</p>
            </div>
          </div>
          <div class="hidden md:flex items-center space-x-2">
            <div class="flex items-center text-sm text-gray-500">
              <span class="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Progress Indicator -->
      <div class="mb-8">
        <div class="flex items-center justify-center space-x-4">
          <div class="flex items-center">
            <div
              class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span class="ml-2 text-sm font-medium text-blue-600">Event Details</span>
          </div>
          <div class="w-16 h-px bg-gray-300"></div>
          <div class="flex items-center">
            <div
              class="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span class="ml-2 text-sm text-gray-500">Review & Create</span>
          </div>
        </div>
      </div>

      <!-- Form Card -->
      <UCard class="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <template #header>
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Icon name="i-heroicons-calendar-days" class="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 class="text-lg font-semibold text-gray-900">Event Information</h2>
              <p class="text-sm text-gray-600">Provide the basic details for your event</p>
            </div>
          </div>
        </template>

        <form @submit.prevent="onSubmit" class="space-y-8">
          <!-- Event Name Section -->
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <Icon name="i-heroicons-tag" class="w-5 h-5 text-gray-400" />
              <label class="text-sm font-semibold text-gray-900">Event Name</label>
              <span class="text-red-500">*</span>
            </div>
            <UInput v-model="name" placeholder="e.g., Summer Music Festival 2024" size="lg" :error="!!nameError"
              class="transition-all duration-200 focus-within:scale-[1.02]" />
            <div v-if="nameError"
              class="flex items-center space-x-2 mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
              <Icon name="i-heroicons-exclamation-triangle" class="w-4 h-4 text-red-500 flex-shrink-0" />
              <span class="text-red-600 text-sm font-medium">{{ nameError }}</span>
            </div>
            <p class="text-xs text-gray-500">Choose a memorable name that captures the essence of your event</p>
          </div>

          <!-- Date and Venue Section -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="space-y-4">
              <div class="flex items-center space-x-2">
                <Icon name="i-heroicons-calendar" class="w-5 h-5 text-gray-400" />
                <label class="text-sm font-semibold text-gray-900">Event Date</label>
                <span class="text-red-500">*</span>
              </div>
              <UInput v-model="date" type="date" size="lg" :error="!!dateError"
                class="transition-all duration-200 focus-within:scale-[1.02]" />
              <div v-if="dateError"
                class="flex items-center space-x-2 mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                <Icon name="i-heroicons-exclamation-triangle" class="w-4 h-4 text-red-500 flex-shrink-0" />
                <span class="text-red-600 text-sm font-medium">{{ dateError }}</span>
              </div>
              <p class="text-xs text-gray-500">Select a future date for your event</p>
            </div>

            <div class="space-y-4">
              <div class="flex items-center space-x-2">
                <Icon name="i-heroicons-map-pin" class="w-5 h-5 text-gray-400" />
                <label class="text-sm font-semibold text-gray-900">Venue</label>
                <span class="text-red-500">*</span>
              </div>
              <UInput v-model="venue" placeholder="e.g., Madison Square Garden, New York" :error="!!venueError"
                size="lg" class="transition-all duration-200 focus-within:scale-[1.02]" />
              <div v-if="venueError"
                class="flex items-center space-x-2 mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                <Icon name="i-heroicons-exclamation-triangle" class="w-4 h-4 text-red-500 flex-shrink-0" />
                <span class="text-red-600 text-sm font-medium">{{ venueError }}</span>
              </div>
              <p class="text-xs text-gray-500">Specify the location where the event will take place</p>
            </div>
          </div>

          <!-- Tickets and Pricing Section -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <div class="flex items-center space-x-2 mb-6">
              <Icon name="i-heroicons-ticket" class="w-5 h-5 text-blue-600" />
              <h3 class="text-lg font-semibold text-gray-900">Ticketing Details</h3>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div class="flex items-center space-x-2">
                  <Icon name="i-heroicons-users" class="w-4 h-4 text-gray-400" />
                  <label class="text-sm font-semibold text-gray-900">Total Tickets</label>
                  <span class="text-red-500">*</span>
                </div>
                <UInput v-model="totalTickets" type="number" placeholder="e.g., 500" size="lg"
                  :error="!!totalTicketsError" class="transition-all duration-200 focus-within:scale-[1.02]" />
                <div v-if="totalTicketsError"
                  class="flex items-center space-x-2 mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                  <Icon name="i-heroicons-exclamation-triangle" class="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span class="text-red-600 text-sm font-medium">{{ totalTicketsError }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="i-heroicons-information-circle" class="w-4 h-4 text-blue-500" />
                  <p class="text-xs text-blue-600">Maximum capacity for your event</p>
                </div>
              </div>

              <div class="space-y-4">
                <div class="flex items-center space-x-2">
                  <Icon name="i-heroicons-currency-dollar" class="w-4 h-4 text-gray-400" />
                  <label class="text-sm font-semibold text-gray-900">Ticket Price</label>
                  <span class="text-red-500">*</span>
                </div>
                <div class="relative">
                  <UInput v-model="ticketPrice" type="number" step="0.01" placeholder="e.g., 49.99" size="lg"
                    :error="!!ticketPriceError" class="transition-all duration-200 focus-within:scale-[1.02] pl-8" />
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">RM</span>
                </div>
                <div v-if="ticketPriceError"
                  class="flex items-center space-x-2 mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                  <Icon name="i-heroicons-exclamation-triangle" class="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span class="text-red-600 text-sm font-medium">{{ ticketPriceError }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="i-heroicons-information-circle" class="w-4 h-4 text-green-500" />
                  <p class="text-xs text-green-600">Price per ticket in RM</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Revenue Preview -->
          <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <Icon name="i-heroicons-chart-bar" class="w-5 h-5 text-gray-600" />
                <span class="text-sm font-medium text-gray-900">Potential Revenue</span>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-green-600">
                  RM{{ ((Number(totalTickets) || 0) * (Number(ticketPrice) || 0)).toLocaleString() }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ Number(totalTickets) || 0 }} tickets × RM{{ Number(ticketPrice) || 0 }}
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div
            class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
            <div class="flex items-center space-x-3">
              <UButton to="/admin/events" variant="ghost" size="lg"
                class="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
                <Icon name="i-heroicons-x-mark" class="w-4 h-4 mr-2" />
                Cancel
              </UButton>
              <UButton type="submit" :loading="isSubmitting" size="lg"
                class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer">
                <Icon name="i-heroicons-plus-circle" class="w-4 h-4 mr-2" />
                Create Event
              </UButton>
            </div>
          </div>
        </form>
      </UCard>

    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';

definePageMeta({
  layout: "admin",
});

// Define validation schema
const schema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(1, 'Event name is required')
      .min(3, 'Event name must be at least 3 characters')
      .max(100, 'Event name must be less than 100 characters'),

    date: z
      .string()
      .min(1, 'Event date is required')
      .refine(
        (date) => new Date(date) > new Date(), 'Event date must be in future'
      ),

    venue: z
      .string()
      .min(1, 'Venue is required')
      .min(2, 'Venue must be at least 2 characters')
      .max(200, 'Venue name must be less than 200 characters'),

    total_tickets: z
      .number()
      .min(1, 'Must have at least 1 ticket')
      .max(50000, 'Maximum 50,000 tickets allowed')
      .int('Total ticket must be a whole number'),

    ticket_price: z
      .number()
      .min(0.01, 'Ticket price must be at least RM0.01')
      .max(10000, 'Maximum ticket price is RM10,000')
      .multipleOf(0.01, 'Price must be in cents (e.g., 19.99)')
  })
);

const { handleSubmit } = useForm({ validationSchema: schema });

const { value: name, errorMessage: nameError } = useField<string>('name');
const { value: date, errorMessage: dateError } = useField<string>('date');
const { value: venue, errorMessage: venueError } = useField<string>('venue');
const { value: totalTickets, errorMessage: totalTicketsError } = useField<number>('total_tickets');
const { value: ticketPrice, errorMessage: ticketPriceError } = useField<number>('ticket_price');

const isSubmitting = ref(false);

const onSubmit = handleSubmit(async (values) => {
  try {
    const res = await $fetch('/api/events', {
      method: 'POST',
      body: values
    })
  } catch (error) {
    //
  }
});
</script>
