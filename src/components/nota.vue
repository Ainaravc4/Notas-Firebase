<template lang="html">

  <section class="nota">
    <div class="form-check">
      <div class="ti">
        <input class="form-check-input" type="checkbox"  v-bind:id="nota.titulo">
        <label v-bind:for="nota.titulo" v-on:click="cambiarEstado"  v-bind:class="{completadoClase: nota.completado}" class="form-check-label">
          {{nota.titulo}}
        </label>
      </div>
        <p>Prioridad:
        <button  v-bind:class="{prioridad1: nota.prioridad==0} " v-on:click="prioridadBaja">▼Low</button>
        <button v-bind:class="{prioridad2: nota.prioridad==1}" v-on:click="prioridadMedia">Normal</button>
        <button v-bind:class="{prioridad3: nota.prioridad==2}" v-on:click="prioridadAlta">▲High</button></p>
    </div>
    <button class="borrar" v-on:click="borraTarea">⛔</button>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'nota',
    props: ['nota'],
    mounted () {

    },
    data () {
      return {
      }
    },
    methods: {
      cambiarEstado:function(){
        this.nota.completado=!this.nota.completado;
        this.$emit("cambioEnEstado",this.nota);
        
      },
      borraTarea: function(){
        this.$emit("borrarNota",this.nota);
      },
      prioridadBaja: function() {
        this.nota.prioridad=0;
         this.$emit("cambioEnEstado");
      },
      prioridadMedia: function() {
        this.nota.prioridad=1;
         this.$emit("cambioEnEstado");
      },
      prioridadAlta: function() {
        this.nota.prioridad=2;
         this.$emit("cambioEnEstado");
      }
    },
    computed: {
      
    }
}


</script>

<style>
.nota{
    display: flex;
    flex-flow: row;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.197);
}
  .completadoClase{
    text-decoration:line-through;
    color: rgb(21, 201, 123);
  }
  .ti{
    display: flex;
    flex-flow: row;
    align-items: center;
  }
  .form-check{
    width: 100%;
  }
 .form-check-input{
    width: 2rem;
    margin-right: 1rem;
    border-radius: 50%;
  }
  .nota label{
    font-size: 30px;
    margin-left: 1rem;
  }
  .nota p{
    font-size: 16px;
  }
 .prioridad1{
   background-color: rgb(101, 204, 248);
   color: white;
 }
 .prioridad2{
   background-color: rgb(248, 172, 101);
   color: white;
 }
 .prioridad3{
   background-color: rgb(255, 0, 0);
   color: white;
 }
 .borrar{
   width: 3rem;
   height: 3rem;
   background-color: rgba(255, 2, 2, 0.319);
   font-size: 20px;
 }
      
</style>
