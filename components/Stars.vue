<template>
	<div class="stars">
		<i :key="i" v-for="i in 5" class="fa-solid fa-star icon"></i>
	</div>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/_vars.sass"
@import "@/assets/sass/_mixins.sass"

.stars
	@include horizontal
	gap: 8px
	margin-bottom: 26px
	.icon
		color: $accent
		text-shadow: .8px .8px $shadow-dark
</style>
