<template>
	<div class="footerBar">
		<!-- 音频 -->
		<audio :src="songUrl" ref="music" @timeupdate="timeupdate"></audio>
		<!-- 左边 -->
		<div class="footerBar_left">
			<!-- 图片 -->
			<div
				class="cover"
				@click="info.songDetailsDrawer = !info.songDetailsDrawer"
			>
				<img
					v-if="JSON.stringify(info.songInfo) != '{}'"
					:src="info.songInfo.al.picUrl"
					alt=""
				/>
				<img
					v-if="JSON.stringify(info.songInfo) == '{}'"
					src="@/assets/img/loading.png"
					alt=""
				/>
			</div>
			<!-- 抽屉（歌曲详细） -->
			<el-drawer
				v-model="info.songDetailsDrawer"
				:with-header="false"
				direction="btt"
				:append-to-body="true"
				size="91%"
				:custom-class="frostedGlass"
				:modal="false"
				:z-index="0"
			>
				<!-- 收起抽屉 -->
				<button class="packUp" @click="info.songDetailsDrawer = false">
					<el-icon><ArrowDownBold /></el-icon>
				</button>
				<!-- 歌曲详细 -->
				<div class="songDetails" v-if="songUrl">
					<!-- 歌曲信息 -->
					<div class="songInfo">
						<!-- 唱片部分 -->
						<div class="disc">
							<!-- 指针 -->
							<div class="needle" :class="{ needle: true, crush: playState }">
								<img src="@/assets/img/needle.png" alt="" />
							</div>
							<!-- 磁盘 -->
							<div
								class="disk"
								:class="{ disk: true, start: playState, stop: !playState }"
							>
								<!-- 外圈 -->
								<div class="outer">
									<img src="@/assets/img/disc.png" alt="" />
								</div>
								<!-- 内圈 -->
								<div class="inner">
									<img :src="info.songInfo.al.picUrl" alt="" />
								</div>
							</div>
						</div>
						<!-- 歌曲信息 -->
						<div class="songDetails">
							<!-- 标题信息 -->
							<div class="title">
								<div class="name">{{ info.songInfo.name }}</div>
								<div
									class="collection"
									@click="toCollectionDetails(info.songInfo.al.id)"
								>
									{{ info.songInfo.al.name }}
								</div>
								<div class="singers">
									<span
										class="singerName"
										@click="toSingerDetails(info.songInfo.ar[0].id)"
										>{{ info.songInfo.ar[0].name }}</span
									>
									<span
										v-for="(a, index) in info.songInfo.ar.slice(1)"
										:key="index"
									>
										/
										<span class="singerName" @click="toSingerDetails(a.id)">{{
											a.name
										}}</span></span
									>
								</div>
							</div>
							<!-- 歌词信息 -->
							<div class="lyrics" ref="lyricDom">
								<!-- 占位留白 -->
								<div class="placeholder"></div>
								<!-- 歌词内容 -->
								<div
									v-show="info.lyricsContent.length"
									:class="{
										word: true,
										currentLyric: info.currenLyricIndex === index,
									}"
									v-for="(l, index) in info.lyricsContent"
									:key="index"
								>
									{{ l }}
								</div>
								<!-- 歌曲未获取到时展示 -->
								<div class="word" v-show="!info.lyricsContent.length">
									歌词获取中，请稍后...
								</div>
							</div>
						</div>
					</div>
					<!-- 歌曲评论 -->
					<div class="songComments">
						<!-- 热门评论 -->
						<div class="hotComments" v-if="info.songComments.hotComments">
							<!-- 标题 -->
							<div class="title" v-if="info.songComments.hotComments.length">
								热门评论
							</div>
							<!-- 详细 -->
							<div
								class="details"
								v-for="(h, index) in info.songComments.hotComments"
								:key="index"
							>
								<!-- 头像 -->
								<div class="headerPhoto" @click="toUserDetails(h.user.userId)">
									<img :src="h.user.avatarUrl" alt="" />
								</div>
								<!-- 内容 -->
								<div class="content">
									<!-- 用户自己评论 -->
									<div class="user" @click="toUserDetails(h.user.userId)">
										<!-- 用户名称 -->
										<div class="username">{{ h.user.nickname }}：</div>
										<!-- 用户评论 -->
										<div class="userComment">{{ h.content }}</div>
									</div>
									<!-- 用户艾特的评论 -->
									<div
										class="at"
										v-for="(r, index) in h.beReplied"
										:key="index"
									>
										<!-- 艾特的名称 -->
										<div class="atName" @click="toUserDetails(r.user.userId)">
											@{{ r.user.nickname }}：
										</div>
										<!-- 艾特的评论 -->
										<div class="atComment">{{ r.content }}</div>
									</div>
									<!-- 其他内容 -->
									<div class="else">
										<!-- 评论的时间 -->
										<div class="commentTime">{{ h.timeStr }}</div>
										<!-- 操作 -->
										<div class="operate">
											<!-- 点赞 -->
											<div class="like">
												<!-- logo -->
												<i class="iconfont">&#xe613;</i>
												<!-- 点赞的数量 -->
												<span class="amount">{{ h.likedCount }}</span>
											</div>
											<!-- 分享 -->
											<div class="share">
												<i class="iconfont">&#xe60c;</i>
											</div>
											<!-- 回复 -->
											<div class="reply">
												<i class="iconfont">&#xe618;</i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- 最新评论 -->
						<div class="newComments" v-if="info.songComments.comments">
							<!-- 标题 -->
							<div class="title" v-if="info.songComments.comments.length">
								最新评论
							</div>
							<!-- 详细 -->
							<div
								class="details"
								v-for="(c, index) in info.songComments.comments"
								:key="index"
							>
								<!-- 头像 -->
								<div class="headerPhoto" @click="toUserDetails(c.user.userId)">
									<img :src="c.user.avatarUrl" alt="" />
								</div>
								<!-- 内容 -->
								<div class="content">
									<!-- 用户自己评论 -->
									<div class="user">
										<!-- 用户名称 -->
										<div class="username" @click="toUserDetails(c.user.userId)">
											{{ c.user.nickname }}：
										</div>
										<!-- 用户评论 -->
										<div class="userComment">{{ c.content }}</div>
									</div>
									<!-- 用户艾特的评论 -->
									<div
										class="at"
										v-for="(r, index) in c.beReplied"
										:key="index"
									>
										<!-- 艾特的名称 -->
										<div class="atName" @click="toUserDetails(r.user.userId)">
											@{{ r.user.nickname }}：
										</div>
										<!-- 艾特的评论 -->
										<div class="atComment">{{ r.content }}</div>
									</div>
									<!-- 其他内容 -->
									<div class="else">
										<!-- 评论的时间 -->
										<div class="commentTime">{{ c.timeStr }}</div>
										<!-- 操作 -->
										<div class="operate">
											<!-- 点赞 -->
											<div class="like">
												<!-- logo -->
												<i class="iconfont">&#xe613;</i>
												<!-- 点赞的数量 -->
												<span class="amount">{{ c.likedCount }}</span>
											</div>
											<!-- 分享 -->
											<div class="share">
												<i class="iconfont">&#xe60c;</i>
											</div>
											<!-- 回复 -->
											<div class="reply">
												<i class="iconfont">&#xe618;</i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 分页 -->
					<div class="pagination">
						<el-pagination
							background
							layout="prev, pager, next"
							:current-page="info.commentPagination + 1"
							:total="info.commentPages * 10"
							@current-change="currentChangeComment"
						>
						</el-pagination>
					</div>
				</div>
				<!-- 没有歌曲时展示 -->
				<div class="not" v-if="!songUrl">暂无歌曲</div>
				<!-- 设置毛玻璃效果 -->
				<button
					class="setFrostedGlass"
					@click="info.isFrostedGlass = !info.isFrostedGlass"
				>
					<i class="iconfont">&#xe663;</i>
				</button>
				<el-backtop target=".el-drawer__body" :bottom="120"></el-backtop>
			</el-drawer>
			<!-- 歌曲信息 -->
			<div class="songInfo">
				<!-- 歌曲名称 -->
				<div class="name" v-if="JSON.stringify(info.songInfo) != '{}'">
					{{ info.songInfo.name }}
				</div>
				<!-- 歌手 -->
				<div class="singer" v-if="JSON.stringify(info.songInfo) != '{}'">
					<span
						class="couldSkip"
						@click="toSingerDetails(info.songInfo.ar[0].id)"
					>
						{{ info.songInfo.ar[0].name }}
					</span>
					<span v-for="(a, index) in info.songInfo.ar.slice(1)" :key="index">
						/
						<span class="couldSkip" @click="toSingerDetails(a.id)">{{
							a.name
						}}</span></span
					>
				</div>
				<!-- 没有歌曲时显示 -->
				<div v-if="JSON.stringify(info.songInfo) == '{}'" class="none">
					暂无歌曲
				</div>
			</div>
			<!-- 下载按钮 -->
			<div class="download iconfont">
				<download theme="outline" size="24" fill="#333" />
			</div>
		</div>
		<!-- 中间 -->
		<div class="footerBar_center">
			<!-- 控制台 -->
			<div class="control">
				<!-- 播放列表的播放方式 -->
				<div class="playType" @click="changeCirculationType">
					<i v-show="store.playMode === 0" class="iconfont">
						<img src="@/assets/img/aplayer/序列.svg" alt="" />
					</i>
					<i v-show="store.playMode === 1" class="iconfont">
						<img src="@/assets/img/aplayer/随机.svg" alt="" />
					</i>
					<i v-show="store.playMode === 2" class="iconfont">
						<img src="@/assets/img/aplayer/单曲循环.svg" alt="" />
					</i>
				</div>
				<!-- 切换到上一首 -->
				<div class="previous" @click="prev">
					<i class="iconfont">
						<img src="@/assets/img/aplayer/上一首.svg" alt="" />
					</i>
				</div>
				<!-- 播放或者暂停 -->
				<div class="isPlay" @click="changePlayState(!playState)">
					<i class="iconfont" v-show="!playState">
						<img src="@/assets/img/aplayer/暂停.svg" alt="" />
					</i>
					<i class="iconfont" v-show="playState">
						<img src="@/assets/img/aplayer/播放.svg" alt="" />
					</i>
				</div>
				<!-- 切换到下一首 -->
				<div class="next" @click="next">
					<i class="iconfont">
						<img src="@/assets/img/aplayer/下一首.svg" alt="" />
					</i>
				</div>
				<!-- 我喜欢 -->
				<div class="like">
					<i class="iconfont">
						<img src="@/assets/img/aplayer/like.svg" alt="" />
					</i>
				</div>
			</div>
			<!-- 进度条 -->
			<div class="schedule">
				<div class="currentTime">{{ info.currentTime }}</div>
				<el-slider
					v-model="info.currentDuration"
					:max="Math.ceil(info.songInfo.dt / 1000)"
					@change="changeMusicDuration"
					@click="clickSongSlider(info.currentDuration)"
					:show-tooltip="false"
				/>
				<div class="endTime">{{ info.endTime }}</div>
			</div>
		</div>
		<!-- 右边 -->
		<div class="footerBar_right">
			<!-- 音量控制 -->
			<div class="volume">
				<!-- 静音 -->
				<div class="mute" @click="changeMute">
					<i v-show="!info.isMute" class="iconfont">
						<img src="@/assets/img/aplayer/声音.svg" alt="" />
					</i>
					<i v-show="info.isMute" class="iconfont">
						<img src="@/assets/img/aplayer/静音.svg" alt="" />
					</i>
				</div>
				<el-slider
					v-model="store.volumes"
					@change="changeVolumeProgress"
					@click="clickVolumeSlider(store.volumes)"
					:max="info.maxVolume"
					:show-tooltip="false"
				></el-slider>
			</div>
			<!-- 播放列表 -->
			<div class="playlist" @click="info.playlistDrawer = !info.playlistDrawer">
				<i class="iconfont">
					<img src="@/assets/img/aplayer/列表.svg" alt="" />
				</i>
				<!-- 抽屉（播放列表） -->
				<el-drawer
					v-model="info.playlistDrawer"
					title="I am the title"
					:with-header="false"
					:append-to-body="true"
					:size="380"
				>
					<!-- 歌曲数量 -->
					<!-- <div class="amount">总{{ store.playList.length }}首</div> -->
					<div class="header">
						<span class="play">当前播放</span>
						<div>
							<div class="amount">总{{ store.playList.length }}首</div>
							<div>
								<span class="collect">
									<folder-focus-one theme="outline" size="20" fill="#333" />
									收藏全部
								</span>
								<span class="clear">清空列表</span>
							</div>
						</div>
					</div>
					<el-table
						:data="store.playList"
						style="width: 100%"
						size="mini"
						:show-header="false"
						:row-class-name="activeRowClass"
						@row-dblclick="dblclickInPlaylist"
						empty-text="暂无歌曲"
					>
						<el-table-column
							prop="name"
							width="180"
							label="音乐标题"
							align="left"
						>
						</el-table-column>
						<el-table-column
							prop="ar[0].name"
							width="90"
							label="歌手"
							align="left"
						>
							<template #default="scope">
								{{ scope.row.ar[0].name }}
								<span v-for="(a, index) in scope.row.ar.slice(1)" :key="index">
									/
									<span>{{ a.name }}</span>
								</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="dt"
							:formatter="Formatter"
							width="70"
							label="时长"
							align="center"
						>
						</el-table-column>
					</el-table>
				</el-drawer>
			</div>
		</div>
	</div>
