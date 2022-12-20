<template>
  <Table link="faculties" :headers="['Назва', 'Скорочена назва']"
         :properties="[{name:'name', type:'text'}, {name:'shortName', type:'text'}]"
         :label="(o) => o.shortName"/>
</template>

<script>
import Table from "./Table.vue";

export default {
  name: "Faculties",
  components: {Table}
}
</script>

<style scoped>

</style>