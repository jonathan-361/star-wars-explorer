<template>
  <div class="app">
    <div class="stars"></div>

    <div class="container">
      <header class="header">
        <h1 class="title">Star Wars Explorer</h1>
      </header>

      <div class="search-box">
        <div class="input-group">
          <input
            v-model="inputId"
            type="text"
            class="search-input"
            placeholder="Ingresa un ID (ej: 1, 2, 3...)"
            @keyup.enter="!isButtonDisabled && fetchCharacter()"
          />
          <button
            class="search-btn"
            :disabled="isButtonDisabled"
            @click="fetchCharacter"
          >
            <span v-if="!loading">BUSCAR</span>
            <span v-else class="spinner"></span>
          </button>
        </div>

        <p class="validation-msg" v-if="inputId && isButtonDisabled">
          ⚠️ Ingresa solo números enteros positivos
        </p>
      </div>

      <div class="state-loading" v-if="loading">
        <div class="loading-ring"></div>
        <p>Buscando en una galaxia muy, muy lejana...</p>
      </div>

      <div class="state-error" v-if="error && !loading">
        <div class="error-icon">✕</div>
        <p class="error-title">Personaje no encontrado</p>
        <p class="error-msg">{{ error }}</p>
      </div>

      <CharacterCard
        v-if="character && !loading && !error"
        :character="character"
        :characterId="lastSearchedId"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CharacterCard from "./components/CharacterCard.vue";
import { getCharacter } from "./services/swapiService";

const inputId = ref("");
const loading = ref(false);
const error = ref(null);
const character = ref(null);
const lastSearchedId = ref(null);

const isButtonDisabled = computed(() => {
  const val = inputId.value.trim();
  if (!val) return true;
  const num = Number(val);
  return !Number.isInteger(num) || num <= 0;
});

const fetchCharacter = async () => {
  if (isButtonDisabled.value) return;

  loading.value = true;
  error.value = null;
  character.value = null;
  lastSearchedId.value = Number(inputId.value.trim());

  try {
    const result = await getCharacter(lastSearchedId.value);
    character.value = result.data;
  } catch (err) {
    const status = err.response?.status;
    if (status === 404) {
      error.value = `No existe ningún personaje con el ID ${lastSearchedId.value}. Prueba con otro número.`;
    } else if (status === 400) {
      error.value = "El ID ingresado no es válido.";
    } else {
      error.value =
        "Error al conectar con el servidor. ¿Está corriendo el backend?";
    }
  } finally {
    loading.value = false;
  }
};
</script>
