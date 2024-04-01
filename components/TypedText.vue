<template>
	<span class="typed-text">{{ typeValue }}</span>
	<span class="blinking-cursor">|</span>
	<span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
</template>

<script setup>
const props = defineProps({
	position: Array
});
const typeValue = ref("");
const typeStatus = ref(false);
const typingSpeed = 100;
const erasingSpeed = 100;
const newTextDelay = 1000;
const textArray = props.position;
let textIndex = 0;
let charIndex = 0;

function typeText() {
	if (charIndex < textArray[textIndex].length) {
		if (!typeStatus.value)
			typeStatus.value = true;
		typeValue.value += textArray[textIndex].charAt(charIndex);
		charIndex += 1;
		setTimeout(typeText, typingSpeed);
	} else {
		typeStatus.value = false;
		setTimeout(eraseText, newTextDelay);
	}
}
function eraseText() {
	if (charIndex > 0) {
		if (!typeStatus.value)
			typeStatus.value = true;
		typeValue.value = textArray[textIndex].substring(0, charIndex - 1);
		charIndex -= 1;
		setTimeout(eraseText, erasingSpeed);
	} else {
		typeStatus.value = false;
		textIndex += 1;
		if (textIndex >= textArray.length)
			textIndex = 0;
		setTimeout(typeText, typingSpeed + 1000);
	}
}

onMounted(() => {
	setTimeout(typeText, newTextDelay + 200);
});
</script>

<style lang="sass" scoped>
@import "@/assets/sass/_vars.sass"

.blinking-cursor
	-webkit-animation: 1s blink step-end infinite
	-moz-animation: 1s blink step-end infinite
	-ms-animation: 1s blink step-end infinite
	-o-animation: 1s blink step-end infinite
	animation: 1s blink step-end infinite
@keyframes blink
	from,
	to
		color: transparent
	50%
		color: $accent
@-moz-keyframes blink
	from,
	to
		color: transparent
	50%
		color: $accent
@-webkit-keyframes blink
	from,
	to
		color: transparent
	50%
		color: $accent
@-ms-keyframes blink
	from,
	to
		color: transparent
	50%
		color: $accent
@-o-keyframes blink
	from,
	to
		color: transparent
	50%
		color: $accent
</style>
