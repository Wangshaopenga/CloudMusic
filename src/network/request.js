import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: 'https://cloud-music-api-ivory.vercel.app',
        timeout: 30000
    })
    instance.interceptors.request.use(config => {
        if (config.method == 'post') {
            config.data = {
                ...config.data,
                timerstamp: Date.parse(new Date())
            }
        } else if (config.method == 'get') {
            config.params = {
                timerstamp: Date.parse(new Date()),
                ...config.params
            }
        }

        return config;
    }, err => { })
    instance.interceptors.response.use(res => {
        return res.data ? res.data : res;
    }, err => {
        //有问题显示问题
        console.log(err.response.data);
    })

    return instance(config)
}