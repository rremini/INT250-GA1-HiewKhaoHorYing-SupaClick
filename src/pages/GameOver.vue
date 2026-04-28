<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goHome() {
  router.replace("/");
}

function restartGame() {
  router.replace("/game");
}

function getHighScore() {
  return Number(localStorage.getItem("high-score") || 0);
}

function getLastScore() {
  return Number(localStorage.getItem("last-score") || 0);
}
</script>

<template>
  <div
    class="min-h-screen w-full relative bg-slate-900 flex items-center justify-center p-4 overflow-hidden font-['Plus_Jakarta_Sans',_sans-serif]"
  >
    <div
      class="absolute inset-0 overflow-hidden pointer-events-none opacity-50 blur-[5px]"
    >
      <div
        class="w-48 h-48 absolute top-[10%] left-[20%] opacity-30 bg-pink-400 rounded-full blur-[40px]"
      ></div>
      <div
        class="w-64 h-64 absolute bottom-[20%] right-[15%] opacity-20 bg-cyan-400 rounded-full blur-[40px]"
      ></div>

      <div
        class="absolute top-[10%] left-[5%] opacity-30 text-[120px] animate-alien"
      >
        👾
      </div>
      <div
        class="absolute bottom-[10%] right-[5%] opacity-30 text-[120px] animate-boom"
      >
        💥
      </div>
    </div>

    <main
      class="w-full max-w-lg relative z-10 bg-indigo-950/40 rounded-[48px] shadow-[0px_0px_60px_0px_rgba(255,131,209,0.15)] outline outline-1 outline-white/10 backdrop-blur-xl p-8 sm:p-12 flex flex-col items-center gap-8"
    >
      <header class="flex flex-col items-center gap-4 w-full text-center">
        <h1
          class="text-pink-400 text-5xl sm:text-6xl font-black uppercase leading-none [text-shadow:2px_2px_0px_#22d3ee] tracking-wide relative z-10"
        >
          Game Over
        </h1>
        <div
          class="px-4 py-2 bg-rose-800/20 rounded-full outline outline-1 outline-rose-400/20 inline-flex items-center gap-2"
        >
          <span
            class="text-rose-400 text-lg font-normal font-['Material_Symbols_Outlined']"
            >☢︎</span
          >
          <span
            class="text-rose-400 text-sm sm:text-base font-bold font-['Be_Vietnam_Pro'] tracking-tight"
            >You clicked a bomb! 💣</span
          >
        </div>
      </header>

      <section class="flex flex-row justify-center items-stretch gap-4 w-full">
        <div
          class="flex-1 py-6 px-4 bg-violet-950/40 rounded-[32px] outline outline-1 outline-white/5 flex flex-col justify-center items-center gap-2"
        >
          <h2
            class="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider"
          >
            Your Score
          </h2>
          <p
            class="text-cyan-400 text-3xl sm:text-4xl font-black leading-none drop-shadow-[0px_0px_8px_rgba(0,227,253,0.40)]"
          >
            {{ getLastScore() }}
          </p>
        </div>
        <div
          class="flex-1 py-6 px-4 bg-violet-950/40 rounded-[32px] outline outline-1 outline-white/5 flex flex-col justify-center items-center gap-2"
        >
          <h2
            class="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider"
          >
            High Score
          </h2>
          <p
            class="text-lime-100 text-3xl sm:text-4xl font-black leading-none drop-shadow-[0px_0px_8px_rgba(233,255,189,0.40)]"
          >
            {{ getHighScore() }}
          </p>
        </div>
      </section>

      <section class="flex flex-col w-full gap-4">
        <button
          class="group relative w-full h-30 py-5 bg-gradient-to-b from-pink-400 to-pink-500 rounded-full shadow-[0px_6px_0px_0px_#590043] transition-all hover:brightness-110 active:translate-y-[6px] active:shadow-[0px_0px_0px_0px_#590043] flex justify-center items-center gap-3 overflow-hidden"
          @click="restartGame"
        >
          <div
            class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out"
          ></div>
          <span
            class="text-pink-950 text-lg sm:text-xl font-extrabold uppercase tracking-wide"
            >⏎ Play Again</span
          >
        </button>

        <button
          class="w-full py-4 bg-violet-950/80 rounded-full outline outline-1 outline-cyan-400/20 transition-all hover:bg-violet-900/80 hover:outline-cyan-400/50 flex justify-center items-center"
          @click="goHome"
        >
          <span class="text-cyan-400 text-base sm:text-lg font-bold"
            >BACK TO MENU</span
          >
        </button>
      </section>

      <footer
        class="w-full pt-6 mt-2 border-t border-white/10 flex justify-between items-center"
      >
        <div class="flex flex-col">
          <span
            class="text-gray-400 text-[10px] font-normal font-['Be_Vietnam_Pro'] uppercase leading-tight"
            >Multiplier earned</span
          >
          <span class="text-lime-100 text-lg font-black"
            >x2.5 <span class="text-sm font-bold opacity-80">LVL 12</span></span
          >
        </div>

        <!-- <div class="flex gap-3">
          <button
            class="w-11 h-11 bg-indigo-950 rounded-full outline outline-1 outline-white/5 flex justify-center items-center hover:bg-indigo-900 transition-colors group"
          >
            <span
              class="text-gray-400 group-hover:text-cyan-400 text-xl font-['Material_Symbols_Outlined'] transition-colors"
              >⇧</span
            >
          </button>
          <button
            class="w-11 h-11 bg-indigo-950 rounded-full outline outline-1 outline-white/5 flex justify-center items-center hover:bg-indigo-900 transition-colors group"
          >
            <span
              class="text-gray-400 group-hover:text-yellow-400 text-xl font-['Material_Symbols_Outlined'] transition-colors"
              >♜</span
            >
          </button>
        </div> -->
      </footer>
    </main>
  </div>
</template>

<style scoped>
@keyframes float-alien {
  0%,
  100% {
    transform: translateY(0px) rotate(12deg);
  }
  0% {
    transform: translateY(-20px) rotate(25deg);
  }
}
@keyframes float-boom {
  0%,
  100% {
    transform: translateY(0px) rotate(-12deg);
  }
  50% {
    transform: translateY(-15px) rotate(-20deg);
  }
}
.animate-alien {
  animation: float-alien 4s ease-in-out infinite;
}
.animate-boom {
  animation: float-boom 3s ease-in-out infinite;
}
</style>
