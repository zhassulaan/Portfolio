<template>
	<div :id="key" class="skill">
		<div class="skill-data">
			<a :href="link">
				<h5>{{ name }}</h5>
			</a>

			<a v-if="level" :href="link">
				<p class="level">{{ level }}</p>
			</a>
			<p v-else class="percentage">{{ percentage }}%</p>
		</div>

		<div class="skill-bar">
			<div class="skill-bar__inner" :style="{ width: percentage + '%' }"></div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	skill: Object
});
const { key, name, percentage, level, link } = props.skill;
</script>

<style lang="sass" scoped>
@import "@/assets/sass/_vars.sass"
@import "@/assets/sass/_mixins.sass"

.skill
	&-data
		@include aic_jcsb
		margin-bottom: 6px
		.percentage,
		.level
			font-size: 14px
	&-bar
		position: relative
		width: 100%
		height: 5px
		border: 1px solid $black
		border-radius: 4px
		box-shadow: 0 2px 10px $accent
		background-color: $gray-background
		&__inner
			top: 0
			left: 0
			position: absolute
			height: 100%
			background-color: $accent-active
</style>
