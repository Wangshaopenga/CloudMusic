import { request } from "./request";


export function searchMusic(data) {
    return request({
        url: `/search?keywords=${data}`,
        method: 'get'
    })
}