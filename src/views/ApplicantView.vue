<template>
    <ApplicantForm :formTitle />
</template>

<script setup lang="ts">
import ApplicantForm from '@/components/ApplicantForm.vue';
import { ref } from 'vue';

const formTitle = ref('')
</script>