<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <UIcon name="i-heroicons-ticket" class="w-8 h-8 text-blue-600" />
            <span class="text-xl font-bold text-gray-900 ml-2">E-Ticketing</span>
          </div>

          <!-- Navigation Links -->
          <div class="flex items-center space-x-4">
            <UButton to="/" variant="ghost" color="neutral" icon="i-heroicons-home"
              :class="{ 'bg-blue-50 text-blue-700': $route.path === '/' }">
              Home
            </UButton>
            <UButton to="/events" variant="ghost" color="neutral" icon="i-heroicons-calendar-days"
              :class="{ 'bg-blue-50 text-blue-700': $route.path.startsWith('/events') }">
              Events
            </UButton>
            <UButton to="/bookings" variant="ghost" color="neutral" icon="i-heroicons-ticket"
              :class="{ 'bg-blue-50 text-blue-700': $route.path.startsWith('/bookings') }">
              My Bookings
            </UButton>
            <UButton to="/admin" variant="ghost" color="neutral" icon="i-heroicons-cog-6-tooth">
              Admin
            </UButton>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// Default layout logic can be added here
</script>
