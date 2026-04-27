<template>
  <nav class="px-6 py-4 flex items-center justify-between backdrop-blur-md bg-white/5 border-b border-white/10 text-white select-none transition-all duration-300">
    
    <div class="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
      <img src="../Assets/logo.png" alt="SupaClick Logo" class="max-w-17 max-h-10 object-contain" />
    </div>

    <div class="hidden md:flex items-center gap-8 font-bold text-sm text-gray-400 tracking-wide">
      <a href="#" class="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">HOME</a>
      <a href="#" class="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all">LEADERBOARD</a>
      <a href="#" class="hover:text-pink-400 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] transition-all">SHOP</a>
    </div>

    <div class="flex items-center gap-3 md:gap-4">
      
      <template v-if="!isLoggedIn">
        <button 
          @click="handleLogin" 
          class="px-4 py-2 md:px-5 rounded-full font-bold text-xs md:text-sm bg-white/10 hover:bg-white/20 border border-white/20 transition-all active:scale-95"
        >
          LOG IN
        </button>
        <button 
          @click="handleLogin" 
          class="hidden sm:block px-5 py-2 rounded-full font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all active:scale-95"
        >
          SIGN UP
        </button>
      </template>

      <template v-else>
        <div class="flex items-center gap-3 bg-white/5 pl-4 pr-1 py-1 rounded-full border border-white/10">
          <div class="flex flex-col text-right hidden sm:flex">
            <span class="text-xs font-bold text-cyan-300">SpaceRanger_99</span>
            <span class="text-[10px] text-gray-400">Score: 4,520 pts</span>
          </div>
          
          <div 
            class="relative w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 border-2 border-white/20 cursor-pointer hover:scale-105 hover:border-pink-400 transition-all flex items-center justify-center text-lg"
            @click="handleLogout"
            title="Click to Logout"
          >
            🧑‍🚀
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-[#0d0620] rounded-full"></span>
          </div>
        </div>
      </template>

    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

// สถานะการ Login (เปลี่ยนเป็น true/false เพื่อดู UI ที่เปลี่ยนไป)
const isLoggedIn = ref(false);

const handleLogin = () => {
  // จำลองการเข้าสู่ระบบ
  isLoggedIn.value = true;
};

const handleLogout = () => {
  // จำลองการออกจากระบบ โดยเพิ่ม confirm เล็กน้อย
  if(confirm("Are you sure you want to log out?")) {
    isLoggedIn.value = false;
  }
};
</script>