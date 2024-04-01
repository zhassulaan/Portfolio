<template>
	<button class="button" :class="{ 'green': !transparent }">
		<i v-if="second" :class="`${icon} icon`"></i>
		<p class="button-text">{{ text }}</p>
		<i :class="`${icon} icon`"></i>
	</button>
</template>

<script setup>
const props = defineProps({
	text: String,
	icon: String,
	transparent: {
		type: Boolean,
		default: false
	},
	second: {
		type: Boolean,
		default: false
	}
});
</script>

<style lang="sass" scoped>
@import "@/assets/sass/_vars.sass"
@import "@/assets/sass/_mixins.sass"

.button
	@include aic
	gap: 8px
	width: fit-content
	padding: 8px
	border: none
	border-radius: 8px
	outline: none
	background-color: transparent
	cursor: pointer
	transition: .3s
	&.green
		background-color: $accent
		&:hover
			background-color: $accent-active
	&-text,
	.icon
		font-weight: 700
	&-text
		text-wrap: nowrap
	.icon
		font-size: 16px
</style>
