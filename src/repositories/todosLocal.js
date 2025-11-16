// src/repositories/todosLocal.js

const STORAGE_KEY = "todos";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("[todosLocalRepository] Invalid JSON in localStorage", e);
    return [];
  }
}

function saveToStorage(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

/**
 * Repository "source de vérité externe" pour les todos.
 * Aujourd'hui : localStorage
 * Demain : Supabase / API / autre, avec la même interface.
 */
export const todosLocalRepository = {
  /**
   * Charge les todos depuis la source.
   * Sync ici, mais on pourrait adopter async plus tard.
   */
  load() {
    return loadFromStorage();
  },

  /**
   * Persiste l'état actuel des todos vers la source.
   */
  save(todos) {
    saveToStorage(todos);
  },
};
