<template>
	<view @click="logOut()" style="margin-top: 300rpx;">
		点我退出登陆
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			logOut(){
				uni.setStorageSync('tokenCode', '');
				this.$store.state.isLogin = false
			}
		}
	}
</script>

<style lang="less">

</style>
