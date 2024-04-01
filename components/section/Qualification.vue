<template>
	<Section id="qualification" title="Qualification" subtitle="My knowledge and certificates">
		<div class="qualification section-content">
			<div class="qualification-header">
				<Toggler
					:section="sections[0]"
					icon="fa-solid fa-graduation-cap"
					:active="active"
					@click="active = sections[0]"
				/>
				<Toggler
					:section="sections[1]"
					icon="fa-solid fa-briefcase"
					:active="active"
					@click="active = sections[1]"
				/>
			</div>

			<Tree
				:section="sections[0]"
				:list="info.education"
				:active="active"
			/>
			<Tree
				:section="sections[1]"
				:list="info.achievement"
				:active="active"
			/>
		</div>
	</Section>
</template>

<script setup>
import info from "assets/data.js";

const sections = ["education", "achievement"];
const active = ref("education");
</script>
