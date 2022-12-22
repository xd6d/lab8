<template>
  <Table link="schedules" :headers="['Предмет', 'Викладач', 'Група', 'Пара', 'День', 'Авдиторія']"
         :properties="[{name:'discipline', type:'select', minWidth: '21%', selectOptions: {value: disciplines, label: 'name'}},
                       {name:'teacher', type:'select', minWidth: '17%', selectOptions: {value: teachers, label: 'fullName'}},
                       {name:'group', type:'select', minWidth: '10%', selectOptions: {value: groups, label: 'name'}},
                       {name:'lesson', type:'selectConvert', minWidth: '8%', selectOptions: {value: lessons, label: 'value', reduce:(o)=>o.id, convert: convertLesson}},
                       {name:'dayOfWeek', type:'selectConvert', minWidth: '11%', selectOptions: {value: daysOfWeek, reduce:(o)=>o.id, label: 'name', convert: convertDayOfWeek}},
                       {name:'classroom', type:'text', minWidth: '7%'}
                       ]"
         :label="(o) => o.discipline.name"/>
</template>

<script>
import Table from "./PatternTable.vue";
import {getAll} from "../services/httpService";

export default {
  name: "Schedules",
  components: {Table},
  data: () => ({
    group: '',
    groups: [],
    schedules: [],
    disciplines: [],
    teachers: [],
    daysOfWeek: [
      {name: 'Понеділок', id: 1},
      {id: 2, name: 'Вівторок'},
      {id: 3, name: 'Середа'},
      {id: 4, name: 'Четвер'},
      {id: 5, name: "П'ятниця"},
      {id: 6, name: 'Субота'},
      {id: 7, name: 'Неділя'},
    ],
    lessons: [
      {id: 1, value: '8:30'},
      {id: 2, value: '10:25'},
      {id: 3, value: '12:20'},
      {id: 4, value: '14:15'},
      {id: 5, value: '16:10'},
      {id: 6, value: '18:30'},
    ],
  }),
  methods: {
    convertLesson(lesson) {
      return this.lessons.find(o => o.id === +lesson) || {id: '', value: ''};
    },
    convertDayOfWeek(dow) {
      return this.daysOfWeek.find(o => o.id === +dow) || {id: '', value: ''};
    },
    getGroups() {
      return getAll('groups', 0, 100, 'ASC', 'name');
    },
    getSchedules() {
      return getAll('schedules', 0, 100, 'ASC', 'name');
    },
    getDisciplines() {
      return getAll('disciplines', 0, 100, 'ASC', 'name');
    },
    getTeachers() {
      return getAll('teachers', 0, 100, 'ASC', 'name');
    }
  },
  async created() {
    this.groups = (await this.getGroups()).content;
    this.schedules = (await this.getSchedules()).content;
    this.disciplines = (await this.getDisciplines()).content;
    const teachers = (await this.getTeachers()).content;
    teachers.forEach((o) => (o.fullName = o.name + ' ' + o.surname));
    this.teachers = teachers;
  }
}
</script>

<style scoped>

</style>