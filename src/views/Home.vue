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
  store.audioxbox = [
    {
      id: "1",
      al: "境界的彼方1",
      dt: "04:33",
      musicname: "daisy",
      singer: "STEREO DIVE FOUNDATION",
      url: "https://sound-ks1.cdn.missevan.com/aod/202010/31/6cf02602440a5fe2b00d3960f4258397141856.m4a",
      cover:
        "https://static.missevan.com/coversmini/201410/19/29dacd308434f4d8b1015043ae89c32d141933.jpg",
    },
    {
      id: "2",
      al: "乱",
      dt: "05:13",
      musicname: "最好的我2",
      singer: "房祖名3",
      url: "https://sound-ks1.cdn.missevan.com/aod/202112/13/76e0f45f3b756cb5fd82f4024a7e4b7e.m4a",
      cover:
        "https://static.missevan.com/coversmini/202202/25/cf7a067b1fa9fa1e637f142961d34634183055.jpg",
    },
    {
      id: "3",
      al: "",
      dt: "02:08",
      musicname: "Intro",
      singer: "#ラブリーミュージック",
      url: "https://sound-ks1.cdn.missevan.com/aod/202106/14/f14b848a15d6357bf2b5dc9c14fcb633.m4a",
      cover:
        "https://static.missevan.com/coversmini/202106/14/903d0dd3ad908b9c92e20879f55844c2164802.png",
    },
  ];
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
