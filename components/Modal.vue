<template>
	<div :id="`modal-${id}`" class="modal">
		<div class="modal-background btn" @click="$emit('close')"></div>

		<div class="modal-wrap">
			<i class="fa-solid fa-xmark modal-close icon btn" @click="$emit('close')"></i>

			<div class="modal-header">
				<div class="modal-header__left">
					<h4>{{ position }}</h4>
					<h6 class="text">{{ date }}</h6>
				</div>
				<img :src="logo" :alt="name" class="logo" />
			</div>

			<ul class="modal-responsibility">
				<li
					:key="index"
					v-for="(responsibility, index) in responsibilities"
					class="modal-responsibility__item"
				>
					<i class="fa-solid fa-circle icon"></i>
					<p>{{ responsibility }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	company: Object,
});

const { id, name, position, logo, date, responsibilities } = props.company;
</script>
