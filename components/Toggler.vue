<template>
	<div :id="`toggler-${section}`" class="toggler btn" :class="{ 'active': (active === section) }">
		<i :class="`${icon} icon`"></i>
		<h4 class="text">{{ section.charAt(0).toUpperCase() + section.slice(1) }}</h4>
	</div>
</template>

<script setup>
const props = defineProps({
	section: String,
	icon: String,
	active: String
});
</script>

<style lang="sass" scoped>
@import "@/assets/sass/_vars.sass"
@import "@/assets/sass/_mixins.sass"

.toggler
	@include aic
	gap: 8px
	&:hover,
	&.active
		.icon,
		.text
			color: $accent
	.icon
		font-size: 16px
</style>
