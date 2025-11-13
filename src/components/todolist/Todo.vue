<script setup>
import { ref } from "vue";
const props = defineProps({
  todo: { type: Object, required: true },
});

const emit = defineEmits(["edit", "toggle", "delete"]);

let editing = ref(false);
let newContent = props.todo.content;

function edit() {
  editing.value = true;
  newContent = props.todo.content;
}
function update() {
  editing.value = false;
  emit("edit", { id: props.todo.id, content: newContent });
}
</script>

<template>
  <li class="flex items-center gap-3 bg-slate-200 p-3">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="emit('toggle', todo.id)"
    />

    <template v-if="!editing">
      <span
        class="flex-1"
        :class="{ 'line-through text-gray-400': todo.completed }"
        @dblclick="edit"
      >
        {{ todo.content }}
      </span>
      <button class="text-red-600 text-sm" @click="emit('delete', todo.id)">
        ✕
      </button>
    </template>

    <template v-else>
      <input
        class="flex-1 border px-2 py-1 bg-slate-100 rounded"
        v-model="newContent"
        @keydown.enter="update"
        @blur="update"
      />
    </template>
  </li>
</template>
