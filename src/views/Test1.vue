<template>
    <div class="box" :class="{ width: width }"></div>
    <el-button style="position: absolute;top: 300px;"  @click="width = !width">切换</el-button>
</template>

<script setup>
let width = $ref(false);
</script>

<style lang="scss" scoped>
.box {
    width: 200px;
    height: 200px;
    background: #fab;
	transition: width 1s;
}
.width {
	width: 100px;
	height: 100px;
}
</style>
