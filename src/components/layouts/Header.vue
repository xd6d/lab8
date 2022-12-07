<template>
  <header>
    <nav class="navbar navbar-light bg-light navbar-expand-lg flex-column">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <h1 class="">Schedule</h1>
        </a>
        <ul class="navbar-nav justify-content-end">
          <!--          <li class="nav-item">-->
          <!--            <a href="https://ecampus.kpi.ua/home" target="_blank" class="nav-link">-->
          <!--              <h3>Е-кампус</h3>-->
          <!--            </a>-->
          <!--          </li>-->
          <!--          <li class="nav-item">-->
          <!--            <a href="https://do.ipo.kpi.ua/" target="_blank" class="nav-link">-->
          <!--              <h3>Moodle</h3>-->
          <!--            </a>-->
          <!--          </li>-->
          <li class="nav-item">
            <a href="#" class="nav-link">
              <h3>Факультети</h3>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <h3>Департаменти</h3>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <h3>Групи</h3>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <h3>Студенти</h3>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <h3>Викладачі</h3>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <h3>Предмети</h3>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <h3>FAQ</h3>
            </a>
          </li>
        </ul>
      </div>
        <form class="d-flex justify-content-center align-items-center">
          <label class="flex-row h6 m-0">Розклад для </label>
            <v-select :options="groups" style="margin-left: 5px"/><!--placeholder | change select-->
        </form>
    </nav>
  </header>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css'
export default {
  name: "Header",
  components: {
    vSelect,
  },
  data: () => ({
    groups: [
      'ІА-11',
      'ІА-12',
      'ІА-13'
    ]})
}
</script>

<style>
@import 'bootstrap';
</style>