<template>
	<div class="box">
		<div class="header">
			<h2>搜索 {{ route.query.key }}</h2>
		</div>
		<div class="banner">
			<ul>
				<li @click="active = 1" :class="{ active: active == 1 }">单曲</li>
				<li @click="active = 100" :class="{ active: active == 100 }">歌手</li>
				<li @click="active = 1000" :class="{ active: active == 1000 }">歌单</li>
			</ul>
		</div>
		<div class="content">
			<div class="header">
				<button class="play">播放全部 &nbsp;&nbsp;十</button>
				<button class="download">下载全部</button>
			</div>
			<div class="body" v-loading="isLoading">
				<div class="info top">
					<div class="index"></div>
					<div class="name" style="color: #323232">音乐标题</div>
					<div class="author">歌手</div>
					<div class="album">专辑</div>
					<div class="td">时长</div>
				</div>
				<div
					class="info"
					v-for="(itme, index) in data"
					:key="index"
					@dblclick="addMusic(itme)"
				>
					<div class="index">{{ index + 1 }}</div>
					<div class="name">
						<like class="like" theme="outline" size="20" fill="#333" />
						<span>{{ itme.name }}</span>
						<span class="description">{{ itme.alias[0] }}</span>
					</div>
					<div class="author" v-html="changeName(itme.artists)"></div>
					<div class="album">{{ itme.album.name }}</div>
					<div class="td">{{ time(itme.duration) }}</div>
				</div>
				<div class="page">
					<el-pagination
						v-model="page"
						background
						layout="prev, pager, next"
						:total="1000"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { PlayOne, Like } from "@icon-park/vue-next";
import { ref, watch } from "vue";
import { useStore } from "@/store/user";
import { useRouter, useRoute } from "vue-router";
import { getSongDetail, search } from "@/network/api";
const store = useStore();
const router = useRouter();
const route = useRoute();
let isLoading = ref(false); //是否加载
let data = ref([]); //存储数据
let active = ref(1); //搜索类型
//页数
let page = ref(1);
setTimeout(() => {
	page.value = 2;
}, 1000);
watch(
	() => page.value,
	() => {
		console.log(" ", page.value);
	}
);
watch(
	() => route.query.key,
	() => {
		if (!store.searchHistory.includes(route.query.key)) {
			store.searchHistory.push(route.query.key);
		}
		if (route.query.key) {
			search(route.query.key, page.value - 1).then((res) => {
				data.value = res.result.songs;
			});
		}
	}
);
if (data.value.length == 0) {
	search(route.query.key, page.value - 1).then((res) => {
		data.value = res.result.songs;
	});
}
//修改歌手名称格式
const changeName = (arr) => {
	return arr.reduce((value, itme, index) => {
		if (index != 0) {
			return value + `/ <span style="cursor: pointer;">${itme.name}</span> `;
		} else {
			return value + `<span style="cursor: pointer;">${itme.name}</span> `;
		}
	}, "");
};
//格式化时间
const time = (time) => {
	let s = "";
	time /= 1000;
	time = parseInt(time);
	s +=
		time / 60 < 10
			? "0" + parseInt(time / 60) + ":"
			: parseInt(time / 60) + ":";
	s +=
		time - parseInt(time / 60) * 60 < 10
			? "0" + (time - parseInt(time / 60) * 60)
			: time - parseInt(time / 60) * 60;
	return s;
};
//添加到播放列表
const addMusic = (itme) => {
    let set = new Set(store.playList);
    set.add(itme.id);
    store.playList = [...set];
    store.playNumber = store.playList.indexOf(itme.id);
};
const ff = () => {
	console.log(page.value);
};
</script>

<style scoped lang="scss">
.box {
	padding: 0 20px;
	width: 100%;
	height: 100%;
	.banner {
		ul {
			list-style: none;
			font-size: 18px;
			color: #666;
			li {
				display: inline-block;
				height: 30px;
				width: 60px;
				cursor: pointer;
				// background: red;
				&::after {
					content: "";
					display: block;
					width: 35px;
					height: 5px;
					margin-top: 5px;
					display: none;
				}
			}
			.active {
				font-weight: bold;
				color: #000;
				&::after {
					content: "";
					display: block;
					width: 35px;
					height: 5px;
					margin-top: 5px;
					border-radius: 80px;
					background: #ff7551;
				}
			}
		}
	}
	.content {
		margin-top: 40px;
		.header {
			button {
				font-size: 14px;
				display: inline-block;
				line-height: 40px;
				outline: none;
				background: #fff;
				border: 1px solid rgba($color: #000000, $alpha: 0.2);
				height: 40px;
				width: 120px;
				border-radius: 30px;
				&:hover {
					background: #e0e0e0;
				}
			}
			.play {
				margin-right: 20px;
				background: #32a7e2;
				color: #fff;
				border: none;
				&:hover {
					background: #3595c5;
				}
			}
		}
		.body {
			height: 460px;
			width: 98%;
			overflow-y: scroll;
			overflow-x: hidden;
			font-size: 13px;
			user-select: none;
			margin-top: 20px;
			.top {
				position: sticky;
				top: 0;
				z-index: 10;
			}
			.info {
				display: grid;
				grid-template-columns: 5% 40% 20% 20% 5%;
				grid-template-rows: 40px;
				height: 40px;
				line-height: 40px;
				.index {
					width: 100%;
					height: 40px;
				}
				.name {
					color: #3595c5;
					width: 80%;
					height: 40px;
					padding-left: 20px;
					overflow: hidden;
					display: flex;
					cursor: pointer;
					& + span {
						display: block;
					}
					.like {
						cursor: pointer;
						transform: translate(-10px, 28%);
					}
					.description {
						height: 40px;
						display: block;
						overflow: hidden;
						text-overflow: ellipsis;
						-o-text-overflow: ellipsis;
						white-space: nowrap;
						padding-left: 5px;
					}
				}
				.author {
					height: 40px;
					overflow: hidden;
					text-overflow: ellipsis;
					-o-text-overflow: ellipsis;
					white-space: nowrap;
					padding: 0 5px;
					span {
						cursor: pointer;
					}
				}
				.album {
					height: 40px;
					overflow: hidden;
					text-overflow: ellipsis;
					-o-text-overflow: ellipsis;
					white-space: nowrap;
					padding-left: 5px;
					cursor: pointer;
				}
				.td {
					height: 40px;
					color: #c8c8c8;
				}
				&:hover {
					background: #f5f5f5;
					.author {
						color: #000;
					}
				}
				&:nth-child(2n + 1) {
					background: #fafafa;
					&:hover {
						background: #f5f5f5;
					}
				}
			}
			.page {
				width: 100%;
				height: 40px;
				position: relative;
				left: 20%;
				top: 10px;
			}
		}
	}
}

::-webkit-scrollbar {
	width: 6px;
	border-radius: 80px;
}
::-webkit-scrollbar-thumb {
	background-color: #747d8c;
	border-radius: 80px;
}
</style>
