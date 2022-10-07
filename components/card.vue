<template>
  <view class="cartRoot" @click="goToTreasure()">
    <!-- 卡片的图片展示 -->
    <image class="img" :src="imgURL" mode="widthFix"> </image>
    <!-- 图片下面的简介 -->
    <view class="cardFoot">
      <view class="nameAndLocation">
        <!-- 这部分名字需要处理，超过七个字会隐藏 -->
        <view>{{ computedName }}</view>
        <view class="locationFont">{{ location }}</view>
      </view>
	  <image v-show="this.isLove == false" src="../static/icon/tabNameLike.png" mode="" class="likeIcon" @click.stop="addLike()"></image>
	  <image v-show="this.isLove == true" src="../static/icon/iconParkLike.png" mode="" class="likeIcon" @click.stop="addLike()"></image>
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
	  isLove : this.isLike
    };
  },
  props: {
    imgURL: String,
    //传进来的原名
    treasureName: String,
	treasureId:Number,
    location: String,
    charList: Array,
	isLike:{
		type : Boolean,
		default : false
	}
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

          "..." 
      } else {
        this.computedName = this.treasureName;
      }
    },
	changePageTo(val) {
		uni.navigateTo({
			url: val
		})
	},
	backPageTo(val) {
		uni.navigateBack({
			delta: val
		});
	},
	addLike(){
		if(this.isLove == false){
			uni.$http.post('/home/info/collect',{
				collectionId : this.treasureId
			}).then((res)=>{
				// console.log(res.data.code);
				if(res.data.code == '00000'){
					this.isLove = true
				}else{
					uni.$u.toast('收藏失败')
				}
			})
		}else{
			uni.$http.post('/home/info/cancel',{
				collectionId : this.treasureId
			}).then((res)=>{
				// console.log(res.data.code);
				if(res.data.code == '00000'){
					this.isLove = false
				}else{
					uni.$u.toast('取消收藏失败')
				}
			})
		}
	},
	goToTreasure(){
		//debug
		// console.log('qwq');
		uni.navigateTo({
			url:`/pages/treasure/treasure?collectionId=${this.treasureId}`
		})
	}
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, .32), 0 0 6px rgba(0, 0, 0, .54);
  //隐藏图片溢出的部分
  overflow: hidden;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
}

.img {
  width: 101%;
}

.cardFoot {
  min-height: 140rpx;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .nameAndLocation {
    font-size: 32rpx;
	font-weight: 600;
    width: 70%;
    min-height: 140rpx;
    margin-left: 20rpx;
	display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;

    .locationFont {
      font-size: 24rpx;
    }
  }
}
.likeIcon{
	width: 40rpx;
	height: 40rpx;
	margin-right: 20rpx;
}
</style>
