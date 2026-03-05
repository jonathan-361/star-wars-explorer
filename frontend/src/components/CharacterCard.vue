<template>
  <div class="card" v-if="character">
    <div class="card-header">
      <div class="card-id">ID #{{ characterId }}</div>
      <h2 class="card-name">{{ character.name }}</h2>
    </div>

    <div class="card-body">
      <div class="attributes">
        <div class="attr">
          <span class="attr-label">Altura</span>
          <span class="attr-value">{{ character.height }} cm</span>
        </div>
        <div class="attr">
          <span class="attr-label">Peso</span>
          <span class="attr-value">{{ character.mass }} kg</span>
        </div>
        <div class="attr">
          <span class="attr-label">Género</span>
          <span class="attr-value">{{ character.gender }}</span>
        </div>
        <div class="attr">
          <span class="attr-label">Color de ojos</span>
          <span class="attr-value">{{ character.eye_color }}</span>
        </div>
        <div class="attr">
          <span class="attr-label">Color de pelo</span>
          <span class="attr-value">{{ character.hair_color }}</span>
        </div>
        <div class="attr">
          <span class="attr-label">Año de nacimiento</span>
          <span class="attr-value">{{ character.birth_year }}</span>
        </div>
      </div>

      <div
        class="films-section"
        v-if="character.films && character.films.length"
      >
        <h3 class="films-title">
          Aparece en {{ character.films.length }} película(s)
        </h3>
        <div class="films-list">
          <div
            class="film-badge"
            v-for="(film, index) in character.films"
            :key="index"
          >
            Episodio {{ extractFilmId(film) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  character: {
    type: Object,
    default: null,
  },
  characterId: {
    type: Number,
    default: null,
  },
});

const extractFilmId = (url) => {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
};
</script>
