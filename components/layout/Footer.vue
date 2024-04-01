<template>
	<footer class="footer">
		<div class="box">
			<div class="footer-wrap">
				<div class="footer-wrap__cell">
					<h2 class="title">{{ info.name }}</h2>
					<h4 class="subtitle">Middle {{ info.position[0] }}</h4>
				</div>

				<ul class="footer-wrap__cell">
					<li :key="item.id" v-for="item in list">
						<a :href="`#${item.id}`">
							<p class="text">{{ item.text }}</p>
						</a>
					</li>
				</ul>

				<ul class="footer-icons">
					<li :key="icon.id" v-for="icon in icons">
						<nuxt-link :to="icon.link">
							<i :class="`${icon.icon} icon`"></i>
						</nuxt-link>
					</li>
				</ul>
			</div>

			<p class="footer-copy text">&copy; Serikuly Zh. All rights reserved.</p>
		</div>
	</footer>
</template>

<script setup>
import info from "@/assets/data.js";

const list = [
	{
		id: "experience",
		text: "Experience"
	}, {
		id: "qualification",
		text: "Qualification"
	}, {
		id: "projects",
		text: "Projects"
	}, {
		id: "recomendations",
		text: "Recomendations"
	}
];
const icons = [
	{
		id: "whatsapp",
		link: info.links.whatsapp,
		icon: "fa-brands fa-whatsapp"
	}, {
		id: "facebook",
		link: info.links.facebook,
		icon: "fa-brands fa-facebook"
	}, {
		id: "instagram",
		link: info.links.instagram,
		icon: "fa-brands fa-instagram"
	}, {
		id: "telegram",
		link: info.links.telegram,
		icon: "fa-brands fa-telegram"
	}, {
		id: "gmail",
		link: info.links.gmail,
		icon: "fa-solid fa-at"
	}
];
</script>
