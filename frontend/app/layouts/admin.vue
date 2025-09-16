<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Admin Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <UIcon name="i-heroicons-cog-6-tooth" class="w-8 h-8 text-blue-600" />
            <span class="text-xl font-bold text-gray-900 ml-2">Admin Panel</span>
          </div>

          <!-- Back to Main Site -->
          <UButton to="/" variant="ghost" color="neutral" icon="i-heroicons-arrow-left">
            Back to Site
          </UButton>
        </div>
      </div>
    </nav>

    <div class="flex">
      <!-- Sidebar -->
      <div class="w-64 bg-white shadow-sm min-h-screen">
        <nav class="mt-8">
          <div class="px-4 space-y-2">
            <UButton to="/admin" variant="ghost" color="neutral" icon="i-heroicons-chart-bar"
              :class="{ 'bg-blue-50 text-blue-700': $route.path === '/admin' }" class="w-full justify-start">
              Dashboard
            </UButton>
            <UButton to="/admin/events" variant="ghost" color="neutral" icon="i-heroicons-calendar-days"
              :class="{ 'bg-blue-50 text-blue-700': $route.path.startsWith('/admin/events') }"
              class="w-full justify-start">
              Events
            </UButton>
            <UButton to="/admin/bookings" variant="ghost" color="neutral" icon="i-heroicons-ticket"
              :class="{ 'bg-blue-50 text-blue-700': $route.path.startsWith('/admin/bookings') }"
              class="w-full justify-start">
              Bookings
            </UButton>
            <UButton to="/admin/users" variant="ghost" color="neutral" icon="i-heroicons-users"
              :class="{ 'bg-blue-50 text-blue-700': $route.path.startsWith('/admin/users') }"
              class="w-full justify-start">
              Users
            </UButton>
          </div>
        </nav>
      </div>

      <!-- Main Content -->
      <div class="flex-1 p-8">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Admin layout logic can be added here
</script>
