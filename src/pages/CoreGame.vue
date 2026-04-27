<template>
  <div 
    class="relative min-h-screen bg-[#0d0620] overflow-hidden select-none flex flex-col items-center cursor-crosshair"
    @click="handleScreenClick"
  >
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      <div class="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
    </div>

    <div class="relative z-20 w-full px-8 py-6 flex justify-between items-start">
      <div class="flex flex-col gap-1">
        <span class="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase pl-1">Score</span>
        <div class="bg-white/5 border border-white/10 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl">
          <span class="text-3xl font-black text-white tabular-nums">{{ formattedScore }}</span>
        </div>
      </div>

      <div class="flex flex-col items-end gap-1">
        <span class="text-pink-400 text-[10px] font-bold tracking-[0.2em] uppercase pr-1">Lives</span>
        <div class="flex gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-3 rounded-2xl">
          <span v-for="n in 3" :key="n" class="text-2xl drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]">
            {{ n <= currentLives ? '❤️' : '🖤' }}
          </span>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 right-8 z-20">
      <div 
        class="bg-linear-to-r from-pink-500 to-purple-600 px-6 py-2 rounded-full border-2 border-white/20 shadow-[0_0_20px_rgba(236,72,153,0.4)] animate-pulse"
        v-if="combo > 1"
      >
        <span class="text-white font-black italic tracking-tighter text-2xl">
          COMBO X{{ combo }}
        </span>
      </div>
    </div>

    <TransitionGroup name="score-float" tag="div" class="pointer-events-none absolute inset-0 z-30">
      <div
        v-for="popup in scorePopups"
        :key="popup.id"
        class="absolute font-black text-3xl text-green-400 pointer-events-none drop-shadow-[0_2px_10px_rgba(74,222,128,0.5)]"
        :style="{ left: popup.x + 'px', top: popup.y + 'px' }"
      >
        +10
      </div>
    </TransitionGroup>

    <div 
      v-if="countdown > 0" 
      class="absolute inset-0 z-50 flex items-center justify-center bg-[#0d0620]/80 backdrop-blur-sm"
    >
      <div class="text-[12rem] font-black italic text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500 animate-countdown">
        {{ countdown > 0 ? countdown : 'GO!' }}
      </div>
    </div>

    <div v-if="countdown === 0" class="mt-auto mb-10 text-gray-500 text-xs tracking-widest animate-pulse">
      CLICK ANYWHERE TO TEST SCORE POPUP
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const score = ref(1250);
const currentLives = ref(3);
const combo = ref(2);
const countdown = ref(3);
const scorePopups = ref([]);

const formattedScore = computed(() => {
  return score.value.toLocaleString();
});

const startCountdown = () => {
  const timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timer);
    }
  }, 1000);
};

const handleScreenClick = (event) => {
  if (countdown.value > 0) return; 

  const id = Date.now();
  scorePopups.value.push({
    id,
    x: event.clientX - 20, 
    y: event.clientY - 40,
  });

  setTimeout(() => {
    scorePopups.value = scorePopups.value.filter(p => p.id !== id);
  }, 800);

  score.value += 10;
};

onMounted(() => {
  startCountdown();
});
</script>

<style scoped>
@keyframes countdownPulse {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}

.animate-countdown {
  animation: countdownPulse 1s ease-in-out infinite;
}

.score-float-enter-active {
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.score-float-enter-from {
  opacity: 1;
  transform: translateY(0);
}

.score-float-leave-to {
  opacity: 0;
  transform: translateY(-100px) scale(1.5);
}

.cursor-crosshair {
  cursor: crosshair;
}
</style>