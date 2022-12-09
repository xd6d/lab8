<template>
  <header>
    <nav class="navbar navbar-light bg-light navbar-expand-lg flex-column border-bottom">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <h1 class="">Schedule</h1>
        </a>
        <ul class="navbar-nav">
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
            <router-link to="/faculties" class="nav-link">
              <h3>Факультети</h3>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/departments" class="nav-link">
              <h3>Департаменти</h3>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/groups" class="nav-link">
              <h3>Групи</h3>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/students" class="nav-link">
              <h3>Студенти</h3>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/teachers" class="nav-link">
              <h3>Викладачі</h3>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/subjects" class="nav-link">
              <h3>Предмети</h3>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/faq" class="nav-link">
              <h3>FAQ</h3>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>

</script>

<style>
@import 'bootstrap';
</style>