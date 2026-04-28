<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const score = ref(0);
const lives = ref(3);
const combo = ref(0);
const countdown = ref(3);
const highScore = ref(getHighScore());

const isPlaying = ref(false);
const activeEmojis = ref([]);
const floatingTexts = ref([]);

const pointers = new Map();

let animationFrameId = null;
let spawnInterval = null;
let comboTimeout = null;

let spawnRate = 1000;
let fallSpeedMultiplier = 1;

const MAX_LIVES = 3;
const MIN_SPAWN_RATE = 300;

const emojiTypes = [
  { char: "😀", type: "normal", points: 10, weight: 40 },
  { char: "🍎", type: "normal", points: 10, weight: 40 },
  { char: "👽", type: "normal", points: 10, weight: 40 },
  { char: "💎", type: "special", points: 50, weight: 10 },
  { char: "🌟", type: "special", points: 50, weight: 5 },
  { char: "💩", type: "bad", points: -20, weight: 15 },
  { char: "💣", type: "bomb", points: 0, weight: 5 },
];

const formattedScore = computed(() => score.value.toLocaleString());

function getHighScore() {
  return Number(localStorage.getItem("high-score") || 0);
}

function setHighScore(value) {
  localStorage.setItem("high-score", value);
}

function setLastScore(value) {
  localStorage.setItem("last-score", value);
}

function isLineColliding(x1, y1, x2, y2, emoji) {
  const ex = (emoji.x / 100) * window.innerWidth;
  const ey = (emoji.y / 100) * window.innerHeight;
  const r = emoji.size * 10;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return false;

  let t = ((ex - x1) * dx + (ey - y1) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));

  const cx = x1 + t * dx;
  const cy = y1 + t * dy;

  const distX = ex - cx;
  const distY = ey - cy;

  return distX * distX + distY * distY < r * r;
}

function processInput() {
  const list = activeEmojis.value;

  pointers.forEach((p) => {
    for (let i = list.length - 1; i >= 0; i--) {
      const e = list[i];

      if (isLineColliding(p.prevX, p.prevY, p.x, p.y, e)) {
        handleSlice(e, i);
      }
    }
  });
}

function handleSlice(emoji, index) {
  const list = activeEmojis.value;
  list.splice(index, 1);

  if (emoji.type === "bomb") return gameOver();

  if (emoji.type === "heal") {
    if (lives.value < MAX_LIVES) lives.value++;
    showFloatingText(emoji.x, emoji.y, "+1 ❤️", "text-pink-400");
    return;
  }

  combo.value++;

  clearTimeout(comboTimeout);
  comboTimeout = setTimeout(() => (combo.value = 0), 1000);

  const multiplier = Math.min(5, 1 + combo.value * 0.2);
  const gained = Math.floor(emoji.points * multiplier);

  score.value = Math.max(0, score.value + gained);

  showFloatingText(
    emoji.x,
    emoji.y,
    `+${gained}`,
    gained > 0 ? "text-green-400" : "text-red-500",
    combo.value,
  );

  updateDifficulty();
}

function getRandomEmoji() {
  const total = emojiTypes.reduce((s, e) => s + e.weight, 0);
  let r = Math.random() * total;

  for (const e of emojiTypes) {
    if (r < e.weight) return e;
    r -= e.weight;
  }
  return emojiTypes[0];
}

function createEmoji(template) {
  return {
    id: Date.now() + Math.random(),
    char: template.char,
    type: template.type,
    points: template.points,
    x: 10 + Math.random() * 80,
    y: -10,
    size: template.size ?? Math.random() * 1 + 3.5,
  };
}

function startCountdown() {
  const timer = setInterval(() => {
    if (countdown.value > 0) countdown.value--;
    else clearInterval(timer);
  }, 1000);
}

function startGame() {
  score.value = 0;
  lives.value = MAX_LIVES;
  combo.value = 0;

  activeEmojis.value.length = 0;
  floatingTexts.value.length = 0;

  spawnRate = 1000;
  fallSpeedMultiplier = 1;

  isPlaying.value = true;

  updateSpawnRate();
  spawnOne();
  gameLoop();
}

