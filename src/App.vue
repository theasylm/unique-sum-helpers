<template>
  <div id="app" class="container-fluid">
    <nav class="navbar navbar-default fixed-top">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Unique Sum Helpers</a>
        </div>
        <form class="form-inline">
          <add-helper-button></add-helper-button>
          <show-all-checkbox v-bind:showAll="showAll"></show-all-checkbox>
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
  import ShowAllCheckbox from './components/ShowAllCheckbox.vue'
  //import $ from 'jquery'
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
      ShowAllCheckbox
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
        console.log('got here')
        let index = this.helpers.findIndex(helper => helper.id == id)
        let helpers = [...this.helpers]
        helpers.splice(index,1,{id:id})
        console.log(helpers)
        this.$set(this.helpers, helpers)
      }
    },
    data: function() {
      return {
        helpers: [{id:'helper-0',included:'',excluded:''}],
        count: 0,
        showAll: true
      }
    }
  }

</script>
<style>
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
