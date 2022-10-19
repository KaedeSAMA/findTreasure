<template>
	<view class="title_flex">
		<u--image  @click="backPageTo(1)" src="../../static/icon/iconPark-left Copy@1x.png" mode="" width="76rpx" height="76rpx"></u--image>
		<view class="titleFont">
			{{title}}
		</view>
		<view class="title_end">
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"myTitle",
		data() {
			return {
				
			};
		},
		props:{
			title:String
		},
		methods:{
			backPageTo(val) {
				uni.navigateBack({
					delta: val
				});
			},
		}
	}
</script>

<style lang="less">

.title_flex{
	width: 750rpx;
	height: 128rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
.titleFont{
	font-size: 50rpx;
}
.title_end{
	width: 76rpx;
	height: 76rpx;
}
</style>