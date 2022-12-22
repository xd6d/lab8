<template>
  <Table link="students" :headers="['Ім\'я', 'Прізвище', 'Email', 'Телефон', 'Група']"
         :properties="[{name:'name', type:'text'},
                       {name:'surname', type:'text'},
                       {name:'email', type:'email'},
                       {name:'phone', type:'tel'},
                       {name:'group', type:'select', selectOptions: {value: groups, label: 'name'}}
                       ]"
         :start-params="{sortField:'surname'}"
         :search-function="searchFunction"
         :label="(o) => o.surname + ' ' + o.name"/>
</template>

<script>
import Table from "./PatternTable.vue";
import {getAll, searchAll} from "../services/httpService";
export default {
  name: "Students",
  components: {Table},
  data: () => ({
    groups: []
  }),
  methods: {
    searchFunction(link, value){
      const [first, second] = value.split(" ");
      if(first && !second)
        return  searchAll(link, 'name', {name:first, surname:first});
      if(first && second){
        return  searchAll(link, 'name', {name:first, surname:second});

      }
    },
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