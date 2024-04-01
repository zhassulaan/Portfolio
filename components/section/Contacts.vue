<template>
	<Section id="contacts" title="Contact me" subtitle="Get in touch">
		<div class="contacts">
			<div class="contacts-info">
				<div :key="item.key" v-for="item in data" class="contact">
					<nuxt-link :to="item.link">
						<i :class="`fa-solid ${item.icon} icon`"></i>
					</nuxt-link>
					<nuxt-link :to="item.link">
						<h4>{{ item.key }}</h4>
						<h6 class="subtitle">{{ item.value }}</h6>
					</nuxt-link>
				</div>
			</div>
			
			<!-- Form -->
			<form id="form" @submit.prevent="validation" method="post" enctype="text/plain" class="contacts-form">
				<Input
					id="name"
					label="Name - Surname"
					type="text"
					placeholder="Name - Surname"
					v-model="user"
				/>
				<Input
					id="contact"
					label="Contacts"
					type="text"
					placeholder="Phone number / Email"
					v-model="contact"
				/>
				<Input
					id="message"
					label="Message"
					placeholder="Message..."
					:textarea="true"
					v-model="message"
				/>
				<Button
					text="Send Message"
					icon="fa-solid fa-paper-plane"
					type="submit"
				/>
				<p>{{ error }}</p>
			</form>
		</div>
	</Section>
</template>

<script setup>
import info from "@/assets/data.js";
const user = ref("");
const contact = ref("");
const message = ref("");
const error = ref("");
const sended = ref(false);

const data = [
	{
		key: "Phone",
		value: info.phone,
		link: info.links.phone,
		icon: "fa-phone"
	}, {
		key: "Email",
		value: info.gmail,
		link: info.links.gmail,
		icon: "fa-envelope"
	}, {
		key: "Location",
		value: info.location,
		link: "#",
		icon: "fa-location-dot"
	}
];

function validation(event) {
	event.preventDefault();
	console.log(user.value);
	if (user.value === "") {
		error.value = "Write your name-surename.";
		return false;
	} else if (contact.value === "") {
		error.value = "Leave your contact information.";
		return false;
	} else if (message.value === "") {
		error.value = "Leave a message.";
		return false;
	} else {
		send();
		return true;
	}
}
function send() {
	var params = { from_name: user.value, from_email: contact.value, from_message: message.value }
	emailjs.send('service_ellnze8', 'template_vg1m6jx', params)
	.then(function(res) {
		console.log('success', res.status);
	})
	sended.value = true;
}
</script>