function gameOver() {
  isPlaying.value = false;

  cancelAnimationFrame(animationFrameId);
  clearInterval(spawnInterval);
  clearTimeout(comboTimeout);

  if (score.value > highScore.value) {
    highScore.value = score.value;
    setHighScore(score.value);
  }

  setLastScore(score.value);

  router.push("/gameover");
}

function updateFloatingTexts() {
  const list = floatingTexts.value;

  for (let i = list.length - 1; i >= 0; i--) {
    const t = list[i];

    t.y += t.vy;
    t.x += t.vx;

    t.life++;
  }
}

function gameLoop() {
  if (!isPlaying.value) return;

  processInput();
  updateFloatingTexts(); 

  const list = activeEmojis.value;

  for (let i = list.length - 1; i >= 0; i--) {
    const e = list[i];

    let speed = e.type === "bomb" || e.type === "bad" ? 0.35 : 0.25;

    if (e.type === "heal") speed = 0.9;

    e.y += speed * fallSpeedMultiplier;

    if (e.y > 110) {
      if (e.type === "normal" || e.type === "special") {
        lives.value--;
        combo.value = 0;

        if (lives.value <= 0) {
          gameOver();
          return;
        }
      }
      list.splice(i, 1);
    }
  }

  animationFrameId = requestAnimationFrame(gameLoop);
}

function spawnOne() {
  if (!isPlaying.value) return;

  if (lives.value < MAX_LIVES && Math.random() < 0.1) {
    activeEmojis.value.push(
      createEmoji({ char: "💖", type: "heal", points: 0, size: 4 }),
    );
    return;
  }

  activeEmojis.value.push(createEmoji(getRandomEmoji()));
}

function updateSpawnRate() {
  clearInterval(spawnInterval);

  spawnInterval = setInterval(spawnOne, spawnRate);
}

function updateDifficulty() {
  const level = (score.value / 100) | 0;

  const newRate = Math.max(MIN_SPAWN_RATE, 1000 - level * 100);
  const newSpeed = 1 + level * 0.15;

  if (newRate !== spawnRate) {
    spawnRate = newRate;
    updateSpawnRate();
  }

  fallSpeedMultiplier = newSpeed;
}

function showFloatingText(x, y, text, color, comboVal = 0) {
  const id = Date.now();

  floatingTexts.value.push({ id, x, y, text, color, combo: comboVal });

  setTimeout(() => {
    const i = floatingTexts.value.findIndex((t) => t.id === id);
    if (i !== -1) floatingTexts.value.splice(i, 1);
  }, 800);
}

function clickEmoji(emoji) {
  if (!isPlaying.value) return;

  const list = activeEmojis.value;
  const index = list.findIndex((e) => e.id === emoji.id);
  if (index !== -1) list.splice(index, 1);

  if (emoji.type === "bomb") return gameOver();

  if (emoji.type === "heal") {
    if (lives.value < MAX_LIVES) lives.value++;
    showFloatingText(emoji.x, emoji.y, "+1 ❤️", "text-pink-400");
    return;
  }

  combo.value++;

  // reset combo if player stops hitting emojis
  clearTimeout(comboTimeout);
  comboTimeout = setTimeout(() => {
    combo.value = 0;
  }, 1000);

  const multiplier = Math.min(5, 1 + combo.value * 0.2);
  const gained = Math.floor(emoji.points * multiplier);

  score.value = Math.max(0, score.value + gained);

  showFloatingText(
    emoji.x,
    emoji.y,
    `+${gained}`,
    gained > 0 ? "text-green-400" : "text-red-500",
    combo.value,
  );

  updateDifficulty();
}

function handleScreenClick(e) {
  if (!isPlaying.value || countdown.value > 0) return;

  // ignore clicks on emoji elements
  if (e.target.closest("[data-emoji]")) return;

  showFloatingText(e.clientX, e.clientY, "MISS", "text-gray-400");

  combo.value = 0;
}

