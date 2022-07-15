<template>
  <div class="playerbox">
    <audio
      :src="audiobox.url"
      ref="audio"
      @pause="onPause"
      @play="onPlay"
      @timeupdate="getCurr"
      @canplay="onLoadedmetadata"
      style="display: none"
    ></audio>
    <div class="m-tandc">
      <img :src="showCover + '?param=91y91'" alt="" />
      <div class="titleandsinger">
        <a style="color: #000">{{ showName }}</a>
        <a style="font-size: 13px">{{ showSinger }}</a>
      </div>
    </div>
    <div class="btns">
      <!-- <h1>{{ showname }}</h1> -->

      <div class="aplayer">
        <!-- 歌曲列表 -->
        <div class="m-btns">
          <a @click="lastMusicpd">
            <img
              src="@/assets/img/aplayer/上一首.svg"
              alt=""
              class="Musicice"
            />
          </a>
          <a @click="startPlayOrpause">
            <img :src="aplayer" alt="" />
          </a>
          <a @click="nextMusicpd">
            <img
              src="@/assets/img/aplayer/下一首.svg"
              alt=""
              class="Musicice"
            />
          </a>
          <a @click="changePlayMode">
            <img
              :src="`src/assets/img/aplayer/${
                playModeInfo[store.playMode]
              }.svg`"
              class="Musicice"
            />
          </a>
        </div>
        <div class="slider-demo-block rightvoice">
          <a>
            <img
              v-show="store.volumes != 0"
              src="@/assets/img/aplayer/声音.svg"
              alt=""
              width="20"
              @click="
                lastVolumes = store.volumes;
                store.volumes = 0;
                changevolumes();
              "
            />
            <img
              v-show="store.volumes == 0"
              src="@/assets/img/aplayer/静音.svg"
              alt=""
              width="20"
              @click="
                store.volumes = lastVolumes;
                changevolumes();
              "
            />
          </a>
          <!-- 音量条 -->
          <el-slider
            v-model="store.volumes"
            @change="changevolumes"
            style="width: 70px"
            :show-tooltip="true"
          />
          <a @click="MusicList7">
            <!-- <span class="notification-number">{{
              store.showMusicinfo.length
            }}</span> -->
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
import playermusic from "@/assets/img/aplayer/播放.svg";
import pausemusic from "@/assets/img/aplayer/暂停.svg";
import { ElMessage } from "element-plus";
const router = useRouter();
const store = useStore();

onMounted(() => {
  if (audio.value.src == "") {
    // console.log(audiobox);
    audio.value.src = audiobox[i].url;
    showName.value = audiobox[i].musicname;
    showSinger.value = audiobox[i].singer;
    showCover.value = audiobox[i].cover;
  }
});

const audiobox1 = computed(() => {
  return store.showMusicinfo;
});

let audio = ref();
let aplayer = ref(playermusic);
// let aplayer = ref(await import('@/assets/img/aplayer/播放.svg'));
// 当前时间
let MusiccurrentTime = ref();
// 歌曲总时间
let Musicduration = ref();
// 进度条
let progress = ref();

// 默认暂停状态
let playing = false;

//当前播放的是第几首歌曲
let i = ref(store.playi);
i = store.playi;

let lastVolumes = ref(store.volumes);
//切换歌曲是自动更新歌曲信息
watch(
  () => store.playi,
  () => {
    let i = ref();
    i = store.playi;
    pause();
    audio.value.src = audiobox[i].url;
    showName.value = audiobox[i].musicname;
    showSinger.value = audiobox[i].singer;
    showCover.value = audiobox[i].cover;
    audioplay();
  }
);
// watch(
//   () => store.volumes,
//   () => {
//     console.log(store.volumes, audio.value.volume);
//   }
// );
watch(
  () => store.showmvstop,
  () => {
    if (store.showmvstop == true) {
      pause();
    }
  }
);

let audiobox = reactive([{}]);
audiobox = audiobox1.value; //歌曲列表
//0:一次性(默认) 1：顺序 2：循环 3：随机
let playModeInfo = ["序列", "循环", "单曲循环", "随机"];
const changePlayMode = () => {
  store.playMode = (store.playMode + 1) % 4;
};
// 默认显示内容
let showName = ref("未知歌曲");
let showCover = ref(
  "https://assets.missevan.com/coversmini/202112/13/3b58840d0dda4f7bdecc6da73ee843c9231731.png"
);
let showSinger = ref("未知歌手");
// 消息提示
const musicmodemsg = (msg) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: "success",
  });
};

// 随机播放方法
const randdomPlayfn = () => {
  let i = audiobox.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [audiobox[j], audiobox[i]] = [audiobox[i], audiobox[j]];
  }
};

// 下一首
const nextMusic = () => {
  pause();
  if (++i > audiobox.length - 1) {
    i = 0;
  }
  let song = audiobox[i];
  audio.value.src = song.url;
  showName.value = song.musicname;
  showSinger.value = song.singer;
  showCover.value = song.cover;
  // if (store.playMode == 3) {
  //   console.log(store.playMode);
  //   randdomPlayfn();
  // }
  audioplay();
};
const nextMusicpd = () => {
  if (store.playMode == 1) {
    nextMusic();
  } else if (store.playMode == 3) {
    pause();
    randdomPlayfn();
    if (i != 0) i = 0;
    audio.value.src = audiobox[i].url;
    showName.value = audiobox[i].musicname;
    showSinger.value = audiobox[i].singer;
    showCover.value = audiobox[i].cover;
    audioplay();
  } else {
    nextMusic();
  }

  // console.log('正在播放第' + (i + 1) + '首');
};
// 上一首
const lastMusic = () => {
  pause();
  i > 0 ? --i : (i = audiobox.length - 1);
  audio.value.src = audiobox[i].url;
  showName.value = audiobox[i].musicname;
  showSinger.value = audiobox[i].singer;
  showCover.value = audiobox[i].cover;
  audioplay();
  // console.log('正在播放第' + (i + 1) + '首');
};

const lastMusicpd = () => {
  if (store.playMode == 1) {
    lastMusic();
  } else if (store.playMode == 3) {
    pause();
    randdomPlayfn();
    if (i != 0) i = 0;
    audio.value.src = audiobox[i].url;
    showName.value = audiobox[i].musicname;
    showSinger.value = audiobox[i].singer;
    showCover.value = audiobox[i].cover;
    audioplay();
  } else {
    lastMusic();
  }
};

const chancurren = () => {
  //改变进度
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
const getCurr = () => {
  // currentTime 当前时间
  MusiccurrentTime.value = parseInt(audio.value.currentTime);
  // console.log(MusiccurrentTime.value);
  progress.value = (MusiccurrentTime.value / Musicduration.value) * 100;
  if (MusiccurrentTime.value == Musicduration.value) {
    switch (store.playMode) {
      //0:一次性(默认) 1：顺序 2：循环 3：随机
      case 0:
        pause();
        return (aplayer.value = playermusic);
      case 1:
        nextMusic();
        break;
      case 2:
        audioplay();
        break;
      case 3:
        pause();
        randdomPlayfn();
        if (i != 0) i = 0;
        audio.value.src = audiobox[i].url;
        showName.value = audiobox[i].musicname;
        showSinger.value = audiobox[i].singer;
        showCover.value = audiobox[i].cover;
        audioplay();
        // console.log(audiobox[i]);
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
// status 状态
// 播放或者暂停

const startPlayOrpause = () => {
  playing ? pause() : audioplay();
  playing ? (aplayer.value = playermusic) : (aplayer.value = pausemusic);

  // console.log(audio.value);

  // console.log(audiobox);
};
// 播放
const audioplay = () => {
  audio.value.play();
  return (aplayer.value = pausemusic);
};
// 暂停
const pause = () => {
  audio.value.pause();
  return (aplayer.value = playermusic);
};
//是否暂停状态
const onPause = () => {
  playing = false;
};
//是否播放状态
const onPlay = () => {
  playing = true;
};
const MusicList7 = () => {
  router.push({ name: "Listofcurrentsongs" });
};
</script>
<style lang="scss">
.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
}

.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
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
  // display: none;
  width: 10px;
  height: 10px;
  top: -140%;
}
.el-slider__button-wrapper .el-tooltip__trigger {
  width: 10px;
  height: 10px;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
.el-slider__button-wrapper.hover,
.el-slider__button-wrapper:hover {
  cursor: pointer;
}
.el-slider__button-wrapper.hover,
.el-slider__button-wrapper:hover {
  cursor: pointer;
}
.el-slider__button.hover,
.el-slider__button:hover {
  cursor: pointer;
}
.playerbox {
  // display: flex;
  flex-direction: row;
  padding: 15px 10px 5px 10px;
  // align-items: center;
  // justify-content: center;
  border-top: 1px solid var(--border-color);
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
a {
  cursor: pointer;
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
    width: 80px;
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
  a {
    padding: 8px;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 15px;
    transition: 0.3s;
  }
}
</style>
