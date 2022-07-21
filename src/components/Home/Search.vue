<template>
	<div
		@blur="store.isSearch = false"
		@focus="store.isSearch = true"
		class="container"
		tabindex="0"
		outline="0"
		hidefocus="true"
	>
		<div class="search">
			<div class="search-history">
				<div class="history-head">
					<span class="text1"> 搜索历史 </span>
					<delete
						@click="delAllHistory"
						theme="outline"
						style="cursor: pointer"
						size="20"
						fill="#666"
					/>
				</div>
				<div class="history-body">
					<div
						class="info"
						v-for="(itme, index) in store.searchHistory"
						:key="index"
						@click="serach(itme)"
					>
						{{ itme }}
						<close-small
							class="close"
							theme="outline"
							size="15"
							fill="#666"
							@click="delSearchHistory(index)"
						/>
					</div>
				</div>
			</div>
			<div class="search-hot">
				<div class="hot">热搜榜</div>
				<ul>
					<li v-for="(itme, index) in data" :key="index">
						<div class="order">{{ index + 1 }}</div>
						<div class="song">
							<div class="name">
								{{ itme.searchWord }}
								<span class="number">{{ itme.score }}</span>
							</div>
							<p style="padding-right: 5px" class="description">
								{{ itme.content }}
							</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { getSearchList } from "@/network/home";
import { Delete, CloseSmall } from "@icon-park/vue-next";
import { useStore } from "@/store/user";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
let data = ref([]);
//删除某个搜索历史
const delSearchHistory = (index) => {
	store.searchHistory.splice(index, 1);
};
//删除全部搜索历史
const delAllHistory = () => {
	store.searchHistory = [];
};
getSearchList().then((res) => {
	data.value = res.data;
});
const serach = (itme) => {
	store.isSearch = false;
	router.push({ name: "serach", query: { key: itme } });
};
</script>

<style lang="scss" scoped>
.container {
	border: 1px solid rgba($color: #000000, $alpha: 0.1);
}
.search {
	width: 350px;
	height: 620px;
	overflow-y: scroll;
	overflow-x: hidden;
	background: #fff;
	&-history {
		position: relative;
		color: #777;
		top: 10px;
		padding: 0 30px;
		.history {
			&-head {
				.text1 {
					position: relative;
					font-size: 16px;
				}
				.text2 {
					position: absolute;
					right: 10px;
					top: 0;
					font-size: 12px;
				}
			}
			&-body {
				font-size: 14px;
				display: flex;
				height: 100%;
				flex-flow: wrap;
				margin-top: 10px;
				.info {
					color: #444;
					padding: 0 10px;
					text-align: center;
					line-height: 22px;
					display: block;
					height: 25px;
					border: 1px solid #888;
					border-radius: 15px;
					margin-right: 10px;
					margin-bottom: 10px;
					cursor: pointer;
					&:hover {
						& {
							background: #cecece;
						}
					}
				}
			}
		}
	}
	&-hot {
		position: relative;
		top: 15px;
		font-size: 15px;
		color: #666;
		.hot {
			margin-left: 10px;
		}
		ul {
			padding: 0;
			padding-top: 5px;
			list-style: none;
			font-size: 12px;
			li {
				width: 100%;
				box-sizing: border-box;
				height: 10%;
				margin-top: 5px;
				cursor: pointer;
				display: flex;
				.order {
					text-align: center;
					line-height: 58px;
					font-size: 16px;
					padding: 0 20px;
				}
				&:nth-child(-n + 3) {
					.order {
						color: #ff4646;
					}
				}
				.song {
					.name {
						font-weight: bold;
						font-size: 13px;
						.number {
							font-weight: normal;
							color: #ada8a8;
							margin-left: 5px;
						}
					}
				}
				&:hover {
					background-color: #cecece;
				}
			}
		}
	}
	&::-webkit-scrollbar {
		width: 0px;
	}
}
.close {
	position: relative;
	right: -10%;
	top: 5%;
	cursor: pointer;
	&:hover {
		fill: #000;
	}
}
</style>
