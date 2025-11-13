<script setup>
import { ref } from "vue";
const emits = defineEmits(["onSubmit"]);
const newTodoContent = ref("");
function emitOnSubmit() {
  emits("onSubmit", newTodoContent.value);
  newTodoContent.value = "";
}
</script>
<template>
  <form @submit.prevent="emitOnSubmit" class="mb-4">
    <input
      name="newtodo"
      placeholder="What needs to be done?"
      class="w-full border rounded px-3 py-2 bg-slate-300"
      v-model="newTodoContent"
    />
  </form>
</template>
