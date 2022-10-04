<template>
	<view class="myLoveRoot">
		<view class="title">
			<view class="title_flex">
				<u--image  @click="backPageTo(1)" src="../../static/icon/iconPark-left Copy@1x.png" mode="" width="76rpx" height="76rpx"></u--image>
				<view class="titleFont">
					历史记录
				</view>
				<view class="title_end">
					
				</view>
			</view>
			<!-- 第三部分：主页面的卡片展示部分(瀑布流) -->
			<view class="mainCards" v-show="cardListL[0] != null">
				<view class="flowL" ref="flowL">
					<card v-for="item in cardListL" :key="item.id" class="card" :imgURL="item.img" :treasureId="item.id" :treasureName="item.name"
						:location="item.location" :charList="item.charList" :isLike="item.isLove"></card>
				</view>
				<view class="flowR" ref="flowR">
					<card v-for="item in cardListR" :key="item.id" class="card" :imgURL="item.img" :treasureId="item.id" :treasureName="item.name"
						:location="item.location" :charList="item.charList" :isLike="item.isLove"></card>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import card from "../../components/card.vue";
	export default {
		data() {
			return {
				cardListL: [],
				cardListR: [],
			};
		},
		onShow(){
			this.screenHeight = getApp().globalData.screenHeight,
			//debug
			console.log('screenHeight=',this.screenHeight);
			this.getLoveList();
		},
		onHide(){
			this.initHome()
		},
		methods:{
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
			getLoveList(){
				uni.$http.get("/personal/history").then((res)=>{
					console.log(res.data);
					res.data.data.historyList.reverse();
					let i = 0; 
					res.data.data.historyList.map(val => {
						//把名字拆成字符数组，实现多于七个字的卡片名字部分隐藏
						let charNum = val.name.split("");
						val.charList = charNum;
						if (i % 2 != 0) this.cardListL.unshift(val);
						else this.cardListR.unshift(val);
						// console.dir(this.cardListL);
						i++;
					});
				});
			},
			initHome(){
				this.cardListL = []
				this.cardListR = []
			},
		},
		components: {
			card
		},
	}
</script>

<style lang="less">
.myLoveRoot{
padding-top: 70rpx;
background-color: #F6F7FB;
overflow: hidden;
}

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
	.mainCards {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.flowL {
		width: 320rpx;
		margin-left: 14rpx;
		margin-right: 14rpx;
	}
	
	.flowR {
		width: 320rpx;
		margin-left: 14rpx;
		margin-right: 14rpx;
	}
</style>
