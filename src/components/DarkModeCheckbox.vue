<template>
	<label for="dark">
		<input class="form-inline-check" type="checkbox" v-bind:checked='dark' id="dark" />
		Dark Mode
	</label>
</template>

<script>
	export default {
		name: 'DarkModeCheckbox',
		props: ['dark'],
		methods: {
			toggleDark: function(){
				this.$parent.$parent.$parent.dark = !this.$parent.$parent.$parent.dark
			}
		}
	}
</script>
<style>
	#dark {
		margin: 1rem;
	}
	.check-col {
		display: inline-block;
	}
	.check-col label {
		cursor:  pointer;
	}
</style>