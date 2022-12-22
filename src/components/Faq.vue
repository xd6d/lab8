<template>
  <h5 class="text-center text-danger" v-show="error">{{ error.message }}</h5>
  <div class="d-flex flex-row justify-content-end mb-1">
    <div class="btn-group-sm mx-1 me-2">
      <button class="btn btn-outline-dark" @click="showCreate()"><i class="bi-plus-lg"/></button>
    </div>
  </div>
  <form class="border border-start my-2" v-show="createForm" @submit.prevent="createObject()">
    <fieldset class="d-flex p-2">
      <legend class="m-0">Створити</legend>
      <textarea placeholder="Питання" class="me-1 form-control" v-model="newFaq['question']" rows="4"></textarea>
      <textarea placeholder="Відповідь" class="me-1 form-control" v-model="newFaq['answer']" rows="4"></textarea>
      <button class="btn btn-outline-secondary">Створити</button>
    </fieldset>
  </form>
  <div class="list-group w-100 mt-3">
    <div v-for="faq of faqs" class="border-bottom pt-2 mb-2">
      <template v-if="updateForm === false || updateForm !== faq.id">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1" v-text="faq.question"></h5>
        </div>
        <p class="mb-1" v-text="faq.answer"></p>
      </template>
      <template v-else>
        <textarea placeholder="Питання" class="mb-2 form-control" v-model="faq.question" rows="4"></textarea>
        <textarea placeholder="Відповідь" class="mb-2 form-control" v-model="faq.answer" rows="4"></textarea>
      </template>
      <span v-if="updateForm === faq.id" class="d-flex justify-content-end mb-1">
        <button class="btn btn-sm btn-success ms-2" @click="update(faq)"><i class="bi-check-lg"/></button>
        <button class="btn btn-sm btn-danger ms-2" @click="hideUpdateForm(); rollbackObject(faq)"><i
            class="bi-x-lg"/></button>
      </span>
      <span v-if="updateRemove" class="d-flex justify-content-end mb-1">
        <button class="btn btn-sm btn-light btn-outline-primary ms-2" @click="showUpdateForm(faq)">
          <i class="bi-pencil-square"/>
        </button>
        <button class="btn btn-sm btn-outline-danger ms-2" @click="confirmRemove(faq)">
          <i class="bi-dash-circle"/>
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import {createOne, getAll} from "../services/httpService";
import * as http from "../services/httpService";
import {removeByAttr} from "../services/utilsService";

export default {
  name: "Faq",
  data: () => ({
    faqs: '',
    searchContent: '',
    createForm: false,
    updateRemove: true,
    updateForm: false,
    initialFaq: '',
    newFaq: {},
    error: {}
  }),
  methods: {
    getFaqs() {
      return getAll('faq', 0, 100, 'ASC', 'question');
    },
    showCreate() {
      this.createForm = !this.createForm
    },
    showUpdateForm(faq) {
      this.updateRemove = false
      this.updateForm = faq.id
      this.initialFaq = {...faq}
    },
    hideUpdateForm() {
      this.updateRemove = true
      this.updateForm = false
      this.error = ''
    },
    rollbackObject(faq) {
      for (let i in faq)
        faq[i] = this.initialFaq[i]
    },
    async createObject() {
      try {
        await createOne('faq', this.newFaq);
        this.$router.go();
      } catch (erString) {
        const error = JSON.parse(erString.message);
        this.error = error[0];
      }
    },
    async update(faq) {
      try {
        await http.updateOne('faq', faq.id, faq);
        this.hideUpdateForm()
      } catch (erString) {
        const error = JSON.parse(erString.message);
        this.error = error[0];
      }
    },
    async confirmRemove(faq) {
      if (confirm('Ви точно бажаєте видалити запис про питання: "' + faq.question + '" ?')) {
        try {
          await http.deleteOne('faq', faq.id);
          removeByAttr(this.faqs, 'id', faq.id);
        } catch (errorString) {
          const error = JSON.parse(errorString);
          this.error = error.message;
        }
      }
    }
  },
  async created() {
    this.faqs = (await this.getFaqs()).content;
  }
}
</script>

<style scoped>

</style>