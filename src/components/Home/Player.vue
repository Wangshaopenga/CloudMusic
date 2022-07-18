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
		<div class="m-tandc">
			<img
				:src="showCover + '?param=80y80'"
				style="width: 80px; height: 80px"
				alt=""
			/>
			<div class="titleandsinger">
				<span style="color: #000;width:100%;">{{ showName }}</span>
				<span style="font-size: 13px">{{ showSinger }}</span>
			</div>
		</div>
		<div class="btns">
			<!-- <h1>{{ showname }}</h1> -->

			<div class="aplayer">
				<!-- 歌曲列表 -->
				<div class="m-btns">
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
					<a @click="addLike">
						<img
							src="@/assets/img/aplayer/like.svg"
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
					<a><img src="@/assets/img/aplayer/声音.svg" alt="" width="20" /></a>
					<!-- 音量条 -->
					<el-slider
						v-model="store.volumes"
						@change="changevolumes"
						style="width: 70px"
						:show-tooltip="true"
					/>
					<a @click="MusicList7">
						<img src="@/assets/img/aplayer/列表.svg" alt="" class="Musicice" />
					</a>
				</div>
			</div>
			<!-- 进度条 -->
			<div class="m-slider">
				<span type="info">{{ toTime(MusiccurrentTime) }}</span>
				<div class="slider-demo-block">
					<el-slider
						v-model="progress"
						:show-tooltip="false"
						@change="chancurren"
						@click="chancurren"
						style="width: 400px"
					/>
				</div>
				<span type="info" style="margin-left: 18px">{{
					toTime(Musicduration)
				}}</span>
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useStore } from "@/store/user";
import { useRouter } from "vue-router";
import { Like } from "@icon-park/vue-next";
const router = useRouter();
const store = useStore();

onMounted(() => {
	if (audio.value.src == "") {
		audio.value.src = audiobox.value[0].url;
		showName.value = audiobox.value[0].musicname;
		showSinger.value = audiobox.value[0].singer;
		showCover.value = audiobox.value[0].cover;
	}
});

const audiobox = computed(() => {
	return store.playList;
});
let audio = ref();
// 当前时间
let MusiccurrentTime = ref();
// 歌曲总时间
let Musicduration = ref();
// 进度条
let progress = ref();
watch(
	() => store.playNumber,
	() => {
		pause();
		audio.value.src = audiobox.value[store.playNumber].url;
		showName.value = audiobox.value[store.playNumber].musicname;
		showSinger.value = audiobox.value[store.playNumber].singer;
		showCover.value = audiobox.value[store.playNumber].cover;
		play();
	}
);
watch(
	() => store.showmvstop,
	() => {
		if (store.showmvstop == true) {
			pause();
		}
	}
);

const playModeList = ["循环", "单曲循环", "随机"]; // 0：顺序 1：循环 2：随机
const changePlayMode = () => {
	store.playMode = (store.playMode + 1) % 3;
};
// 显示内容
let showName = ref("未知歌曲");
let showCover = ref(
	"https://assets.missevan.com/coversmini/202112/13/3b58840d0dda4f7bdecc6da73ee843c9231731.png"
);
let showSinger = ref("未知歌手");

const beforePlayNumber = ref(store.playNumber);
// 上一首   随机播放上一曲功能尚未实现
const lastMusic = () => {
	pause();
	--store.playNumber < 0 ? (store.playNumber = audiobox.value.length - 1) : "";
	play();
	// console.log('正在播放第' + (store.playNumber + 1) + '首');
};
// 下一首
const nextMusic = () => {
	pause();
	beforePlayNumber.value = store.playNumber;
	if (store.playMode != 2) {
		store.playNumber = (store.playNumber + 1) % audiobox.value.length;
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
const changevolumes = () => {
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
				randomPlayfn();
				if (store.playNumber != 0) store.playNumber = 0;
				audio.value.src = audiobox.value[store.playNumber].url;
				showName.value = audiobox.value[store.playNumber].musicname;
				showSinger.value = audiobox.value[store.playNumber].singer;
				showCover.value = audiobox.value[store.playNumber].cover;
				play();
				// console.log(audiobox.value[store.playNumber]);
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
const addLike = ()=>{}
// playStatus 播放状态
let playStatus = ref("暂停");
// 播放或者暂停
const startPlayOrpause = () => {
	playStatus.value = audio.value.paused ? "暂停" : "播放";
	audio.value.paused ? play() : pause();
};
// 播放
const play = () => {
	audio.value.play();
};
// 暂停
const pause = () => {
	audio.value.pause();
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
.slider-demo-block {
	display: flex;
	align-items: center;
}

.slider-demo-block .el-slider {
	margin-top: 0;
}

.slider-demo-block .demonstration {
	font-size: 14px;
	line-height: 44px;
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
	flex: 0 0 70%;
}
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
.playerbox {
	// display: flex;
	flex-direction: row;
	padding: 15px 10px 5px 10px;
	// align-items: center;
	// justify-content: center;
	position: relative;
}
.aplayer {
	display: flex;
	flex-direction: row;
}

.m-slider {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	span {
		line-height: 32px;
		margin: 0px 10px;
		width: 50px;
	}
}
.r-slider {
	width: 50px;
}

.MusicList {
	// display: flex;
	// justify-content: flex-start;
	margin-left: 10px;
}
.m-btns {
	display: flex;
	margin: 0 auto;
	a {
		margin: 0 10px;
	}
	// img {
	// 	width: 30px;
	// 	height: 30px;
	// }
}

.slider-demo-block {
	img {
		margin: 5px 10px 0;
	}
}

.Musicice {
	width: 22px;
	margin-top: 5px;
}
.m-tandc {
	display: flex;
	flex-direction: row;
	position: absolute;
	left: 0;
	bottom: 0;
	img {
		width: 91px;
	}
}
.rightvoice {
	position: absolute;
	right: 0;
	bottom: 30px;
	margin-right: 20px;
}
.titleandsinger {
	display: flex;
	flex-direction: column;
	span {
		padding: 8px;
		font-weight: 400;
		font-size: 15px;
		transition: 0.3s;
        cursor: pointer;
	}
}
</style>