</template>

<script setup>
// 引入接口 API
import { lyric, comment, getSongDetail, getUrl } from "@/network/api";
// 引入 composition API
import {
	reactive,
	computed,
	watch,
	nextTick,
	watchEffect,
	onMounted,
} from "vue";
import { Download, FolderFocusOne } from "@icon-park/vue-next";
//引入element-plus图标
import { ArrowDownBold } from "@element-plus/icons-vue";
import { useStore } from "@/store/user";
// 引入路由相关 API
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
// 定义变量 store 用来进行 vuex 相关操作
const store = useStore();
// 定义变量 router 用来进行路由操作、
const router = useRouter();
// 定义计算属性 playState 用来保存歌曲的播放状态（从vuex中获取）
let playState = $ref(false);
onMounted(() => {
	music.volume = store.volumes / 100;
	if (JSON.stringify(info.songInfo) == "{}" && store.playList.length != 0) {
		info.songInfo = store.playList[store.playNumber];
		getUrl(info.songInfo.id, store.cookie).then((res) => {
			songUrl = res.data[0].url;
		});
	}
});
watch(
	() => store.playNumber,
	() => {
		changePlayState(false);
		if (store.playList.length != 0) {
			info.songInfo = store.playList[store.playNumber];
			getUrl(info.songInfo.id, store.cookie).then((res) => {
				songUrl = res.data[0].url;
				changePlayState(true);
			});
		}
	}
);
// 定义计算属性 frostedGlass 用来保存是否设置毛玻璃效果
const frostedGlass = computed(() => {
	if (info.isFrostedGlass) {
		return "frostedGlass";
	}
});
const f = () => {
	console.log(123);
};
//播放器
let music = $ref("");
//歌曲URL
let songUrl = $ref("");
// 定义变量 info 用来保存当前组件的响应式数据
const info = reactive({
	//歌曲信息
	songInfo: {},
	// 歌曲当前播放的时间
	currentTime: "00:00",
	// 歌曲当前播放的时长
	currentDuration: 0,
	// 歌曲音量的最大值
	maxVolume: 100,
	// 保存旧的音量值（点击静音键时保存）
	oldVolume: 100,
	// 音频是否处于静音状态
	isMute: false,
	// 播放列表的抽屉开启状态
	playlistDrawer: false,
	// 歌曲详细的抽屉开启状态
	songDetailsDrawer: false,
	// 是否设置毛玻璃效果
	isFrostedGlass: false,
	// 指向歌词的 DOM 元素
	lyricDom: "",
	// 每句歌词的播放时间
	lyricsTime: [],
	// 每句歌词的内容
	lyricsContent: [],
	// 歌词是否可以自动滚动
	isAutoRoll: false,
	// 当前歌词的索引
	currenLyricIndex: 0,
	// 评论的页码
	commentPagination: 0,
	// 评论分页的总页数
	commentPages: 0,
	// 歌曲评论的内容
	songComments: [],
	// 歌曲结束的时间
	endTime: computed(() => {
		return toTime(Math.ceil(info.songInfo.dt / 1000)) || "00:00";
	}),
});
// 定义获取歌曲歌词的方法
const getLyric = async () => {
	// 需要重新获取歌词数据时，将歌词的自动滚动状态设置为 false
	info.isAutoRoll = false;
	if (info.songInfo) {
		let res = await lyric(info.songInfo.id);
		// 获取到的歌词数据是带有换行符的字符串
		let lyricsInfo = res.lrc.lyric;
		// 清空歌词数据
		info.lyricsTime = [];
		info.lyricsContent = [];
		// 根据换行符分离出每句歌词数据
		lyricsInfo.split("\n").filter((value) => {
			// 单句歌词数据保存了当前歌词的播放时间和歌词内容
			let alone = value;
			// 当歌词整体数据不为空串时，再进行时间和歌词内容的分离
			if (alone) {
				// 歌词时间放置在一对[]中，过滤分离
				alone.split("]").filter((value) => {
					// 过滤之后的数据包括时间和歌词，时间部分包含字符：[
					// 将时间部分和歌词部分分开进行处理
					if (!value.indexOf("[")) {
						// 时间部分

						// 去除时间部分的：[ 符号，和前后的空格
						let time = value.trim().slice(1);

						// 将时间部分转换为秒的形式

						// 获取时间的分
						let minute = time.slice(0, 2);
						// 获取时间的秒部分
						let second = time.slice(3);
						// 转换为时长
						let duration = minute * 60 + second * 1;
						// 添加到保存每句歌词时长的数组中
						info.lyricsTime.push(duration);
					} else {
						// 歌词部分
						// 判断歌词是否为空串，如果为空串则不添加到歌词内容的数组中，并删除歌词时长数组中的最后一个元素（该元素就是当前歌词的时间数据）
						if (value.trim() === "") {
							info.lyricsTime.pop();
						} else {
							// 不为空串，获取歌词，并将其添加到歌词内容的数组中
							let word = value.trim();
							info.lyricsContent.push(word);
						}
					}
				});
			}
		});
		// 获取到歌词数据后，将歌词自动滚动状态设置为 true
		info.isAutoRoll = true;
		// 获取到新的歌词数据之后，将当前歌词的索引设置为 0
		info.currenLyricIndex = 0;
		// 获取到新的歌词之后，让歌词和页面都回到顶部
		if (info.lyricDom) {
			info.lyricDom.scrollTop = 0;
			let body = document.querySelector(".el-drawer__body");
			roll(body, 0);
		}
	}
};
// 定义获取歌曲评论的方法
const getComments = async (flag) => {
	if (info.songInfo) {
		let res = await comment(info.songInfo.id, info.commentPagination * 20);
		// 更新评论的总页数
		info.commentPages = Math.ceil(res.total / 20);
		// 更新评论数据
		info.collectionComments = res;
		// 更新评论数据
		info.songComments = res;
		if (flag) {
			let body = document.querySelector(".el-drawer__body");
			roll(body, 485);
		}
	}
};
// 定义播放歌曲的方法
const playSong = () => {
	music.play();
};

