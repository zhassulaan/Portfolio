<template>
	<section id="home" class="section">
		<div class="home">
			<div class="home-wrap">
				<ul class="home-icons">
					<li :key="item.id" v-for="item in list">
						<nuxt-link :to="item.link">
							<i :class="`${item.icon} icon`"></i>
						</nuxt-link>
					</li>
				</ul>

				<div class="home-info">
					<p class="text">Hello, my name is</p>
					<h1 class="text">{{ info.name }}</h1>
					<h2 class="text">
						<TypedText :position="info.position" />
					</h2>
					<nuxt-link :to="info.links.hh">
						<Button text="Head Hunter" icon="fa-brands fa-instagram" />
					</nuxt-link>
				</div>
			</div>

			<a id="btn_home" href="#about">
				<Button
					text="Scroll Down"
					icon="fa-solid fa-square-caret-down"
					:transparent="true"
					:second="true"
				/>
			</a>
		</div>
	</section>
</template>

<script setup>
import info from "@/assets/data.js";

const list = [
	{
		id: "github",
		link: info.links.github,
		icon: "fa-brands fa-github"
	}, {
		id: "linkedin",
		link: info.links.linkedin,
		icon: "fa-brands fa-linkedin"
	}, {
		id: "gmail",
		link: info.links.gmail,
		icon: "fa-solid fa-envelope"
	}, {
		id: "telegram",
		link: info.links.telegram,
		icon: "fa-brands fa-telegram"
	}, {
		id: "phone",
		link: info.links.phone,
		icon: "fa-solid fa-phone"
	}
];
</script>
