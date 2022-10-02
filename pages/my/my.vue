<template>
  <view class="myRoot" >
    <!-- 头部小铃铛的icon占用的盒子 -->
    <view class="header">
      <u--image src="../../static/icon/remind.png" width="48rpx" height="48rpx" class="reminder"></u--image>
    </view>
    <!-- 头像和用户信息盒子，用全局的isLogin检测是否登陆，采用row布局 -->
    <view class="userhead" v-if="isLogin == true">
      <!-- 头像 -->
      <view>
        <u--image width="130rpx" height="130rpx" src="../../static/icon/camera.png"></u--image>
      </view>
      <!-- 用户信息，column布局 -->
      <view class="userNameAndSlogan">
        <view>{{userName}}</view>
        <view class="userSlogan">{{userSlogan}}</view>
      </view>
    </view>
    <view class="userhead" v-if="isLogin == false">
      <!-- 头像 -->
      <view>
        <u--image width="130rpx" shape="circle" height="130rpx" src=""></u--image>
      </view>
      <!-- 用户信息，column布局 -->
      <view class="userNameAndSlogan">
        <view>登陆</view>
        <view class="userSlogan">个性签名</view>
      </view>
    </view>
    <!-- 动态，粉丝，关注信息 -->
    <view class="userInfo">
		<view class="infoBox">
			<view class="">
				{{userDynanic}}
			</view>
			<view class="infoBoxFont">
				动态
			</view>
		</view>
		<view class="alignDivider"></view>
		<view class="infoBox">
			<view class="">
				{{userFans}}
			</view>
			<view class="infoBoxFont">
				粉丝
			</view>
		</view>
		<view class="alignDivider"></view>
		<view class="infoBox">
			<view class="">
				{{userFollows}}
			</view>
			<view class="infoBoxFont">
				关注
			</view>
		</view>
	</view>
	<user-tab tabName="qwq" iconURL="../../static/icon/remind.png"></user-tab>
  </view>
</template>

<script>
import userTab from "../../components/userTab.vue"
export default {
  data() {
    return {
      isLogin: false,
      userName: "用户名字七个字",
      userSlogan: "这个人很懒，什么也没有留下。",
      userAvatar: "",
	  userDynanic:0,
	  userFans:0,
	  userFollows:0
    };
  },
  components:{
	userTab,
  },
  methods: {}
};
</script>

<style lang="less">
.myRoot{
	padding-left: 50rpx;
	padding-right:50rpx ;
}
.alignDivider{
	width: 2rpx;
	height: 54rpx;
	background-color: #BBBBBB;
}
.header{
	margin-top: 30rpx;
	padding-right: 50rpx;
	width:100%;
	display: flex;
	flex-direction: row-reverse;
	margin-bottom: 7rpx;
}
.userhead{
	margin-top: 7rpx;
	display: flex;
	flex-direction: row;
	.userNameAndSlogan{
		height: 130rpx;
		margin-left: 60rpx;
		margin-bottom: 50rpx;
		font-size: 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-weight: 700;
		.userSlogan{
			font-size: 28rpx;
		}
	}
}
.userInfo{
	margin-top: 50rpx;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	// border: #9A9A9A 1px solid;
	.infoBox{
		display: flex;
		flex-direction: column;
		align-items: center;
		.infoBoxFont{
			font-size: 32rpx;
			color: #9A9A9A;
			font-weight: 600;
		}
	}
}
</style>
