<template>
  <form class="d-flex justify-content-center align-items-center">
    <label class="flex-row h6 m-0" for="select">Розклад для </label>
    <v-select :options="groups" style="margin-left: 5px; min-width: 114px;" :label="'name'"
              v-model="this.group"
              id="select"/>
  </form>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col" v-for="day of days">
        <div class="card">
          <h4 class="card-header" v-text="day.name"></h4>
          <div class="card-body bg-secondary bg-opacity-10">
            <p class="container-fluid border-bottom pt-1" v-for="i of 6"
               v-bind:class="{'border border-success rounded-3 border-opacity-25 bg-gradient bg-opacity-10 bg-primary': currentLesson.day===day.index && currentLesson.lesson===i}">
              <span class="h5" v-text="lessonsTime[i]"></span><br>
              <i class="bi bi-book-half" v-if="day[i] !== undefined"/> {{ day[i]?.discipline.name }}<br>
              <i class="bi bi-mortarboard" v-if="day[i] !== undefined"/> {{ day[i]?.teacher.surname }}
              {{ day[i]?.teacher.name }}<br>
              <i class="bi bi-people-fill" v-if="day[i] !== undefined"/> {{ day[i]?.group.name }}<br>
              <i class="bi bi-geo-alt" v-if="day[i] !== undefined && day[i].classroom"/>{{ day[i]?.classroom }}<br>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css'
import {getAll} from "../services/httpService";
import Table from "./PatternTable.vue";

export default {
  name: "Home",
  components: {Table, vSelect},
  data: () => ({
    group: '',
    groups: '',
    schedulesByGroup: '',
    days: [
      {name: 'Понеділок', index: 1},
      {name: 'Вівторок', index: 2},
      {name: 'Середа', index: 3},
      {name: 'Четвер', index: 4},
      {name: 'П\'ятниця', index: 5},
      {name: 'Субота', index: 6}
    ],
    lessonsTime: {
      1: '8:30',
      2: '10:25',
      3: '12:20',
      4: '14:15',
      5: '16:10',
      6: '18:30',
    },
    currentLesson: {}
  }),
  watch: {
    async group() {
      this.flushDays()
      if (this.group !== null) {
        this.schedulesByGroup = (await this.getSchedulesByGroup(this.group.id)).content
        this.schedulesByGroup.sort((o1, o2) => (o1.dayOfWeek - o2.dayOfWeek || o1.lesson - o2.lesson))
        for (let schedule of this.schedulesByGroup) {
          this.days[schedule.dayOfWeek-1][schedule.lesson] = schedule
        }
      } else
        this.schedulesByGroup = null
    }
  },
  methods: {
    getGroups() {
      return getAll('groups', 0, 100, 'ASC', 'name');
    },
    getSchedulesByGroup(groupId) {
      return getAll("schedules/by/group", 0, 100, 'ASC', 'dayOfWeek', {group: groupId})
    },
    flushDays() {
      this.days = [
        {name: 'Понеділок', index: 1},
        {name: 'Вівторок', index: 2},
        {name: 'Середа', index: 3},
        {name: 'Четвер', index: 4},
        {name: 'П\'ятниця', index: 5},
        {name: 'Субота', index: 6}
      ]
    },
    setCurrentLesson() {
      let date = new Date()
      this.currentLesson['day'] = date.getDay()
      let minutes = date.getMinutes() + date.getHours() * 60
      if (minutes < 600)
        this.currentLesson['lesson'] = 1
      else if (minutes < 715)
        this.currentLesson['lesson'] = 2
      else if (minutes < 830)
        this.currentLesson['lesson'] = 3
      else if (minutes < 945)
        this.currentLesson['lesson'] = 4
      else if (minutes < 1060)
        this.currentLesson['lesson'] = 5
      else if (minutes < 1200)
        this.currentLesson['lesson'] = 6
      else {
        this.currentLesson['lesson'] = 1
        this.currentLesson['day']++
      }
    }
  },
  async created() {
    this.groups = (await this.getGroups()).content;
    this.setCurrentLesson()
  },
}
</script>

<style>
@import 'bootstrap';
@import 'bootstrap-icons';
</style>