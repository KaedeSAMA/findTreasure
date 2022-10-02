<template>
  <view class="cartRoot">
    <!-- 卡片的图片展示 -->
    <image class="img" :src="imgURL" mode="widthFix"> </image>
    <!-- 图片下面的简介 -->
    <view class="cardFoot">
      <view class="nameAndLocation">
        <!-- 这部分名字需要处理，超过七个字会隐藏 -->
        <view>{{ computedName }}</view>
        <view class="locationFont">地点 {{ location }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "card",
  data() {
    return {
      //处理过的名字
      computedName: "",
    };
  },
  props: {
    imgURL: String,
    //传进来的原名
    treasureName: String,
    location: String,
    charList: Array,
  },
  methods: {
    computeName() {
      if (this.charList.length >= 7) {
        this.computedName =
          this.charList[0] +
          this.charList[1] +
          this.charList[2] +
          this.charList[3] +
          this.charList[4] +

          "···" 
      } else {
        this.computedName = this.treasureName;
      }
    },
  },
  mounted() {
    this.computeName();
  },
};
</script>

<style lang="less">
.cartRoot {
  width: 320rpx;
  background-color: #fff;
  border-radius: 6px 6px 6px 6px;
  margin-top: 28rpx;
  color: #333333;
  //隐藏图片溢出的部分
  overflow: hidden;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
}

.img {
  width: 100%;
}

.cardFoot {
  min-height: 140rpx;
  background-color: #fff;

  .nameAndLocation {
    font-size: 32rpx;
	font-weight: 600;
    width: 70%;
    min-height: 140rpx;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;

    .locationFont {
      font-size: 24rpx;
    }
  }
}
</style>
