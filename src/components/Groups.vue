<template>
  <Table link="groups" :headers="['Назва', 'Курс', 'Департамент']"
         :properties="[{name:'name', type:'text'},
                       {name:'course', type:'text'},
                       {name:'department', type:'select', selectOptions: {value: departments, label: 'name'}}]"
         :label="(o) => o.name"/>
</template>

<script>
import Table from "./Table.vue";
import {getAll} from "../services/httpService";

export default {
  name: "Groups",
  components: {Table},
  data: () => ({
    departments: ''
  }),
  methods: {
    getDepartments() {
      return getAll('departments', 0, 100, 'ASC', 'name');
    }
  },
  async created() {
    this.departments = (await this.getDepartments()).content;
  }
}
</script>

<style scoped>

</style>