<template>
	<view>
		<view class="header" v-if="isGotLocation&&isGotPois">
		</view>
		<view class="title_flex">
			<view class="titleFont">
				博物馆地图
			</view>
		</view>
		<map 
			name="" 
			class="map" 
			:style="'height:'+(screenHeight * 0.75 )+'px'"
			:longitude="longitude"
			:latitude="latitude"
			:markers="marks"
			:scale="13"
			@markertap="clickMark($event)"
			>
		</map>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				screenHeight:1000,
				adcode : '',
				longitude:'',
				latitude :'',
				isGotLocation:false,
				marks:[],
				nowMarksId:0,
				isGotPois:false,
			};
		},
		onLoad() {
			this.getLocation()
		},
		methods: {
			getLocation(){
				uni.$http1.get('/v3/ip')
				.then((res)=>{
					console.log("IP",res.data);
					this.adcode = res.data.adcode
					this.longitude = (parseFloat(res.data.rectangle.split(';')[0].split(',')[0])+parseFloat(res.data.rectangle.split(';')[1].split(',')[0]))/2
					this.latitude = (parseFloat(res.data.rectangle.split(';')[0].split(',')[1])+parseFloat(res.data.rectangle.split(';')[1].split(',')[1]))/2
					console.log("longitude",this.longitude);
					// 获取完成后flag成为true，控制渲染视图，防止异步问题导致页面崩掉
					this.isGotLocation = true
				}).then(()=>{
					console.log(this.adcode);
					uni.$http1.get('/v3/place/text',{
						keywords :"博物馆",
						types:"140000",
						city :this.adcode
					}).then((res)=>{
						console.log(res.data.pois);
						res.data.pois.map((item)=>{
							let option = {};
							option["longitude"] = item.location.split(",")[0];
							option["latitude"] = item.location.split(",")[1];
							option.id = this.nowMarksId;
							option.name = item.name;
							option.url = item.photos[0].url
							option.address = item.address
							option.adname = item.adname
							option.type = item.type
							this.nowMarksId++;
							option.iconPath = "../../static/icon/iconMarks1.png"
							this.marks.push(option)
							this.$store.commit('pushMuseumList', option)
						})
						console.log("marks",this.marks);
						this.isGotPois = true;
					})
				})
			},
			
			clickMark(e){
				console.log("e",e.detail.markerId);
				console.log("list",this.marks[e.detail.markerId]);
				uni.navigateTo({
					url:`/pages/museumMore/museumMore?id=${e.detail.markerId}`
				})
			}
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
