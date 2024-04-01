<template>
	<div id="progressbar" :style="{ height: `${progressHeight}%` }"></div>
</template>

<script setup>
const totalHeight = ref(0);
const progressHeight = ref(0);

function updateProgressBar() {
	if (process.client) {
		totalHeight.value = document.body.scrollHeight - window.innerHeight;
	}

	const newHeight = (window.pageYOffset / totalHeight.value) * 100;
	progressHeight.value = newHeight;
};

onMounted(() => {
	window.addEventListener('scroll', updateProgressBar);
});
onBeforeUnmount(() => {
	window.removeEventListener('scroll', updateProgressBar);
});
</script>

<style lang="sass" scoped>
@import "@/assets/sass/_vars.sass"

#progressbar
	z-index: 4
	position: fixed
	top: 0
	right: 0
	width: 3px
	background: linear-gradient(to top, $accent, $accent-active)
</style>
