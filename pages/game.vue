<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/useGameStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useOpponentStore } from "@/stores/useOpponentStore";

const gameStore = useGameStore();
const playerStore = usePlayerStore();
const opponentStore = useOpponentStore();

const { gameStatus } = storeToRefs(gameStore);

const stabilityHeight = computed(() => {
    if (window.innerWidth < 600) return 20; // Mobile
    if (window.innerWidth < 960) return 30; // Tablet
    return 40; // Desktop
});

const gameInProgress = computed(() => {
    return gameStatus.value !== "ended";
});

const isOpponentLoaded = computed(() => !!opponentStore.opponentCharacter);
const isPlayerLoaded = computed(() => !!playerStore.playerCharacter);

onMounted(() => {
    if (!isPlayerLoaded.value || !isOpponentLoaded.value) {
        console.error("❌ Game started without a valid player or opponent.");
    }
});
</script>

<template>
    <v-container class="game-container">
        <h1 class="game-title">Cold Front: The Global Struggle</h1>

        <v-progress-linear
            v-if="gameStore.globalStability !== null"
            :value="gameStore.globalStability"
            color="blue"
            :height="stabilityHeight"
            class="my-4"
        >
            Global Stability: {{ gameStore.globalStability }}%
        </v-progress-linear>

        <v-card v-if="isPlayerLoaded && isOpponentLoaded" class="pa-4 game-info">
            <p><strong>Turn:</strong> {{ gameStore.currentTurn }} of ?</p>
            <p><strong>Player:</strong> {{ playerStore.playerCharacter?.name }} ({{ playerStore.playerCharacter?.country }})</p>
            <p><strong>Opponent:</strong> {{ opponentStore.opponentCharacter?.name }} ({{ opponentStore.opponentCharacter?.country }})</p>
            <p><strong>Score:</strong> {{ playerStore.playerScore }} - {{ opponentStore.opponentScore }}</p>
        </v-card>

        <v-card v-if="gameStore.turnSummary" class="mt-4 pa-3 turn-summary">
            {{ gameStore.turnSummary }}
        </v-card>

        <v-row class="justify-center mt-4">
            <v-btn color="green" @click="gameStore.playTurn('cooperate')">
                Diplomacy
            </v-btn>
            <v-btn color="red" class="ml-2" @click="gameStore.playTurn('betray')">
                Military Action
            </v-btn>
        </v-row>
        <CancelGameDialog v-if="gameInProgress" />
        <v-row>
            <v-btn v-if="!gameInProgress" text="HOME" @click="() => {
                gameStore.endGame();
                navigateTo('/');
            }"/>
        </v-row>
    </v-container>
</template>

<style scoped>
.game-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.game-title {
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
}

.game-info {
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 8px;
    padding: 1rem;
}

.turn-summary {
    background: white;
    color: black;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
}

.action-btn {
    font-size: 1rem;
    font-weight: bold;
    padding: 12px;
}
</style>
