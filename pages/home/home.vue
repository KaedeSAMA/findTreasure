<template>
	<view class="homeRoot" :style="'min-height:'+(screenHeight - 100)+'px'">
		<u-sticky offset-top="0" bgColor='rgba(78, 87, 126, 100)'>
			<!-- 占位盒子 -->
			<view class="before">
			</view>
			<!-- 第一部分：图标Icon，查找和相机 -->
			<view class="findAndCamera">
				<!-- 觅宝图标 -->
				<u--image src="../../static/icon/homeIcon.png" width="104rpx" height="64rpx" mode="aspectFit"></u--image>
				<!-- 搜索框 -->
				<view class="searchInput">
					<u-search shape="round" :show-action="false"></u-search>
				</view>
				<!-- 相机框 -->
				<u--image src="../../static/icon/camera.png" width="40rpx" height="40rpx" mode="aspectFit"></u--image>
			</view>
			<!-- 第二部分：过滤选择器标签 -->
			<view class="filter">
				<u-tabs :list="filterList" @click="changeTab($event)" lineWidth="40rpx" :activeStyle="{
						height:'60rpx',
						'font-size':'36rpx',
						color: '#EFEFEF',
						fontWeight: 'bold',
						transform: 'scale(1.1)'
					}" :inactiveStyle="{
						height:'60rpx',
						'font-size':'34rpx',
						color: '#EFEFEF',
						transform: 'scale(1)'
					}" itemStyle="width:180rpx  height: 60rpx;" :scrollable="false">
					<view slot="right" style="padding-left: 10rpx; margin-top: -15rpx;" @tap="$u.toast('插槽被点击')">
						<u--image src="../../static/icon/filter.png" width="40rpx" height="40rpx" mode="aspectFit">
						</u--image>
					</view>
				</u-tabs>
			</view>
		</u-sticky>

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
</template>

<script>
	import card from "../../components/card.vue";
	export default {
		data() {
			return {
				filterList: [{
						name: "觅宝"
					},
					{
						name: "瓷器"
					},
					{
						name: "书法"
					},
					{
						name: "画作"
					},
					{
						name: "壁画"
					}
				],
				screenHeight: getApp().globalData.screenHeight,
				cardListL: [],
				cardListR: [],
				page:1,

			};
		},
		components: {
			card
		},
		onShow(){
			this.screenHeight = getApp().globalData.screenHeight,
			//debug
			console.log('screenHeight=',this.screenHeight);
			this.getCardList();
		},
		onHide(){
			this.initHome()
		},
		onReachBottom(){
			this.getCardList()
		},
		methods: {
			changeTab(e) {
				console.log(e);
			},
			getCardList() {
				uni.$http.get("/home/info/all",{
					pageNum : this.page
				}).then((res)=>{
					console.log(res.data);
					res.data.data.infoList.reverse();
					let i = 0; 
					res.data.data.infoList.map(val => {
						//把名字拆成字符数组，实现多于七个字的卡片名字部分隐藏
						let charNum = val.name.split("");
						val.charList = charNum;
						if (i % 2 != 0) this.cardListL.push(val);
						else this.cardListR.push(val);
						// console.dir(this.cardListL);
						i++;
					});
					if(res.data.data.infoList.length != 0){
						this.page++
					}else{
						uni.$u.toast('暂无更多内容')
					}
				});

			},
			initHome(){
				this.cardListL = []
				this.cardListR = []
				this.page = 1
			},
			changePageTo(val) {
				uni.navigateTo({
					url: val
				})
			},
			backPageTo(val) {
				uni.navigateBack({
					delta: val
				});
			}
		},
		mounted() {
		}
	};
</script>

<style lang="less">
	.homeRoot {
		padding: 0rpx 20rpx 100rpx 20rpx;
		background-color: rgba(78, 87, 126, 100);
	}
	.before{
		height: 90rpx;
	}
	.findAndCamera {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.searchInput {
		width: 498rpx;
		margin: 0 28rpx 0 28rpx;
	}

	.filter {
		margin-top: 30rpx;
		padding-bottom: 10rpx;
		border-bottom: solid 1px rgba(58, 87, 110, 100);
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
