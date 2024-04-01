<template>
	<div :id="`tree-${section}`" class="tree" :class="{ 'active': (active === section) }">
		<div
			:key="index"
			v-for="(item, index) in list"
			class="tree-row"
			:class="
				((index % 2 === 1) && section === 'education') ||
				((index % 2 === 0) && section === 'achievement')
					? 'right'
					: 'left'
			"
		>
			<div class="tree-row__cell"></div>

			<div class="tree-row__cell">
				<span class="circle"></span>
				<span class="line"></span>
			</div>

			<div class="tree-row__cell">
				<a :href="item.link">
					<h5 class="title">{{ item.title }}</h5>
				</a>
				<h6 class="subtitle">{{ item.description }}</h6>
				<div class="date">
					<i class="fa-solid fa-calendar-days date-icon"></i>
					<p class="date-text">{{ item.date }}</p>
				</div>
			</div>

			<div class="tree-row__cell">
				<span class="circle"></span>
				<span class="line"></span>
			</div>

			<div class="tree-row__cell"></div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	section: String,
	list: Array,
	active: String
});
</script>

<style lang="sass" scoped>
@import "@/assets/sass/_vars.sass"
@import "@/assets/sass/_mixins.sass"

.tree
	width: 100%
	@include hide-height
	&.active
		@include show-height
	&-row
		display: grid
		grid-template-columns: 1fr max-content 1fr
		column-gap: 25px
		&__cell
			&:nth-child(3)
				@include vertical
				gap: 5px
			.circle,
			.line
				display: block
				background-color: $accent
			.circle
				width: 13px
				height: 13px
				border-radius: 50%
			.line
				width: 1px
				height: 100%
				transform: translate(6px, -7px)
			.title
				text-decoration: underline
			.date
				@include aic
				gap: 6px
				&-icon,
				&-text
					font-size: 11px
					color: $gray
		&.left .tree-row__cell
			&:nth-child(1),
			&:nth-child(2)
				display: none
			.title,
			.subtitle
				text-align: right
			.date
				justify-content: end
		&.right .tree-row__cell
			&:nth-child(4),
			&:nth-child(5)
				display: none
</style>
