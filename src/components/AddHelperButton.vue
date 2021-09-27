<template>
	<button id="add-helper-button" v-on:click="addHelper" class="btn btn-primary">Add Helper</button>
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
