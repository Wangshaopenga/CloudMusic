<template>
  <div ref="container" class="container">
    <Siderbar :is-collapse="isCollapse"></Siderbar>
    <el-button @click="f">发送</el-button>
    <div class="wrapper">
      <Header></Header>
      <router-view name="content"></router-view>
    </div>
    <Transition>
      <Login v-if="store.isLogin" class="login" />
    </Transition>
  </div>
  <Player class="player" />
</template>

<script setup>
import Siderbar from "@/components/Home/Siderbar.vue";
import Header from "@/components/Home/Header.vue";
import Login from "@/components/Home/Login.vue";
import Player from "@/components/Home/Player.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useStore } from "../store/user.js";
let isCollapse = ref(true); //左侧是否详细
let isLogin = ref(false); //是否展示登录界面
const container = ref(null);
const store = useStore();
onMounted(() => {
  setTimeout(() => {
    getWidth();
    window.addEventListener("resize", getWidth);
  }, 2300);
});
onUnmounted(() => {
  window.removeEventListener("resize", getWidth);
});
const getWidth = () => {
  if (container.value) {
    // console.log(container.value.offsetWidth, isCollapse.value);
    isCollapse.value = container.value.offsetWidth >= 1090 ? false : true;
    // console.log(container.value.offsetWidth, isCollapse.value);
  }
};
const f = () => {
  store.searchHistory.push("123");
  console.log(123);
};
</script>

<style lang="scss" scoped>
.player {
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 60px;
  background: #c3c4c7;
}
img {
  max-width: 100%;
}
.login {
  position: absolute;
  width: 350px;
  height: 550px;
  left: 50%;
  top: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.container {
  background-color: #1f1d2b;
  height: 98vh;
  display: flex;
  overflow: hidden;
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  position: relative;
}

.wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: rgb(21 20 26 / 63%);
  border-radius: 10px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
