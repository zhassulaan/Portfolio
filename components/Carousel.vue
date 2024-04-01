<template>
	<div class="carousel">
		<div class="carousel-inner">
			<div :key="index" v-for="(item, index) in list" class="carousel-item">
				<slot :element="item"></slot>
			</div>
		</div>

		<i id="prev" class="fa-regular fa-circle-left icon btn" @click="slider().prevSlide"></i>
		<i id="next" class="fa-regular fa-circle-right icon btn" @click="slider().nextSlide"></i>
	</div>
</template>

<script setup>
const props = defineProps({
	list: Array
});
const active = ref(0);
let timer = null;

function slider() {
	const container = document.querySelector(".carousel-inner");
	
	if (!container) {
		console.error("Container element not found");
		return { prevSlide: () => {}, nextSlide: () => {} };
	}

	const width = container.offsetWidth;
	const length = props.list.length;
	const maxIndex = length - 1;

	function updateTransform() {
		const newPosition = active.value * width;
		container.style.transform = `translateX(-${newPosition}px)`;
		startInterval();
	}
	function prevSlide() {
		clearInterval(timer);
		if (active.value > 0)
			active.value--;
		else
			active.value = maxIndex;
		updateTransform();
	}
	function nextSlide() {
		clearInterval(timer);
		if (active.value < maxIndex)
			active.value++;
		else
			active.value = 0;
		updateTransform();
	}

	return { prevSlide, nextSlide };
}
function startInterval() {
	timer = setInterval(() => {
		slider().nextSlide();
	}, 3000);
}

onMounted(() => {
	startInterval();
});
onUnmounted(() => {
	if (timer) {
		clearInterval(timer);
		timer = null;
	}
});
</script>

<style lang="sass" scoped>
@import "@/assets/sass/_mixins.sass"

.carousel
	position: relative
	overflow: hidden
	&-inner
		@include aic
	&-item
		min-width: 80%
		margin: 0 10%
	.icon
		position: absolute
		@include center-vertical
		font-size: 28px
		&#prev
			left: 0
		&#next
			right: 0
</style>
