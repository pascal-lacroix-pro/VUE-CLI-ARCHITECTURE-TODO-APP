<script setup>
import { store, getters } from "@/stores/todos";
import Todo from "./Todo.vue";
import TodoInputForm from "./TodoForm.vue";
import TodoListFooter from "./TodoListFooter.vue";
</script>

<template>
  <todo-input-form @on-submit="store.addOne($event)" />
  <section class="mt-4 bg-slate-100 rounded-b-xl shadow">
    <div
      v-if="!getters.filteredTodos.length"
      class="p-4 text-center text-slate-400 italic"
    >
      No tasks yet.
    </div>
    <ul class="divide-y">
      <Todo
        v-for="t in getters.filteredTodos"
        :key="t.id"
        :todo="t"
        @toggle="store.toggleOneById($event)"
        @delete="store.deleteOneById($event)"
        @edit="store.editOneById($event)"
      />
    </ul>
    <todo-list-footer
      :notCompletedCount="getters.notCompletedCount"
      @on-set-filter="store.setFilter($event)"
      @on-clear-completed="store.clearCompleted()"
    />
  </section>
</template>
