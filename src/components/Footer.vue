<template lang="html">

  <section class="Footer">
    <p>Desarrollado por Ainara Vázquez Cuesta {{$route.params.numero}}</p>  
  </section>
  
</template>

<script lang="js">
  export default  {
    name: 'Footer',
    props: [],
    mounted () {

    },
    data () {
      return {
      }
    },
    methods: {
      
    },
    computed: {

    }
}


</script>

<style >
  .Footer {

  }
  .Footer p{
    text-align: center;
  }
  
</style>
