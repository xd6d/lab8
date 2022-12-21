<template>
  <form class="d-flex justify-content-center align-items-center">
    <label class="flex-row h6 m-0" for="select">Розклад для </label>
    <v-select :options="groups" style="margin-left: 5px; min-width: 114px;" :label="'name'"
              v-model="this.group"
              id="select"/>
  </form>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-sm-2" v-for="day of days">
        <div class="card">
          <h4 class="card-header" v-text="day.name"></h4>
          <div class="card-body">
            <p class="container-fluid border-bottom" v-for="i of 6">
              {{i}}<br>
              {{day[i]?.discipline.name}}<br>
              {{day[i]?.teacher.surname}} {{day[i]?.teacher.name}}<br>
              {{day[i]?.group.name}}<br>
              {{day[i]?.classroom}}<br>
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
    days: {
      1: {name: 'Понеділок'},
      2: {name: 'Вівторок'},
      3: {name: 'Середа'},
      4: {name: 'Четвер'},
      5: {name: 'П\'ятниця'},
      6: {name: 'Субота'}
    }
  }),
  watch: {
    async group() {
      this.flushDays()
      if (this.group !== null) {
        this.schedulesByGroup = (await this.getSchedulesByGroup(this.group.id)).content
        this.schedulesByGroup.sort((o1, o2) => (o1.dayOfWeek - o2.dayOfWeek || o1.lesson - o2.lesson))
        for (let schedule of this.schedulesByGroup) {
          this.days[schedule.dayOfWeek][schedule.lesson] = schedule
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
      this.days = {1: {name: 'Понеділок'}, 2: {name: 'Вівторок'}, 3: {name: 'Середа'}, 4: {name: 'Четвер'}, 5: {name: 'П\'ятниця'}, 6: {name: 'Субота'}}
    }
  },
  async created() {
    this.groups = (await this.getGroups()).content;
  },
}
</script>

<style>
@import 'bootstrap';
@import 'bootstrap-icons';
</style>