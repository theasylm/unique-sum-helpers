<template>
	<button id="add-helper-button" v-on:click="addHelper" class="btn btn-primary col-12 col-lg-4 mt-2">Add Helper</button>
</template>

<script>
	export default {
		name: 'AddHelperButton',
		methods: {
			addHelper: function() {
				this.$parent.addHelper();
			}
		}
	}
</script>
