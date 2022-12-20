<template>
  <h5 class="text-center text-danger" v-show="error">{{ error.message }}</h5>
  <div class="container-fluid d-flex flex-row justify-content-end mb-1">
    <div class="btn-group-sm mx-1">
      <button class="btn btn-outline-dark" @click="showCreate()"><i class="bi-plus-lg"/></button>
    </div>
  </div>
  //TODO replace with normal search
  <input v-model="searchContent">
  <form class="border border-start my-2" v-show="createForm" @submit.prevent="createOne()">
    <fieldset class="d-flex p-2">
      <legend class="m-0">Створити</legend>
      <div v-for="property of properties" class="me-1">
        <input v-if="property.type==='text' || !property.type" type="text" class="form-control"
               v-bind:id="property.name+'new'"
               v-model="newObject[property.name]"
               v-bind:placeholder="headers[properties.indexOf(property)]">
        <input v-else-if="property.type==='phone'" type="text" class="form-control" v-bind:id="property.name+'new'"
               v-mask="'+38(0##)###-##-##'"
               v-model="newObject[property.name]"
               v-bind:placeholder="headers[properties.indexOf(property)]">
        <v-select v-else-if="property.type==='select'" :options="property.selectOptions.value"
                  :label="property.selectOptions.label"
                  style="margin-left: 5px; min-width: 114px; align-content: center"></v-select>
      </div>
      <button class="btn btn-outline-secondary">Створити</button>
    </fieldset>
  </form>
  <table class="table table-hover table-bordered table-responsive">
    <thead>
    <tr>
      <th v-for="header of headers">{{ header }}</th>
      <th scope="col" v-if="updateRemove">Змінити/Видалити</th>
      <th scope="col" v-if="updateForm || updateForm === 0">Змінити</th>
    </tr>
    </thead>
    <tbody>

    <tr v-for="object of objects" v-bind:class="{'table-danger': error.id === object.id}">
      <td v-for="property of properties">
        <template v-if="updateForm === false || updateForm !== object.id">
          <span v-if="property['type'] === 'select'" v-text="object[property.name][property.selectOptions['label']]"/>
          <span v-else v-text="object[property.name]"/>
        </template>
        <template v-else>
          <input v-if="property.type==='text' || !property.type" type="text" class="col-12"
                 v-bind:id="property.name+object.id"
                 v-model="object[property.name]">
          <input v-else-if="property.type==='phone'" type="text" class="col-12" v-bind:id="property.name+object.id"
                 v-mask="'+38(0##)###-##-##'" v-model="object[property.name]">
          <v-select v-else-if="property.type==='select'" :options="property.selectOptions.value"
                    :label="property.selectOptions.label"></v-select>
        </template>
      </td>
      <td v-if="updateForm === object.id">
        <button class="btn btn-sm btn-success ms-2" @click="update(object)"><i class="bi-check-lg"/></button>
        <button class="btn btn-sm btn-danger ms-2" @click="hideUpdateForm(); rollbackObject(object)"><i
            class="bi-x-lg"/></button>
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
import {mask} from 'vue-the-mask'
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css'
import * as http from '../services/httpService';
import {removeByAttr} from "../services/utilsService";
import {getAll, searchAll} from "../services/httpService";

export default {
  name: "Table",
  directives: {mask},
  components: {vSelect},
  props: [
    'headers',
    'properties',
    'label',
    'link',
    'startParams'
  ],
  watch:{
    'searchContent':{
      async handler(value) {
        this.objects = (await searchAll(this.link, 'name', {name: value}));
      }
    }
  },
  data: () => ({
    searchContent:'',
    objects:'',
    error: '',
    createForm: false,
    updateRemove: true,
    updateForm: false,
    newObject: {},
    initialObject: ''
  }),
  async created() {

    this.objects = (await this.getAllObjects()).content;
    console.log(this.objects);
  },


  methods: {

    getAllObjects() {
      return getAll(this.link, this.startParams?.page, this.startParams?.elementsPerPage, this.startParams?.sortDirection,
          this.startParams?.sortField || 'name');
    },
    async createOne() {
      try {
        //todo axios create this.newObject
        this.showCreate()
        this.newObject = {}
        //TODO temporary
      } catch (error) {
        this.error = error;
      }
    },
    async update(object) {
      try {
        await http.updateOne(this.link, object.id, object);
        this.hideUpdateForm()
      } catch (erString) {
        const error = JSON.parse(erString.message);
        this.error = error[0];
      }
    },
    showCreate() {
      this.createForm = !this.createForm
    },
    showUpdateForm(object) {
      this.updateRemove = false
      this.updateForm = object.id
      this.initialObject = {...object}
    },
    hideUpdateForm() {
      this.updateRemove = true
      this.updateForm = false
      this.error = ''
    },
    rollbackObject(object) {
      for (let i in object)
        object[i] = this.initialObject[i]
    },
    async confirmRemove(object) {
      if (confirm('Ви точно бажаєте видалити запис про ' + this.label(object) + '?')) {
        try {
          await http.deleteOne(this.link, object.id);
          removeByAttr(this.objects, 'id', object.id);
          //TODO temporary
        } catch (errorString) {
          const error = JSON.parse(errorString);
          this.error = error.message;
        }
      }
    }
  }
}

</script>

<style scoped>

</style>