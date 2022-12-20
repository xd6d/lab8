<template>
  <Table link="department" :headers="['Факультет', 'Назва', 'Скорочена назва']" :objects="departments"
         :properties="[{name:'faculty', type:'select', selectOptions: {value: faculties, label: 'shortName'}}, {name:'name', type:'text'}, {name:'shortName', type:'text'}]"
         :label="(o) => o.shortName"/>
</template>

<script>
import Table from "./Table.vue";

export default {
  name: "Departments",
  components: {Table},
  data: () => ({
    departments: [{
      id: 0,
      faculty: {
        id: 1,
        name: 'Факультет менеджменту та маркетингу',
        shortName: 'ФММ'
      },
      name: 'Кафедра інформатики та програмної інженерії',
      shortName: 'ІПІ'
    }],
    faculties: [
      {
        id: 0,
        name: 'Факультет інформатики та обчислювальної техніки',
        shortName: 'ФІОТ'
      },
      {
        id: 1,
        name: 'Факультет менеджменту та маркетингу',
        shortName: 'ФММ'
      },
      {
        id: 2,
        name: 'Хіміко-технологічний факультет',
        shortName: 'ХТФ'
      },
      {
        id: 3,
        name: 'Інститут атомної та теплової енергетики',
        shortName: 'ІАТЕ'
      }
    ]
  })
}
</script>

<style scoped>

</style>