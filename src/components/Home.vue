<template>
  <form class="d-flex justify-content-center align-items-center">
    <label class="flex-row h6 m-0">Розклад для </label>
    <v-select :options="groups" style="margin-left: 5px; min-width: 114px;" :label="'name'"/>
  </form>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css'
import {getAll} from "../services/httpService";
export default {
  name: "Home",
  components: {vSelect},
  data: () => ({
    groups: ''
  }),
  methods: {
    getGroups() {
      return getAll('groups', 0, 100, 'ASC', 'name');
    }
  },
  async created() {
    this.groups = (await this.getGroups()).content;
  }
}
</script>

<style>
@import 'bootstrap';
@import 'bootstrap-icons';
</style>