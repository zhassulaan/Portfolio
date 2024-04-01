<template>
	<Section id="recomendations" title="Recomendations" subtitle="Characteristics from my cheifs">
		<div class="recomendations section-content">
			<Stars />

			<Recomendation
				:key="index"
				v-for="(recomendation, index) in recomendations"
				:recomendation="recomendation"
			/>
		</div>
	</Section>
</template>

<script setup>
import info from "@/assets/data.js";

const recomendations = info.documents.recomendations;
</script>
