<template>
	<div class="scroller btn" :class="{ 'active': active }" @click="scrollToTop">
		<i class="fa-solid fa-angles-up scroller-icon"></i>
	</div>
</template>

<script setup>
const scrollY = ref(0);
const active = ref(false);

function handleScroll() {
	scrollY.value = window.scrollY;
	// Show/hide scroll-up button based on scroll position
	active.value = scrollY.value > 500;
};

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
};

onMounted(() => {
	window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="sass" scoped>
@import "@/assets/sass/_vars.sass"
@import "@/assets/sass/_mixins.sass"

.scroller
	z-index: 4
	position: fixed
	right: 16px
	bottom: 60px
	@include aic
	justify-content: center
	@include hide
	width: 25px
	height: 25px
	border: 2px solid $accent
	border-radius: 35%
	&.active
		@include show
	&-icon
		font-size: 15px
		color: $accent
</style>
