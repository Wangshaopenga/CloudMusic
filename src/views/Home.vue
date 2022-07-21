<template>
	<div ref="container" class="container">
		<!-- <el-button @click="f">发送</el-button> -->
		<Siderbar :is-collapse="isCollapse"></Siderbar>
		<div class="wrapper">
			<Header />
			<router-view name="content"></router-view>
		</div>
		<Transition>
			<Login v-if="store.isLogin" class="login" />
		</Transition>
		<play-list v-show="store.isPlayList" />
	</div>
	<Player class="player" />
</template>

<script setup>
import Siderbar from "@/components/Home/Siderbar.vue";
import Header from "@/components/Home/Header.vue";
import Login from "@/components/Login.vue";
import Player from "@/components/Home/Player.vue";
import PlayList from "@/components/Home/PlayList.vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "../store/user.js";
let isCollapse = ref(true); //左侧是否详细
let isLogin = ref(false); //是否展示登录界面
const container = ref(null);
const store = useStore();
onMounted(() => {
	store.isPlayList = false;
	store.serachInfo = "";
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
	let lastPlayNumber = store.playNumber;
	// while (store.playNumber == lastPlayNumber) {
	// 	store.playNumber = Math.floor(Math.random() * store.audioxbox.length);
	//     console.log(store.playNumber);
	// }
	store.playNumber = (store.playNumber + 1) % 3;
	// for (let index = 0; index <100; index++) {
	//     console.log(Math.floor(Math.random() * store.audioxbox.length));
	// }
};
</script>

<style lang="scss" scoped>
.player {
	position: fixed;
	bottom: 0;
	z-index: 999;
	width: 100%;
	height: 60px;
	background: #fff;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
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
	z-index: 999;
	transform: translate(-50%, -50%);
	border-radius: 10px;
}
.container {
	background-color: #fff;
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

.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
