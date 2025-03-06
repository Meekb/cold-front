<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "@/stores/useGameStore";

const gameStore = useGameStore();
const router = useRouter();

const leaders = [
    "LeaderA", "LeaderB", "LeaderC", "LeaderD", "LeaderE",
    "Ronald Dump", "LeaderG", "LeaderH", "LeaderI", "LeaderJ"
];

const showCancelDialog = ref(false);

const selectLeader = (leader: string) => {
    gameStore.startGame(leader);
    router.push("/game");
}

const cancelGame = () => {
    gameStore.endGame();
    router.push("/");
}
</script>

<template>
    <v-container class="d-flex flex-column justify-center align-center" style="height: 100vh;">
        <h1>Select Your Leader</h1>
        <v-row class="justify-center">
            <v-col v-for="leader in leaders" :key="leader" cols="12" md="6" lg="4">
                <v-card class="pa-4 text-center" @click="selectLeader(leader)">
                    <v-card-title>{{ leader }}</v-card-title>
                </v-card>
            </v-col>
        </v-row>

        <!-- Cancel Button -->
        <v-btn color="red" class="mt-4" @click="showCancelDialog = true">
            Cancel Game
        </v-btn>

        <!-- Confirmation -->
        <v-dialog v-model="showCancelDialog" width="400">
            <v-card>
                <v-card-title>Cancel Game?</v-card-title>
                <v-card-text>
                    Are you sure you want to cancel the game? This will count as a loss.
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="showCancelDialog = false">No</v-btn>
                    <v-btn color="red" @click="cancelGame">Yes, Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

