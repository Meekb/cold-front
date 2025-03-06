<template>
    <v-container class="index-page">
        <div class="overlay">
            <h1>Cold Front</h1>
            <NuxtLink to="/select-character">
                <v-btn color="primary" elevation="4">Start Game</v-btn>
            </NuxtLink>
        </div>
    </v-container>
</template>

<style scoped>
.index-page {
    position: relative;
    height: 100vh;
    background: url("/images/ColdFrontAI.webp") no-repeat fixed center center;
    background-size: cover;
    filter: grayscale(90%) contrast(110%);
}

h1 {
    font-size: 3rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.9);
}

.v-btn {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
    transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
}

.v-btn:hover {
    transform: translateY(-2px);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 1);
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
}
</style>
