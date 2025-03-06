import { defineStore } from "pinia";

export const useGameStore = defineStore('game', {
    state: () => ({
        currentTurn: null as number | null,
        maxTurns: null as number | null, // Random set game turns from 10 to 50 w/ Math.floor(Math.random() * 41) + 10
        playerCharacter: null as string | null, // Will be set on selection
        opponentCharacter: null as string | null, // Randomly chosen
        playerScore: 0,
        opponentScore: 0,
        gameStatus: "idle" as "idle" | "playing" | "ended",
     }),
    actions: {
        startGame(playerCharacter: string) {
            const allCharacters = [
                "LeaderA",
                "LeaderB",
                "LeaderC",
                "LeaderD",
                "LeaderE",
                "Ronald Dumph",
                "LeaderG",
                "LeaderH",
                "LeaderI",
                "LeaderJ"
            ];
            this.playerCharacter = playerCharacter;
            this.opponentCharacter = this.getRandomOpponent(allCharacters.filter((char) => char !== playerCharacter));
            this.currentTurn = 1;
            this.maxTurns = Math.floor(Math.random() * 41) + 10;
            this.playerScore = 0;
            this.opponentScore = 0;
            this.gameStatus = "playing";
        },
        getRandomOpponent(availableOpponents: string[]): string {
            return availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
        },
        endGame() {
            this.gameStatus = "ended";
        },
        nextTurn() {
            if (this.currentTurn !== null && this.currentTurn < (this.maxTurns ?? 10)) {
                this.currentTurn++;
            } else this.endGame();
        },
        updateScores(playerPoints: number, opponentPoints: number) {
            this.playerScore += playerPoints;
            this.opponentScore += opponentPoints;
        },
    },
});
