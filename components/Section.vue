<template>
	<section :id="id" class="section">
		<div class="section-header">
			<h1 class="title">{{ title }}</h1>
			<h6 class="subtitle">{{ subtitle }}</h6>
		</div>

		<slot></slot>
	</section>
</template>

<script setup>
const props = defineProps({
	id: String,
	title: String,
	subtitle: String
});
</script>

<style lang="sass" scoped>
@import "@/assets/sass/_vars.sass"

.section
	padding: 56px 0
	&-header
		margin: 24px 0 56px
		.title,
		.subtitle
			text-align: center
		.title
			text-shadow: 0 5px 5px $accent
			color: $white
			opacity: .85
		.subtitle
			color: $gray
			margin-top: 8px
</style>
