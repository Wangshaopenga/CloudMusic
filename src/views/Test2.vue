<template>
    <!-- 第二个页面 -->
    <div class="stream-area">
        <div class="video-stream">
            <video
                id="my_video_1"
                class="video-js vjs-default-skin anim"
                width="640px"
                height="267px"
                controls
                preload="none"
                poster="https://images.unsplash.com/photo-1476801071117-fbc157ae3f01?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8&w=1000&q=80"
                data-setup='{ "aspectRatio":"940:620", "playbackRates": [1, 1.5, 2] }'
            >
                <source
                    src="https://player.vimeo.com/external/390402719.sd.mp4?s=20cfdb066c4253047562b65bd4e411b86a004bc5&profile_id=139&oauth2_token_id=57447761"
                    type="video/mp4"
                />
                <source
                    src="https://player.vimeo.com/external/390402719.sd.mp4?s=20cfdb066c4253047562b65bd4e411b86a004bc5&profile_id=139&oauth2_token_id=57447761"
                    type="video/webm"
                />
            </video>
            <div class="video-detail">
                <div class="video-content">
                    <div class="video-p-wrapper anim" style="--delay: 0.1s">
                        <div class="author-img__wrapper video-author video-p">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-check"
                            >
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                            <img
                                class="author-img"
                                src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            />
                        </div>
                        <div class="video-p-detail">
                            <div class="video-p-name">Andy William</div>
                            <div class="video-p-sub">1,980,893 subscribers</div>
                        </div>
                        <div class="button-wrapper">
                            <button class="like">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21.435 2.582a1.933 1.933 0 00-1.93-.503L3.408 6.759a1.92 1.92 0 00-1.384 1.522c-.142.75.355 1.704 1.003 2.102l5.033 3.094a1.304 1.304 0 001.61-.194l5.763-5.799a.734.734 0 011.06 0c.29.292.29.765 0 1.067l-5.773 5.8c-.428.43-.508 1.1-.193 1.62l3.075 5.083c.36.604.98.946 1.66.946.08 0 .17 0 .251-.01.78-.1 1.4-.634 1.63-1.39l4.773-16.075c.21-.685.02-1.43-.48-1.943z"
                                    />
                                </svg>
                                Share
                            </button>
                            <button class="like red">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M15.85 2.5c.63 0 1.26.09 1.86.29 3.69 1.2 5.02 5.25 3.91 8.79a12.728 12.728 0 01-3.01 4.81 38.456 38.456 0 01-6.33 4.96l-.25.15-.26-.16a38.093 38.093 0 01-6.37-4.96 12.933 12.933 0 01-3.01-4.8c-1.13-3.54.2-7.59 3.93-8.81.29-.1.59-.17.89-.21h.12c.28-.04.56-.06.84-.06h.11c.63.02 1.24.13 1.83.33h.06c.04.02.07.04.09.06.22.07.43.15.63.26l.38.17c.092.05.195.125.284.19.056.04.107.077.146.1l.05.03c.085.05.175.102.25.16a6.263 6.263 0 013.85-1.3zm2.66 7.2c.41-.01.76-.34.79-.76v-.12a3.3 3.3 0 00-2.11-3.16.8.8 0 00-1.01.5c-.14.42.08.88.5 1.03.64.24 1.07.87 1.07 1.57v.03a.86.86 0 00.19.62c.14.17.35.27.57.29z"
                                    />
                                </svg>
                                Liked
                            </button>
                        </div>
                    </div>
                    <div class="video-p-title anim" style="--delay: 0.2s">
                        Basic how to ride your Skateboard
                    </div>
                    <div class="video-p-subtitle anim" style="--delay: 0.3s">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Repellendus illum tempora consequuntur. Lorem ipsum
                        dolor sit amet consectetur adipisicing elit. Debitis
                        earum velit accusantium maiores qui sit quas, laborum
                        voluptatibus vero quidem tempore facilis voluptate
                        tempora deserunt!
                    </div>
                    <div class="video-p-subtitle anim" style="--delay: 0.4s">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Temporibus laborum qui dolorum fugiat eius accusantium
                        repellendus illum tempora consequuntur. Lorem ipsum
                        dolor, sit amet consectetur adipisicing elit.
                    </div>
                </div>
            </div>
        </div>
        <div class="chat-stream">
            <div class="chat">
                <div class="chat-header anim">
                    Live Chat<span
                        ><svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.212 7.762c0 2.644-2.163 4.763-4.863 4.763-2.698 0-4.863-2.119-4.863-4.763C4.486 5.12 6.651 3 9.35 3c2.7 0 4.863 2.119 4.863 4.762zM2 17.917c0-2.447 3.386-3.06 7.35-3.06 3.985 0 7.349.634 7.349 3.083 0 2.448-3.386 3.06-7.35 3.06C5.364 21 2 20.367 2 17.917zM16.173 7.85a6.368 6.368 0 01-1.137 3.646c-.075.107-.008.252.123.275.182.03.369.048.56.052 1.898.048 3.601-1.148 4.072-2.95.697-2.675-1.35-5.077-3.957-5.077a4.16 4.16 0 00-.818.082c-.036.008-.075.025-.095.055-.025.04-.007.09.019.124a6.414 6.414 0 011.233 3.793zm3.144 5.853c1.276.245 2.115.742 2.462 1.467a2.107 2.107 0 010 1.878c-.531 1.123-2.245 1.485-2.912 1.578a.207.207 0 01-.234-.232c.34-3.113-2.367-4.588-3.067-4.927-.03-.017-.036-.04-.034-.055.002-.01.015-.025.038-.028 1.515-.028 3.145.176 3.747.32z"
                            />
                        </svg>
                        15,988 people
                    </span>
                </div>
                <div class="message-container">
                    <div class="message anim" style="--delay: 0.1s">
                        <div class="author-img__wrapper video-author video-p">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-check"
                            >
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                            <img
                                class="author-img"
                                src="https://images.unsplash.com/photo-1560941001-d4b52ad00ecc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                            />
                        </div>
                        <div class="msg-wrapper">
                            <div class="msg__name video-p-name">
                                Wijaya Adabi
                            </div>
                            <div class="msg__content video-p-sub">
                                Lorem ipsum clor sit, ame conse quae debitis
                            </div>
                        </div>
                    </div>
                    <div class="message anim" style="--delay: 0.2s">
                        <div class="author-img__wrapper video-author video-p">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-check"
                            >
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                            <img
                                class="author-img"
                                src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            />
                        </div>
                        <div class="msg-wrapper">
                            <div class="msg__name video-p-name offline">
                                Johny Wise
                            </div>
                            <div class="msg__content video-p-sub">
                                Suscipit eos atque voluptates labore
                            </div>
                        </div>
                    </div>
                    <div class="message anim" style="--delay: 0.3s">
                        <div class="author-img__wrapper video-author video-p">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-check"
                            >
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                            <img
                                class="author-img"
                                src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzl8fG1lbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                            />
                        </div>
                        <div class="msg-wrapper">
                            <div class="msg__name video-p-name offline">
                                Budi Hakim
                            </div>
                            <div class="msg__content video-p-sub">
                                Dicta quidem sunt adipisci
                            </div>
                        </div>
                    </div>
                    <div class="message anim" style="--delay: 0.4s">
                        <div class="author-img__wrapper video-author video-p">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-check"
                            >
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                            <img
                                class="author-img"
                                src="https://images.pexels.com/photos/1870163/pexels-photo-1870163.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            />
                        </div>
                        <div class="msg-wrapper">
                            <div class="msg__name video-p-name">
                                Thomas Hope
                            </div>
                            <div class="msg__content video-p-sub">
                                recusandae doloremque aperiam alias molestias
                            </div>
                        </div>
                    </div>
                    <div class="message anim" style="--delay: 0.5s">
                        <div class="author-img__wrapper video-author video-p">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-check"
                            >
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                            <img
                                class="author-img"
                                src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            />
                        </div>
                        <div class="msg-wrapper">
                            <div class="msg__name video-p-name">
                                Gerard Will
                            </div>
                            <div class="msg__content video-p-sub">
                                Dicta quidem sunt adipisci
                            </div>
                        </div>
                    </div>
                    <div class="message anim" style="--delay: 0.6s">
                        <div class="author-img__wrapper video-author video-p">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-check"
                            >
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                            <img
                                class="author-img"
                                src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            />
                        </div>
                        <div class="msg-wrapper">
                            <div class="msg__name video-p-name offline">
                                Johny Wise
                            </div>
                            <div class="msg__content video-p-sub">
                                recusandae doloremque aperiam alias molestias
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-footer anim" style="--delay: 0.1s">
                    <input type="text" placeholder="Write your message" />
                </div>
            </div>
            <div class="chat-vid__container">
                <div class="chat-vid__title anim" style="--delay: 0.3s">
                    Related Videos
                </div>
                <div class="chat-vid anim" style="--delay: 0.4s">
                    <div class="chat-vid__wrapper">
                        <img
                            class="chat-vid__img"
                            src="https://cdn.nohat.cc/thumb/f/720/3b55eddcfffa4e87897d.jpg"
                        />
                        <div class="chat-vid__content">
                            <div class="chat-vid__name">
                                Prepare for your first skateboard jump
                            </div>
                            <div class="chat-vid__by">Jordan Wise</div>
                            <div class="chat-vid__info">
                                125.908 views
                                <span class="seperate"></span>2 days ago
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-vid anim" style="--delay: 0.5s">
                    <div class="chat-vid__wrapper">
                        <img
                            class="chat-vid__img"
                            src="https://iamaround.it/wp-content/uploads/2015/02/pexels-photo-4663818.jpeg"
                        />
                        <div class="chat-vid__content">
                            <div class="chat-vid__name">
                                Prepare for your first skateboard jump
                            </div>
                            <div class="chat-vid__by">Jordan Wise</div>
                            <div class="chat-vid__info">
                                125.908 views
                                <span class="seperate"></span>2 days ago
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-vid__button anim" style="--delay: 0.6s">
                    See All related videos (32)
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.stream-area {
    // display: none;
    @media screen and (max-width: 940px) {
        flex-direction: column;
        .video-stream {
            width: 100%;
        }
        .chat-stream {
            margin-left: 0;
            margin-top: 30px;
        }
        .video-js.vjs-fluid {
            min-height: 250px;
        }
        .msg__content {
            max-width: 100%;
        }
    }
}

