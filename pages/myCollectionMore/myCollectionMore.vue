<template>
	<view class="treasureRoot">
		<!-- 		<view class="" @click="backPageTo(2)">
			back{{collectionId}}
		</view>
		 -->
		<!-- 标题 -->
		<view class="title">
			<view class="title_flex">
				<u--image @click="backPageTo(1)" src="../../static/icon/iconPark-left Copy@1x.png" mode="" width="76rpx"
					height="76rpx"></u--image>
				<view class="titleFont">
					我的数字藏品详情
				</view>
				<view class="title_end">

				</view>
			</view>
		</view>
		<!-- 图片部分 -->
		<view :class="['imageView',isSpand?'':'imageView_spand']">
			<image :src="imgURL" mode="widthFix" class="mainImage"></image>
		</view>
		<!-- 文字部分 -->
		<ww-bottom-drawerapp @callExpand="isSpand()" :dragHandleHeight="40">
			<slot>
				<!--填入你的抽屉View-->
				<scroll-view :scroll-y="true" class="drawer">
					<!-- 头部 -->
					<view class="drawerHeader">
						<!-- 名字 -->
						<view class="">{{collectionName}}</view>
						<!-- 时间和地点 -->
						<view>
							<view class="locationAndDynasty">地点:{{museum}}</view>
							<view class="locationAndDynasty">朝代:{{dynasty}}</view>
						</view>
						<!-- icon图标 -->
						<!-- 						<view class="iconList">
							<u--image   src="../../static/icon/tabNameLike.png" mode="" width="38rpx" height="38rpx"></u--image>
							<u--image   src="../../static/icon/iconParkShare.png" mode="" width="38rpx" height="38rpx"></u--image>
							<u--image   src="../../static/icon/iconParkComment.png" mode="" width="38rpx" height="38rpx"></u--image>
						</view> -->
					</view>
					<!-- 分割线 -->
					<u-divider text="分割线" :dot="true"></u-divider>
					<!-- 抽屉 -->
					<view class="deawerBody">
						<!-- 鉴定小卡片 -->
						<view class="deawerCard">
							<view class="deawerCardFont">
								<view>发行方：{{tradeData.data.museum}}</view>
								<view>转让ID：{{tradeData.data.checkId}}</view>
								<view>转让次数：{{tradeData.data.transNum}}</view>
								<view style="height: 15rpx;"></view>
								<view>最后一次转让记录</view>
								<template v-if="this.tradeData.data.lastTransaction !== undefined">
									<view>转让发送者账号：{{tradeData.data.lastTransaction.sender}}</view>
									<view>转让接收者账号：{{tradeData.data.lastTransaction.receiver}}</view>
									<view>转让时间：{{tradeData.data.lastTransaction.time}}</view>
								</template>
								<template v-else>
									<view>该藏品暂无交易记录</view>
								</template>
							</view>
							<view class="btn">
								<u-button text="使用区块链验证数字藏品" size="small" :plain="true" @click="getTradeData()"></u-button>
							</view>
							<view class="btn">
								<u-button text="转让" size="small" :plain="true" @click="tradeForm = true"></u-button>
							</view>
						</view>
						<u-popup :show="tradeForm" mode="center">
							<view class="tradeFormBox">
								<view class="ipt">
									<u--input
									    placeholder="请输入被转让人的手机号"
									    border="surround"
									    v-model="tradePhone"
									>
									</u--input>
								</view>
