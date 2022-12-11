<template>
  <form class="d-flex justify-content-center align-items-center">
    <label class="flex-row h6 m-0">Розклад для </label>
    <v-select :options="groups" style="margin-left: 5px; min-width: 114px;"/><!--placeholder | change select-->
  </form>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css'
export default {
  name: "Home",
  components: {
    vSelect,
  },
  data: () => ({
    groups: [
      'ІА-11',
      'ІА-12',
      'ІА-13'
    ]})
}
</script>

<style>
@import 'bootstrap';
@import 'bootstrap-icons';
</style>