.show {
    .stream-area {
        display: flex;
    }
    .main-header,
    .main-blogs,
    .small-header,
    .videos {
        display: none;
    }
}

.video-stream {
    width: 65%;
    object-fit: cover;
    transition: 0.3s;
    &:hover .video-js .vjs-big-play-button {
        opacity: 1;
    }
}

.video-p {
    margin-right: 12px;
    object-fit: cover;
    flex-shrink: 0;
    border-radius: 50%;
    position: relative;
    top: 0;
    left: 0;
    .author-img {
        border: 0;
    }
    &-wrapper {
        display: flex;
        align-items: center;
        .author-img {
            border: 0;
        }
        svg {
            width: 20px;
            padding: 4px;
        }
        @media screen and (max-width: 650px) {
            flex-direction: column;
            .button-wrapper {
                margin: 20px auto 0;
            }
            .video-p-detail {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .video-p {
                margin-right: 0;
            }
        }
    }
    &-sub {
        font-size: 12px;
    }
    &-title {
        font-size: 24px;
        color: #fff;
        line-height: 1.4em;
        margin: 16px 0 20px;
    }
    &-subtitle {
        font-size: 14px;
        line-height: 1.5em;
        max-width: 60ch;
        & + & {
            margin-top: 16px;
        }
    }
    &-name {
        margin-bottom: 8px;
        color: #fff;
        display: flex;
        align-items: center;
        &:after {
            content: "";
            width: 6px;
            height: 6px;
            background-color: #22b07d;
            border-radius: 50%;
            margin-left: 8px;
            display: inline-block;
        }
        &.offline:after {
            background-color: #ff7551;
        }
    }
}

.video-content {
    width: 100%;
}

.button-wrapper {
    display: flex;
    align-items: center;
    margin-left: auto;
}
.like {
    display: flex;
    align-items: center;
    background-color: #252936;
    color: #fff;
    border: 0;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 14px;
    cursor: pointer;
    &.red {
        background-color: #ea5f5f;
    }
    svg {
        width: 18px;
        flex-shrink: 0;
        margin-right: 10px;
        padding: 0;
    }
    & + & {
        margin-left: 16px;
    }
}

.video-stats {
    margin-left: 30px;
}

.video-detail {
    display: flex;
    margin-top: 30px;
    width: 100%;
}

.chat-header {
    display: flex;
    align-items: center;
    padding: 20px 0;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    position: sticky;
    top: 0;
    background-color: #252836;
    left: 0;
    z-index: 1;
    border-bottom: 1px solid rgb(128 129 145 / 24%);
    svg {
        width: 15px;
        margin-right: 6px;
        flex-shrink: 0;
    }
    span {
        margin-left: auto;
        color: #808191;
        font-size: 12px;
        display: flex;
        align-items: center;
    }
}

.chat-stream {
    flex-grow: 1;
    margin-left: 30px;
}

.chat {
    background-color: #252836;
    border-radius: 20px;
    padding: 0 20px;
    max-height: 414px;
    overflow: auto;
    &-footer {
        display: flex;
        align-items: center;
        position: sticky;
        bottom: 0;
        left: 0;
        width: calc(100% + 20px);
        padding-bottom: 12px;
        background-color: #252836;
        input {
            width: 100%;
            border: 0;
            background-color: #2d303e;
            border-radius: 20px;
            font-size: 12px;
            color: #fff;
            margin-left: -10px;
            padding: 12px 40px;
            font-weight: 500;
            font-family: var(--body-font);
            // background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2 12C2 6.48 6.47 2 12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10C6.47 22 2 17.52 2 12zm5.52 1.2c-.66 0-1.2-.54-1.2-1.2 0-.66.54-1.2 1.2-1.2.66 0 1.19.54 1.19 1.2 0 .66-.53 1.2-1.19 1.2zM10.8 12c0 .66.54 1.2 1.2 1.2.66 0 1.19-.54 1.19-1.2a1.194 1.194 0 10-2.39 0zm4.48 0a1.195 1.195 0 102.39 0 1.194 1.194 0 10-2.39 0z' fill='%236c6e78'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-size: 24px;
            background-position: 8px;
            &::placeholder {
                color: #6c6e78;
            }
        }
        &:before {
            content: "";
            position: absolute;
            // background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M21.435 2.582a1.933 1.933 0 00-1.93-.503L3.408 6.759a1.92 1.92 0 00-1.384 1.522c-.142.75.355 1.704 1.003 2.102l5.033 3.094a1.304 1.304 0 001.61-.194l5.763-5.799a.734.734 0 011.06 0c.29.292.29.765 0 1.067l-5.773 5.8c-.428.43-.508 1.1-.193 1.62l3.075 5.083c.36.604.98.946 1.66.946.08 0 .17 0 .251-.01.78-.1 1.4-.634 1.63-1.39l4.773-16.075c.21-.685.02-1.43-.48-1.943z'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-size: 14px;
            background-position: center;
            width: 18px;
            height: 18px;
            background-color: #6c5ecf;
            padding: 4px;
            border-radius: 50%;
            right: 16px;
        }
    }
    &-vid {
        &__title {
            color: #fff;
            font-size: 18px;
        }
        &__container {
            margin-top: 40px;
        }
        &__wrapper {
            display: flex;
            align-items: center;
            margin-top: 26px;
        }
        &__name {
            color: #fff;
            font-size: 14px;
            line-height: 1.3em;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            overflow: hidden;
            -webkit-box-orient: vertical;
        }
        &__img {
            width: 100px;
            height: 80px;
            border-radius: 10px;
            object-fit: cover;
            object-position: right;
            margin-right: 16px;
            transition: 0.3s;
            &:hover {
                transform: scale(1.02);
            }
        }
        &__content {
            max-width: 20ch;
        }
        &__by,
        &__info {
            color: var(--bodyColor);
            font-size: 13px;
        }
        &__by {
            margin: 6px 0;
        }
        &__button {
            background-color: #6c5ecf;
            border: 0;
            color: #fff;
            font-size: 13px;
            margin-top: 26px;
            display: flex;
            padding: 0 10px;
            align-items: center;
            justify-content: center;
            height: 40px;
            border-radius: 10px;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
                background-color: #5847d0;
            }
        }
    }
}

