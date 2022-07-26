import { defineStore } from "pinia";
import { getSongDetail } from '@/network/api.js'
export const useStore = defineStore('stroe', {
    state: () => {
        return {
            cookie: "", //cookie
            searchHistory: [],//搜索历史
            isLogin: false,//是否展示登录界面
            isSearch: false,//是否展开搜索框
            userInfo: {
                nickname: "未登录",
                avatarUrl: "https://tse4-mm.cn.bing.net/th/id/OIP-C.N4AAf7UkO4lMNl7Kj_yo2gAAAA?w=176&h=178&c=7&r=0&o=5&dpr=1.5&pid=1.7"
            },//用户信息
            playList: [],//播放列表
            playNumber: 0,//播放的是第几首歌曲
            volumes: 70,//音量
            playMode: 0,//列表播放类型 0：顺序 1：循环 2：随机
            isPlayList: false,//是否展示播放列表
            searchInfo: "",//搜索信息
        }
    },
    getters: {
    },
    actions: {
    },
    persist: {
        enabled: true, // 开启数据缓存
        strategies: [
            {
                key: 'myuser',
                storage: localStorage // 默认是sessionStorage
            }
        ],
    }
})