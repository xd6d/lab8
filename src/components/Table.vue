<template>
  <table class="table table-hover table-bordered table-responsive">
    <thead>
    <tr>
      <th v-for="header in headers">{{ header }}</th>
      <th scope="col" v-if="updateRemove">Змінити/Видалити</th>
      <th scope="col" v-if="updateForm || updateForm === 0">Змінити</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="object in objects">
      <td v-for="property in properties">
        <span v-if="updateForm === false || updateForm !== object.id" v-text="object[property]"/>
        <input v-else type="text" class="col-12" v-bind:id="property+object.id"
               v-model="object[property]">
      </td>
      <td v-if="updateForm === object.id">
        <button class="btn btn-sm btn-success ms-2" @click="update(object)"><i class="bi-check-lg"/></button>
        <button class="btn btn-sm btn-danger ms-2" @click="hideUpdateForm(object)"><i class="bi-x-lg"/></button>
      </td>
      <td v-show="updateRemove">
        <button class="btn btn-sm btn-light btn-outline-primary ms-2" @click="showUpdateForm(object)">
          <i class="bi-pencil-square"/>
        </button>
        <button class="btn btn-sm btn-outline-danger ms-2" @click="confirmRemove(object)">
          <i class="bi-dash-circle"/>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: [
    'headers',
    'objects',
    'properties',
    'label'
  ],
  data: () => ({
    create: false,
    updateRemove: true,
    updateForm: false,
    initialObject: ''
  }),
  methods: {
    update(object) {
      console.log(object)
      //TODO axios update
      this.showUpdateForm(false)
    },
    showUpdateForm(object) {
      this.updateRemove = !this.updateRemove
      this.updateForm = object.id
      this.initialObject = {...object}
    },
    hideUpdateForm(object){
      this.updateRemove = true
      this.updateForm = false
      for (let i in object)
        object[i] = this.initialObject[i]

    },
    confirmRemove(object) {
      if (confirm('Ви точно бажаєте видалити запис про ' + this.label(object) + '?')) {
        //TODO axios remove entity
      }
    }
  }
}
</script>

<style scoped>

</style>