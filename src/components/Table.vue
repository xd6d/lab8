<template>
  <!--  TODO temporary-->
  {{ error }}
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
        <span v-if="updateForm === false || updateForm !== object.id" v-text="object[property.name]"/>
        <!--      TODO Удалить при прочтении-->
        <!--TODO не туду, просто чтобы заметил, сделал выбор типа инпута в зависимости от указаного
        TODO (соответственно и изменил проперти от текста до объекта с полями) пока что name - то что было раньше, type-тип,
        TODO если у нас поле сущности другая сущность - в селект опшонс мы передадим массив с опциями, пока
        TODO формат такой selectOptions:[{value:Сам Массив, label - что будет показывать,
         не функция по тому что в-селект не позволяет, для людей все еще прийдется создать fullName ну или придумать что то поумнее:) }]
        TODO Удалить при прочтении-->
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
import {mask} from 'vue-the-mask'
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css'
import * as http from '../services/httpService';
import {removeByAttr} from "../services/utilsService";

export default {
  name: "Table",
  directives: {mask},
  components: {vSelect},
  props: [
    'headers',
    'objects',
    'properties',
    'label',
    //faculties, disciplines etc.
    'link'
  ],
  data: () => ({
    //TODO TEMPORARY
    error: '',
    create: false,
    updateRemove: true,
    updateForm: false,
    initialObject: ''
  }),
  methods: {
    async update(object) {
      try {
        await http.updateOne(this.link, object.id, object);
        this.showUpdateForm(false)
      } catch (erString) {
        const error = JSON.parse(erString.message);
        //TODO Create place for errors show P.S. we get an array of errors, each element of array contains
        //TODO {message, id, entity}, for instance {message:'Скорочену назву необхідно вказати', id:'2',entity:'faculties'}
        this.error = error[0].message;
      }
    },
    showUpdateForm(object) {
      this.updateRemove = !this.updateRemove
      this.updateForm = object.id
      this.initialObject = {...object}
    },
    hideUpdateForm(object) {
      this.updateRemove = true
      this.updateForm = false
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