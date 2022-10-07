<template>
	<view>
		<view class="header">
		</view>
		<view class="title_flex">
			<view class="titleFont">
				博物馆地图
			</view>
		</view>
		<map name="" class="map" :style="'height:'+(screenHeight * 0.75 )+'px'"></map>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				screenHeight:1000
			};
		},
		onLoad() {
		},
		methods: {
		},
	}
</script>

<style lang="less">

.header{
	height: 80rpx;
}
.map{
	width: 750rpx;
}
.title_flex{
	width: 750rpx;
	height: 128rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
.titleFont{
	font-size: 50rpx;
}
.title_end{
	width: 76rpx;
	height: 76rpx;
}
</style>
