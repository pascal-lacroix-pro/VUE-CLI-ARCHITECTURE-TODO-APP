<script setup>
import { useTodosStore } from "@/stores/todos";
import Todo from "./Todo.vue";
import TodoInputForm from "./TodoForm.vue";
import TodoListFooter from "./TodoListFooter.vue";

const todosStore = useTodosStore();
</script>

<template>
  <todo-input-form @on-submit="todosStore.addOne($event)" />
  <section class="mt-4 bg-slate-100 rounded-b-xl shadow">
    <div
      v-if="!todosStore.filteredTodos.length"
      class="p-4 text-center text-slate-400 italic"
    >
      No tasks yet.
    </div>
    <ul class="divide-y">
      <Todo
        v-for="t in todosStore.filteredTodos"
        :key="t.id"
        :todo="t"
        @toggle="todosStore.toggleOneById($event)"
        @delete="todosStore.deleteOneById($event)"
        @edit="todosStore.editOneById($event)"
      />
    </ul>
    <todo-list-footer
      :notCompletedCount="todosStore.notCompletedCount"
      @on-set-filter="todosStore.setFilter($event)"
      @on-clear-completed="todosStore.clearCompleted()"
    />
  </section>
</template>
