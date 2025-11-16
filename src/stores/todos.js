// src/store/todos.js
import { reactive, watch } from "vue";

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

  getFilteredTodos() {
    if (store.filter === "active")
      return this.todos.filter((t) => !t.completed);
    if (this.filter === "completed")
      return this.todos.filter((t) => t.completed);
    return this.todos;
  },

  getNotCompletedCount() {
    return this.todos.filter((t) => !t.completed).length;
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

watch(
  () => store.todos,
  (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
  { deep: true }
);
