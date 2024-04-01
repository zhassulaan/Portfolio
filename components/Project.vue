<template>
	<div class="project">
		<a :href="link" class="project-image">
			<img :src="image" :alt="name" class="image" />
		</a>

		<div class="project-data">
			<h3 class="title">{{ name }}</h3>
			<h6 class="description">Tech stack: {{ stack }}</h6>
			<p class="text">{{ description }}</p>
			<a :href="link">
				<Button text="Watch this project" icon="fa-solid fa-angles-right" />
			</a>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	project: Object,
});
const { name, link, description, stack, image } = props.project;
</script>
