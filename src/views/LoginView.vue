<template>
    <div class="d-flex flex-column justify-center align-center w-100 h-100">
        <v-form @submit.prevent="login" class="d-flex flex-column justify-center align-center w-100 ga-4">
            <v-text-field v-model="form.username" :rules="$v.required" label="Username" class="w-25">
            </v-text-field>
            <v-text-field v-model="form.password" :rules="$v.required" label="Password" class="w-25">
            </v-text-field>
            <v-btn type="submit" color="secondary">
                Login
            </v-btn>
        </v-form>
    </div>
</template>

<script setup lang="ts">
import { useValidate } from '@/utils/validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const $v = useValidate()
const form = ref({
    username: '',
    password: '',
})

async function login(validate: Promise<any>) {
    const { valid } = await validate

    if (valid) {
        localStorage.setItem('authen', 'true')
        await router.push('/applicant-list')
    }
}

</script>

<style scoped></style>