<template>

  <Table link="faculty" :headers="['Назва', 'Скорочена назва']" :objects="faculties"
         :properties="[{name:'name', type:'text'}, {name:'shortName', type:'text'}]"
         :label="(o) => o.shortName"/>
>>>>>>> 7f43645d73c95dd78386c48b78346ff71ebc7d58
</template>

<script>
import Table from "./Table.vue";
import {createOne, getAll} from "../services/httpService";

export default {
  name: "Faculties",
  components: {Table},
  data: () => ({
    faculties: [
      {
        id: 0,
        name: 'Факультет інформатики та обчислювальної техніки',
        shortName: 'ФІОТ'
      },
      {
        id: 1,
        name: 'Факультет менеджменту та маркетингу',
        shortName: 'ФММ'
      },
      {
        id: 2,
        name: 'Хіміко-технологічний факультет',
        shortName: 'ХТФ'
      },
      {
        id: 3,
        name: 'Інститут атомної та теплової енергетики',
        shortName: 'ІАТЕ'
      }
    ]
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