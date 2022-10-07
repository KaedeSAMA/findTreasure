<template>
	<view class="recommendRoot" :style="'height:'+(screenHeight-25)+'px'">
		<!-- 中间的白色卡片 -->
		<view class="whiteCard">
			<!-- 时间部分 -->
			<view class="date">
				<view class="yearAndWeek">
					
				</view>
				<view class="farmerDay">
					
				</view>
			</view>
			<!-- 图片部分 -->
			<image :src="recommendData.img" mode="heightFix" class="img"></image>
			<!-- 简介部分 -->
			<view class="bottomDiscription">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: getApp().globalData.screenHeight,
				recommendData:{}
			};
		},
		onLoad(){
			this.getRecommend()
		},
		mounted(){
			// console.log(this.screenHeight);
		},
		methods:{
			getRecommend(){
				uni.$http.get('/recommend/img')
				//收到获得图片信息后
				.then((res)=>{
					//debug
					console.log(res.data.data);
					this.recommendData = res.data.data
				})
			}
		}

	}
</script>

<style lang="less">
.recommendRoot{
	padding-top: 70rpx;
	background-color: rgba(78, 87, 126, 100);
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
.whiteCard{
	width: 670rpx;
	height: 85%;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	.date{
		width: 100%;
		height: 14%;
		border: 1px solid;
		.yearAndWeek{
			
		}
		.farmerDay{
			
		}
	}
	.bottomDiscription{
		
	}
}
.img{
	height: 600rpx;
}

</style>
