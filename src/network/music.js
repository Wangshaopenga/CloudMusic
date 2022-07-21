import { request } from "./request";

export function search(data) {
    return request({
        url: `/search?keywords=${data}&limit=50`,
    })
}

export function getSongDetail(ids) {
    return request({
        url:`/song/detail?ids=${ids}`
    })
}

export function getUrl(id, cookie) {
    return request({
        url: `/song/url?id=${id}&cookie=${cookie}`
    })
}