.message {
    display: flex;
    align-items: center;
    margin-top: 18px;
    &:last-child {
        margin-bottom: 18px;
    }
    &-container .author-img__wrapper svg {
        width: 15px;
    }
}

.msg {
    &__name {
        font-size: 13px;
    }
    &__content {
        line-height: 1.4em;
        max-width: 26ch;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}

//player

.video-js .vjs-control-bar {
    display: flex;
    align-items: center;
}

.vjs-poster {
    background-size: 150%;
}

.video-js .vjs-control-bar {
    width: 100%;
    position: absolute;
    bottom: 14px;
    padding-left: 36px;
    left: 14px;
    width: calc(100% - 28px);
    right: 0;
    border-radius: 10px;
    height: 4em;
    background-color: #2b333f;
    background-color: rgba(43, 51, 63, 0.7);
    @media screen and (max-width: 625px) {
        padding-left: 0;
    }
}

.video-js:hover .vjs-big-play-button {
    background-color: rgba(43, 51, 63, 0.5);
}

.video-js .vjs-big-play-button {
    transition: 0.3s;
    opacity: 0;
    border: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &:hover {
        background-color: rgba(43, 51, 63, 0.7);
        border-color: transparent;
    }
}

.vjs-play-control:after {
    content: "LIVE";
    position: absolute;
    left: -66px;
    top: 7px;
    background-color: #8941e3;
    height: 24px;
    font-family: var(--body-font);
    font-size: 10px;
    padding: 0 12px 0 26px;
    display: flex;
    font-weight: 700;
    letter-spacing: 0.03em;
    align-items: center;
    border-radius: 6px;
    // background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23fff' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-circle'%3e%3ccircle cx='12' cy='12' r='10'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-size: 6px;
    background-position: 12px;
    @media screen and (max-width: 625px) {
        display: none;
    }
}

.vjs-menu-button-inline .vjs-menu {
    top: 4px;
}

.video-js .vjs-control:before,
.video-js .vjs-time-control {
    line-height: 40px;
}

.video-js .vjs-tech {
    object-fit: cover;
}

button.vjs-play-control.vjs-control.vjs-button {
    margin-left: 40px;
    @media screen and (max-width: 625px) {
        margin-left: 0;
    }
}

.vjs-icon-fullscreen-enter:before,
.video-js .vjs-fullscreen-control:before {
    content: "";
    position: absolute;
    display: block;
    // background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='20' height='20' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.54 0h3.38c1.41 0 2.54 1.15 2.54 2.561V5.97c0 1.42-1.13 2.56-2.54 2.56H2.54C1.14 8.53 0 7.39 0 5.97V2.561C0 1.15 1.14 0 2.54 0zm0 11.47h3.38c1.41 0 2.54 1.14 2.54 2.56v3.41c0 1.41-1.13 2.56-2.54 2.56H2.54C1.14 20 0 18.85 0 17.44v-3.41c0-1.42 1.14-2.56 2.54-2.56zM17.46 0h-3.38c-1.41 0-2.54 1.15-2.54 2.561V5.97c0 1.42 1.13 2.56 2.54 2.56h3.38c1.4 0 2.54-1.14 2.54-2.56V2.561C20 1.15 18.86 0 17.46 0zm-3.38 11.47h3.38c1.4 0 2.54 1.14 2.54 2.56v3.41c0 1.41-1.14 2.56-2.54 2.56h-3.38c-1.41 0-2.54-1.15-2.54-2.56v-3.41c0-1.42 1.13-2.56 2.54-2.56z' fill='%23fff'/%3e%3c/svg%3e");
    background-size: 11px;
    background-position: center;
    background-position-y: 14px;
    background-repeat: no-repeat;
    opacity: 0.6;
}

.vjs-playback-rate .vjs-playback-rate-value {
    font-size: 1.1em;
    line-height: 3.5em;
    opacity: 0.6;
    font-weight: 700;
    font-family: var(--body-font);
}

.video-js .vjs-playback-rate {
    width: 2.2em;
}

.video-js.vjs-fluid {
    border-radius: 20px;
    overflow: hidden;
    min-height: 414px;
}
</style>