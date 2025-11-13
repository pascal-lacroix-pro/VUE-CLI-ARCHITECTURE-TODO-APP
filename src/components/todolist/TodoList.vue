<script setup>
import Todo from "./Todo.vue";
import TodoInputForm from "./TodoForm.vue";
import TodoListFooter from "./TodoListFooter.vue";

const props = defineProps({
  todos: { type: Object, required: true },
  actions: { type: Object, required: true },
});
</script>

<template>
  <todo-input-form @on-submit="actions.addOne" />
  <section class="mt-4 bg-slate-100 rounded-b-xl shadow">
    <div v-if="!todos.length" class="p-4 text-center text-slate-400 italic">
      No tasks yet.
    </div>
    <ul class="divide-y">
      <Todo
        v-for="t in todos"
        :key="t.id"
        :todo="t"
        @toggle="actions.toggleOneById"
        @delete="actions.deleteOneById"
        @edit="actions.editOneById"
      />
    </ul>
    <todo-list-footer
      :notCompletedCount="actions.getNotCompletedCount()"
      @on-set-filter="actions.setFilter"
      @on-clear-completed="actions.clearCompleted"
    />
  </section>
</template>
