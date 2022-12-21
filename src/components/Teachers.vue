<template>
  <Table link="teachers" :headers="['Ім\'я', 'Прізвище', 'Email', 'Телефон']"
         :properties="[{name:'name', type:'text'},
                       {name:'surname', type:'text'},
                       {name:'email', type:'email'},
                       {name:'phone', type:'tel'},
                       ]"
         :search-function="searchFunction"
         :label="(o) => o.surname + ' ' + o.name"/>
</template>

<script>
import Table from "./PatternTable.vue";
import {searchAll} from "../services/httpService";
export default {
  name: "Teachers",
  components: {Table},
  methods:{
    searchFunction(link, value){
      const [name, surname] = value.split(" ");
      return  searchAll(link, 'name', {name, surname});
    },
  }
}
</script>

<style scoped>

</style>