function preventPinchZoom(e) {
  if (e.touches && e.touches.length > 1) {
    e.preventDefault();
  }
}

let lastTouchEnd = 0;

function preventDoubleTapZoom(e) {
  const now = Date.now();

  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }

  lastTouchEnd = now;
}

function preventGesture(e) {
  e.preventDefault();
}

watch(countdown, (v) => {
  if (v === 0) startGame();
});

onMounted(() => {
  document.addEventListener("touchmove", preventPinchZoom, { passive: false });
  document.addEventListener("touchend", preventDoubleTapZoom, false);

  // Safari
  document.addEventListener("gesturestart", preventGesture);
  document.addEventListener("gesturechange", preventGesture);
  document.addEventListener("gestureend", preventGesture);

  startCountdown();
});

onMounted(startCountdown);

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  clearInterval(spawnInterval);
  clearTimeout(comboTimeout);

  document.addEventListener("touchmove", preventPinchZoom, { passive: false });
  document.addEventListener("touchend", preventDoubleTapZoom, false);

  // Safari
  document.addEventListener("gesturestart", preventGesture);
  document.addEventListener("gesturechange", preventGesture);
  document.addEventListener("gestureend", preventGesture);
});
</script>

<template>
  <div
    class="relative min-h-screen bg-[#0d0620] overflow-hidden select-none flex flex-col items-center cursor-crosshair"
    @click="handleScreenClick"
  >
    <div
      class="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
    >
      <div
        class="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"
      ></div>
      <div
        class="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"
      ></div>
    </div>

    <div
      class="relative z-20 w-full px-8 py-6 flex justify-between items-start"
    >
      <div class="flex flex-col gap-1">
        <span
          class="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase pl-1"
          >Score</span
        >
        <div
          class="bg-white/5 border border-white/10 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl"
        >
          <span class="text-3xl font-black text-white tabular-nums">{{
            formattedScore
          }}</span>
        </div>
      </div>

      <div class="flex flex-col items-end gap-1">
        <span
          class="text-pink-400 text-[10px] font-bold tracking-[0.2em] uppercase pr-1"
          >Lives</span
        >
        <div
          class="flex gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-3 rounded-2xl"
        >
          <span
            v-for="n in 3"
            :key="n"
            class="text-2xl drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]"
          >
            {{ n <= lives ? "❤️" : "🖤" }}
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

    <TransitionGroup name="score-float" tag="div">
      <div
        v-for="t in floatingTexts"
        :key="t.id"
        class="absolute text-2xl font-bold pointer-events-none z-200"
        :class="t.color"
        :style="{
          left: t.x + '%',
          top: t.y + '%',
          transform: 'translate(-50%, -50%)',
        }"
      >
        {{ t.text }}
        <div v-if="t.combo > 1" class="text-xs text-yellow-300">
          x{{ t.combo }}
        </div>
      </div>
    </TransitionGroup>

    <button
      v-for="emoji in activeEmojis"
      :data-emoji="emoji.char"
      :key="emoji.id"
      class="absolute cursor-pointer py-3 px-4 border border-white select-none active:scale-90 transition-transform"
      :style="{
        left: emoji.x + '%',
        top: emoji.y + '%',
        fontSize: emoji.size + 'rem',
      }"
      @pointerdown.stop.prevent="clickEmoji(emoji)"
    >
      {{ emoji.char }}
    </button>

    <div
      v-if="countdown > 0"
      class="absolute inset-0 z-50 flex items-center justify-center bg-[#0d0620]/80 backdrop-blur-sm"
    >
      <div
        class="text-[12rem] font-black italic text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500 animate-countdown"
      >
        {{ countdown > 0 ? countdown : "GO!" }}
      </div>
    </div>
  </div>
</template>

<style scoped>
html,
body {
  touch-action: manipulation;
  overscroll-behavior: none;
}

.game-container {
  touch-action: none; /* 🔥 disables pinch + double tap zoom */
  user-select: none;
}

@keyframes countdownPulse {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
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
