<template>
    <div class="main-container">
        <div class="main-header" style="--delay: 0s">发现音乐</div>
        <div class="main-blogs slider">
            <Slider />
        </div>
        <div class="small-header" style="--delay: 0.3s">推荐歌单 ></div>
        <div class="videos" ref="videos">
            <Video
                class="anim"
                v-for="p in data"
                :key="p.id"
                :playList="p"></Video>
        </div>
        <div v-if="data.length != 0" ref="bottom" class="bottom">
            <loading-one class="rotate" theme="outline" size="24" fill="#333" />
            数据加载中...
        </div>
    </div>
</template>

<script setup>
import Video from './Video.vue';
import Slider from './Slider.vue';
import { LoadingOne } from '@icon-park/vue-next';
import { getPersonalized } from '@/network/api';
import { useIntersectionObserver } from '@vueuse/core';
import { ref, } from 'vue';
const bottom = ref();
let data = $ref([]);
useIntersectionObserver(bottom, ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
        getPersonalized().then((res) => {
            data = [...data, ...res.result];
        });
    }
});
getPersonalized().then((res) => {
    data = res.result;
});
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}
.main-container {
    display: flex;
    flex-direction: column;
    padding: 0 30px 30px;
    flex-grow: 1;
    overflow: auto;
    margin-top: 30px;
    overflow: hidden;
}

.anim {
    animation: bottom 0.8s 0s both;
    overflow: hidden;
}
.bottom {
    margin-top: 20px;
    width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    overflow: hidden;
}
.main-header {
    font-size: 30px;
    color: #000;
    font-weight: 700;
    background: linear-gradient(
        to bottom,
        #fff,
        #e0e0e0,
        rgba($color: #e0e0e0, $alpha: 0.1)
    );
    backdrop-filter: 20px;
}

.small-header {
    font-size: 24px;
    font-weight: 500;
    color: #333;
    margin: 30px 0 20px;
}

.main {
    &-blogs {
        display: flex;
        align-items: center;
    }
    &-blog__author {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        &.tips {
            flex-direction: column-reverse;
            align-items: flex-start;
        }
    }
    &-blog__title {
        font-size: 25px;
        max-width: 12ch;
        font-weight: 600;
        letter-spacing: 1px;
        color: #fff;
        margin-bottom: 30px;
    }
    &-blog {
        // background-image: url("../assets/img/bg3.webp");
        background-repeat: no-repeat;
        background-size: 80%;
        background-position-x: 150px;
        background-color: #31abbd;
        display: flex;
        flex-direction: column;
        width: 65%;
        padding: 30px;
        border-radius: 20px;
        align-self: stretch;
        overflow: hidden;
        position: relative;
        transition: background 0.3s;
        & + & {
            margin-left: 20px;
            width: 35%;
            // background-image: url(https://c0.anyrgb.com/images/1020/945/venice-beach-2018-outdoors-sport-men-jumping-desert-sunset-extreme-sports-one-person-action.jpg);
            background-color: unset;
            background-position-x: 0;
            background-size: 139%;
            filter: saturate(1.4);
            .author-img {
                border-color: rgb(255 255 255 / 75%);
                margin-top: 14px;
            }
            .author-img__wrapper svg {
                border-color: #ffe6b2;
                color: #e7bb7d;
            }
            .author-detail {
                margin-left: 0;
            }
        }
        @media screen and (max-width: 905px) {
            &,
            & + .main-blog {
                width: 50%;
                padding: 30px;
            }
            & {
                background-size: cover;
                background-position-x: center;
                background-blend-mode: overlay;
            }
        }
        &__time {
            background: rgba(21, 13, 13, 0.44);
            color: #fff;
            padding: 3px 8px;
            font-size: 12px;
            border-radius: 6px;
            position: absolute;
            right: 20px;
            bottom: 20px;
        }
    }
}

//viedo.vue
.author {
    &-img {
        width: 52px;
        height: 52px;
        border: 1px solid rgb(255 255 255 / 75%);
        padding: 4px;
        border-radius: 50%;
        object-fit: cover;
        &__wrapper {
            position: relative;
            flex-shrink: 0;
            svg {
                width: 16px;
                padding: 2px;
                background-color: #fff;
                color: #0daabc;
                border-radius: 50%;
                border: 2px solid #0daabc;
                position: absolute;
                bottom: 5px;
                right: 0;
            }
        }
    }
    &-name {
        font-size: 15px;
        color: #fff;
        font-weight: 500;
        margin-bottom: 8px;
    }
    &-info {
        font-size: 13px;
        font-weight: 400;
        color: #fff;
    }
    &-detail {
        margin-left: 16px;
    }
}

.seperate {
    width: 3px;
    height: 3px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 6px;
    &.video-seperate {
        background-color: #808191;
    }
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
@keyframes bottom {
    0% {
        transform: translateY(100px);
        opacity: 0;
    }

    100% {
        opacity: 1;
        transform: none;
    }
}
.videos {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    @media screen and (max-width: 1010px) {
        grid-template-columns: repeat(2, 1fr);
    }
}
//video.vue
.video {
    position: relative;
    background-color: #252936;
    border-radius: 20px;
    overflow: hidden;
    transition: 0.4s;
    &-wrapper {
        position: relative;
    }
    &-name {
        color: #fff;
        font-size: 16px;
        line-height: 1.4em;
        padding: 12px 20px 0;
        overflow: hidden;
        background-color: #252936;
        z-index: 9;
        position: relative;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    &-view {
        font-size: 12px;
        padding: 12px 20px 20px;
        background-color: #252936;
        position: relative;
    }
    &-by {
        transition: 0.3s;
        padding: 20px 20px 0px;
        display: inline-flex;
        position: relative;
        &:before {
            content: '';
            background-color: #22b07d;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            position: absolute;
            top: 26px;
            right: 5px;
        }
        &.offline:before {
            background-color: #ff7551;
        }
    }
    &-time {
        position: absolute;
        background: rgba(21, 13, 13, 0.44);
        color: rgb(255 255 255 / 85%);
        padding: 3px 8px;
        font-size: 12px;
        border-radius: 6px;
        top: 10px;
        z-index: 1;
        right: 8px;
    }
    &:hover {
        video {
            transform: scale(1.6);
            transform-origin: center;
        }
        .video-time {
            display: none;
        }
        .video-author {
            bottom: -65px;
            transform: scale(0.6);
            right: -3px;
            z-index: 10;
        }
        .video-by {
            opacity: 0;
        }
    }
    &-author {
        position: absolute;
        right: 10px;
        transition: 0.4s;
        bottom: -25px;
        svg {
            background-color: #0aa0f7;
            color: #fff;
            border-color: #252936;
        }
    }
}

video {
    max-width: 100%;
    width: 100%;
    border-radius: 20px 20px 0 0;
    display: block;
    cursor: pointer;
    transition: 0.4s;
}
.slider {
    width: 100%;
    .main-blogs {
        flex-wrap: wrap;
    }
}
@media screen and (max-width: 750px) {
    .main-blogs {
        flex-wrap: wrap;
    }
    .videos {
        grid-template-columns: 1fr;
    }
}

@media screen and (max-width: 475px) {
    .main-container {
        padding: 0 20px 20px;
    }
}
</style>
