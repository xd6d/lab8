<template>
  <form class="d-flex justify-content-center align-items-center">
    <label class="flex-row h6 m-0" for="select">Розклад для </label>
    <v-select :options="groups" style="margin-left: 5px; min-width: 114px;" :label="'name'"
              v-model="this.group"
              id="select"/>
  </form>

</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css'
import {getAll} from "../services/httpService";
import Table from "./PatternTable.vue";

export default {
  name: "Home",
  components: {Table, vSelect},
  data: () => ({
    group: '',
    groups: '',
    schedulesByGroup: ''
  }),
  watch: {
    group(){

    }
  },
  methods: {
    getGroups() {
      return getAll('groups', 0, 100, 'ASC', 'name');
    }
  },
  async created() {
    this.groups = (await this.getGroups()).content;
  },
  //schedules query
  async getSchedulesByGroup(groupId){
    return getAll("schedules/by/group", 0 ,100, 'ASC', 'dayOfWeek',{group:groupId})
}
}
</script>

<style>
@import 'bootstrap';
@import 'bootstrap-icons';
</style>