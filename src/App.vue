
<template>
  <div id="app">
    
    <Cabecera />


    <div class="inputs">
      <input placeholder="Bucar" type="text" v-model="buscar" v-on:keyup.enter="alta" >
      <input placeholder="¿Que quieres recordar?" type="text" v-model="nuevoRecordatorio" v-on:keyup.enter="alta" >
    </div>

    <hr>
    <div>
      <p>{{totalCompletados}} Tareas pendientes de un total de {{totalTareas}} |<span v-on:click="borrarTareasCompletadas" >X Borra tareas completadas</span></p>
    </div>
    <hr>

    <transition-group name="fade" tag="h1">
      <nota
       v-for="dato in miListaFiltrada"
        v-bind:key="dato.id"
        v-bind:nota="dato"
        v-on:borrarNota="baja(dato)"
        v-on:cambioEnEstado="editar(dato)"/>
    </transition-group>

  <Footer/>
  
  <router-view></router-view>

  </div>
</template>

<script>
import Cabecera from './components/Cabecera.vue'
import nota from './components/nota.vue'
import Footer from './components/Footer.vue'
import { db } from './components/db.js'
import Firebase from './components/db.js'
export default {
  name: 'App',
  components: {
    nota,
    Cabecera,
    Footer
  },
  data(){
    return{
      datos:[],
      completados:[],
      buscar:"",
      nuevoRecordatorio:"",
      prioridad: 0,
      fechaCreacion: new Date(),
      completado: false,
      user: {
          loggedIn: false,
          data: {},
          
        }
    }
  },

  mounted: function() {
      Firebase.auth.onAuthStateChanged( user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;
        }
        else {
          this.user.loggedIn = false;
          this.user.data = {};
        }
      })
  },

  methods: {
    login:function(){
      Firebase.login();
    },
    logout() {
      Firebase.logout()
    },
    alta: function() {
      db.collection('documentos').add({
        titulo: this.nuevoRecordatorio,
        prioridad: this.prioridad,
        fecha:this.fechaCreacion,
        estado:this.completado
      })
      this.nuevoRecordatorio="";
    },       
    baja: function(documento) {
      db.collection('documentos')
        .doc(documento.id)
        .delete()
      
    },
    editar: function(documento) {
      db.collection('documentos')
      .doc(documento.id)
      .set(documento)
      this.nuevoRecordatorio="";
    },
    borrarTareasCompletadas: function(){
      this.datos=this.datos.filter((nota)=>{
          if(nota.completado){
            this.baja(nota)
          }
          return !nota.completado;
      })
      
       
    }
  }, 
  
  firestore:{
    datos: db.collection('documentos').orderBy("prioridad","desc")
  },
  computed:{
   authenticated(){
      return this.user.loggedIn
    },
    totalTareas: function(){
      return this.datos.length;
    },
    totalCompletados: function(){
      let totalPendientes=0;
      for(let recordatorio of this.datos){
          if(!recordatorio.completado){
              totalPendientes++;
          }
      }
      return totalPendientes;
    },
    miListaFiltrada: function(){
      let listaFiltrada;
      if(this.buscar=="")
          listaFiltrada=this.datos;
      
      else
          listaFiltrada= this.datos.filter((recordatorio)=>{
              if(recordatorio.titulo.indexOf(this.buscar)>=0){
                  return true;
              }else{
                  return false;
              }
          }); 

      return listaFiltrada;
      }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: white;
  margin-top: 60px;
  margin-left: 5rem;
  margin-right: 5rem;
  
}
.inputs{
  display: flex;
  flex-flow: column;
}
input{
  height: 3rem;
  border-radius: 10px;
}
input::placeholder{
  font-size: 15px;
}
span{
  color: orange;
}
body{
  background-color: black  !important;
}
.fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
</style>
