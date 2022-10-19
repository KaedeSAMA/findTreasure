<template>
	<view class="treasureRoot">
<!-- 		<view class="" @click="backPageTo(2)">
			back{{collectionId}}
		</view>
		 -->
		<!-- 标题 -->
		<view class="title">
			<view class="title_flex">
				<u--image  @click="backPage()" src="../../static/icon/iconPark-left Copy@1x.png" mode="" width="76rpx" height="76rpx"></u--image>
				<view class="titleFont">
					博物馆详情
				</view>
				<view class="title_end">
					
				</view>
			</view>
		</view>
		<!-- 图片部分 -->
		<view :class="['imageView',isSpand?'':'imageView_spand']">
			<image  :src="museumInfo.url" mode="widthFix" class="mainImage" ></image>
		</view>
		<!-- 文字部分 -->
		<ww-bottom-drawerapp 
			@callExpand="isSpand($event)" 
			:dragHandleHeight="40" 
			:proportionShow="0.5" 
			:isExpand="true"
		>
		    <slot>
		        <!--填入你的抽屉View-->
		        <scroll-view :scroll-y="this.isBig" class="drawer">
					<!-- 头部 -->
					<view class="drawerHeader">
						<!-- 名字 -->
						<view class="">{{museumInfo.name}}</view>
						<!-- 时间和地点 -->
						<view>
							<view class="locationAndDynasty">地点:{{museumInfo.adname}}</view>
							<view class="locationAndDynasty">标签:{{museumInfo.type}}</view>
						</view>
						<!-- icon图标 -->
						<view class="iconList">
							<u--image  v-show="this.isLove == false" src="../../static/icon/tabNameLike.png" mode="" width="38rpx" height="38rpx" @click="addLike()"></u--image>
							<u--image v-show="this.isLove == true" src="../../static/icon/iconParkLike.png" mode="" width="38rpx" height="38rpx" @click="addLike()"></u--image>
							<u--image   src="../../static/icon/iconParkShare.png" mode="" width="38rpx" height="38rpx"></u--image>
							<u--image   src="../../static/icon/iconParkComment.png" mode="" width="38rpx" height="38rpx"></u--image>
						</view>
					</view>
					<!-- 分割线 -->
					<u-divider text="分割线" :dot="true"></u-divider>
					<!-- 抽屉 -->
					<view class="deawerBody">
						<view class="deawerBodyItem deawerBodyTitle">
							博物馆信息
						</view>
						<view class="deawerBodyItem">名称: {{museumInfo.name}}</view>
						<view class="deawerBodyItem">博物馆地点: {{museumInfo.adname}}</view>
						<view class="deawerBodyItem">地址: {{museumInfo.address}}</view>
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
				museumId : 0,
				moreData:{},
				imgURL:'',
				museumInfo:{},
				more:'',
				isLove:false,
				pageStack:[],
				isBig:false,
			};
		},
		onLoad(query) {
		    uni.$on('emitParams',data => {
		        console.log("vmData =",data)
		    })
			console.log(query);
			this.museumId = query.id
			this.getMoreData()
			//debug
			getCurrentPages().map(val=>{
				this.pageStack.push(val.route)
			})
			console.log('pageStack = ',this.pageStack);
		},
		onShow(){
			this.getMoreData()
		},
		onBackPress(e) {
		    if (e.from == "backbutton") {
				//debug
		         // console.log("用户使用了物理返回键");
		         //在这里操作代码
				 this.backPage()
		        return true//如果不写就会返回
		    }
		},
		onLaunch: function() {
			console.log('App Launch');
			uni.getSystemInfo({ //设置屏幕高度
				success: res => {
					//减去tabbar的高度，默认为50px
					this.globalData.screenHeight = res.screenHeight - 50;
				}
			})
			//debug
		},
		methods:{
			changePageTo(val) {
				uni.navigateTo({
					url: val
				})
			},
			backPage(){
				if (this.pageStack[this.pageStack.length-2] === "pages/recommend/recommend"){
					// console.log(this.pageStack[this.pageStack.length-2]);
					uni.switchTab({
						url:'/pages/home/home'
					})
				}else{
					uni.navigateBack({
						delta:1
					})
				}
			},
			backPageTo(val) {
				
				console.log('current Page',getCurrentPages());
				uni.navigateBack({
					delta: val
				});
			},
			getMoreData(){
				this.museumInfo = this.$store.state.museumList[this.museumId]
				console.log("this.museumInfo",this.museumInfo);
			},
			isSpand(e){
				// console.log(e);
				if (e.value === true){
					this.isBig = true
				}else{
					this.isBig = false
				}
			},
			addLike(){
				console.log(this.moreData.data.data);
				if(this.isLove == false){
					uni.$http.post('/home/info/collect',{
						collectionId : this.collectionId
					}).then((res)=>{
						// console.log(res.data.code);
						if(res.data.code == '00000'){
							this.isLove = true
						}else{
							uni.$u.toast('收藏失败')
						}
					})
				}else{
					uni.$http.post('/home/info/cancel',{
						collectionId : this.collectionId
					}).then((res)=>{
						// console.log(res.data.code);
						if(res.data.code == '00000'){
							this.isLove = false
						}else{
							uni.$u.toast('取消收藏失败')
						}
					})
				}
			},
		}
	}
</script>

<style lang="less">
.treasureRoot{
padding-top: 70rpx;
background-color: #F6F7FB;
overflow: hidden;
}
.title{
	position: relative;
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
.mainImage{
	width: 755rpx;
}
.drawer{
	height: 1000rpx;
	
}
.drawerHeader{
	width: 80%;
	margin: 20rpx 20rpx 20rpx 40rpx;
	height: 250rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	font-size: 30rpx;
	// background-color: #33ccff;
}
.iconList{
	width: 50%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
.locationAndDynasty{
	color: #BEBEBE;
}
.deawerBody{
	font-size: 30rpx;
	margin-left: 40rpx;
	margin-right: 20rpx;
}
.deawerBodyTitle{
	font-size: 40rpx;
}
.deawerBodyItem{
	margin-top: 15rpx;
	margin-bottom: 15rpx;
}
</style>
