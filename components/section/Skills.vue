<template>
	<Section id="skills" title="Skills" subtitle="My abilities">
		<div class="skills section-content">
			<div
				:id="skill.id"
				:key="skill.id"
				v-for="skill in info.skills"
				class="skills-box"
				:class="{ 'active': active === skill.id }"
			>
				<div class="skills-box__header">
					<i :class="`${skill.icon} icon`"></i>

					<div>
						<h4>{{ skill.title }}</h4>
						<h6 class="subtitle">{{ skill.subtitle }}</h6>
					</div>

					<i class="fa-solid fa-angle-down icon btn" @click="active = skill.id"></i>
				</div>

				<div class="skills-box__list">
					<Skill
						:key="item.key"
						v-for="item in skill.list"
						:skill="item"
					/>
				</div>
			</div>
		</div>
	</Section>
</template>

<script setup>
import info from "@/assets/data.js";

const active = ref(info.skills[0].id);
</script>
