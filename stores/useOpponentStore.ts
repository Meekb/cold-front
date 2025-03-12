import { defineStore } from "pinia";

export const useOpponentStore = defineStore("opponent", {
    state: () => ({
        opponentCharacter: null as any | null,
        opponentScore: 0,
        previousMoves: [] as string[],
    }),
    actions: {
        setRandomOpponent(excludeCharacter: any, leaders: any[]) {
            if (!excludeCharacter) {
                console.error("❌ Opponent selection failed: Player character is undefined.");
                return;
            }

            const availableOpponents = leaders.filter(leader => leader.name !== excludeCharacter.name);
            if (availableOpponents.length > 0) {
                this.opponentCharacter = availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
            } else {
                console.error("❌ No available opponents!");
            }
        },
        updateScore(points: number) {
            this.opponentScore += points;
        },
        getOpponentMove(playerChoice: string) {
            if (!this.opponentCharacter) return "cooperate";

            const strategy = this.opponentCharacter.strategyName;
            const turnCount = this.previousMoves.length;

            switch (strategy) {
                case "Unpredictable Betrayer":
                    return Math.random() < 0.75 ? "betray" : "cooperate"; // Mostly betray

                case "Calculated Betrayer":
                    return Math.random() < 0.7 ? "betray" : "cooperate"; // 70% betray, 30% cooperate

                case "Late-Game Betrayal":
                    return turnCount < 0.6 * 25 ? "cooperate" : "betray"; // Betrays after 60% of turns

                case "Trust but Retaliate":
                    return (this.previousMoves.slice(-2).every(m => m === "betray")) ? "betray" : "cooperate";

                case "Tit-for-Tat":
                    return turnCount === 0 ? "cooperate" : this.previousMoves[turnCount - 1];

                case "Defensive Cooperation":
                    return this.previousMoves.filter(m => m === "betray").length > 2 ? "betray" : "cooperate";

                case "Highly Cooperative":
                    return Math.random() < 0.95 ? "cooperate" : "betray"; // 95% cooperation

                case "Adaptive Strategy":
                    const betrayCount = this.previousMoves.filter(m => m === "betray").length;
                    return betrayCount > 2 ? "betray" : "cooperate"; // Adapts to opponent behavior

                case "Economic Opportunist":
                    return Math.random() < 0.3 ? "betray" : "cooperate"; // Mostly cooperate, betray only sometimes

                case "Betray First, Test Loyalty":
                    return turnCount === 0 ? "betray" : (this.previousMoves.includes("cooperate") ? "cooperate" : "betray");

                default:
                    return Math.random() < 0.5 ? "cooperate" : "betray"; // Default is 50/50
            }
        }
    }
});
