<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Users Management</h1>

    <!-- Search and Filters -->
    <UCard class="mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
          <UInput v-model="searchQuery" placeholder="Search by name or email" icon="i-heroicons-magnifying-glass" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Role</label>
          <USelect v-model="selectedRole" :options="roleOptions" placeholder="All Roles" />
        </div>
      </div>
    </UCard>

    <!-- Users Table -->
    <UCard>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bookings
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Spent
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <UIcon name="i-heroicons-user" class="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">ID: {{ user.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <UBadge
                  :class="user.role === 'admin' ? 'bg-red-100 text-red-800' : user.role === 'vip' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'"
                  variant="subtle">
                  {{ user.role }}
                </UBadge>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.total_bookings }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${{ user.total_spent }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(user.created_at) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <UButton size="xs" variant="ghost" class="bg-blue-50 text-blue-700 hover:bg-blue-100"
                    icon="i-heroicons-eye" @click="viewUser(user)">
                    View
                  </UButton>
                  <UButton size="xs" variant="ghost" class="bg-purple-50 text-purple-700 hover:bg-purple-100"
                    icon="i-heroicons-pencil" @click="editUser(user)">
                    Edit
                  </UButton>
                  <UButton size="xs" variant="ghost" class="bg-red-50 text-red-700 hover:bg-red-100"
                    icon="i-heroicons-trash" @click="deleteUser(user.id)">
                    Delete
                  </UButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ filteredUsers.length }} of {{ users.length }} users
          </div>
          <div class="flex space-x-2">
            <UButton size="sm" variant="ghost" class="bg-gray-50 text-gray-700" disabled>
              Previous
            </UButton>
            <UButton size="sm" variant="ghost" class="bg-gray-50 text-gray-700" disabled>
              Next
            </UButton>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
// Mock data for now - in real app, this would come from API
const users = ref([
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    total_bookings: 3,
    total_spent: 195.00,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "vip",
    total_bookings: 7,
    total_spent: 525.00,
    created_at: "2024-01-05T00:00:00Z"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "user",
    total_bookings: 1,
    total_spent: 45.00,
    created_at: "2024-01-10T00:00:00Z"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "admin",
    total_bookings: 0,
    total_spent: 0.00,
    created_at: "2024-01-02T00:00:00Z"
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    role: "user",
    total_bookings: 2,
    total_spent: 90.00,
    created_at: "2024-01-08T00:00:00Z"
  }
])

const searchQuery = ref('')
const selectedRole = ref('')

const roleOptions = [
  { label: 'All Roles', value: '' },
  { label: 'Admin', value: 'admin' },
  { label: 'VIP', value: 'vip' },
  { label: 'User', value: 'user' }
]

const filteredUsers = computed(() => {
  let filtered = users.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    )
  }

  if (selectedRole.value) {
    filtered = filtered.filter(user => user.role === selectedRole.value)
  }

  return filtered
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const viewUser = (user: any) => {
  // Show user details modal or navigate to detail page
  alert(`User Details:\nName: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nTotal Bookings: ${user.total_bookings}\nTotal Spent: $${user.total_spent}`)
}

const editUser = (user: any) => {
  // Navigate to edit user page or show edit modal
  alert(`Edit user: ${user.name}`)
}

const deleteUser = (userId: number) => {
  if (confirm('Are you sure you want to delete this user?')) {
    // In real app, call API to delete user
    users.value = users.value.filter(u => u.id !== userId)
    alert('User deleted successfully!')
  }
}
</script>
