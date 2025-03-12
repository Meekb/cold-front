<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useGameStore } from "@/stores/useGameStore";
import CancelGameDialog from "@/components/CancelGameDialog.vue";

const gameStore = useGameStore();
const worldCountries = ref([]);
const isLoading = ref(true);

const selectLeader = (leader: any) => {
    if (!leader) return;
    gameStore.startGame(leader);
    navigateTo("/game");
};

onMounted(async () => {
    try {
        const res = await fetch("/data/worldData.json");
        worldCountries.value = await res.json();
    } catch (error) {
        console.error("Failed to load world countries:", error);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <v-container class="select-character-page">
        <h1 class="text-center mb-6">Select Your Leader</h1>

        <v-progress-circular v-if="isLoading" indeterminate color="primary" size="50"></v-progress-circular>

        <v-row v-else class="justify-center">
            <v-col v-for="item in worldCountries" :key="item.name" cols="12" sm="6" lg="4">
                <v-card class="pa-4 item-card" @click="selectLeader(item)">
                    <v-card-title class="text-center">{{ item.country }}</v-card-title>
                    <v-card-text class="pb-0">Leader: {{ item.name }}</v-card-text>
                    <v-card-text class="pb-0">Type: {{ item.countryType }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <CancelGameDialog @cancelGame="navigateTo('/')" />
    </v-container>
</template>

<style scoped>
.select-character-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 2rem;
}

.leader-card {
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
}

.leader-card:hover {
    transform: scale(1.05);
}
</style>