<!-- 								<view class="ipt">
									<u--input
									    placeholder="请输入昵称"
									    border="surround"
									    v-model="nickName"
									>
									</u--input>
								</view> -->
								<view class="btnLine">
									<view class="miniBtn">
										<u-button text="取消" size="small" :plain="true"  @click="tradeForm = false"></u-button>
									</view>
									<view class="miniBtn">
										<u-button text="确定" size="small" :plain="true"  @click="commitForm()"></u-button>
									</view>
								</view>
							</view>
						</u-popup>
						<view class="deawerBodyItem deawerBodyTitle">
							文物介绍
						</view>
						<view class="deawerBodyItem">名称: {{collectionName}}</view>
						<view class="deawerBodyItem">馆藏地点: {{museum}}</view>
						<view class="deawerBodyItem">所属年代: {{dynasty}}</view>
						<view class="deawerBodyItem">类别: {{tag}}</view>
						<view class="deawerBodyItem">文物特征: {{feature}}</view>
						<view class="deawerBodyItem">更多:</view>
						<view class="deawerBodyItem">{{more}}</view>
					</view>
				</scroll-view>
			</slot>
		</ww-bottom-drawerapp>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collectionId: 0,
				moreData: {},
				imgURL: '',
				collectionName: '藏品名字七个字',
				museum: '博物馆名七个字',
				dynasty: '朝代名字七个字',
				tag: '标签名字七个字',
				feature: '特征名字七个字',
				more: '',
				checkInfo: {},
				transId: '',
				tradeForm:false,
				tradePhone:"",
				tradeData: {
					code: "00000",
					message: "藏品为官方正品",
					data: {
						museum: "**********", //发行方
						checkId: "**********", //交易ID
						transNum: "****", //交易次数
						transId: "**********", //藏品ID
						lastTransaction: {
							sender: "**********", //发送者
							receiver: "**********", //接收者
							collection: "**********",
							time: "**********"
						} //最后一次交易记录
					}
				}
			};
		},
		onLoad(query) {
			uni.$on('emitParams', data => {
				console.log("vmData =", data)
			})
			console.log(query);
			this.collectionId = query.collectionId
			this.transId = query.transId
		},
		onShow() {
			this.getMoreData()
			this.getCheckInfo()
		},
		onLaunch: function() {
			console.log('App Launch');
			uni.getSystemInfo({ //设置屏幕高度
				success: res => {
					//减去tabbar的高度，默认为50px
					this.globalData.screenHeight = res.screenHeight - 50;
				}
			})
		},
		methods: {
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
			getMoreData() {
				uni.$http.get('/home/info/more', {
					collectionId: this.collectionId
				}).then((res) => {
					this.moreData = res
					console.log(this.moreData.data.data.img);
					this.imgURL = this.moreData.data.data.img
					this.collectionName = this.moreData.data.data.name
					this.museum = this.moreData.data.data.museum
					this.dynasty = this.moreData.data.data.dynasty
					this.tag = this.moreData.data.data.tag
					this.feature = this.moreData.data.data.feature
					this.more = this.moreData.data.data.more
				})
			},
			async getCheckInfo() {
				this.checkInfo = await uni.$http.get('/info/trans/check', {
					transId: this.transId
				})
				console.log('this.checkInfo = ', this.checkInfo);
			},
			getTradeData(){
				uni.$http.get('/info/trans/check',{
					transId  : this.transId
				}).then(res=>{
					this.tradeData = res.data
				})
			},
			tradeCollection(){
				uni.$http.post('/info/trans',{
					collectionId: this.collectionId,
					receiver: this.tradePhone,
					transId: this.transId,
				})
			},
			isSpand() {
				console.log();
			}
		}
	}
</script>

<style lang="less">
	.treasureRoot {
		padding-top: 70rpx;
		background-color: #F6F7FB;
		overflow: hidden;
	}

	.title {
		position: relative;
	}

	.title_flex {
		width: 750rpx;
		height: 128rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.titleFont {
		font-size: 50rpx;
	}

	.title_end {
		width: 76rpx;
		height: 76rpx;
	}

	.mainImage {
		width: 755rpx;
	}

	.drawer {
		height: 700rpx;

	}

	.drawerHeader {
		width: 80%;
		margin: 20rpx 20rpx 20rpx 40rpx;
		height: 250rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-size: 30rpx;
		// background-color: #33ccff;
	}

	.iconList {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	.locationAndDynasty {
		color: #BEBEBE;
	}

	.deawerBody {
		font-size: 30rpx;
		margin-left: 40rpx;
		margin-right: 20rpx;
	}

	.deawerBodyTitle {
		font-size: 40rpx;
	}

	.deawerBodyItem {
		margin-top: 15rpx;
		margin-bottom: 15rpx;
	}

	.deawerCard {
		background-color: rgba(78, 87, 126, 100);
		height: 550rpx;
		padding: 30rpx 40rpx 30rpx 40rpx;
		color: white;
		border: 2rpx solid;
		border-radius: 20rpx;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		.deawerCardFont{
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-around;
		}
		.btn{
			margin-top: 40rpx;
			width: 500rpx;
		}
	}
	.tradeFormBox{
		width: 500rpx;
		height: 400rpx;
		background-color: rgba(78, 87, 126, 100);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.miniBtn{
		width: 150rpx;
	}
	.btnLine{
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}
	.ipt{
		width: 80%;
	}
</style>
