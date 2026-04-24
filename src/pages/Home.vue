<template>
  <div class="min-h-screen bg-[#0d0620] flex flex-col items-center px-5 py-8 relative overflow-hidden select-none">

    <!-- Floating background emojis -->
    <span class="absolute top-4 left-4 text-2xl opacity-30 animate-bounce">⚙️</span>
    <span class="absolute top-10 right-5 text-3xl opacity-40 animate-bounce">🚀</span>
    <span class="absolute bottom-24 left-5 text-2xl opacity-20 animate-bounce">✨</span>
    <span class="absolute bottom-28 right-4 text-3xl opacity-30 animate-bounce">🍕</span>

    <!-- ระยิบระยับ background -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style="background: radial-gradient(circle, #e91e8c, transparent)"></div>
    <div class="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none" style="background: radial-gradient(circle, #7c3aed, transparent)"></div>

    
    <div class="mt-6 mb-2 text-center z-10">
      <h1 class="font-black leading-none text-[clamp(3rem,14vw,5rem)]" style="text-shadow: 0 0 40px rgba(236,72,153,0.5)">
        <img src="../Assets/logo.png" alt="SupaClick Logo" class="mx-auto max-h-32 object-contain" />
      </h1>
    </div>

    <!-- description -->
    <p class="text-gray-400 text-sm text-center px-4 mb-8 z-10 max-w-sm leading-relaxed">
      The most chaotic clicking game in the galaxy.<br />
      Tap the right emojis, dodge the bombs, and climb the leaderboard!
    </p>

    
    <button
      class="z-10 mb-10 px-10 py-4 rounded-full font-extrabold text-white text-base tracking-widest uppercase transition-all duration-300 active:scale-95 hover:scale-105 hover:brightness-125"
      style="background: linear-gradient(135deg, #e91e8c, #c2185b); box-shadow: 0 0 30px rgba(233,30,140,0.5)"
      @click="startGame"
    >
      START GAME 
    </button>

    <!-- Scoring Rules  -->
    <div class="w-full max-w-2xl z-10">

      <!-- Section header -->
      <div class="flex items-center gap-2 mb-4">
        <span class="w-6 h-1 bg-cyan-400 rounded-full"></span>
        <span class="text-cyan-400 font-bold text-xs tracking-widest uppercase">Scoring Rules</span>
      </div>

      <!-- Cards  -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">

        <!-- Common -->
        <div class="group relative rounded-2xl p-4 bg-white/5 border border-white/10 transition-all duration-300 hover:bg-indigo-500/10 hover:border-indigo-400/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] cursor-pointer">
          <span class="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 group-hover:bg-indigo-500/40 transition-all duration-300">
            COMMON
          </span>

          <!-- Emoji circles -->
          <div class="flex gap-2 mb-3">
            <span class="relative w-10 h-10 rounded-full bg-white/10 border border-white/10 inline-flex shrink-0 group-hover:bg-indigo-500/20 group-hover:border-indigo-400/30 transition-all duration-300">
              <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[54%] text-xl leading-none">😄</span>
            </span>

            <span class="relative w-10 h-10 rounded-full bg-white/10 border border-white/10 inline-flex shrink-0 group-hover:bg-indigo-500/20 group-hover:border-indigo-400/30 transition-all duration-300">
              <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[56%] text-xl leading-none">🍎</span>
            </span>

            <span class="relative w-10 h-10 rounded-full bg-white/10 border border-white/10 inline-flex shrink-0 group-hover:bg-indigo-500/20 group-hover:border-indigo-400/30 transition-all duration-300">
              <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[54%] text-xl leading-none">👽</span>
            </span>
          </div>

          <p class="text-green-400 font-extrabold text-xl group-hover:text-green-300 transition-colors duration-300">+10 pts</p>
          <p class="text-gray-500 text-xs mt-1 group-hover:text-gray-400 transition-colors duration-300">Standard targets. Keep the flow going!</p>
        </div>

        <!-- Rare -->
        <div class="group relative rounded-2xl p-4 bg-white/5 border border-white/10 transition-all duration-300 hover:bg-pink-500/10 hover:border-pink-400/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.25)] cursor-pointer">
          <span class="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 group-hover:bg-pink-500/40 transition-all duration-300">
            RARE
          </span>

          <!-- Emoji circles -->
          <div class="flex gap-2 mb-3">
            <span class="relative w-10 h-10 rounded-full bg-white/10 border border-white/10 inline-flex shrink-0 group-hover:bg-pink-500/20 group-hover:border-pink-400/30 transition-all duration-300">
              <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[64%] text-xl leading-none">💎</span>
            </span>

            <span class="relative w-10 h-10 rounded-full bg-white/10 border border-white/10 inline-flex shrink-0 group-hover:bg-pink-500/20 group-hover:border-pink-400/30 transition-all duration-300">
              <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] text-xl leading-none">⭐</span>
            </span>
          </div>

          <p class="text-green-400 font-extrabold text-xl group-hover:text-green-300 transition-colors duration-300">+50 pts</p>
          <p class="text-gray-500 text-xs mt-1 group-hover:text-gray-400 transition-colors duration-300">Rare drops. Catch them for a massive boost.</p>
        </div>

        <!-- Bomb -->
        <div class="group rounded-2xl p-4 bg-white/5 border border-white/10 flex items-start gap-4 transition-all duration-300 hover:bg-orange-500/10 hover:border-orange-400/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] cursor-pointer">
          <span class="relative w-12 h-12 rounded-full bg-white/10 border border-white/10 inline-flex shrink-0 group-hover:bg-orange-500/20 group-hover:border-orange-400/30 transition-all duration-300">
            <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[56%] text-2xl leading-none">💩</span>
          </span>

          <div>
            <p class="text-red-400 font-extrabold text-xl group-hover:text-red-300 transition-colors duration-300">-20 pts</p>
            <p class="text-gray-500 text-xs mt-1 group-hover:text-gray-400 transition-colors duration-300">Dirty trap! Tapping these resets your multiplier.</p>
          </div>
        </div>

        <!-- Game Over -->
        <div class="group rounded-2xl p-4 bg-red-900/20 border border-red-700/40 flex items-start gap-4 transition-all duration-300 hover:bg-red-800/30 hover:border-red-500/60 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] cursor-pointer">
          <span class="relative w-12 h-12 rounded-full bg-red-900/40 border border-red-700/40 inline-flex shrink-0 group-hover:bg-red-700/50 group-hover:border-red-500/50 transition-all duration-300">
            <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[56%] text-2xl leading-none">💣</span>
          </span>

          <div>
            <p class="text-red-400 font-extrabold text-xl group-hover:text-red-300 transition-colors duration-300">GAME OVER</p>
            <p class="text-gray-500 text-xs mt-1 group-hover:text-gray-400 transition-colors duration-300">Total failure. Don't touch at any cost!</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
function startGame() {
  alert('Redirecting to game page.....');
}
</script>