<template>
	<el-container>
		<el-header>
			<Header />
		</el-header>
		<el-container class="main">
			<el-aside width="220px">
				<Siderbar />
			</el-aside>
			<el-main class="view">
				<router-view />
			</el-main>
		</el-container>
		<el-footer>
			<Player />
		</el-footer>
	</el-container>
	<Transition>
		<Login v-if="store.isLogin" class="login" />
	</Transition>
</template>

<script setup>
import Siderbar from "@/components/Home/Siderbar.vue";
import Header from "@/components/Home/Header.vue";
import Login from "@/components/Login.vue";
import Player from "@/components/Home/Player.vue";
import PlayList from "@/components/Home/PlayList.vue";
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import { useStore } from "@/store/user.js";
import { getPlayRecord } from "@/network/api.js";
let isCollapse = $ref(true); //左侧是否详细
let isLogin = $ref(false); //是否展示登录界面
const container = $ref(null);
const store = useStore();
onMounted(() => {
	store.isPlayList = false;
	store.searchInfo = "";
	setTimeout(() => {
		getWidth();
		window.addEventListener("resize", getWidth);
	}, 2300);
});
onUnmounted(() => {
	window.removeEventListener("resize", getWidth);
});
const getWidth = () => {
	if (container) {
		// console.log(container.offsetWidth, isCollapse);
		isCollapse = container.offsetWidth >= 1090 ? false : true;
		// console.log(container.offsetWidth, isCollapse);
	}
};
const f = (f) => {
	console.log(f);
};
</script>

<style lang="scss" scoped>
* {
	box-sizing: border-box;
}
.el-container {
	background-color: #fff;
	height: 100%;
	width: 100%;
	box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
	min-width: 750px;
	padding: 0;
	margin: 0;
	.el-header {
		height: 75px;
	}
	.main {
		padding: 0;
		margin: 0;
		height: 80%;
		.el-aside {
			padding: 0;
			margin: 0;
			height: 662px;
			overflow: hidden;
		}
		.view {
			height: 662px;
			padding: 0;
			margin: 0;
		}
	}
	.el-footer {
		height: 80px;
		padding: 0;
		z-index: 9999 !important;
	}
}

::-webkit-scrollbar {
	width: 6px;
	border-radius: 10px;
}
::-webkit-scrollbar-thumb {
	background-color: #e0e0e0;
	border-radius: 10px;
}
// .player {
// 	position: fixed;
// 	bottom: 0;
// 	z-index: 999;
// 	width: 100%;
// 	height: 60px;
// 	background: #fff;
// 	border-top: 1px solid rgba(0, 0, 0, 0.1);
// }
// img {
// 	max-width: 100%;
// }
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

// .wrapper {
// 	display: flex;
// 	flex-direction: column;
// 	flex-grow: 1;
// }

// .v-enter-active,
// .v-leave-active {
// 	transition: opacity 0.5s ease;
// }
// .v-enter-from,
// .v-leave-to {
// 	opacity: 0;
// }
</style>
