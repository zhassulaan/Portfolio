<template>
	<div class="stat">
		<h3 class="stat-value">{{ formattedNumber }}</h3>
		<h6 class="stat-key">{{ text }}</h6>
	</div>
</template>

<script setup>
const props = defineProps({
	number: {
		type: Number,
		default: 0
	},
	text: String
});
const formattedNumber = computed(() => {
	return (props.number < 10) ? `0${props.number}` : props.number;
});
</script>

<style lang="sass" scoped>
.stat
	width: 30%
	&-value,
	&-key
		text-align: center
	&-key
		margin-top: 6px

@media only screen and (max-width : 1440px)
	.stat
		width: 21%
</style>
