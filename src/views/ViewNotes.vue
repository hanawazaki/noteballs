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

    <Note :note="note" v-for="note in storeNotes.notes" :key="note.id" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
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