// 定义暂停歌曲的方法
const pauseSong = () => {
	music.pause();
};

// 定义点击按钮控制歌曲播放或者暂停的方法
const changePlayState = (val) => {
	if (songUrl) {
		// 修改歌曲的播放状态
		playState = val;
	} else {
		ElMessage({
			message: "暂无可播放的歌曲",
			type: "warning",
			grouping: true,
		});
	}
};
//格式化播放列表时间
const Formatter = (row, column, cellValue, index) => {
	return toTime(Math.ceil(cellValue / 1000));
};
//秒数转化为mm:ss形式
const toTime = (sec) => {
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
};
// 监视播放状态
watch(
	() => playState,
	(newValue, oldValue) => {
		nextTick(() => {
			// 根据新的播放状态进行播放或暂停的操作
			newValue ? playSong() : pauseSong();
		});
	},
	{ deep: true }
);

// 定义拖动音频进度条的方法
const changeMusicDuration = (val) => {
	if (songUrl) {
		// 更改音频的时长
		music.currentTime = val;
		// 将当前歌词的索引重置为 0
		info.currenLyricIndex = 0;
	} else {
		ElMessage({
			message: "无可播放歌曲，无法进行操作",
			type: "warning",
			grouping: true,
		});
	}
};

// 定义点击音频进度条的方法
const clickSongSlider = (val) => {
	if (songUrl) {
		// 更改音频的时长
		music.currentTime = val;
		// 将当前歌词的索引重置为 0
		info.currenLyricIndex = 0;
	}
};

