import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
    state: () => ({
        playerCharacter: null as any | null,
        playerScore: 0,
    }),
    actions: {
        selectCharacter(character: any) {
            this.playerCharacter = character;
        },
        updateScore(points: number) {
            this.playerScore += points;
        },
    },
});
