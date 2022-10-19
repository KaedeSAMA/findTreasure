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
					文物详情
				</view>
				<view class="title_end">
					
				</view>
			</view>
		</view>
		<!-- 图片部分 -->
		<view :class="['imageView',isSpand?'':'imageView_spand']">
			<image  :src="imgURL" mode="widthFix" class="mainImage" ></image>
		</view>
		<!-- 文字部分 -->
		<ww-bottom-drawerapp @callExpand="isSpand($event)" :dragHandleHeight="40" :proportionShow="0.5" >
		    <slot>
		        <!--填入你的抽屉View-->
		        <scroll-view :scroll-y="this.isBig" class="drawer">
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
				collectionId:0,
				moreData:{},
				imgURL:'',
				collectionName:'藏品名字七个字',
				museum:'博物馆名七个字',
				dynasty:'朝代名字七个字',
				tag:'标签名字七个字',
				feature:'特征名字七个字',
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
			this.collectionId = query.collectionId
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
				uni.$http.get('/home/info/more',{
					collectionId : this.collectionId
				}).then((res)=>{
					this.moreData = res
					console.log(this.moreData.data.data.img);
					this.imgURL = this.moreData.data.data.img
					this.collectionName = this.moreData.data.data.name
					this.museum = this.moreData.data.data.museum
					this.dynasty = this.moreData.data.data.dynasty
					this.tag = this.moreData.data.data.tag
					this.feature = this.moreData.data.data.feature
					this.more = this.moreData.data.data.more
					this.isLove = this.moreData.data.data.isLove
				})
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
	height: 700rpx;
	
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
