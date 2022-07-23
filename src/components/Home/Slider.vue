<template>
	<div class="container">
		<el-carousel
			:interval="3000"
			type="card"
			height="300px"
            v-if="data[0]"
		>
			<el-carousel-item v-for="itme of data" :key="itme.targetId">
				<img :src="itme.imageUrl" alt="" />
			</el-carousel-item>
		</el-carousel>
	</div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { getSlider } from "@/network/api";
let data = ref([]);
onMounted(() => {
	getSlider().then((res) => {
		data.value = res.banners;
	});
});
</script>
<style scoped lang="scss">
.container {
	width: 100%;
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
