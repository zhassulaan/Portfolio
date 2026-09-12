<script setup lang='ts'>
import ProofDetailSection from '@/components/sections/proof_detail_section/proof_detail_section.vue';

const route = useRoute();
const slug = route.params.slug as string;

onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto',
  });
});
</script>

<template>
  <ProofDetailSection kind='certificate' :slug='slug' />
</template>
