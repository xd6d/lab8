<template>
  <div class="container-fluid d-flex flex-row justify-content-end mb-1">
    <div class="btn-group-sm mx-1">
      <button class="btn btn-outline-dark" @click="showCreate()"><i class="bi-plus-lg"/></button>
    </div>
    <div class="btn-group-sm">
      <button class="btn btn-outline-primary" @click="showUpdate()"><i class="bi-pencil-fill"/></button>
    </div>
    <div class="btn-group-sm mx-1">
      <button class="btn btn-danger" @click="showRemove()"><i class="bi-dash-circle"/></button>
    </div>
  </div>
  <form class="border border-start my-2" v-show="create">
    <fieldset class="d-flex p-2">
      <legend class="m-0">Новий факультет</legend>
      <div class="mb-0 ms-1">
        <input type="text" id="faculty_name" placeholder="Назва" class="form-control">
      </div>
      <div class="me-1 ms-1">
        <input type="text" id="short_name" placeholder="Скорочена назва" class="form-control">
      </div>
      <button class="btn btn-outline-secondary">Створити</button>
    </fieldset>
  </form>
  <table class="table table-hover table-bordered table-responsive">
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Назва</th>
      <th scope="col">Скорочена назва</th>
      <th scope="col" v-show="update">Змінити</th>
      <th scope="col" v-show="remove">Видалити</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="faculty in faculties">
      <td v-text="faculty.id"></td>
      <td>
        <span v-if="updateForm === false || updateForm !== faculty.id" v-text="faculty.name"/>
        <input v-else type="text" v-bind:value="faculty.name" class="col-12" v-bind:id="'name'+faculty.id">
      </td>
      <td>
        <span v-if="updateForm === false || updateForm !== faculty.id" v-text="faculty.short_name"/>
        <input v-else type="text" v-bind:value="faculty.short_name" class="col-12" v-bind:id="'sname'+faculty.id">
      </td>
      <td v-if="updateForm === faculty.id" class="d-flex justify-content-center">
        <button class="btn btn-sm btn-success me-3" @click="updateFaculty(faculty)"><i class="bi-check-lg"/></button>
        <button class="btn btn-sm btn-danger" @click="showUpdateForm(false)"><i class="bi-x-lg"/></button>
      </td>
      <td v-show="update">
        <button class="btn btn-sm btn-light" @click="showUpdateForm(faculty)"><i class="bi-pencil-square"/></button>
      </td>
      <td v-show="remove">
        <button class="btn btn-sm btn-outline-danger" @click="confirmRemove(faculty)">
          <i class="bi-dash-circle"/>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Faculties",
  data: () => ({
    create: false,
    update: false,
    updateForm: false,
    remove: false,
    faculties: [
      {
        id: 0,
        name: 'Факультет інформатики та обчислювальної техніки',
        short_name: 'ФІОТ'
      },
      {
        id: 1,
        name: 'Факультет менеджменту та маркетингу',
        short_name: 'ФММ'
      }
    ]
  }),
  methods: {
    getFaculties() {
      //TODO axios get all faculties and sort by id
    },
    showCreate() {
      this.create = !this.create
      this.update = false
      this.updateForm = false
      this.remove = false
    },
    showUpdate() {
      this.create = false
      this.update = !this.update
      this.updateForm = false
      this.remove = false
    },
    showUpdateForm(faculty) {
      this.create = false
      this.update = false
      this.updateForm = faculty.id
      this.remove = false
    },
    showRemove() {
      this.create = false
      this.update = false
      this.updateForm = false
      this.remove = !this.remove
    },
    confirmRemove(faculty) {
      if (confirm('Ви точно бажаєте видалити запис про ' + faculty.short_name + '?')) {
        this.remove = false;
        //TODO axios remove faculty
      }
    },
    updateFaculty(faculty) {
      document.getElementById('name' + faculty.id).value;//name
      document.getElementById('sname' + faculty.id).value;//short_name
      //TODO axios update faculty
      this.showUpdateForm(false)
    }
  }
}
</script>

<style scoped>

</style>