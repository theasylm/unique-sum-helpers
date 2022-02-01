<template>
  <div id="cog">
    <b-icon icon="gear-fill" id="popover-target-1"></b-icon>
    <b-popover target="popover-target-1" triggers="click" placement="bottom">
      <template #title>Settings</template>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="show-all-switch" v-on:click="toggleShowAll" v-bind:checked="this.$parent.showAll">
        <label class="form-check-label" for="show-all-switch">Show All</label>
      </div>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="dark-mode-switch" v-on:click="toggleDark" v-bind:checked="this.$parent.dark">
        <label class="form-check-label" for="dark-mode-switch">Dark Mode</label>
      </div>
    </b-popover>
  </div>
</template>

<style>
	#cog {
		display: inline;
		margin-right:  1em;
	}
  #show-all, #dark {
    margin: 1rem;
  }
  .check-col {
    display: inline-block;
  }
  .check-col label {
    cursor:  pointer;
  }
  .dark .popover {
    background-color: #131313 !important;

  }
  .dark .popover-body {
    color: #efefef !important;
  }
  .dark .form-switch .form-check-input:checked {
    background-color: #131313;
  }

  .dark .form-switch .form-check-input {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e") !important;
  }
</style>
<script>
  export default {
    methods: {
			toggleDark: function(){
				this.$parent.toggleDark()
			},
      toggleShowAll: function(){
        this.$parent.toggleShowAll()
      }
		},
    computed: {
      dark: function(){
        return this.$parent.dark
      }
    }

  }
</script>