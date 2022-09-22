<template>
	<view>
		<!-- 头部标题栏，里面三个div是图标，文字和按钮 -->
		<view class="title">
			<view class="title_back">
				<u-icon name="arrow-leftward" color="rgb(16, 16, 16)" size="20"></u-icon>
				<view class="font">手机验证码注册登陆</view>
			</view>
			<view>密码登陆</view>
		</view>
		<!-- 头部标题栏的图片 -->
		<view class="titleImage">
			<view>觅 宝</view>
		</view>
		<!-- 主输入框，里面两个input用来输账号密码 -->
		<view class="mainInput">
			<!-- 两个输入框共用一个inputDiv选择器 -->
			<view class="inputDiv">
				<view calss="plus86">+86</view>
				<view class="u-demo-block__content">
					<u-code ref="uCode2" @change="codeChange2" keep-running start-text="点我获取验证码"></u-code>
					<text @tap="getCode2" :text="tips2" class="u-page__code-text">{{tips2}}</text>
				</view>
			</view>
			<view class="inputDiv">

			</view>
		</view>
		<!-- 注册按钮 -->
		<view class="loginBtnDiv"></view>
		<!-- 开发者协议 -->
		<view class="agreement"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	.title {
		width: ;
		height: 116rpx;
		//颜色调试盒子大小
		// background-color: #3f3f3f;
		//左右内边距避免左右顶格
		padding-left: 20rpx;
		padding-right: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.title_back {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.font {
				padding-left: 10rpx;
			}
		}
	}

	.titleImage {
		color: white;
		font-size: 74rpx;
		background-color: #31406B;
		height: 154rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.mainInput {
		.inputDiv {
			height: 120rpx;
			border-bottom: rgba(0, 0, 0, 10%) solid 4rpx
		}
	}
</style>
