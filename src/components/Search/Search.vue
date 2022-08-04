<template>
    <div class="box">
        <div class="header">
            <h2>搜索 {{ route.query.key }}</h2>
        </div>
        <div
            class="content"
            v-loading="isLoading"
            element-loading-text="数据加载中,请稍后...">
            <div class="banner">
                <ul>
                    <li @click="type = 1" :class="{ active: type == 1 }">
                        单曲
                    </li>
                    <li @click="type = 100" :class="{ active: type == 100 }">
                        歌手
                    </li>
                </ul>
            </div>
            <div class="song" v-if="type == 1">
                <div class="info top">
                    <div class="index"></div>
                    <div class="name" style="color: #323232">音乐标题</div>
                    <div class="author">歌手</div>
                    <div class="album">专辑</div>
                    <div class="td">时长</div>
                </div>
                <div
                    class="info"
                    v-for="(itme, index) in songData"
                    :key="index"
                    @dblclick="addMusic(itme)">
                    <div class="info-index">{{ index + 1 }}</div>
                    <div class="info-name">
                        <like
                            class="info-like"
                            theme="outline"
                            size="20"
                            fill="#333" />
                        <span>{{ itme.name }}</span>
                        <span class="info-description">{{
                            itme.alias[0]
                        }}</span>
                    </div>
                    <div
                        class="info-author"
                        v-html="changeName(itme.artists)"></div>
                    <div class="info-album">{{ itme.album.name }}</div>
                    <div class="info-td">{{ time(itme.duration) }}</div>
                </div>
                <div v-if="songData.length != 0" class="page">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="50"
                        v-model:current-page="page"
                        @current-change="changePage">
                    </el-pagination>
                </div>
            </div>
            <div class="author" v-else-if="type == 100">
                <div
                    class="row"
                    @click="goSingerDetail(itme)"
                    v-for="itme in artists"
                    :key="itme.id">
                    <img
                        :src="itme.picUrl"
                        style="width: 80px; height: 80px"
                        alt="" />
                    <span>{{ itme.name }}</span>
                    <span
                        style="padding: 0; color: #aaa"
                        v-if="itme.alias.length != 0">
                        ({{ itme.alias[0] }})
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { FolderFocusOne, Like, User } from '@icon-park/vue-next';
import { computed, ref, watch } from 'vue';
import { useStore } from '@/store/user';
import { useRouter, useRoute } from 'vue-router';
import { getSongDetail, search } from '@/network/api';
const store = useStore();
const router = useRouter();
const route = useRoute();
let isLoading = $ref(true); //是否加载
let songData = $ref([]); //歌曲数据
let artists = $ref([]); //歌手数据
let type = $ref(1); //搜索类型
let page = $ref(1); //页数
let total = $ref(0); //数据总数  用于计算有多少页
const init = () => {
    search(route.query.key, page - 1).then((res) => {
        total = res.result.songCount;
        songData = res.result.songs;
        isLoading = false;
    });
    search(route.query.key, page - 1, 100).then((res) => {
        artists = res.result.artists;
    });
};
const goSingerDetail = (p) => {
    router.push({ name: 'singer', query: { id: p.id } });
};
watch(
    () => route.query.key,
    () => {
        if (
            !store.searchHistory.includes(route.query.key) &&
            !route.query.key
        ) {
            store.searchHistory.unshift(route.query.key);
        }
        if (route.query.key) {
            init();
        }
    }
);
if (songData.length == 0) {
    init();
}
//修改歌手名称格式
const changeName = (arr) => {
    return arr.reduce((value, itme, index) => {
        if (index != 0) {
            return (
                value + `/ <span style="cursor: pointer;">${itme.name}</span> `
            );
        } else {
            return (
                value + `<span style="cursor: pointer;">${itme.name}</span> `
            );
        }
    }, '');
};
//格式化时间
const time = (time) => {
    let s = '';
    time /= 1000;
    time = parseInt(time);
    s +=
        time / 60 < 10
            ? '0' + parseInt(time / 60) + ':'
            : parseInt(time / 60) + ':';
    s +=
        time - parseInt(time / 60) * 60 < 10
            ? '0' + (time - parseInt(time / 60) * 60)
            : time - parseInt(time / 60) * 60;
    return s;
};
//添加到播放列表
const addMusic = (itme) => {
    let flag = store.playList.some((val, index) => {
        if (itme.id == val.id) {
            store.playNumber = index;
            return true;
        } else {
            return false;
        }
    });
    if (!flag) {
        getSongDetail(itme.id).then((res) => {
            store.playList.push(res.songs[0]);
            store.playNumber = store.playList.length - 1;
        });
    }
};
const changePage = () => {
    isLoading = true;
    init();
};
const f = (itme) => {
    console.log(itme);
};
</script>

<style scoped lang="scss">
* {
    box-sizing: border-box;
}
.box {
    padding: 0 20px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // overflow: hidden;

    .content {
        .banner {
            ul {
                list-style: none;
                font-size: 18px;
                color: #666;
                li {
                    display: inline-block;
                    height: 30px;
                    cursor: pointer;
                    margin-right: 10px;
                    // background: red;
                    &::after {
                        content: '';
                        display: block;
                        // width: 35px;
                        height: 5px;
                        margin-top: 5px;
                        display: none;
                    }
                }
                .active {
                    font-weight: bold;
                    color: #000;
                    &::after {
                        content: '';
                        display: block;
                        // width: 35px;
                        height: 5px;
                        margin-top: 5px;
                        border-radius: 80px;
                        background: #ff7551;
                    }
                }
            }
        }
        .song {
            height: 540px;
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
                &-index {
                    width: 100%;
                    height: 40px;
                }
                &-name {
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
                    .info-like {
                        cursor: pointer;
                        transform: translate(-10px, 28%);
                    }
                    &-description {
                        height: 40px;
                        display: block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -o-text-overflow: ellipsis;
                        white-space: nowrap;
                        padding-left: 5px;
                    }
                }
                &-author {
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
                &-album {
                    height: 40px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    white-space: nowrap;
                    padding-left: 5px;
                    cursor: pointer;
                }
                &-td {
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
                display: flex;
                justify-content: center;
            }
        }
        .author {
            padding: 10px 30px;
            height: 540px;
            overflow-y: scroll;
            overflow-x: hidden;
            .row {
                width: 100%;
                padding: 10px;
                display: flex;
                align-items: center;
                cursor: pointer;
                // line-height: 124px;
                span {
                    padding: 10px;
                    font-size: 15px;
                }
                &:nth-child(2n) {
                    background-color: #fafafa;
                }
                &:hover {
                    background: #f1f2f3;
                }
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
