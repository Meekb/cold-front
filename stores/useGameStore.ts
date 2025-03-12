import { defineStore } from "pinia";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useOpponentStore } from "@/stores/useOpponentStore";

export const useGameStore = defineStore("game", {
    state: () => ({
        currentTurn: 1,
        maxTurns: Math.floor(Math.random() * 16) + 10, // 10-25 turns
        globalStability: 50, // Starts neutral
        gameStatus: "idle" as "idle" | "playing" | "ended",
        turnSummary: "",
        leaders: [] as any[],
    }),
    actions: {
        async loadLeaders() {
            try {
                const response = await fetch("/data/worldData.json");
                this.leaders = await response.json();
            } catch (error) {
                console.error("Failed to load leaders:", error);
            }
        },
        startGame(playerCharacter: any) {
            const playerStore = usePlayerStore();
            const opponentStore = useOpponentStore();

            if (!playerCharacter) {
                console.error("No player character selected.");
                return;
            }

            playerStore.selectCharacter(playerCharacter);

            if (this.leaders.length === 0) {
                console.error("Leaders not loaded yet.");
                return;
            }

            opponentStore.setRandomOpponent(playerCharacter, this.leaders);

            this.currentTurn = 1;
            this.maxTurns = Math.floor(Math.random() * 16) + 10; // 10-25 turns
            this.globalStability = 50;
            this.gameStatus = "playing";
            this.turnSummary = "";
        },

        playTurn(playerChoice: "cooperate" | "betray") {
            const playerStore = usePlayerStore();
            const opponentStore = useOpponentStore();

            if (!opponentStore.opponentCharacter) {
                console.error("❌ Opponent not set!");
                return;
            }

            const opponentChoice = opponentStore.getOpponentMove(playerChoice);

            let playerPoints = 0;
            let opponentPoints = 0;
            let stabilityChange = 0;

            if (playerChoice === "cooperate" && opponentChoice === "cooperate") {
                playerPoints = 3;
                opponentPoints = 3;
                stabilityChange = 5; // Stability increases with cooperation
            } else if (playerChoice === "cooperate" && opponentChoice === "betray") {
                playerPoints = 0;
                opponentPoints = 5;
                stabilityChange = -10; // Betrayal destabilizes
            } else if (playerChoice === "betray" && opponentChoice === "cooperate") {
                playerPoints = 5;
                opponentPoints = 0;
                stabilityChange = -10; // Betrayal destabilizes
            } else {
                playerPoints = 1;
                opponentPoints = 1;
                stabilityChange = -5; // Mutual betrayal still lowers stability
            }

            playerStore.updateScore(playerPoints);
            opponentStore.updateScore(opponentPoints);
            this.globalStability = Math.max(0, Math.min(100, this.globalStability + stabilityChange));

            this.turnSummary = `${playerStore.playerCharacter.name} chose ${playerChoice.toUpperCase()}. ${opponentStore.opponentCharacter.name} has chosen ${opponentChoice.toUpperCase()}.
            Player gained ${playerPoints} points, Opponent gained ${opponentPoints} points.`;

            this.nextTurn();
        },

        nextTurn() {
            if (this.currentTurn < this.maxTurns) {
                this.currentTurn++;
            } else {
                this.endGame();
            }
        },

        endGame() {
            this.gameStatus = "ended";
            this.turnSummary = "Game Over. Final scores calculated.";
        },
    },
});
