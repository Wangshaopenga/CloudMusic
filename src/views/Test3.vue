<template>
  <div class="author">
    <div class="author-header">
      <div class="img"><img src="@/assets/logo.png" alt="" /></div>
      <div class="body">
        <div class="body-name">
          <div class="name">许嵩</div>
          <div class="alias">Vae</div>
        </div>
        <div class="body-btn">
          <el-button :icon="FolderFocusOne">收藏</el-button>
          <el-button :icon="User">个人主页</el-button>
        </div>
        <div class="body-data">
          <span>单曲数:174</span>
          <span>专辑数:43</span>
          <span>MV数:53</span>
          <span>演出:3</span>
        </div>
      </div>
    </div>
    <div class="author-body"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.author {
  &-header {
    display: flex;
    height: 30%;
    .img {
      //   background: red;
      width: 200px;
      height: 200px;
      padding: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .body {
      // background: red;
      flex: 1;
      padding: 15px 10px;
      &-name {
        .name {
          font-weight: bold;
          font-size: 18px;
          padding: 0 0 10px 0;
        }
        .alias {
          color: #aaa;
          font-size: 14px;
        }
      }
      &-btn {
        padding: 15px 0;
        .el-button {
          border-radius: 40px;
          font-size: 16px;
          &:hover {
            color: #666;
            border-color: #eee;
            background: #f2f2f2;
          }
        }
      }
      &-data {
        span {
          color: #666;
          font-size: 14px;
          margin-right: 10px;
        }
      }
    }
  }
  &-body {
    // background: red;
  }
}
</style>
