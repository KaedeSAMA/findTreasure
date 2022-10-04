<template>
	<view class="userTab" @click="changePageTo(id)">
		<!-- 左边部分的布局 -->
		<view class="flexLeft">
			<u--image :src="iconURL" mode="" width="56rpx" height="56rpx" class="icon"></u--image>
			<view class="font">
				{{tabName}}
			</view>
		</view>
		<!-- 右边的箭头 -->
		<u--image src="../../static/icon/leftArrow.png" width="80rpx" height="80rpx"></u--image>
	</view>
</template>

<script>
	export default {
		name: "userTab",
		data() {
			return {

			};
		},
		props: {
			tabName: String,
			iconURL: String,
			id: Number,
		},
		methods: {
			changePageTo(val) {
				let pageURL = ''
				switch (val) {
					case 1:
						pageURL = '/pages/myLove/myLove'
						break;
					case 2:
						pageURL = '/pages/history/history'
						break;
					case 5:
						pageURL = '/pages/settings/settings'
						break;
					default:
						pageURL = ''
				}
				uni.navigateTo({
					url: pageURL
				})
			},
			backPageTo(val) {
				uni.navigateBack({
					delta: val
				});
			},
		}
	}
</script>

<style lang="less">
	.userTab {
		margin-top: 12rpx;
		margin-bottom: 12rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.flexLeft {
			display: flex;
			flex-direction: row;
			align-items: center;

			.icon {
				margin-right: 24rpx;
			}
		}
	}
</style>
