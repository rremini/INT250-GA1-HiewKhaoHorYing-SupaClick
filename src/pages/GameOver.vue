<template>
  <div class="min-h-screen bg-[#0d0620] flex flex-col items-center justify-center px-5 relative overflow-hidden select-none z-50">
    
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

    <span class="absolute top-1/4 left-8 md:left-20 text-4xl opacity-20 animate-bounce" style="animation-duration: 3s">💀</span>
    <span class="absolute bottom-1/3 right-10 md:right-24 text-5xl opacity-30 animate-pulse">💣</span>
    <span class="absolute top-20 right-20 text-3xl opacity-20 animate-bounce" style="animation-duration: 4s">💥</span>

    <div class="relative z-10 flex flex-col items-center max-w-sm w-full animate-fade-in-up">
      
      <div class="mb-2 text-6xl drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">
        🫯
      </div>
      
      <h1 class="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-700 tracking-widest mb-2 text-center" style="filter: drop-shadow(0 0 15px rgba(220,38,38,0.4))">
        GAME OVER
      </h1>
      
      <p class="text-red-300/80 text-sm font-medium mb-8 text-center px-4">
        You clicked the deadly bomb!<br>Your multiplier has been destroyed.
      </p>

      <div class="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 mb-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        
        <div class="flex flex-col items-center justify-center border-b border-white/10 pb-5 mb-5">
          <span class="text-gray-400 text-xs font-bold tracking-widest uppercase mb-1">Final Score</span>
          <span class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            4,520
          </span>
        </div>
        
        <div >
          <div class="flex flex-col items-center">
            <span class="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Best Score</span>
            <span class="text-lg font-bold text-white">12,400</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col w-full gap-4">
        
        <button 
          @click="playAgain"
          class="w-full py-4 rounded-full font-extrabold text-white text-lg tracking-widest uppercase transition-all duration-300 active:scale-95 hover:scale-105 hover:brightness-125 bg-gradient-to-r from-pink-500 to-red-500 shadow-[0_0_20px_rgba(236,72,153,0.4)]"
        >
          PLAY AGAIN
        </button>
        
        <div class="flex gap-4 w-full">
          <button 
            @click="goHome"
            class="flex-1 py-3 rounded-full font-bold text-gray-300 text-xs md:text-sm tracking-wide transition-all duration-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white active:scale-95"
          >
            HOME
          </button>
          <button 
            @click="goLeaderboard"
            class="flex-1 py-3 rounded-full font-bold text-gray-300 text-xs md:text-sm tracking-wide transition-all duration-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-cyan-400 active:scale-95"
          >
            LEADERBOARD
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// จำลองฟังก์ชันการทำงานของปุ่ม
const playAgain = () => {
  console.log('Restarting game...');
  // ใส่ Logic เริ่มเกมใหม่ หรือ Router push
};

const goHome = () => {
  console.log('Going back to Home...');
  // ใส่ Router push กลับไปหน้าหลัก
};

const goLeaderboard = () => {
  console.log('Opening Leaderboard...');
  // ใส่ Router push ไปหน้า Leaderboard
};
</script>

<style scoped>
/* เพิ่มแอนิเมชันให้คอนเทนต์เด้งขึ้นมาตอน Game Over */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>