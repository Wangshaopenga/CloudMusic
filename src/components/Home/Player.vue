<template>
	<div class="playerbox">
		<audio
			ref="audio"
			@pause="playStatus = '暂停'"
			@play="playStatus = '播放'"
			@timeupdate="getNowPlayTime"
			@canplay="onLoadedmetadata"
			style="display: none"
		></audio>
		<div class="info">
			<div class="img">
				<img v-if="song.name != '未知歌曲'" :src="song.al.picUrl" />
			</div>
			<div class="musicInfo">
				<div class="name">
					{{ song.name }}
				</div>
				<div v-if="song.name != '未知歌曲'" class="singer">
					<span v-for="(p, index) in song.ar" :key="p">
						{{ index != 0 ? `/ ${p.name}` : `${p.name}` }}
					</span>
				</div>
			</div>
		</div>
		<div class="btns">
			<div class="aplayer">
				<div class="m-btns">
					<a @click="addLike">
						<img src="@/assets/img/aplayer/like.svg" alt="" class="Musicice" />
					</a>
					<a @click="lastMusic">
						<img
							src="@/assets/img/aplayer/上一首.svg"
							alt=""
							class="Musicice"
						/>
					</a>
					<a @click="startPlayOrpause">
						<img :src="`/src/assets/img/aplayer/${playStatus}.svg`" alt="" />
					</a>
					<a @click="nextMusic">
						<img
							src="@/assets/img/aplayer/下一首.svg"
							alt=""
							class="Musicice"
						/>
					</a>
					<a @click="changePlayMode">
						<img
							:src="`/src/assets/img/aplayer/${
								playModeList[`${store.playMode}`]
							}.svg`"
							alt=""
							class="Musicice"
						/>
					</a>
				</div>
				<div class="slider-demo-block rightvoice">
					<a @click="Mute">
						<img :src="`/src/assets/img/aplayer/${volumeStatus}.svg`" alt="" />
					</a>
					<el-slider
						v-model="store.volumes"
						@change="changeVolumes"
						style="width: 70px"
						:show-tooltip="true"
					/>
					<a @click="isPlayList = !isPlayList">
						<img src="@/assets/img/aplayer/列表.svg" alt="" class="Musicice" />
					</a>
				</div>
			</div>
			<div class="m-slider">
				<span class="time">{{ toTime(MusiccurrentTime) }}</span>
				<div class="slider-demo-block">
					<el-slider
						v-model="progress"
						:show-tooltip="false"
						@change="chancurren"
						@click="chancurren"
						style="width: 400px"
					/>
				</div>
				<span class="time" style="margin-left: 18px">
					{{ toTime(Musicduration) }}
				</span>
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref, reactive, computed, onMounted, watch, toRefs } from "vue";
import { useStore } from "@/store/user";
import { useRouter } from "vue-router";
import { Like } from "@icon-park/vue-next";
import { getUrl, getSongDetail } from "@/network/api";
const router = useRouter();
const store = useStore();
onMounted(() => {
	audio.value.volume = store.volumes / 100;
	if (store.playList.length != 0) {
		getSongDetail(store.playList[store.playNumber]).then((res) => {
			info.song = res.songs[0];
		});
		getUrl(store.playList[store.playNumber]).then((res) => {
			audio.value.src = res.data[0].url;
		});
	}
});
let audio = ref();
// 当前时间
let MusiccurrentTime = ref();
// 歌曲总时间
let Musicduration = ref();
// 进度条
let progress = ref();
//歌曲信息
// let info = reactive({
// 	name: "未知歌曲",
// });
let isPlayList = ref(false);
let info = reactive({
	song: {
		name: "未知歌曲",
	},
});
let { song } = toRefs(info);
watch(
	() => store.playNumber,
	() => {
		pause();
		if (store.playList.length != 0) {
			getSongDetail(store.playList[store.playNumber]).then((res) => {
				info.song = res.songs[0];
			});
			getUrl(store.playList[store.playNumber]).then((res) => {
				audio.value.src = res.data[0].url;
				play();
			});
		}
	}
);

const playModeList = ["循环", "单曲循环", "随机"]; // 0：顺序 1：循环 2：随机
const changePlayMode = () => {
	store.playMode = (store.playMode + 1) % 3;
};

const beforePlayNumber = ref(store.playNumber);
// 上一首   随机播放上一曲功能尚未实现
const lastMusic = () => {
	pause();
	--store.playNumber < 0 ? (store.playNumber = store.playList.length - 1) : "";
	play();
	// console.log('正在播放第' + (store.playNumber + 1) + '首');
};
// 下一首
const nextMusic = () => {
	pause();
	beforePlayNumber.value = store.playNumber;
	if (store.playMode != 2) {
		store.playNumber = (store.playNumber + 1) % store.playList.length;
	} else {
		let lastPlayNumber = store.playNumber;
		while (
			store.playNumber == lastPlayNumber ||
			store.playNumber == beforePlayNumber.value
		) {
			store.playNumber = Math.floor(Math.random() * store.playList.length);
		}
	}
	play();
};
//改变进度
const chancurren = () => {
	let ct = (progress.value * Musicduration.value) / 100;
	if (!isNaN(ct)) {
		audio.value.currentTime = ct;
	}
	// console.log(progress)
};
// 改变音量
const changeVolumes = () => {
	// if (!isNan(ct)) {
	audio.value.volume = store.volumes / 100;
	// }
	// console.log(ct);
};
// 加载当前播放时间
const getNowPlayTime = () => {
	// currentTime 当前时间
	MusiccurrentTime.value = parseInt(audio.value.currentTime);
	// console.log(MusiccurrentTime.value);
	progress.value = (MusiccurrentTime.value / Musicduration.value) * 100;
	if (MusiccurrentTime.value == Musicduration.value) {
		switch (store.playMode) {
			//0：顺序 1：循环 2：随机
			case 0:
				nextMusic();
				break;
			case 1:
				play();
				break;
			case 2:
				pause();
				store.playNumber = Math.floor(Math.random() * store.playList.length);
				audio.value.src = store.playList[store.playNumber].url;
				show.name = store.playList[store.playNumber].name;
				show.singer = store.playList[store.playNumber].ar;
				show.cover = store.playList[store.playNumber].al.picUrl;
				play();
				break;

			default:
				break;
		}
	}
};
// 加载总时长
const onLoadedmetadata = () => {
	// duration 期间
	Musicduration.value = parseInt(audio.value.duration);
};
const toTime = (sec) => {
	//秒数转化为mm:ss形式
	let s = sec % 60 < 10 ? "0" + (sec % 60) : sec % 60;
	let min =
		Math.floor(sec / 60) < 10
			? "0" + Math.floor(sec / 60)
			: Math.floor(sec / 60);
	if (!isNaN(s)) {
		return min + ":" + s;
	} else {
		return "00" + ":" + "00";
	}
	// console.log(min +" "+ s);
};
//添加/取消喜欢
const addLike = () => {};

//声音是否静音
let volumeStatus = computed(() => {
	return store.volumes == 0 ? "静音" : "声音";
});
let lastVolume = store.volumes;
const Mute = () => {
	if (volumeStatus.value == "静音") {
		store.volumes = lastVolume;
	} else {
		lastVolume = store.volumes;
		store.volumes = 0;
	}
};
// playStatus 播放状态
let playStatus = ref("暂停");
// 播放或者暂停
const startPlayOrpause = () => {
	audio.value.paused ? play() : pause();
	playStatus.value = audio.value.paused ? "暂停" : "播放";
};
// 播放
const play = () => {
	if (audio.value.src == "") return;
	audio.value.play();
	playStatus.value = audio.value.paused ? "暂停" : "播放";
};
// 暂停
const pause = () => {
	audio.value.pause();
	playStatus.value = audio.value.paused ? "暂停" : "播放";
};

const MusicList7 = () => {
	console.log("播放列表");
	// router.push({ name: "Listofcurrentsongs" });
};
</script>
<style lang="scss">
a {
	cursor: pointer;
}
img {
	width: 28px;
	height: 28px;
}
.playerbox {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 15px 10px 5px 10px;
	.info {
		display: flex;
		width: 20%;
		overflow: hidden;
		position: relative;
		left: 0;
		.img {
			width: 80px;
			height: 86px;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 60px;
				height: 60px;
			}
		}
		.musicInfo {
			display: flex;
			flex-direction: column;
			justify-content: center;
			user-select: none;
			font-size: 14px;
			.name {
				padding: 10px;
				padding-bottom: 0;
				cursor: pointer;
			}
			.singer {
				padding: 5px 10px;
			}
		}
	}
	.btns {
		width: 80%;
		.aplayer {
			display: flex;
			flex-direction: row;
			.m-btns {
				display: flex;
				position: relative;
				left: 240px;
				a {
					margin: 0 10px;
				}
			}
			.slider-demo-block {
				display: flex;
				align-items: center;
				img {
					margin: 5px 10px 0;
				}
			}
			.rightvoice {
				position: absolute;
				right: 30px;
				bottom: 15px;
			}
		}
		.m-slider {
			display: flex;
			// justify-content: center;
			align-items: center;
			position: relative;
			left: 110px;
			width: 545px;
			.time {
				margin: 0 15px;
			}
		}
	}
}

//进度条
.el-slider__button-wrapper {
	width: 10px;
	height: 10px;
}
.el-slider__button {
	width: 10px;
	height: 10px;
	position: relative;
	top: 6px;
}
.el-slider__button .el-tooltip__trigger .el-tooltip__trigger {
	width: 10px;
	height: 10px;
}
.el-slider__button.hover,
.el-slider__button:hover {
	cursor: pointer;
}
.el-slider__button-wrapper.hover,
.el-slider__button-wrapper:hover {
	cursor: pointer;
}
</style>
