<template>
	<view class="recommendRoot" :style="'height:'+screenHeight+'px'">
		{{screenHeight}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: getApp().globalData.screenHeight
			};
		},
		mounted(){
			console.log(this.screenHeight);
		}

	}
</script>

<style lang="less">
.recommendRoot{
	
}
</style>
