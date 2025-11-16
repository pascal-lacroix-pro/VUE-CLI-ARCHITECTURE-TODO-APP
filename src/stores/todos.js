// src/store/todos.js
import { reactive, computed, watch } from "vue";

const STORAGE_KEY = "todos";

function load() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
}

export const store = reactive({
  todos: load(),
  filter: "all",

  findOneById(id) {
    return this.todos.find((t) => t.id === id);
  },

  addOne(data) {
    this.todos.unshift({
      id: Date.now().toString(),
      content: String(data ?? "").trim(),
      completed: false,
    });
  },
  toggleOneById(id) {
    const todo = this.findOneById(id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  },
  editOneById({ id, content }) {
    const todo = this.findOneById(id);
    if (todo) {
      todo.content = String(content ?? "").trim();
    }
  },
  deleteOneById(id) {
    const i = this.todos.findIndex((t) => t.id === id);
    if (i !== -1) this.todos.splice(i, 1);
  },
  clearCompleted() {
    this.todos = this.todos.filter((t) => !t.completed);
  },
  setFilter(data) {
    if (["all", "active", "completed"].includes(data)) this.filter = data;
  },
});

const filteredTodos = computed(() => {
  if (store.filter === "active") return store.todos.filter((t) => !t.completed);
  if (store.filter === "completed")
    return store.todos.filter((t) => t.completed);
  return store.todos;
});

const notCompletedCount = computed(() => {
  return store.todos.filter((t) => !t.completed).length;
});

export const getters = {
  filteredTodos: filteredTodos.value,
  notCompletedCount: notCompletedCount.value,
};

watch(
  () => store.todos,
  (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
  { deep: true }
);
