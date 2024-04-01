<template>
	<Section id="experience" title="Experience" subtitle="My profesional journey">
		<div class="experience section-content">
			<Card
				:key="item.id"
				v-for="item in info.experience"
				:company="item"
			/>
		</div>
	</Section>
</template>

<script setup>
import info from "assets/data.js";
</script>
