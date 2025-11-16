// src/stores/todos.js
import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

const STORAGE_KEY = "todos";

function load() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
}

export const useTodosStore = defineStore("todos", () => {
  // --- state ---
  const todos = ref(load());
  const filter = ref("all");

  // --- helpers ---
  function findOneById(id) {
    return todos.value.find((t) => t.id === id);
  }

  // --- getters (computed) ---
  const filteredTodos = computed(() => {
    if (filter.value === "active")
      return todos.value.filter((t) => !t.completed);
    if (filter.value === "completed")
      return todos.value.filter((t) => t.completed);
    return todos.value;
  });

  const notCompletedCount = computed(
    () => todos.value.filter((t) => !t.completed).length
  );

  // --- actions ---
  function addOne(data) {
    todos.value.unshift({
      id: Date.now().toString(),
      content: String(data ?? "").trim(),
      completed: false,
    });
  }

  function toggleOneById(id) {
    const todo = findOneById(id);
    if (todo) todo.completed = !todo.completed;
  }

  function editOneById({ id, content }) {
    const todo = findOneById(id);
    if (todo) todo.content = String(content ?? "").trim();
  }

  function deleteOneById(id) {
    const i = todos.value.findIndex((t) => t.id === id);
    if (i !== -1) todos.value.splice(i, 1);
  }

  function clearCompleted() {
    todos.value = todos.value.filter((t) => !t.completed);
  }

  function setFilter(value) {
    if (["all", "active", "completed"].includes(value)) {
      filter.value = value;
    }
  }

  // --- persistance localStorage ---
  watch(
    todos,
    (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
    { deep: true }
  );

  return {
    // state
    todos,
    filter,
    // getters
    filteredTodos,
    notCompletedCount,
    // actions
    addOne,
    toggleOneById,
    editOneById,
    deleteOneById,
    clearCompleted,
    setFilter,
  };
});
