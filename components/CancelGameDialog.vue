<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useGameStore } from "@/stores/useGameStore";
import { navigateTo } from "nuxt/app";

const showCancelDialog = ref(false);
const emit = defineEmits(["cancelGame"]);

const cancelGame = () => {
    const gameStore = useGameStore();
    gameStore.endGame();
    emit("cancelGame"); // Emit event so parent components can handle navigation
    navigateTo("/");
};
</script>

<template>
    <v-row class="justify-center pb-8">
        <v-btn color="red" class="mt-6" @click="showCancelDialog = true">
            Cancel Game
        </v-btn>
    </v-row>

    <v-dialog v-model="showCancelDialog" width="400">
        <v-card>
            <v-card-title>Cancel Game?</v-card-title>
            <v-card-text>Are you sure you want to cancel the game? This will count as a loss.</v-card-text>
            <v-card-actions class="justify-end">
                <v-btn @click="showCancelDialog = false">No</v-btn>
                <v-btn color="red" @click="cancelGame">Yes, Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
