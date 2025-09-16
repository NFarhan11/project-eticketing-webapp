<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Bar -->
    <UHeader>
      <template #logo>
        <UIcon name="i-heroicons-ticket" class="w-8 h-8 text-primary-500" />
        <span class="text-xl font-bold text-gray-900 ml-2">E-Ticketing</span>
      </template>

      <template #right>
        <UButton to="/events" variant="ghost" color="neutral" icon="i-heroicons-calendar-days">
          Events
        </UButton>
        <UButton to="/bookings" variant="ghost" color="neutral" icon="i-heroicons-ticket">
          My Bookings
        </UButton>
        <UButton to="/create-event" variant="ghost" color="neutral" icon="i-heroicons-plus-circle">
          Create Event
        </UButton>
      </template>
    </UHeader>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Welcome to E-Ticketing System
        </h1>
        <p class="text-lg text-gray-600 mb-8">
          Discover amazing events and book your tickets with ease
        </p>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <UCard class="hover:shadow-lg transition-shadow cursor-pointer" @click="navigateTo('/events')">
            <template #header>
              <div class="flex items-center justify-center">
                <UIcon name="i-heroicons-calendar-days" class="w-12 h-12 text-primary-500" />
              </div>
            </template>
            <div class="text-center">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Browse Events</h3>
              <p class="text-gray-600">Discover upcoming events and book your tickets</p>
            </div>
          </UCard>

          <UCard class="hover:shadow-lg transition-shadow cursor-pointer" @click="navigateTo('/bookings')">
            <template #header>
              <div class="flex items-center justify-center">
                <UIcon name="i-heroicons-ticket" class="w-12 h-12 text-green-500" />
              </div>
            </template>
            <div class="text-center">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">My Bookings</h3>
              <p class="text-gray-600">View and manage your ticket bookings</p>
            </div>
          </UCard>

          <UCard class="hover:shadow-lg transition-shadow cursor-pointer" @click="navigateTo('/create-event')">
            <template #header>
              <div class="flex items-center justify-center">
                <UIcon name="i-heroicons-plus-circle" class="w-12 h-12 text-purple-500" />
              </div>
            </template>
            <div class="text-center">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Create Event</h3>
              <p class="text-gray-600">Organize and manage your own events</p>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const version = useRuntimeConfig().public.version;
</script>