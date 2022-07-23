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
export function getSearchList() {
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

//获取用户播放记录
export function getPlayRecord(id) {
    return request({
        url:`/user/record?uid=${id}&type=1`
    })
}

//获取生成二维码需要的 key
export function getQrLoginKey() {
    return request({
        url: `/login/qr/key`,
    })
}
//生成登录二维码
export function createQr(key) {
    return request({
        url: `/login/qr/create?key=${key}&qrimg=true`,
        method: 'post'
    })
}

//获取二维码扫码状态 
//轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
export function checkQrStatus(key) {
    return request({
        url: `/login/qr/check?key=${key}`,
    })
}

//获取登陆状态
export function getLoginStatus(cookie) {
    return request({
        url: `/login/status?cookie=${cookie}`,
        method: 'post'
    })
}

//获取账号信息
export function getInfo(cookie) {
    return request({
        url: `/user/subcount?cookie=${cookie}`,
        method: 'post'
    })
}

//退出登录
export function logout(cookie) {
    return request({
        url: `/logout?cookie=${cookie}`,
        mthod: 'post'
    })
}
//搜索
export function search(data, page) {
    return request({
        url: `/search?keywords=${data}&limit=50&offset=${page}`,
    })
}

//获取音乐详细
export function getSongDetail(ids) {
    return request({
        url: `/song/detail?ids=${ids}`
    })
}

export function getUrl(id, cookie) {
    return request({
        url: `/song/url?id=${id}&cookie=${cookie}`
    })
}