<template>
  <header>
    <nav class="navbar navbar-light bg-light navbar-expand-lg flex-column border-bottom">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <h1 class="">Schedule</h1>
        </a>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/faculties" class="nav-link" exact-active-class="active">
              <h3>Факультети</h3>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/departments" class="nav-link" exact-active-class="active">
              <h3>Департаменти</h3>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/groups" class="nav-link" exact-active-class="active">
              <h3>Групи</h3>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/students" class="nav-link" exact-active-class="active">
              <h3>Студенти</h3>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/teachers" class="nav-link" exact-active-class="active">
              <h3>Викладачі</h3>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/subjects" class="nav-link" exact-active-class="active">
              <h3>Предмети</h3>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/faq" class="nav-link" exact-active-class="active">
              <h3>FAQ</h3>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data: () => ({
    ref: window.location.href.substring(window.location.href.lastIndexOf('/')+1)
  })
}
</script>

<style>
@import 'bootstrap';
</style>