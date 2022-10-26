<template>
  <view class="myRoot" >
    <!-- 头部小铃铛的icon占用的盒子 -->
    <view class="header">
      <u--image src="../../static/icon/remind.png" width="48rpx" height="48rpx" class="reminder"></u--image>
    </view>
    <!-- 头像和用户信息盒子，用全局的isLogin检测是否登录，采用row布局 -->
    <view class="userhead" v-if="isLogin == true" @click="changePageTo('/pages/editUserInfo/editUserInfo')">
      <!-- 头像 -->
      <view>
        <!-- <u--image width="130rpx" height="130rpx" :src="userAvatar" shape="circle"></u--image> -->
		<u--image width="130rpx" height="130rpx" :src="`${userAvatar}`"shape="circle"></u--image>
	  </view>
      <!-- 用户信息，column布局 -->
      <view class="userNameAndSlogan">
        <view>{{userName}}</view>
        <view class="userSlogan">{{userSlogan}}</view>
      </view>
    </view>
    <view class="userhead" v-if="isLogin == false" @click="changePageTo('/pages/login/login')">
      <!-- 头像 -->
      <view>
        <u--image width="130rpx" shape="circle" height="130rpx" src=""></u--image>
      </view>
      <!-- 用户信息，column布局 -->
      <view class="userNameAndSlogan">
        <view>登录</view>
        <view class="userSlogan">登录查看个性签名</view>
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
	<!-- 下面的每一个小标签，使用自己封装的userTab实现 -->
	<user-tab v-for="index in userTabConfig" :key="index.id" :id="index.id" :tabName="index.tabName" :iconURL="index.iconURL"></user-tab>
  </view>
</template>

<script>
import userTab from "../../components/userTab.vue"
export default {
  data() {
    return {
      isLogin: this.$store.state.isLogin,
      userName: "用户名字七个字",
      userSlogan: "这个人很懒，什么也没有留下。",
      userAvatar: "",
	  userId : '',
	  userDynanic:0,
	  userFans:0,
	  userFollows:0,
	  nowTime :'',
	  userTabConfig:[{
		  id :1,
		  tabName:"我的收藏",
		  iconURL:"../../static/icon/tabNameLike.png"
	  },{
		  id :2,
		  tabName:"浏览记录",
		  iconURL:"../../static/icon/tabNameHistory.png"
	  },
	  // {
		 //  id:3,
		 //  tabName:"我想去",
		 //  iconURL:"../../static/icon/tabNameBag.png"
	  // },
	  {
		  id:4,
		  tabName:"用户上传",
		  iconURL:"../../static/icon/tabNameUpload.png"
	  },
	  {
		  id :5,
		  tabName:"设置",                                                                                                               
		  iconURL:"../../static/icon/tabNameSettings.png"
	  }]
    };
  },
  components:{
	userTab,
  },
  methods: {
	  changePageTo(val) {
	  	uni.navigateTo({
	  		url: val
	  	})
	  },
	  async getUserInfo(){
		  console.log('开始发送用户信息请求');
		  const res = await uni.$http.get('/personal/all')
		  this.userName = res.data.data.nickname
		  this.userSlogan = res.data.data.sign
		  this.userAvatar = res.data.data.headImgUrl+"?t="+this.nowTime
		  this.userId = res.data.data.userId
	  }
  },
  onShow(){
	  this.isLogin = this.$store.state.isLogin
	  let date = new Date();	//Fri Oct 29 2021 16:37:56 GMT+0800 (CST)
	  this.nowTime = new Date().getTime();	
	  console.log('nowTime=',this.nowTime);
	  this.getUserInfo()
  }
};
</script>

<style lang="less">
.myRoot{
	padding-left: 50rpx;
	padding-right:50rpx ;
	padding-top: 90rpx;
}
.alignDivider{
	width: 2rpx;
	height: 54rpx;
	background-color: #BBBBBB;
}
.header{
	margin-top: 10rpx;
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
	margin-bottom:65rpx;
	margin
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
