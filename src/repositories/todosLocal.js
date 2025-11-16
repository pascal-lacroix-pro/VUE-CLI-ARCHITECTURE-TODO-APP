// src/repositories/todosLocal.js

const STORAGE_KEY = "todos";

function loadFromStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
}

function saveToStorage(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export const todosRepository = {
  load() {
    return loadFromStorage();
  },
  save(todos) {
    saveToStorage(todos);
  },
};
