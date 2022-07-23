<template>
    <div>
        <h1>This is a About page</h1>
        <button @click="f">dianji</button>
    </div>
</template>

<script setup>
import { searchMusic } from "@/network/api";
const f = () => {
    searchMusic("海阔天空").then(
        (res) => {
            console.log(res);
        },
        (err) => {
            console.log(err);
        }
    );
};
</script>
<style lang="scss" scoped>
</style>