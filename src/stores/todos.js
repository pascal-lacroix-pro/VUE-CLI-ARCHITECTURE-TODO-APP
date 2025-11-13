// src/store/todos.js
import { reactive, computed, watch } from "vue";

const STORAGE_KEY = "todos";

function load() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
}

const store = reactive({
  todos: load(),
  filter: "all",
  findOneById(id) {
    return this.todos.find((t) => t.id === id);
  },
});

export const filteredTodos = computed(() => {
  if (store.filter === "active") return store.todos.filter((t) => !t.completed);
  if (store.filter === "completed")
    return store.todos.filter((t) => t.completed);
  return store.todos;
});

export const actions = {
  getNotCompletedCount() {
    return store.todos.filter((t) => !t.completed).length;
  },
  addOne(data) {
    store.todos.unshift({
      id: Date.now().toString(),
      content: String(data ?? "").trim(),
      completed: false,
    });
  },
  toggleOneById(id) {
    const todo = store.findOneById(id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  },
  editOneById({ id, content }) {
    const todo = store.findOneById(id);
    if (todo) {
      todo.content = String(content ?? "").trim();
    }
  },
  deleteOneById(id) {
    const i = store.todos.findIndex((t) => t.id === id);
    if (i !== -1) store.todos.splice(i, 1);
  },
  clearCompleted() {
    store.todos = store.todos.filter((t) => !t.completed);
  },
  setFilter(data) {
    if (["all", "active", "completed"].includes(data)) store.filter = data;
  },
};

watch(
  () => store.todos,
  (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
  { deep: true }
);
