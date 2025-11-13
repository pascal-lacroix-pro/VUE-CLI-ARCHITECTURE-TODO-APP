<script setup>
import { filteredTodos, actions } from "@/stores/todos";
import TodoList from "@/components/todolist/TodoList.vue";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/appFooter.vue";
</script>

<template>
  <div class="max-w-xl mx-auto p-4">
    <AppHeader />
    <main class="w-full p-4 bg-slate-400 rounded-xl shadow">
      <TodoList :todos="filteredTodos" :actions="actions" />
    </main>
    <AppFooter />
  </div>
</template>
