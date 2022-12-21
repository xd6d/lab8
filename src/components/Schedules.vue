<template>
  <Table link="schedules" :headers="['Предмет', 'Викладач', 'Група', 'Пара', 'День', 'Авдиторія']"
         :properties="[{name:'discipline', type:'select', selectOptions: {value: disciplines, label: 'name'}},
                       {name:'teacher', type:'select', selectOptions: {value: teachers, label: 'fullName'}},
                       {name:'group', type:'select', selectOptions: {value: groups, label: 'name'}},
                       {name:'lesson', type:'number', min:1, max:6},
                       {name:'dayOfWeek', type:'number', min:1, max:7},
                       {name:'classroom', type:'text'}
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
    groups: '',
    schedules: '',
    disciplines: '',
    teachers: ''
  }),
  methods: {
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
    console.log(teachers[0]);
    this.teachers = teachers;
    console.log(this.teachers[0])
  }
}
</script>

<style scoped>

</style>