// 定义拖动音量进度条的方法
const changeVolumeProgress = (val) => {
	// 修改音量的值
	music.volume = store.volumes / 100;
	// 判断进度条的值是否为 0
	info.isMute = val ? false : true;
};

// 定义点击音量进度条的方法
const clickVolumeSlider = (val) => {
	// 修改音量的值
	music.volume = music.volume = store.volumes / 100;
	// 判断进度条的值是否为 0
	info.isMute = val ? false : true;
};

// 定义切换到下一首歌曲的方法
const next = () => {
	// 将之前歌曲的播放状态设置为暂停
	if (songUrl) {
		// 判断歌曲循环方式是否为随机播放
		if (store.playMode === 1) {
			random();
		} else {
			if (store.playList.length === 1) {
				ElMessage({
					message: "当前播放列表只有一首歌曲",
					type: "warning",
					grouping: true,
				});
				return;
			}
			// 切换歌曲
			store.playNumber = ++store.playNumber % store.playList.length;
		}
	} else {
		ElMessage({
			message: "暂无可播放的歌曲",
			type: "warning",
			grouping: true,
		});
	}
};

// 定义切换到上一首歌曲的方法
const prev = () => {
	if (songUrl) {
		if (store.playList.length === 1) {
			ElMessage({
				message: "当前播放列表只有一首歌曲",
				type: "warning",
				grouping: true,
			});
			return;
		}
		// 判断歌曲是否为播放列表中的第一首，如果是则将索引设为最后一首的索引，否则播放上一首
		if (store.playNumber === 0) {
			store.playNumber = store.playList.length - 1;
		} else {
			store.playNumber--;
		}
	} else {
		ElMessage({
			message: "暂无可播放的歌曲",
			type: "warning",
			grouping: true,
		});
	}
};

