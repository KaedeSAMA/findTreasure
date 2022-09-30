<template>
	<view>
		<!-- 头部小铃铛的icon占用的盒子 -->
		<view class="header">
			<u--image src="../../static/icon/remind.png" width="48rpx" height="48rpx"></u--image>
		</view>
		<!-- 头像和用户信息盒子，用全局的isLogin检测是否登陆，采用row布局 -->
		<view class="userhead" v-if="isLogin == true">
			<!-- 头像 -->
			<view>
				<u--image width="130rpx" height="130rpx" src="../../static/icon/camera.png"></u--image>
			</view>
			<!-- 用户信息，column布局 -->
			<view>
				<view>登陆</view>
				<view>个性签名</view>
			</view>
		</view>
		<view class="userhead" v-if="isLogin == false">
			<!-- 头像 -->
			<view>
				<u--image width="130rpx" height="130rpx" src="../../static/icon/camera.png"></u--image>
			</view>
			<!-- 用户信息，column布局 -->
			<view>
				<view>登陆</view>
				<view>个性签名</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin : true
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
