<template>
  <Table link="students" :headers="['Ім\'я', 'Прізвище', 'Email', 'Телефон', 'Група']"
         :properties="[{name:'name', type:'text'},
                       {name:'surname', type:'text'},
                       {name:'email', type:'email'},
                       {name:'phone', type:'tel'},
                       {name:'group', type:'select', selectOptions: {value: groups, label: 'name'}}
                       ]"
         :label="(o) => o.surname + ' ' + o.name"/>
</template>

<script>
import Table from "./Table.vue";
import {getAll} from "../services/httpService";
export default {
  name: "Students",
  components: {Table},
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

<style scoped>

</style>