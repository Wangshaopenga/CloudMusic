<template>
    <div
        class="singerDetails"
        v-loading="isLoading"
        element-loading-text="数据加载中,请稍后...">
        <!-- 歌手介绍 -->
        <div class="singerIntroduce">
            <!-- 歌手封面图片 -->
            <div class="cover">
                <img v-if="singerInfo.picUrl" :src="singerInfo.picUrl" alt="" />
                <img v-else src="@/assets/img/loading.png" alt="" />
            </div>
            <!-- 歌手介绍 -->
            <div class="introduce">
                <!-- 歌手名称 -->
                <div class="name">{{ singerInfo.name }}</div>
                <!-- 操作 -->
                <div class="operate">
                    <!-- 收藏 -->
                    <div class="like">
                        <i class="iconfont">&#xe604;</i>
                        收藏
                    </div>
                    <!-- 个人主页 -->
                    <div class="home">
                        <i class="iconfont">&#xe606;</i>
                        个人主页
                    </div>
                </div>
                <!-- 作品介绍 -->
                <div class="worksIntroduce">
                    <span class="songsCount">
                        单曲数： {{ singerInfo.musicSize }}
                    </span>
                    <span class="collectionsCount">
                        专辑数： {{ singerInfo.albumSize }}
                    </span>
                    <span class="videoCount">
                        MV数: {{ singerInfo.mvSize }}
                    </span>
                </div>
            </div>
        </div>
        <!-- 歌手内容 -->
        <div class="singerContent">
            <!-- 标签栏分类展示 -->
            <div class="banner">
                <ul>
                    <li @click="type = 1" :class="{ active: type == 1 }">
                        专辑
                    </li>
                    <li @click="type = 1000" :class="{ active: type == 1000 }">
                        MV
                    </li>
                    <li @click="type = 100" :class="{ active: type == 100 }">
                        歌手详情
                    </li>
                </ul>
            </div>
            <div v-show="type == 1" class="album">
                <Album :data="hotSongs" />
                <Album v-for="itme in showAlbums" :key="itme" :album="itme" />
                <div v-if="hotSongs.length != 0" ref="bottom" class="bottom">
                    <loading-one
                        class="rotate"
                        theme="outline"
                        size="24"
                        fill="#333" />
                    数据加载中...
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Album from '@/components/Album.vue';
import {
    getHotSong,
    getSingerCollection,
    getCollectionDetail,
} from '@/network/api';
import { onMounted, ref, } from 'vue';
import { LoadingOne } from '@icon-park/vue-next';
import { useIntersectionObserver } from '@vueuse/core';
import { useRoute } from 'vue-router';
let type = $ref('1');
let hotSongs = $ref([]);
let albums = $ref([]);
let showAlbums = $ref([]);
let bottom = ref();
let count = $ref(3);
let singerInfo = $ref({});
let isLoading = $ref(true);
const route = useRoute();
onMounted(() => {
    init();
});
useIntersectionObserver(bottom, ([{ isIntersecting }], observerElement) => {
    if (isIntersecting && count < albums.length) {
        getCollectionDetail(albums[count++].id).then((res) => {
            showAlbums.push(res);
        });
    }
});
const init = () => {
    getHotSong(route.query.id).then((res) => {
        singerInfo = res.artist;
        console.log(singerInfo);
        hotSongs = res.hotSongs;
        getSingerCollection(route.query.id).then((res) => {
            getCollectionDetail(res.hotAlbums[0].id).then((res) => {
                showAlbums.push(res);
            });
            getCollectionDetail(res.hotAlbums[1].id).then((res) => {
                showAlbums.push(res);
            });
            getCollectionDetail(res.hotAlbums[2].id).then((res) => {
                showAlbums.push(res);
            });
            albums = res.hotAlbums;
            isLoading = false;
        });
    });
};
</script>

<style lang="scss" scoped>
.singerDetails {
    width: 100%;
    height: calc(100vh - 156px);
    overflow: auto;
    padding: 0 20px;
    box-sizing: border-box;
    cursor: default;
    .singerIntroduce {
        padding: 32px 18px;
        display: flex;
        .cover {
            margin-right: 20px;
            img {
                width: 200px;
                height: 200px;
                border-radius: 10px;
            }
        }
        .introduce {
            color: #666;
            .name {
                font-size: 25px;
                font-weight: bold;
                color: #000;
                margin: 15px 0;
            }
            .operate {
                display: flex;
                margin: 10px 0;
                .home,
                .like {
                    border: 1px solid #ddd;
                    padding: 8px 15px;
                    border-radius: 50px;
                    font-size: 14px;
                    margin-right: 10px;
                    cursor: pointer;
                    &:hover {
                        background-color: #f7f7f7;
                    }
                }
            }
            .worksIntroduce {
                margin-left: 30px;
                margin-top: 20px;
                font-size: 14px;
                span {
                    margin: 0 5px;
                }
            }
        }
    }
    .singerContent {
        margin-top: 20px;
        // padding: 0 18px;
        box-sizing: border-box;
        .banner {
            ul {
                list-style: none;
                font-size: 16px;
                color: #333;
                li {
                    display: inline-block;
                    height: 30px;
                    cursor: pointer;
                    margin-right: 20px;
                    // background: red;
                    &::after {
                        content: '';
                        display: block;
                        height: 5px;
                        margin-top: 5px;
                        display: none;
                    }
                }
                .active {
                    font-weight: bold;
                    color: #000;
                    font-size: 18px;
                    &::after {
                        content: '';
                        display: block;
                        height: 5px;
                        margin-top: 5px;
                        border-radius: 80px;
                        background: #ff7551;
                    }
                }
            }
        }
    }
}
.bottom {
    margin-top: 20px;
    width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    overflow: hidden;
}
.rotate {
    animation: rotate 2s linear infinite;
}
@keyframes rotate {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
