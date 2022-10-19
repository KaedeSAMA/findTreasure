<template>
	<view class="recommendRoot" :style="'height:'+(screenHeight-25)+'px'">
		<!-- 中间的白色卡片 -->
		<view class="whiteCard">
			<!-- 时间部分 -->
			<view class="date">
				<view class="yearAndWeek" >
					<view class="dateTime"><text class="dateTimeFirst" v-text="date.time.firstTime"></text><text v-text="date.time.secondTime"></text></view>
					<view v-text="date.weekNum"></view>
				</view>
				<view class="farmerDay">
					<view></view>
					<view  v-text="date.calendar"></view>
				</view>
			</view>
			<!-- 图片部分 -->
			<image :src="recommendData.img" mode="widthFix" class="img"></image>
			<!-- 名字简介部分 -->
			<view class="bottomDiscription">
				<view class="discriptionTitle">
					{{recommendData.name}}
				</view>
				<view class="discription" v-text="recommendData.description">
					
				</view>
			</view>
			<!-- 上划查看详情 -->
			<view class="pullToTreasure">
				<view >
					上划查看详情
				</view>
				<!-- icon -->
				<image src="../../static/icon/iconPark-drop-down-list@1x.png" mode="" class="icon"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: getApp().globalData.screenHeight,
				recommendData:{},
				date:{
					calendar:'',
					time : {
						firstTime :"8",
						secondTime : "/10/2020",
					},
					weekNum:'',
				},
				timeCount:0,
			};
		},
		onLoad(){
			this.getRecommend()
			this.getDate()
			this.timeCount = setTimeout(()=>{
				uni.switchTab({
					url:'/pages/home/home'
				})
			},5000)
			//debug
			// console.log('计时器',this.timeCount);
		},
		onReachBottom(){
			clearTimeout(this.timeCount)
			uni.navigateTo({
				url:`/pages/treasure/treasure?collectionId=${this.recommendData.id}`
			})
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
			},
			getDate(){
				uni.$http.get('/recommend/date').then(res=>{
					console.log(res.data.data);
					this.date = res.data.data
					let first = res.data.data.time.split('')[0]
					let second = ''
					let firstChar = false
					res.data.data.time.split('').map(val=>{
						if (firstChar){
							second += val
							// console.log(second);
						}else{
							firstChar = true
						}
					})
					close(second)
					this.date.time = {
						firstTime : first,
						secondTime : second
					}
					console.log(this.date);
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
	color: #4E577E;
}
.whiteCard{
	width: 670rpx;
	height: 85%;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	.date{
		font-size: 36rpx;
		width: 82%;
		height: 14%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.yearAndWeek{
			height: 90%;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-between;
			.dateTime{
				.dateTimeFirst{
					font-size: 100rpx;
				}
			}
		}
		.farmerDay{
			height: 90%;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-between;
		}
	}
	.bottomDiscription{
		width: 78%;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-evenly;
		.discriptionTitle{
			font-size: 40rpx;
			-webkit-line-clamp: 1;    /*用来限制在一个块元素显示的文本的行数*/
			display: -webkit-box;    /*必须结合的属性，将对象作为弹性伸缩盒子模型显示*/
			-webkit-box-orient: vertical;    /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式*/
			overflow: hidden;
			word-break: break-all;
		}
	}
}
.img{
	width: 650rpx;
}
.icon{
	width: 48rpx;
	height: 48rpx;
}
.discription{
    -webkit-line-clamp: 3;    /*用来限制在一个块元素显示的文本的行数*/
    display: -webkit-box;    /*必须结合的属性，将对象作为弹性伸缩盒子模型显示*/
    -webkit-box-orient: vertical;    /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式*/
    overflow: hidden;
    word-break: break-all;
	font-size: 28rpx;
}
.pullToTreasure{
	height: 10%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
}
</style>
