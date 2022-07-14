<template>
    <div class="video anim" :style="[bgImage]" style="--delay: 0.5s">
        <!-- 时间 -->
        <div class="video-count">歌曲数量:{{ props.playList.trackCount }}</div>
        <div class="video-wrapper">
            <div class="div"></div>
            <!-- 头像 -->
            <div class="author-img__wrapper video-author">
                <img class="author-img" src="../../assets/img/play.png" />
            </div>
        </div>
        <div class="video-by offline">&nbsp;</div>
        <div class="video-name">{{ props.playList.name }}</div>
        <!-- <div class="video-view">
            42K views<span class="seperate video-seperate"></span>1 week ago
        </div> -->
    </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps(["playList"]);
const bgImage = computed(() => {
    return {
        backgroundImage: `url('${props.playList.picUrl}')`,
    };
});
</script>

<style lang="scss" scoped>
.author {
    &-img {
        width: 26px;
        height: 26px;
        border: 1px solid rgb(255 255 255 / 75%);
        padding: 4px;
        border-radius: 50%;
        object-fit: cover;
        &__wrapper {
            position: relative;
            flex-shrink: 0;
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
.anim {
    animation: bottom 0.8s 0s both;
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

//video.vue
.video {
    position: relative;
    // background-color: #252936;
    // background-color: #95a5a6;
    border-radius: 20px;
    overflow: hidden;
    transition: 0.4s;
    // background-image: url("https://p1.music.126.net/GBW-cJzq4GJaDgzoSoJhJw==/109951164101193645.jpg");
    background-position: center;
    background-size: cover;
    &-wrapper {
        position: relative;
    }
    &-name {
        color: #fff;
        font-size: 16px;
        line-height: 1.4em;
        padding: 12px 20px 0;
        overflow: hidden;
        // background-color: #252936;
        // background-color: #95a5a6;
        z-index: 9;
        position: relative;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    &-view {
        font-size: 12px;
        padding: 12px 20px 20px;
        // background-color: #252936;
        // background-color: #95a5a6;
        position: relative;
    }
    &-by {
        transition: 0.3s;
        padding: 20px 20px 0px;
        display: inline-flex;
        position: relative;
        &:before {
            content: "";
            background-color: #22b07d;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: absolute;
            top: 26px;
            right: 5px;
        }
        &.offline:before {
            background-color: #2ecc71;
        }
    }
    &-count {
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
        .video-count {
            display: none;
        }
        .video-author {
            bottom: -30px;
            transform: scale(1.3);
            right: 45px;
            z-index: 10;
        }
        .video-by {
            opacity: 0;
        }
    }
    &-author {
        position: absolute;
        right: 30px;
        transition: 0.4s;
        bottom: -45px;
        svg {
            background-color: #0aa0f7;
            color: #fff;
            border-color: #252936;
            // border-color: #95a5a6;
        }
    }
}
.div {
    height: 170px;
    cursor: pointer;
}
</style>