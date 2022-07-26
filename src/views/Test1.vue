<template>
	<div>
		<h1>Test1</h1>
		<!-- 抽屉（歌曲详细） -->
		<!-- 	<el-drawer
				v-model="songDetailsDrawer"
				title="I am the title"
				:with-header="false"
				:direction="songDetailsDrawerDirection"
				:append-to-body="isToBody"
				:custom-class="frostedGlass"
				:modal="false"
			>
				<!~~ 收起抽屉 ~~>
				<button class="packUp" @click="songDetailsDrawer = false">
					<el-icon><ArrowDownBold /></el-icon>
				</button>
				<!~~ 歌曲详细 ~~>
				<div class="songDetails" v-if="songUrl">
					<!~~ 歌曲信息 ~~>
					<div class="songInfo">
						<!~~ 唱片部分 ~~>
						<div class="disc">
							<!~~ 指针 ~~>
							<div class="needle" :class="{ needle: true, crush: playState }">
								<img src="./images/needle.png" alt="" />
							</div>
							<!~~ 磁盘 ~~>
							<div
								class="disk"
								:class="{ disk: true, start: playState, stop: !playState }"
							>
								<!~~ 外圈 ~~>
								<div class="outer"><img src="./images/disc.png" alt="" /></div>
								<!~~ 内圈 ~~>
								<div class="inner">
									<img :src="songInfo.al.picUrl" alt="" />
								</div>
							</div>
						</div>
						<!~~ 歌曲信息 ~~>
						<div class="songDetails">
							<!~~ 标题信息 ~~>
							<div class="title">
								<div class="name">{{ songInfo.name }}</div>
								<div
									class="collection"
									@click="toCollectionDetails(songInfo.al.id)"
								>
									{{ songInfo.al.name }}
								</div>
								<div class="singers">
									<span
										class="singerName"
										@click="toSingerDetails(songInfo.ar[0].id)"
										>{{ songInfo.ar[0].name }}</span
									>
									<span v-for="(a, index) in songInfo.ar.slice(1)" :key="index">
										/
										<span class="singerName" @click="toSingerDetails(a.id)">{{
											a.name
										}}</span></span
									>
								</div>
							</div>
							<!~~ 歌词信息 ~~>
							<div class="lyrics" ref="lyricDom">
								<!~~ 占位留白 ~~>
								<div class="placeholder"></div>
								<!~~ 歌词内容 ~~>
								<div
									v-show="lyricsContent.length"
									:class="{
										word: true,
										currentLyric: currenLyricIndex === index,
									}"
									v-for="(l, index) in lyricsContent"
									:key="index"
								>
									{{ l }}
								</div>
								<!~~ 歌曲未获取到时展示 ~~>
								<div class="word" v-show="!lyricsContent.length">
									歌词获取中，请稍后...
								</div>
							</div>
						</div>
					</div>
					<!~~ 歌曲评论 ~~>
					<div class="songComments">
						<!~~ 热门评论 ~~>
						<div class="hotComments" v-if="songComments.hotComments">
							<!~~ 标题 ~~>
							<div class="title" v-if="songComments.hotComments.length">
								热门评论
							</div>
							<!~~ 详细 ~~>
							<div
								class="details"
								v-for="(h, index) in songComments.hotComments"
								:key="index"
							>
								<!~~ 头像 ~~>
								<div class="headerPhoto" @click="toUserDetails(h.user.userId)">
									<img :src="h.user.avatarUrl" alt="" />
								</div>
								<!~~ 内容 ~~>
								<div class="content">
									<!~~ 用户自己评论 ~~>
									<div class="user" @click="toUserDetails(h.user.userId)">
										<!~~ 用户名称 ~~>
										<div class="username">{{ h.user.nickname }}：</div>
										<!~~ 用户评论 ~~>
										<div class="userComment">{{ h.content }}</div>
									</div>
									<!~~ 用户艾特的评论 ~~>
									<div
										class="at"
										v-for="(r, index) in h.beReplied"
										:key="index"
									>
										<!~~ 艾特的名称 ~~>
										<div class="atName" @click="toUserDetails(r.user.userId)">
											@{{ r.user.nickname }}：
										</div>
										<!~~ 艾特的评论 ~~>
										<div class="atComment">{{ r.content }}</div>
									</div>
									<!~~ 其他内容 ~~>
									<div class="else">
										<!~~ 评论的时间 ~~>
										<div class="commentTime">{{ h.timeStr }}</div>
										<!~~ 操作 ~~>
										<div class="operate">
											<!~~ 点赞 ~~>
											<div class="like">
												<!~~ logo ~~>
												<i class="iconfont">&#xe613;</i>
												<!~~ 点赞的数量 ~~>
												<span class="amount">{{ h.likedCount }}</span>
											</div>
											<!~~ 分享 ~~>
											<div class="share">
												<i class="iconfont">&#xe60c;</i>
											</div>
											<!~~ 回复 ~~>
											<div class="reply">
												<i class="iconfont">&#xe618;</i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!~~ 最新评论 ~~>
					<!~~ 	<div class="newComments" v-if="songComments.comments">
							<!~~ 标题 ~~>
							<div class="title" v-if="songComments.comments.length">
								最新评论
							</div>
							<!~~ 详细 ~~>
							<div
								class="details"
								v-for="(c, index) in songComments.comments"
								:key="index"
							>
								<!~~ 头像 ~~>
								<div class="headerPhoto" @click="toUserDetails(c.user.userId)">
									<img :src="c.user.avatarUrl" alt="" />
								</div>
								<!~~ 内容 ~~>
								<div class="content">
									<!~~ 用户自己评论 ~~>
									<div class="user">
										<!~~ 用户名称 ~~>
										<div class="username" @click="toUserDetails(c.user.userId)">
											{{ c.user.nickname }}：
										</div>
										<!~~ 用户评论 ~~>
										<div class="userComment">{{ c.content }}</div>
									</div>
									<!~~ 用户艾特的评论 ~~>
									<div
										class="at"
										v-for="(r, index) in c.beReplied"
										:key="index"
									>
										<!~~ 艾特的名称 ~~>
										<div class="atName" @click="toUserDetails(r.user.userId)">
											@{{ r.user.nickname }}：
										</div>
										<!~~ 艾特的评论 ~~>
										<div class="atComment">{{ r.content }}</div>
									</div>
									<!~~ 其他内容 ~~>
									<div class="else">
										<!~~ 评论的时间 ~~>
										<div class="commentTime">{{ c.timeStr }}</div>
										<!~~ 操作 ~~>
										<div class="operate">
											<!~~ 点赞 ~~>
											<div class="like">
												<!~~ logo ~~>
												<i class="iconfont">&#xe613;</i>
												<!~~ 点赞的数量 ~~>
												<span class="amount">{{ c.likedCount }}</span>
											</div>
											<!~~ 分享 ~~>
											<div class="share">
												<i class="iconfont">&#xe60c;</i>
											</div>
											<!~~ 回复 ~~>
											<div class="reply">
												<i class="iconfont">&#xe618;</i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> ~~>
					</div>
					<!~~ 分页 ~~>
				<!~~ 	<div class="pagination">
						<el-pagination
							background
							layout="prev, pager, next"
							:current-page="commentPagination + 1"
							:total="commentPages * 10"
							@current-change="currentChangeComment"
						>
						</el-pagination>
					</div> ~~>
				</div>
				<!~~ 没有歌曲时展示 ~~>
				<div class="not" v-if="!songUrl">暂无歌曲</div>
				<!~~ 设置毛玻璃效果 ~~>
				<!~~ <button
					class="setFrostedGlass"
					@click="isFrostedGlass = !isFrostedGlass"
				>
					<i class="iconfont">&#xe663;</i>
				</button> ~~>
				<!~~ <el-backtop target=".el-drawer__body" :bottom="120"></el-backtop> ~~>
			</el-drawer> -->
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
