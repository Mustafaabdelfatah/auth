<template>
    <v-sheet rounded="lg" class="app-dashboard-loader">
        <div class="preloaderBg" id="preloader">
            <div :class="isDark ? 'preloaderDark' : 'preloader'">
                <div class="preloader2"></div>
            </div>
        </div>
    </v-sheet>
</template>

<script setup>
import { useIsDark } from "@/composables/useIsDark";

const isDark = useIsDark();
</script>

<style lang="scss">
.app-dashboard-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    background: rgba(var(--v-theme-background), 1);
    width: 100vw;
    height: 100vh;
    text-align: center;
    z-index: 999;
}

.preloaderBg {
    height: 150px;
}

.preloader {
    margin: auto;
    background: url('/side_rail_icon.svg') no-repeat center;
    background-size: 100px;
    width: 200px;
    height: 200px;
    position: relative;
}

.preloaderDark {
    margin: auto;
    background: url('/logo_dark_small.svg') no-repeat center;
    background-size: 100px;
    width: 200px;
    height: 200px;
    position: relative;
}

.preloader2 {
    border: 5px solid #f3f3f3;
    border-top: 5px solid rgba(var(--v-theme-primary), 1);
    border-radius: 50%;
    width: 175px;
    height: 175px;
    animation: spin 1s ease-in-out infinite;
    position: relative;
    margin: auto;
    top: 10px;
}

.v-theme--dark {
    .preloader2 {
        border: 5px solid rgba(var(--v-theme-surface), 1);
        border-top: 5px solid rgba(var(--v-theme-primary), 1);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
<script setup></script>
