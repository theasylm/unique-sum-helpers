<template>
  <div id="app" class="container-fluid">
    <nav class="navbar navbar-default fixed-top">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Unique Sum Helpers</a>
        </div>
        <form class="form-inline">
          <settings-cog></settings-cog>
          <add-helper-button></add-helper-button>
        </form>
      </div>
    </nav>
    <div class="row helper-row">
      <sum-helper
        v-for="helper in helpers"
        v-bind:key="helper.id"
        v-bind:helper="helper"
      ></sum-helper>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
  import AddHelperButton from './components/AddHelperButton.vue'
  import SumHelper from './components/SumHelper.vue'
  import SettingsCog from './components/SettingsCog.vue'
  import $ from 'jquery'
  import 'bootstrap'

  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  Vue.use(BootstrapVue)
  Vue.use(BootstrapVueIcons)

  export default {
    name: 'App',
    components: {
      AddHelperButton,
      SumHelper,
      SettingsCog
    },
    methods: {
      getNextHelperId: function() {
        return 'helper-' + ++(this.count)
      },
      addHelper: function(){
        this.helpers.push({id: this.getNextHelperId(),included:'',excluded:''})
      },
      removeHelper: function(id) {
        this.helpers.splice(this.helpers.findIndex(helper => helper.id == id),1)
      },
      resetHelper: function(id) {
        let index = this.helpers.findIndex(helper => helper.id == id)
        let helpers = [...this.helpers]
        helpers.splice(index,1,{id:id})
        this.$set(this.helpers, helpers)
      },
      toggleDark: function() {
        this.dark = !this.dark
        this.dark ? $('body').addClass('dark') : $('body').removeClass('dark')
        window.localStorage.setItem('dark', this.dark)
      },
      toggleShowAll: function() {
        this.showAll = !this.showAll
        window.localStorage.setItem('showAll', this.showAll)
      },
      initializeDark: function() {
        let dark = window.localStorage.getItem('dark')
        if ( dark === undefined || dark === null ) {
          if (window.matchMedia != undefined ){
            dark = window.matchMedia('(prefers-color-scheme: dark)').matches
            if ( dark == true ) {
              $('body').addClass('dark')
            }
          } else {
            dark = false
          }
          window.localStorage.setItem('dark',dark)
          return dark
        }
        if ( dark == 'true') {
          $('body').addClass('dark')
          return true
        }
        else {
          return false
        }
      },
      initializeShowAll: function() {
        let showAll = window.localStorage.getItem('showAll')
        if ( showAll === undefined || showAll === null ) {
          window.localStorage.setItem('showAll',true)
          return true
        }
        if ( showAll == 'true') {
          return true
        }
        else {
          return false
        }
      }
    },
    data: function() {
      return {
        helpers: [{id:'helper-0',included:'',excluded:''}],
        count: 0,
        showAll: this.initializeShowAll(),
        dark: this.initializeDark()
      }
    }
  }

</script>
<style>
  #app {
    min-height:  100vh;
  }
  .dark #app, .dark nav {
    background-color: #121212;
  }

  .dark nav, .dark nav .navbar-brand {
    color: #efefef;
  }
  .dark button#add-helper-button {
    background-color: #131313;
    border-color: #efefef;
    color: #efefef;
  }
  .dark input, .dark textarea {
    background-color: #131313;
    border-color: #efefef;
    color: #efefef;
  }
  .dark input:disabled {
    color: #666;
  }
  .container-fluid {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .button-div {
    margin-bottom: .5rem;
  }
  .header {
    position:  fixed;
    top:  0;
    background-color: #FFF;
    width: 100%;
    padding-top: 1rem;
  }

  .row.helper-row {
    margin-top: -36px;
  }

  .dummy-row {
    visibility:  hidden;
    padding-top:  1.5rem;
  }

  body {
    padding-top: 90px;
  }
  nav {
    background-color:  #fff;
  }
  nav a {
    color:  #000;
  }
  nav .container-fluid {
    justify-content:  flex-start !important;
  }

</style>
