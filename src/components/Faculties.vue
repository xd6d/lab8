<template>

  <Table link="faculties" :headers="['Назва', 'Скорочена назва']"
         :properties="[{name:'name', type:'text'}, {name:'shortName', type:'text'}]"
         :label="(o) => o.shortName"/>
</template>

<script>
import Table from "./Table.vue";
import {createOne, getAll} from "../services/httpService";

export default {
  name: "Faculties",
  components: {Table},
  data: () => ({
  }),
  methods: {

    async createObject(object) {
      try {
        return await createOne('faculties', object);
      } catch (erString) {
        const error = JSON.parse(erString.message);
        //TODO Create place for show P.S. we get an array of errors, each element of array contains
        //TODO {message, id, entity}, for instance {message:'Скорочену назву необхідно вказати', id:'2',entity:'faculties'}
        this.error = error[0].message;
      }
        },

  },
}
</script>

<style scoped>

</style>