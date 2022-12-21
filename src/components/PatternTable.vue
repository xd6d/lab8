<template>
  <!--  TODO mobile adaptivity-->
  <!--  TODO v-select adaptivity like in Home.vue-->
  <h5 class="text-center text-danger" v-show="error">{{ error.message }}</h5>
  <div class="d-flex flex-row justify-content-between mb-1">
    <input v-model="searchContent" placeholder="Пошук" class="form-control-sm border">
    <div class="btn-group-sm mx-1 me-2">
      <button class="btn btn-outline-dark" @click="showCreate()"><i class="bi-plus-lg"/></button>
    </div>
  </div>
  <form class="border border-start my-2" v-show="createForm" @submit.prevent="createObject()">
    <fieldset class="d-flex p-2">
      <legend class="m-0">Створити</legend>
      <div v-for="property of properties" class="me-1">
        <input v-if="property.type==='text' || !property.type" type="text" class="form-control"
               v-bind:id="property.name+'new'"
               v-model="newObject[property.name]"
               v-bind:placeholder="headers[properties.indexOf(property)]">
        <input v-else-if="property.type==='email'" type="email" class="form-control"
               v-bind:id="property.name+'new'"
               v-model="newObject[property.name]"
               v-bind:placeholder="headers[properties.indexOf(property)]">
        <input v-else-if="property.type==='number'" type="number" class="form-control"
               v-bind:id="property.name+'new'"
               v-model="newObject[property.name]"
               v-bind:placeholder="headers[properties.indexOf(property)]"
               v-bind:min="property.min"
               v-bind:max="property.max"
               style="min-width: 90px">
        <input v-else-if="property.type==='tel'" type="tel" class="form-control" v-bind:id="property.name+'new'"
               v-mask="'+38(0##)###-##-##'"
               v-model="newObject[property.name]"
               placeholder="+38(0"
               style="min-width: 166px">
        <v-select v-else-if="property.type==='select'" :options="property.selectOptions.value"
                  :label="property.selectOptions.label"
                  v-model="newObject[property.name]"
                  style="margin-left: 5px; min-width: 125px"
                  v-bind:placeholder="headers[properties.indexOf(property)]"></v-select>
        <v-select v-else-if="property.type==='selectConvert'"
                  :placeholder="headers[properties.indexOf(property)]"
                  v-model="newObject[property.name]"
                  :reduce="property.selectOptions.reduce" :options="property.selectOptions.value"
                  :label="property.selectOptions.label"></v-select>

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
          <span v-if="property.type === 'select'" v-text="object[property.name][property.selectOptions.label]"/>
          <span v-else-if="property.type === 'selectConvert'">{{property.selectOptions.convert(object[property.name])[property.selectOptions.label]}}</span>
          <span v-else v-text="object[property.name]"/>

        </template>
        <template v-else>
          <input v-if="property.type==='text' || !property.type" type="text" class="col-12"
                 v-bind:id="property.name+object.id"
                 v-model="object[property.name]">
          <input v-if="property.type==='email'" type="email" class="col-12"
                 v-bind:id="property.name+object.id"
                 v-model="object[property.name]">
          <input v-if="property.type==='number'" type="number" class="col-12"
                 v-bind:id="property.name+object.id"
                 v-model="object[property.name]">
          <input v-else-if="property.type==='tel'" type="tel" class="col-12" v-bind:id="property.name+object.id"
                 v-mask="'+38(0##)###-##-##'" v-model="object[property.name]">
          <v-select v-else-if="property.type==='select'" v-model="object[property.name]" :options="property.selectOptions.value"
                    :label="property.selectOptions.label"></v-select>
          <v-select v-else-if="property.type==='selectConvert'" v-model="object[property.name]" :reduce="property.selectOptions.reduce" :options="property.selectOptions.value"
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
import {createOne, getAll, searchAll} from "../services/httpService";

export default {
  name: "PatternTable",
  directives: {mask},
  components: {vSelect},
  props: {
    headers: {required: true},
    properties: {required: true},
    label: {required: true},
    link: {required: true},
    startParams: {},
    searchFunction: {required: false},
  },
  watch: {
    async searchContent(value) {
      if (value.length === 0) {
        this.objects = (await this.getAllObjects()).content;
        return;
      }
      const searchFunction = this.searchFunction || this.defaultSearchFunction;
      this.objects = await (searchFunction(this.link, value));
    }
  },
  data: () => ({
    searchContent: '',
    objects: '',
    error: '',
    createForm: false,
    updateRemove: true,
    updateForm: false,
    newObject: {},
    initialObject: ''
  }),

  async created() {
    let res;
    if(this.$route.query.search) {
      this.searchContent = this.$route.query.search;
      res = this.searchContent(this.searchContent);
    } else{
    res = (await this.getAllObjects()).content;
    }
    if(this.link ==='schedules'){
      res.forEach(schedule=>schedule.teacher.fullName = schedule.teacher.name + ' ' + schedule.teacher.surname);
    }
    this.objects = res;
    },

  methods: {
    defaultSearchFunction(link, value) {
      return searchAll(link, 'name', {name: value});
    },
    getAllObjects() {
      return getAll(this.link, this.startParams?.page, this.startParams?.elementsPerPage, this.startParams?.sortDirection,
          this.startParams?.sortField || 'name');
    },
    async createObject() {
      try {
        await createOne(this.link, this.newObject);
        this.$router.go();
      } catch (erString) {
        const error = JSON.parse(erString.message);
        this.error = error[0];
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