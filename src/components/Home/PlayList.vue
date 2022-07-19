<template>
	<div class="playList">
		<div class="header">
			<span class="play">当前播放</span>
			<div>
				<span class="total">总{{ data.length }}首</span>
				<div>
					<span class="collect">
						<folder-focus-one theme="outline" size="20" fill="#333" />
						收藏全部
					</span>
					<span class="clear">清空列表</span>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="info" v-for="itme in data" :key="itme.song.name">
				<div class="name">
					<span>{{ itme.song.name }}</span>
					<span class="description">{{ itme.song.alia[0] }}</span>
				</div>
				<!-- <div class="author"> -->
				<div class="author" v-html="change(itme.song.ar)"></div>
				<!-- </div> -->
				<div class="td">{{ time(itme.song.dt) }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useStore } from "@/store/user";
import { FolderFocusOne } from "@icon-park/vue-next";
import { onMounted, ref } from "vue";
import { getPlayRecord } from "../../network/home";
const data = ref([]);
const store = useStore();
onMounted(() => {
	getPlayRecord(store.userInfo.userId).then((res) => {
		data.value = res.weekData;
	});
});
const change = (arr) => {
	return arr.reduce((value, itme, index) => {
		if (index != 0) {
			return value + `/ <span style="cursor: pointer;">${itme.name}</span> `;
		} else {
			return value + `<span style="cursor: pointer;">${itme.name}</span> `;
		}
	}, "");
};
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
</script>

<style scoped lang="scss">
.playList {
	width: 30%;
	height: 80%;
	min-width: 360px;
	background: #fafafa;
	position: absolute;
	right: 0;
	z-index: 100;
	bottom: 64px;

	.header {
		position: relative;
		top: 0%;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		height: 12%;
		padding: 10px;
		.play {
			font-weight: bold;
			font-size: 24px;
		}
		div {
			padding-top: 10px;
			font-size: 16px;
			display: flex;
			justify-content: space-between;
			.total {
				font-size: 14px;
				color: #e0e0e0;
			}
			.collect {
				cursor: pointer;
			}
			.clear {
				margin-left: 10px;
				color: #54a0ff;
				cursor: pointer;
			}
		}
	}
	.content {
		height: 85%;
		overflow-y: scroll;
		overflow-x: hidden;
		font-size: 13px;
		user-select: none;
		.info {
			display: flex;
			height: 40px;
			align-items: center;
			.name {
				color: #323232;
				width: 50%;
				display: flex;
				padding-left: 20px;
				overflow: hidden;
				& + span {
					display: block;
					flex: 2;
				}
				.description {
					flex: 1;
					display: block;
					color: #e0e0e0;
					overflow: hidden;
					text-overflow: ellipsis;
					-o-text-overflow: ellipsis;
					white-space: nowrap;
					padding-left: 5px;
				}
			}
			.author {
				width: 35%;
				overflow: hidden;
				text-overflow: ellipsis;
				-o-text-overflow: ellipsis;
				white-space: nowrap;
				padding: 0 5px;
				color: #a4a4a4;
				span {
					cursor: pointer;
				}
			}
			.td {
				width: 5%;
				padding: 0 10px;
				margin-right: 20px;
				color: #d2d2d2;
			}
			&:hover {
				background: #f5f5f5;
				.author {
					color: #000;
				}
			}
			&:nth-child(2n + 1) {
				background: #fff;
				&:hover {
					background: #f5f5f5;
				}
			}
		}
	}
}
::-webkit-scrollbar {
	width: 6px;
	border-radius: 10px;
}
::-webkit-scrollbar-thumb {
	background-color: #747d8c;
	border-radius: 10px;
}
</style>