// 定义随机播放的方法
const random = () => {
	if (store.playList.length > 1) {
		let random;
		const randomFn = () => {
			random = Math.floor(Math.random() * store.playList.length);
			if (random !== store.playNumber) {
				// 将之前歌曲的播放状态设置为暂停
				changePlayState(false);
				store.playNumber = random;
			} else {
				randomFn();
			}
		};
		randomFn();
	} else {
		ElMessage({
			message: "当前歌曲已经是最后一首",
			type: "warning",
			grouping: true,
		});
	}
};

// 定义切换歌曲循环方式的方法
const changeCirculationType = () => {
	store.playMode = store.playMode < 2 ? ++store.playMode : 0;
};

// 定义当音频时长变化的方法
const timeupdate = (e) => {
	// 更新歌曲的当前播放时长
	info.currentDuration = e.target.currentTime;
	// 更新歌曲的当前播放时间（需要先转换为毫秒值）
	info.currentTime = millisecondToMinute(e.target.currentTime * 1000);

	// 根据歌曲播放时间的不断变化，为歌词设置自动滚动效果
	// 获取还未播放歌词的数组
	let lyricTimeArr = info.lyricsTime.slice(info.currenLyricIndex);

	// 获取歌词最后一句的时间
	let lastTime = info.lyricsTime[info.lyricsTime.length - 1];

	// 如果当前播放歌词时间大于当前歌曲的最后一句歌词时间，那么就定位在最后一句，否则通过for循环进行判断当前播放的歌曲是哪一句
	if (info.currentDuration >= lastTime) {
		info.currenLyricIndex = info.lyricsTime.length - 1;
	} else {
		// 利用for循环更改当前播放歌词的索引
		for (let i = 0; i < lyricTimeArr.length; i++) {
			if (
				info.currentDuration >= lyricTimeArr[i] &&
				info.currentDuration < lyricTimeArr[i + 1]
			) {
				info.currenLyricIndex += i;
			}
		}
	}
	// 判断如果当前歌曲的时长等于总时长，则将歌曲播放状态设置为暂停
	if (info.currentDuration && info.currentTime === info.endTime) {
		changePlayState(false);
	}

	// 判断歌曲是否为试听歌曲
	if (e.target.ended && info.currentTime < info.endTime) {
		ElMessage({
			message: "试听结束，如果要听完整版的歌曲，你懂的！！！",
			type: "warning",
			grouping: true,
		});
		next();
	}

	let currentTime = Math.ceil(e.target.currentTime);
	let duration = Math.ceil(info.songInfo.dt / 1000);

	// 当歌曲播放完毕后修改歌曲的播放状态，并根据歌曲的循环方式进行操作
	if (e.target.ended || currentTime === duration) {
		// 修改歌曲的播放状态
		changePlayState(!e.target.ended);
		if (store.playMode === 0) {
			// 顺序播放
			next();
		} else if (store.playMode === 1) {
			// 随机播放
			random();
		} else {
			// 将当前播放歌词的索引设置为 0
			info.currenLyricIndex = 0;
			// 单曲循环
			e.target.currentTime = 0;
			changePlayState(true);
		}
	}

	// 监视当前歌词索引的变化
	if (info.isAutoRoll && info.currenLyricIndex) {
		roll(info.lyricDom, (info.currenLyricIndex + 1) * 51);
	}
};

