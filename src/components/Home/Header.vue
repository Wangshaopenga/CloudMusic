<template>
	<div class="header">
		<div class="search-bar">
			<div class="btn">
				<el-button type="info" @click="back" :icon="Back" circle />
				<el-button type="info" @click="forward" :icon="Right" circle />
			</div>
			<input
				@focus="store.isSearch = true"
				@blur="store.isSearch = false"
				type="text"
				v-model="store.searchInfo"
				:placeholder="searchDefaultKey"
				@keydown.enter="goSearch"
			/>
			<img
				@click="goSearch"
				class="search-ico"
				src="@/assets/img/search.png"
				alt=""
			/>
		</div>
		<div class="user-settings">
			<img class="user-img" alt="" :src="store.userInfo.avatarUrl" />
			<div @click="store.isLogin = true" class="user-name">
				{{ store.userInfo.nickname }}
			</div>
			<svg viewBox="0 0 492 492" fill="currentColor">
				<path
					d="M484.13 124.99l-16.11-16.23a26.72 26.72 0 00-19.04-7.86c-7.2 0-13.96 2.79-19.03 7.86L246.1 292.6 62.06 108.55c-5.07-5.06-11.82-7.85-19.03-7.85s-13.97 2.79-19.04 7.85L7.87 124.68a26.94 26.94 0 000 38.06l219.14 219.93c5.06 5.06 11.81 8.63 19.08 8.63h.09c7.2 0 13.96-3.57 19.02-8.63l218.93-219.33A27.18 27.18 0 00492 144.1c0-7.2-2.8-14.06-7.87-19.12z"
				></path>
			</svg>
			<div class="notify">
				<div class="notification"></div>
				<svg viewBox="0 0 24 24" fill="currentColor">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
					/>
				</svg>
			</div>
		</div>
	</div>
	<Transition>
		<search v-show="store.isSearch" class="search" />
	</Transition>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { getsearchDefaultKey, getLoginStatus } from "@/network/api";
import Search from "./Search.vue";
import { useStore } from "@/store/user";
import { useRouter } from "vue-router";
import { Back, Right } from "@element-plus/icons-vue";
const router = useRouter();
let searchDefaultKey = ref("");
const store = useStore();
onMounted(() => {
	getsearchDefaultKey().then((res) => {
		searchDefaultKey.value = res.data.realkeyword;
	});
});
if (!store.cookie) {
	store.userInfo = {
		nickname: "未登录",
		avatarUrl:
			"https://tse4-mm.cn.bing.net/th/id/OIP-C.N4AAf7UkO4lMNl7Kj_yo2gAAAA?w=176&h=178&c=7&r=0&o=5&dpr=1.5&pid=1.7",
	};
}
const goSearch = () => {
	store.searchInfo
		? router.push({ name: "search", query: { key: store.searchInfo } })
		: router.push({ name: "search", query: { key: searchDefaultKey.value } });
};
const back = () => {
	router.go(-1);
};
const forward = () => {
	router.go(1);
};
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	align-items: center;
	flex-shrink: 0;
	padding: 20px;
	color: #000;
	.search-bar {
		height: 34px;
		display: flex;
		width: 100%;
		max-width: 450px;
		position: relative;
		.btn {
			width: 115px;
			button {
				color: #333;
				background: #fff;
				&:hover {
					background: #f2f6fc;
				}
			}
		}
		input {
			width: 100%;
			height: 100%;
			border: none;
			border: 1px solid #353340;
			border-radius: 8px;
			font-family: "Inter", sans-serif;
			font-size: 14px;
			font-weight: 500;
			padding: 0 40px 0 16px;
			box-shadow: 0 0 0 2px rgba(134, 140, 160, 0.02);
			color: #000;
			position: relative;
			left: 200px;
		}
		.search-ico {
			width: 18px;
			height: 18px;
			position: relative;
			right: -37%;
			top: 9px;
			cursor: pointer;
		}
	}

	.user-settings {
		display: flex;
		align-items: center;
		padding-left: 20px;
		flex-shrink: 0;
		margin-left: auto;
		cursor: pointer;
		svg {
			width: 10px;
			flex-shrink: 0;
			@media screen and (max-width: 575px) {
				display: none;
			}
		}
		.notify {
			position: relative;
			svg {
				width: 20px;
				margin-left: 24px;
				flex-shrink: 0;
			}
			.notification {
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background-color: #ec5252;
				position: absolute;
				right: 1px;
				border: 1px solid #1f1d2b;
				top: -2px;
				@media screen and (max-width: 575px) {
					display: none;
				}
			}
		}
	}
	.user-img {
		width: 30px;
		height: 30px;
		flex-shrink: 0;
		object-fit: cover;
		border-radius: 50%;
		border: 0.5px solid rgba(0, 0, 0, 0.2);
	}
	.user-name {
		color: #000;
		font-size: 14px;
		margin: 0 6px 0 12px;
		@media screen and (max-width: 575px) {
			display: none;
		}
	}
}
.search {
	position: absolute;
	width: 350px;
	z-index: 99;
	left: 335px;
	top: 62px;
	border-radius: 20px;
	transition: all 0.1s;
}
@media screen and (max-width: 1090px) {
	.search {
		left: 335px;
	}
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
