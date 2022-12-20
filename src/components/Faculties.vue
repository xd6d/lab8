<template>

  <div class="container-fluid d-flex flex-row justify-content-end mb-1">
    <div class="btn-group-sm mx-1">
      <button class="btn btn-outline-dark" @click="showCreate()"><i class="bi-plus-lg"/></button>
    </div>
  </div>
  <form class="border border-start my-2" v-show="create">
    <fieldset class="d-flex p-2">
      <legend class="m-0">Новий факультет</legend>
      <div class="mb-0 ms-1">
        <input type="text" id="faculty_name" placeholder="Назва" class="form-control">
      </div>
      <div class="me-1 ms-1">
        <input type="text" id="shortName" placeholder="Скорочена назва" class="form-control">
      </div>
      <button class="btn btn-outline-secondary">Створити</button>
    </fieldset>
  </form>
  <Table link="faculties" :headers="['Назва', 'Скорочена назва']"
         :objects="faculties" :properties="[{name:'name', type:'text'}, {name:'shortName', type:'text'}]"
                :label="(o) => o.shortName"/>
</template>

<script>
import Table from "./Table.vue";
import {createOne, getAll} from "../services/httpService";

export default {
  name: "Faculties",
  components: {Table},
  data: () => ({
    create: false,
    updateRemove: true,
    updateForm: false,
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
    showCreate() {
      this.create = !this.create
    },
    showUpdateForm(faculty) {
      this.updateRemove = !this.updateRemove
      this.updateForm = faculty.id
    },
    confirmRemove(faculty) {
      if (confirm('Ви точно бажаєте видалити запис про ' + faculty.shortName + '?')) {
        //TODO axios remove faculty
      }
    },
    updateFaculty(faculty) {
      document.getElementById('name' + faculty.id).value;//name
      document.getElementById('sname' + faculty.id).value;//shortName
      //TODO axios update faculty
      this.showUpdateForm(false)
    }
  },
  async created(){
    this.faculties = (await this.getObjects()).content;
  }
}
</script>

<style scoped>

</style>