// 定义跳转到歌手详细页面的方法
const toSingerDetails = (id) => {
	info.songDetailsDrawer = false;
	router.push({
		name: "singerDetails",
		params: { id },
	});
};

// 定义跳转到专辑详细页面的方法
const toCollectionDetails = (id) => {
	info.songDetailsDrawer = false;
	router.push({
		name: "collectionDetails",
		params: { id },
	});
};

// 定义跳转到用户详细页面的方法
const toUserDetails = (id) => {
	info.songDetailsDrawer = false;
	router.push({
		name: "userDetails",
		params: {
			id,
		},
	});
};

// 定义点击静音按钮的方法
const changeMute = () => {
	// 设置静音状态
	info.isMute = !info.isMute;
	if (info.isMute) {
		// 将旧的音量值保存一份
		info.oldVolume = store.volumes;
		// 将音频音量设置为 0
		music.volume = 0;
		store.volumes = 0;
	} else {
		// 将音频音量设置为之前保存的值
		music.volume = info.oldVolume / 100;
		store.volumes = info.oldVolume;
	}
};

// 为当前播放歌曲在播放列表中添加选中的样式
const activeRowClass = ({ row, rowIndex }) => {
	if (rowIndex === store.playNumber) {
		return "active";
	}
};

// 双击播放列表中的歌曲进行播放
const dblclickInPlaylist = (row) => {
	// 关闭之前正在播放的歌曲
	changePlayState(false);
	for (let [index, val] of store.playList.entries()) {
		if (val.id == row.id) {
			store.playNumber == index
				? changePlayState(true)
				: (store.playNumber = index);
		}
	}
};

