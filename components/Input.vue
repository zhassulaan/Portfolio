<template>
	<div class="input">
		<label :for="id">{{ label }}</label>
		<textarea
			v-if="textarea"
			:id="id"
			cols="1"
			rows="16"
			:placeholder="placeholder"
			v-model="model"
		/>
		<input
			v-else
			:id="id"
			:type="type"
			:placeholder="placeholder"
			v-model="model"
		/>
	</div>
</template>

<script setup>
const props = defineProps({
	id: String,
	label: String,
	type: String,
	placeholder: String,
	textarea: {
		type: Boolean,
		default: false
	}
});
const model = defineModel()
</script>

<style lang="sass" scoped>
input
	height: 40px
textarea
	height: max-content
</style>