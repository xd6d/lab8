<template>
  <Table link="teachers" :headers="['Ім\'я', 'Прізвище', 'Email', 'Телефон']"
         :properties="[{name:'name', type:'text'},
                       {name:'surname', type:'text'},
                       {name:'email', type:'email'},
                       {name:'phone', type:'tel'},
                       ]"
         :label="(o) => o.surname + ' ' + o.name"/>
</template>

<script>
import Table from "./Table.vue";
export default {
  name: "Teachers",
  components: {Table}
}
</script>

<style scoped>

</style>