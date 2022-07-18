import { request } from './request'

//获取轮播图数据
export function getSlider() {
    return request({
        url: '/banner?type=0'
    })
}

//获取推荐歌单  不需要登录
export function getPersonalized(limit = 16) {
    return request({
        url: `/personalized?limit=${limit}`
    })
}


//获取搜索列表
export function getsearch() {
    return request({
        url: '/search/hot/detail'
    })
}

//获取搜索默认关键词
export function getsearchDefaultKey() {
    return request({
        url: '/search/default'
    })
}