
<template lang="html">

  <section class="cabecera">
    <h1> {{this.titulo}} </h1>
    
  </section>

</template>

<script lang="js">

  export default  {
    name: 'cabecera',
    props: ['ejemplo'],
    mounted () {

    },
    data () {
      return {
        titulo:"proyecto Vue.js- Ainara"
      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style >
  .cabecera {

  }
  h1{
    font-size: 32px;
  }
</style>
