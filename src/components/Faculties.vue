<template>
  <div class="container-fluid d-flex flex-row justify-content-end">
    <div class="btn-group-sm mx-1">
      <button class="btn btn-outline-dark">Створити</button>
    </div>
    <div class="btn-group-sm">
      <button class="btn btn-outline-primary">Змінити</button>
    </div>
    <div class="btn-group-sm mx-1">
      <button class="btn btn-danger">Видалити</button>
    </div>
  </div>

  <table class="table table-hover table-bordered table-responsive mt-1">
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Назва</th>
      <th scope="col">Скорочена назва</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="faculty in faculties">
      <td v-text="faculty.id"></td>
      <td v-text="faculty.name"></td>
      <td v-text="faculty.short_name"></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Faculties",
  data: () => ({
    faculties: [
      {
        id: 0,
        name: 'Факультет інформатики та обчислювальної техніки',
        short_name: 'ФІОТ'
      },
      {
        id: 1,
        name: 'Факультет менеджменту та маркетингу',
        short_name: 'ФММ'
      }
    ]
  })
}
</script>

<style scoped>

</style>