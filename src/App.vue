<template>

    <Header/>

    <main class="flex-grow-1 container-fluid p-3">
      <router-view />
    </main>

    <Footer/>

</template>

<script>
import {defineComponent} from 'vue'
import Header from './components/layouts/Header.vue'
import Footer from './components/layouts/Footer.vue'

export default defineComponent({
  components:{
    Header,
    Footer,
  }
})
</script>