<script setup>
import { onMounted } from "vue";
import NavBar from "@/components/Layouts/NavBar.vue";
import { useStoreAuth } from "@/stores/StoreAuth";

const storeAuth = useStoreAuth();

// mounted
onMounted(() => {
  storeAuth.init();
});
</script>

<template>
  <NavBar />
  <div class="container is-max-desktop py-4 px-2">
    <routerView />
  </div>
</template>

<style>
@import "bulma/css/bulma.min.css";
</style>
