<template>
  <div class="container">
    <div class="search">
      <div class="search-history">
        <div class="history-head">
          <span class="text1"> 搜索历史 </span>
          <delete
            @click="delAllHistory"
            theme="outline"
            style="cursor: pointer"
            size="20"
            fill="#666"
          />
        </div>
        <div class="history-body">
          <div
            class="info"
            v-for="(itme, index) in store.searchHistory"
            :key="index"
          >
            {{ itme }}
            <close-small
              class="close"
              theme="outline"
              size="15"
              fill="#666"
              @click="delSearchHistory(index)"
            />
          </div>
        </div>
      </div>
      <div class="search-hot">
        <div class="hot">热搜榜</div>
        <ul>
          <li v-for="(itme, index) in data" :key="index">
            <div class="order">{{ index + 1 }}</div>
            <div class="song">
              <div class="name">
                {{ itme.searchWord }}
                <span class="number">{{ itme.score }}</span>
              </div>
              <div class="description">
                {{ itme.content }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getsearch } from "../../network/home";
import { Delete, CloseSmall } from "@icon-park/vue-next";
import { useStore } from "../../store/user";
const store = useStore();
const props = defineProps(["input"]);
let data = ref([]);
//删除某个搜索历史
const delSearchHistory = (index) => {
  props.input.focus();
  store.searchHistory.splice(index, 1);
};
//删除全部搜索历史
const delAllHistory = () => {
  props.input.focus();
  store.searchHistory = [];
};
getsearch().then((res) => {
  data.value = res.data;
});
</script>

<style lang="scss" scoped>
.search {
  width: 350px;
  height: 620px;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #312e42;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &-history {
    position: relative;
    color: #777;
    top: 10px;
    padding: 0 30px;
    .history {
      &-head {
        .text1 {
          position: relative;
          font-size: 16px;
        }
        .text2 {
          position: absolute;
          right: 10px;
          top: 0;
          font-size: 12px;
        }
      }
      &-body {
        font-size: 14px;
        display: flex;
        height: 100%;
        flex-flow: wrap;
        margin-top: 10px;
        .info {
          color: #444;
          padding: 0 10px;
          text-align: center;
          line-height: 22px;
          display: block;
          height: 25px;
          border: 1px solid #888;
          border-radius: 15px;
          margin-right: 10px;
          margin-bottom: 10px;
          &:hover {
            & {
              background: #f2f2f2;
            }
          }
        }
      }
    }
  }
  &-hot {
    position: relative;
    top: 15px;
    font-size: 15px;
    color: #666;
    .hot {
      margin-left: 10px;
    }
    ul {
      padding: 0;
      padding-top: 5px;
      list-style: none;
      font-size: 12px;
      li {
        width: 100%;
        box-sizing: border-box;
        height: 58px;
        margin-top: 5px;
        cursor: pointer;
        display: grid;
        grid-template-columns: 1fr 8.5fr;
        .order {
          text-align: center;
          line-height: 58px;
          font-size: 16px;
          color: #ff4646;
          padding: 0 20px;
        }
        .song {
          line-height: 29px;
          .name {
            font-weight: bold;
            font-size: 13px;
            .number {
              font-weight: normal;
              color: #e3e3e3;
              margin-left: 5px;
            }
          }
        }
        &:hover {
          background-color: #2f3542;
        }
      }
    }
  }
}
.close {
  position: relative;
  right: -10%;
  top: 5%;
  cursor: pointer;
  &:hover {
    fill: #000;
  }
}
</style>
