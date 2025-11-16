<script setup>
import { store, filteredTodos, notCompletedCount } from "@/stores/todos";
import Todo from "./Todo.vue";
import TodoInputForm from "./TodoForm.vue";
import TodoListFooter from "./TodoListFooter.vue";
</script>

<template>
  <todo-input-form @on-submit="store.addOne($event)" />
  <section class="mt-4 bg-slate-100 rounded-b-xl shadow">
    <div
      v-if="!store.getFilteredTodos().length"
      class="p-4 text-center text-slate-400 italic"
    >
      No tasks yet.
    </div>
    <ul class="divide-y">
      <Todo
        v-for="t in filteredTodos"
        :key="t.id"
        :todo="t"
        @toggle="store.toggleOneById($event)"
        @delete="store.deleteOneById($event)"
        @edit="store.editOneById($event)"
      />
    </ul>
    <todo-list-footer
      :notCompletedCount="notCompletedCount"
      @on-set-filter="store.setFilter($event)"
      @on-clear-completed="store.clearCompleted()"
    />
  </section>
</template>
