import { defineStore } from "pinia";

export const useStore = defineStore('stroe', {
    state: () => {
        return {
            cookie: `MUSIC_A_T=1603118622111; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/neapi/clientlog; HTTPOnly;__csrf=bdb8b704cccec0bc07e3be21d0034b71; Max-Age=1296010; Expires=Wed, 27 Jul 2022 07:21:03 GMT; Path=/;;MUSIC_R_T=1603187956730; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1603118622111; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_R_T=1603187956730; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_A_T=1603118622111; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_A_T=1603118622111; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_A_T=1603118622111; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1603118622111; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1603187956730; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1603187956730; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_R_T=1603187956730; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/api/feedback; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Tue, 12 Jul 2022 07:20:53 GMT; Path=/;MUSIC_A_T=1603118622111; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1603187956730; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_U=dba9a0bb50fb0ed3d8943e91315387b04b22aa11029e6760c88057f69d2475d1993166e004087dd39b5590e238ae5ae119c0cf07ab0822170ea5cbc62c9091b9775c47cc83a0ca07d4dbf082a8813684; Max-Age=15552000; Expires=Sun, 08 Jan 2023 07:20:53 GMT; Path=/; HTTPOnly;MUSIC_A_T=1603118622111; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1603187956730; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1603118622111; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_A_T=1603118622111; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/wapi/clientlog; HTTPOnly;NMTID=00OX_ripiDA7r79R0gSlXcoYOcz5y8AAAGB8UhAbg; Max-Age=315360000; Expires=Fri, 09 Jul 2032 07:20:53 GMT; Path=/;;MUSIC_R_T=1603187956730; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_R_T=1603187956730; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_A_T=1603118622111; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1603187956730; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1603187956730; Max-Age=2147483647; Expires=Sun, 30 Jul 2090 10:35:00 GMT; Path=/weapi/feedback; HTTPOnly`,
            searchHistory: [],//搜索历史
            isLogin: false,//是否展示登录界面
            isSerach: false,//是否展开搜索框
            userInfo: {
                nickname: "未登录",
                avatarUrl: "https://tse4-mm.cn.bing.net/th/id/OIP-C.N4AAf7UkO4lMNl7Kj_yo2gAAAA?w=176&h=178&c=7&r=0&o=5&dpr=1.5&pid=1.7"
            },//用户信息
            playList: [],//播放列表
            playNumber: 0,//播放的是第几首歌曲
            playmvstop: false,
            volumes: 70,//音量
            playMode: 0,//列表播放类型 0：顺序 1：循环 2：随机
            isPlayList: false,//是否展示播放列表
            serachInfo: "",//搜索信息
        }
    },
    getters: {
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