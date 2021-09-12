<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col"><h1>Unique Sum Helpers</h1></div>
    </div>
    <div class="row">
      <div class="col button-div">
        <add-helper-button></add-helper-button>
      </div>
    </div>
    <div class="row">
      <show-all-checkbox v-bind:showAll="showAll"></show-all-checkbox>
    </div>
    <div class="row">
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
        this.helpers.push({id: this.getNextHelperId()})
      },
      removeHelper: function(id) {
        this.helpers.splice(this.helpers.findIndex(helper => helper.id == id),1)
      }
    },
    data: function() {
      return {
        helpers: [{id:'helper-0'}],
        count: 0,
        showAll: false
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
</style>
