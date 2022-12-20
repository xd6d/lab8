<template>
  <Table link="departments" :headers="['Факультет', 'Назва', 'Скорочена назва']" :objects="departments"
         :properties="[{name:'faculty', type:'select', selectOptions: {value: faculties, label: 'shortName'}}, {name:'name', type:'text'}, {name:'shortName', type:'text'}]"
         :label="(o) => o.shortName"/>
</template>

<script>
import Table from "./Table.vue";
import {getAll} from "../services/httpService";

export default {
  name: "Departments",
  components: {Table},
  data: () => ({
    departments: '',
    faculties: ''
  }),
  methods: {
    getDepartments() {
      return getAll('departments',0,100,'ASC','name');
    },
    getFaculties() {
      return getAll('faculties', 0, 100, 'ASC', 'name');
    }
  },
  async created(){
    this.departments = (await this.getDepartments()).content;
    this.faculties = (await this.getFaculties()).content;
  }
}
</script>

<style scoped>

</style>