<template>
	<div class="check-col">
		<label for="show-all">
			<input class="form-inline-check" type="checkbox" v-bind:checked='showAll' id="show-all" v-on:click="toggleShowAll"/>
			Show all info
		</label>
	</div>
</template>

<script>
	export default {
		name: 'ShowAllCheckbox',
		props: ['showAll'],
		methods: {
			toggleShowAll: function(){
				this.$parent.showAll = !this.$parent.showAll
			}
		}
	}
</script>
<style>
	#show-all {
		margin: 1rem;
	}
	.check-col {
		display: inline-block;
	}
</style>