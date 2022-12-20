<template>
  <Table link="faculty" :headers="['Назва', 'Скорочена назва']" :objects="faculties"
         :properties="[{name:'name', type:'text'}, {name:'shortName', type:'text'}]"
         :label="(o) => o.shortName"/>
</template>

<script>
import Table from "./Table.vue";

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
      //TODO axios get all faculties and sort by id
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
  }
}
</script>

<style scoped>

</style>