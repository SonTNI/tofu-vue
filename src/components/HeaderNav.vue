<template>
    <div class="d-flex justify-space-between align-center bg-secondary w-100 pa-4">
        <nav class="d-flex ga-8">
            <span v-for="route, index in routes" :key="index" class="text-h5 cursor-pointer"
                :class="{ 'route-active': activeRoute(route.path) }" @click="navigateTo(route.path)">
                {{ toCapitalizeCase(route!.name!.toString()) }}
            </span>
        </nav>
        <v-btn v-if="isIconDisplay" icon="mdi-logout" height="auto" width="auto" class="pa-1" @click="open"></v-btn>
        <v-dialog v-model="dialogLogout" max-width="700px">
            <v-card>
                <v-card-title class="text-h5">Are you sure you want to logout?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="close">Cancel</v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="logout">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { computed, ref, watch } from 'vue';

let isIconDisplay = ref(false)
const dialogLogout = ref(false)

const routes = computed(() => {
    return router.options.routes.filter(router => router.name !== 'login')
})

function navigateTo(path: string) {
    return router.push(path)
}

function activeRoute(path: string) {
    return router.currentRoute.value.path === path
}

function open() {
    dialogLogout.value = true
}

function close() {
    dialogLogout.value = false
}

function logout() {
    close()
    router.push('/login')
    localStorage.removeItem('authen')
}

function toCapitalizeCase(str: string) {
    const words = str.split('-');
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return capitalizedWords.join(' ');
}

watch(() => router.currentRoute.value.path, () => {
    return isIconDisplay.value = router.currentRoute.value.name === 'applicant-list'
})

</script>

<style scoped>
nav span:hover {
    opacity: 0.6;
}

.route-active {
    color: blue;
}
</style>