<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>number of notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>number of character (of all notes)</td>
          <td>{{ storeNotes.totalCharCount }}</td>
        </tr>
      </thead>
    </table>
    <input
      v-model="loveNoteBalls"
      type="text"
      v-autofocus
      class="input"
      placeholder="Do you love noteballs?"
      maxlength="100"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStoreNotes } from "../stores/StoreNotes";
import { vAutofocus } from "../directives/vAutofocus";
import { useWatchCharacters } from "../use/useWatchCharacters";

const storeNotes = useStoreNotes();

const loveNoteBalls = ref("");

useWatchCharacters(loveNoteBalls, 50);
</script>
