<script setup lang="ts">
import { useGameStore } from "@/stores/useGameStore";

const gameStore = useGameStore();
</script>

<template>
    <v-container>
        <h1>Game Screen</h1>
        <p>Player: {{ gameStore.playerCharacter }}</p>
        <p>Opponent: {{ gameStore.opponentCharacter }}</p>
        <p>Turns: {{ gameStore.currentTurn }} / {{ gameStore.maxTurns }}</p>
        <p>Score: {{ gameStore.playerScore }} - {{ gameStore.opponentScore }}</p>
    </v-container>
</template>
