<template>
	<div class="playList">
		<div class="header">
			<span class="play">当前播放</span>
			<div>
				<span class="total">总{{ store.playList.length }}首</span>
				<span class="collect">
					<folder-focus-one theme="outline" size="20" fill="#333" />
					收藏全部
				</span>
				<span class="clear">清空列表</span>
			</div>
		</div>
		<div class="content">
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
		</div>
	</div>
</template>

<script setup>
import { useStore } from "@/store/user";
import { FolderFocusOne } from "@icon-park/vue-next";
const store = useStore();
</script>

<style scoped lang="scss">
.playList {
	width: 30%;
	height: 80%;
	background: #e0e1e2;
	position: absolute;
	right: 0;
	z-index: 100;
	bottom: 45px;
	.header {
		position: relative;
        top: 0%;
        border-bottom: 1px solid rgba(0,0,0,.2);
        height: 10%;
        padding: 10px;
        .play {
            font-weight: bold;
            font-size: 24px;
        }
        div {
            padding-top: 10px;
            .total {
                font-size: 14px;
                color:#bfbfbf;
            }
        }
	}
    .content {
        // overflow: scroll;
        // height: 85%;
    }
}
</style>
