<template>
  <div class="notes">
    <AddEditNote
      v-model="newNote"
      ref="addEditNoteRef"
      placeholder="Add a new note"
    >
      <template #buttons>
        <button
          class="button is-link has-background-success"
          @click="addNote"
          :disabled="!newNote"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>

    <progress
      v-if="!storeNotes.loading"
      class="progress is-large is-success"
      max="100"
    />
    <template v-else>
      <Note :note="note" v-for="note in storeNotes.notes" :key="note.id" />
    </template>
  </div>

  <div
    class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
    v-if="!storeNotes.notes.length"
  >
    No notes here yet ...
  </div>
</template>

<script setup>
import { ref } from "vue";
import Note from "@/components/Notes/Note.vue";
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useStoreNotes } from "../stores/StoreNotes";
import { useWatchCharacters } from "../use/useWatchCharacters";

const newNote = ref("");
const addEditNoteRef = ref(null);
const storeNotes = useStoreNotes();

const addNote = () => {
  storeNotes.addNote(newNote.value);
  newNote.value = "";
  addEditNoteRef.value.focusTextarea();
};

useWatchCharacters(newNote);

// const deletedNote = (idToDelete) => {
//   notes.value = notes.value.filter((note) => {
//     return note.id !== idToDelete;
//   });
// };
</script>
