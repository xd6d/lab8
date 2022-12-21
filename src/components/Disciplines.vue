<template>
  <Table link="disciplines" :headers="['Назва']"
         :properties="[{name:'name', type:'text'}]"
         :label="(o) => o.name"/>
</template>

<script>
import Table from "./PatternTable.vue";
export default {
  name: "Subjects",
  components: {Table}
}
</script>

<style scoped>

</style>