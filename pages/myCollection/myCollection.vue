<template>
	<view class="myCollectionRoot">
		<view class="title">
			我的藏品
		</view>
		<my-collection-card v-for="item in collectionList" :key="item.collectionId" :transId="item.transId" :collectionId="item.collectionId" :name="item.name" :imgURL="item.img"></my-collection-card>
	</view>
</template>

<script>
	import myCollectionCard from "../../components/myCollectionCard"
	export default {
		data() {
			return {
				collectionList:[],
			};
		},
		components:{
			myCollectionCard,
		},
		methods:{
			async getCollectionList(){
				this.collectionList = await uni.$http.get('/info/trans/all')
				console.log('res data = ',this.collectionList.data.data.blockParamList);
				this.collectionList = this.collectionList.data.data.blockParamList
				console.log('this.collectionList =',this.collectionList);
			},
			
		},
		onLoad(){
			this.getCollectionList()
		}
	}

</script>

<style lang="less">
.myCollectionRoot{
	width: 750rpx;
	min-height: 1500rpx;
	background-color: rgba(78, 87, 126, 100);
	display: flex;
	flex-direction: column;
	align-items: center;
	
}
.title{
	padding-top: 70rpx;
	margin-bottom: 15rpx;
	color: white;
	font-size: 58rpx;
	
}
</style>
