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
      type="text"
      v-autofocus
      class="input"
      placeholder="Do you love noteballs?"
    />
  </div>
</template>

<script setup>
import { useStoreNotes } from "../stores/StoreNotes";
import { vAutofocus } from "../directives/vAutofocus";

const storeNotes = useStoreNotes();
</script>
