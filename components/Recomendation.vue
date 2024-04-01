<template>
	<a download :href="file" class="recomendation">
		<i class="fa-solid fa-file icon"></i>
		<div class="recomendation-line"></div>

		<div>
		<h4 class="recomendation-name">{{ cheif }}</h4>
			<h6 class="recomendation-place">{{ description }}</h6>
		</div>
	</a>
</template>

<script setup>
const props = defineProps({
	recomendation: Object
});

const { file, cheif, description } = props.recomendation;
</script>

<style lang="sass" scoped>
@import "@/assets/sass/_vars.sass"
@import "@/assets/sass/_mixins.sass"

.recomendation
	@include aic
	justify-content: space-evenly
	width: 100%
	height: 108px
	margin-bottom: 20px
	border: 2px solid $white
	box-shadow: 0 -4px 10px $gray
	.icon
			font-size: 40px
			color: $accent
	&-line
			border-left: 3px solid $white
			height: 60px
	&-place
			margin-top: 8px
			font-size: 13px
			color: $gray
			opacity: .4

@media only screen and (max-width : 768px)
	.recomendation
		height: 96px
		.icon
				font-size: 32px
		&-line
				height: 56px
		&-place
				margin-top: 4px
				font-size: 11px
</style>