// 定义评论页码改变的方法
const currentChangeComment = (p) => {
	info.commentPagination = p - 1;
};

// 监视歌词 DOM 元素的状态
watchEffect(() => {
	if (info.lyricDom) {
		// 当歌词 DOM 元素被渲染出来之后，为其添加滚轮滚动事件

		// 定义变量 delay 用来保存延迟操作
		let delay;
		info.lyricDom.addEventListener("mousewheel", () => {
			// 如果 delay 已经绑定成延迟期了，那么就先关闭它
			if (delay) {
				clearTimeout(delay);
			}
			// 然后将歌词的自动滚动状态设置为 false
			info.isAutoRoll = false;
			// 设置延迟期，2秒之后再恢复歌词的自动滚动状态
			delay = setTimeout(() => {
				info.isAutoRoll = true;
			}, 2000);
		});
	}
});

// 监视当前播放歌曲信息的变化
watchEffect(() => {
	if (songUrl && info.songInfo.id) {
		// 获取歌词
		getLyric();
		// 获取评论
		getComments();
	}
});

// 监视评论页码的改变
watch(
	() => info.commentPagination,
	() => {
		// 获取专辑评论，并传递参数，表示需要进行滚动
		getComments("needRoll");
	},
	{ immediate: false }
);

// 将毫秒转换为分钟
const millisecondToMinute = (time) => {
	let duration = Math.floor(time / 1000);
	let minute = Math.floor(duration / 60);
	let second = Math.floor(duration % 60);
	time =
		minute < 10
			? second < 10
				? `0${minute}:0${second}`
				: `0${minute}:${second}`
			: second < 10
			? `${minute}:0${second}`
			: `${minute}:${second}`;
	return time;
};

