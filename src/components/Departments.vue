<template>
  <Table link="departments" :headers="['Назва', 'Скорочена назва', 'Факультет']"
         :properties="[{name:'name', type:'text'},
                       {name:'shortName', type:'text'},
                       {name:'faculty', type:'select', selectOptions: {value: faculties, label: 'shortName'}}]"
         :label="(o) => o.shortName"/>
</template>

<script>
import Table from "./PatternTable.vue";
import {getAll} from "../services/httpService";

export default {
  name: "Departments",
  components: {Table},
  data: () => ({
    faculties: ''
  }),
  methods: {
    getFaculties() {
      return getAll('faculties', 0, 100, 'ASC', 'name');
    }
  },
  async created() {
    this.faculties = (await this.getFaculties()).content;
  }
}
</script>

<style scoped>

</style>