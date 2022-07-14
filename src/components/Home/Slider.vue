<template>
    <div class="container">
        <el-carousel
            :interval="3000"
            type="card"
            height="300px"
        >
                <!-- style="left: -70px" -->
            <el-carousel-item
                v-for="itme of data"
                :key="itme.targetId"
            >
                <img :src="itme.imageUrl" alt="" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { getSlider } from "../../network/home";
let data = ref([]);
onMounted(() => {
    getSlider().then((res) => {
        data.value = res.banners;
    });
});
</script>
<style scoped lang="scss">
.container {
    // .el-carousel-item {
    //     left: -70px;
    // }
    // .el-carousel__item--card {
    //     width: 70%;
    // }
    width: 100%;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