// 将指定 DOM 元素滚动条滚动到指定位置（参数：DOM元素，目标位置，滚动方向（默认竖向滚动））
const roll = (el, target, direction) => {
	// 判断是否设置滚动方向，如果没有设置则默认为竖向滚动
	direction = direction ? direction : "scrollTop";
	// 设置滚动的总时长（单位：ms，毫秒）
	let duration = 500;
	// 设置滚动的间隔时间（单位：ms，毫秒）
	let time = 5;
	// 获取滚动的距离（当前位置 - 目标位置）
	let distance = el[direction] - target;
	// 获取滚动的速度
	let speed = distance / (duration / time);
	// 如果需要滚动的距离为 0，直接返回
	if (!distance) {
		return;
	}

	// 当滚动的距离不为 0时，创建定时器实现滚动
	let timer = setInterval(() => {
		//  设置滚动
		el[direction] -= speed;
		// 判断如果到达指定位置，则关闭定时器
		if (speed > 0 && el[direction] <= target) {
			clearInterval(timer);
		} else if (speed < 0 && el[direction] >= target) {
			clearInterval(timer);
		} else if (el.scrollHeight - el.scrollTop - el.clientHeight < 20) {
			// 设置当竖向滚动距离底部在某个范围时也关闭定时器
			clearInterval(timer);
		}
	}, time);
};
</script>

<style lang="scss" scoped>
.el-slider {
	--el-slider-button-size: 10px;
	--el-slider-button-wrapper-size: 20px;
	--el-slider-button-wrapper-offset: -10px;
	:deep(.el-slider__button-wrapper.hover, .el-slider__button-wrapper:hover) {
		cursor: pointer;
	}
	:deep(.el-slider__button.hover, .el-slider__button:hover) {
		cursor: pointer;
	}
}
.el-table {
	user-select: none;
	:deep(.active) {
		background: #f5f7fa;
	}
}
.footerBar {
	width: 100%;
	// height: 100%;
	background: #eee;
	height: 80px;
	display: flex;
	justify-content: space-between;
	cursor: default;
	.footerBar_left {
		display: flex;
		height: 100%;
		align-items: center;
		.cover {
			width: 60px;
			height: 100%;
			img {
				transform: translateY(16%);
				width: 60px;
				height: 60px;
				border-radius: 8px;
				cursor: pointer;
				margin-right: 20px;
			}
		}
		.songInfo {
			width: 90px;
			padding: 5px;
			box-sizing: border-box;
			.name,
			.singer {
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				margin: 3px 0;
			}
			.singer {
				font-size: 13px;
			}
			.couldSkip {
				cursor: pointer;
			}
		}
		.download {
			margin-left: 20px;
			margin-top: 15px;
			font-size: 18px;
			cursor: pointer;
		}
	}
	.footerBar_center {
		height: 100%;
		& > .control {
			display: flex;
			justify-content: space-between;
			padding: 0 120px;
			margin: 10px 0 0 0;
			box-sizing: border-box;
			i {
				// line-height: 28px;
				cursor: pointer;
			}
		}
		& > .schedule {
			display: flex;
			align-items: center;
			.el-slider {
				width: 380px;
			}
			.currentTime,
			.endTime {
				font-size: 13px;
				margin: 0 10px;
				color: #888;
			}
		}
	}
	.footerBar_right {
		height: 100%;
		display: flex;
		align-items: center;
		.volume {
			display: flex;
			margin-right: 40px;
			.mute {
				margin-right: 15px;
				i {
					color: #555;
					cursor: pointer;
				}
			}
			.el-slider {
				width: 60px;
			}
		}
		.playlist {
			margin-right: 10px;
			i {
				color: #555;
				cursor: pointer;
			}
		}
	}
}
@keyframes spin {
	from {
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
