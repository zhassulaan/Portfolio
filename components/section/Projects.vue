<template>
	<Section id="projects" title="Projects" subtitle="My works">
		<Carousel :list="info.projects">
			<template v-slot="{ element }">
				<Project :project="element" />
			</template>
		</Carousel>
	</Section>
</template>


<script setup>
import info from "@/assets/data.js";
</script>
