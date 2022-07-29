<template>
    <div class="container">
        <div class="img"><img src="@/assets/img/topSongs.png" alt="" /></div>
        <div class="content">
            <span class="title">热门50曲</span>
            <play class="icon" theme="outline" size="20" fill="#7e7e7e" />
            <folder-focus-one
                class="icon"
                theme="outline"
                size="20"
                fill="#7e7e7e" />
            <ul>
                <li
                    v-for="(itme, index) in props.data"
                    v-show="index < 10 || showMore"
                    :key="itme.id">
                    <span>{{
                        index + 1 < 10 ? `0${index + 1}` : index + 1
                    }}</span>
                    <like
                        class="icon"
                        theme="outline"
                        size="18"
                        fill="#c9c9c9" />
                    <download
                        class="icon"
                        theme="outline"
                        size="18"
                        fill="#c9c9c9" />
                    <span class="name">{{ itme.name }}</span>
                    <span class="time">{{ toTime(itme.dt) }}</span>
                </li>
                <li v-if="!showMore">
                    <span @click="showMore = true" class="more">
                        查看全部50首
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { Like, Download, Play, FolderFocusOne } from '@icon-park/vue-next';
const props = defineProps(['data','album']);
let showMore = $ref(false);
//秒数转化为mm:ss形式
const toTime = (sec) => {
    sec = Math.ceil(sec / 1000);
    let s = sec % 60 < 10 ? '0' + (sec % 60) : sec % 60;
    let min =
        Math.floor(sec / 60) < 10
            ? '0' + Math.floor(sec / 60)
            : Math.floor(sec / 60);
    if (!isNaN(s)) {
        return min + ':' + s;
    } else {
        return '00' + ':' + '00';
    }
};
</script>

<style scoped lang="scss">
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.container {
    display: flex;
    margin-bottom: 50px;
    .img {
        width: 225px;
        height: 225px;
        img {
            width: 175px;
            height: 175px;
        }
    }
    .content {
        width: calc(100% - 225px);
        .title {
            font-weight: 800;
            font-size: 18px;
        }
        .icon {
            margin-left: 20px;
        }
        ul {
            list-style: none;
            width: 100%;
            font-size: 14px;
            color: #c9c9c9;
            li {
                height: 30px;
                line-height: 30px;
                display: block;
                &:nth-child(2n + 1) {
                    background: #fafafa;
                }
                .name {
                    color: #333;
                    margin-left: 10px;
                }
                .time {
                    // text-align: center;
                    float: right;
                }
            }
            .more {
                float: right;
                color: #b3b3b3;
                cursor: pointer;
                &:hover {
                    color: #333;
                }
            }
        }
    }
}
</style>
