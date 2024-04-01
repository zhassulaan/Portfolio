<template>
	<header class="header box" :class="{ 'active': active }">
		<div class="header-wrap">
			<img :src="info.logo" alt="Logo" class="header-logo" />

			<div class="header-toggle btn" @click="active = !active">
				<span></span>
			</div>

			<ul class="header-menu">
				<li :key="item.id" v-for="item in list" @click="active = !active">
					<a :href="`#${item.id}`" class="header-menu__item">
						<i :class="`fa-solid ${item.icon} icon`"></i>
						<p class="text">{{ item.text }}</p>
					</a>
				</li>
			</ul>
		</div>
	</header>
</template>

<script setup>
import info from "@/assets/data.js";

const active = ref(false);
const list = [
	{
		id: "home",
		text: "Home",
		icon: "fa-house"
	}, {
		id: "about",
		text: "About me",
		icon: "fa-user"
	}, {
		id: "experience",
		text: "Experience",
		icon: "fa-briefcase"
	}, {
		id: "qualification",
		text: "Qualification",
		icon: "fa-graduation-cap"
	}, {
		id: "skills",
		text: "Skills",
		icon: "fa-file"
	}, {
		id: "projects",
		text: "Projects",
		icon: "fa-laptop-code"
	}, {
		id: "recomendations",
		text: "Recomendations",
		icon: "fa-note-sticky"
	}, {
		id: "contacts",
		text: "Contacts",
		icon: "fa-address-book"
	}
];
</script>
