import { request } from "./request";

export function search(data) {
    return request({
        url: `/search?keywords=${data}&limit=50`,
    })
}