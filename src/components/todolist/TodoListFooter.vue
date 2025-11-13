<script setup>
const props = defineProps({
  notCompletedCount: { type: Number, required: true },
});
</script>
<template>
  <!-- Footer de liste -->
  <footer
    class="flex items-center gap-3 border-t p-3 bg-slate-300 rounded-b-xl"
  >
    <p class="text-sm text-gray-600">
      <span class="font-medium">{{ notCompletedCount }}</span>
      items left
    </p>

    <nav class="flex gap-2">
      <button
        class="px-2 py-1 border rounded"
        @click="$emit('onSetFilter', 'all')"
      >
        All
      </button>
      <button
        class="px-2 py-1 border rounded"
        @click="$emit('onSetFilter', 'active')"
      >
        Active
      </button>
      <button
        class="px-2 py-1 border rounded"
        @click="$emit('onSetFilter', 'completed')"
      >
        Completed
      </button>
    </nav>

    <button
      class="ml-auto text-sm underline"
      @click="$emit('onClearCompleted')"
    >
      Clear completed
    </button>
  </footer>
</template>
