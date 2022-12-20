<template>

  <Table link="faculties" :headers="['Назва', 'Скорочена назва']" :objects="faculties"
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
    faculties: ''
  }),
  methods: {
    getObjects() {
      return getAll('faculties',0,100,'ASC','name');
    },
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
  async created(){
    this.faculties = (await this.getObjects()).content;
  }
}
</script>

<style scoped>

</style>