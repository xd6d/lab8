<template>

    <Header/>

    <main style="flex: 1 1 auto">
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