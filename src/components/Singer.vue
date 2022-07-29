<template>
    <div class="singerDetails">
        <!-- 歌手介绍 -->
        <div class="singerIntroduce">
            <!-- 歌手封面图片 -->
            <div class="cover">
                <!-- <img v-if="singerInfo.cover" :src="singerInfo.cover" alt="" /> -->
                <img src="@/assets/logo.png" alt="" />
            </div>
            <!-- 歌手介绍 -->
            <div class="introduce">
                <!-- 歌手名称 -->
                <div class="name">许嵩</div>
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
                    <span class="songsCount">单曲数： 123 </span>
                    <span class="collectionsCount">专辑数： 234 </span>
                    <span class="videoCount">MV数: 567 </span>
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
            <div class="album">
                <Album :data="hotSongs" />
            </div>
        </div>
        <!-- 回到顶部 -->
        <el-backtop target=".singerDetails" :bottom="120"></el-backtop>
    </div>
</template>

<script setup>
import Album from '@/components/Album.vue';
import { getHotSong, getSingerCollection } from '@/network/api';
import { getCollectionDetail } from '../network/api';
let type = $ref('1');
let hotSongs = $ref([]);
getHotSong(5771).then((res) => {
    hotSongs = res.hotSongs;
}); 
getSingerCollection(5771).then((res) => {
    console.log(res);
    getCollectionDetail(res.hotAlbums[2].id).then(re=>{
      console.log('re', re)
    })
});
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
                width: 187px;
                height: 187px;
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
</style>
