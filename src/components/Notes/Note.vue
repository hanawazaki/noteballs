<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">{{ dateFormated }}</small>
          <small class="column has-text-right">{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <router-link :to="`/editNote/${note.id}`" class="card-footer-item"
        >Edit Note</router-link
      >
      <a
        href="#"
        class="card-footer-item"
        @click.prevent="modals.deleteNote = true"
        >Delete</a
      >
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote === true"
      v-model="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useStoreNotes } from "@/stores/StoreNotes";
import ModalDeleteNote from "./ModalDeleteNote.vue";
import { useNow, useDateFormat } from "@vueuse/core";

const storeNotes = useStoreNotes();

const dateFormated = computed(() => {
  let date = new Date(parseInt(props.note.date));
  let formattedDate = useDateFormat(date, "DD-MM-YYYY HH:mm:ss");

  return formattedDate.value;
});

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

// const emit = defineEmits(["deleteClicked"]);

const characterLength = computed(() => {
  let length = props.note.content.length;
  let desc = length > 1 ? "characters" : "character";

  return length + " " + desc;
});

const modals = reactive({
  deleteNote: false,
});

// const handleDeleteClicked = () => {
//   emit("deleteClicked", props.note.id);
// };
</script>
