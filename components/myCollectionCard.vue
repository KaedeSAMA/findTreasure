<template>
	<view class="myCollectionCardRoot" @click="goToTreasure()">
		<!-- 图片 -->
		<image :src="imgURL" mode="widthFix" class="image"></image>
		<!-- 文字 -->
		<view class="cardBottom">
			<view class="cardBottomFont">
				{{name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "myCollectionRoot",
		data() {
			return {

			};
		},
		mounted() {
		},
		methods:{
			goToTreasure(){
				//debug
				// console.log('qwq');
				uni.navigateTo({
					url:`/pages/myCollectionMore/myCollectionMore?collectionId=${this.collectionId}&transId=${this.transId}`
				})
			}
		},
		props:{
			name:String,
			imgURL:String,
			collectionId:Number,
			transId : String,
		}
	}
</script>

<style lang="less">
	.myCollectionCardRoot {
		margin-top: 18rpx;
		margin-bottom: 18rpx;
		border-radius: 20rpx;
		width: 650rpx;
		min-height: 700rpx;
		background-color: #fff;
		overflow: hidden;
	}
	.image{
		width: 652rpx;
	}
	.cardBottom{
		height: 150rpx;
		width: 100%;
		font-size: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
