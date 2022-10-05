<template>
	<view style="margin-top: 80rpx;">
		<u-button text="退出登录" size="large" type="success" color="#fc3912" @click="logOut()"></u-button>
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
				this.$store.state.isLogin = false;
				uni.$u.toast('退出登录成功，即将跳转至首页')
				setTimeout(()=>{
					uni.switchTab({
						url:'/pages/home/home'
					})
				},2500)
			}
		}
	}
</script>

<style lang="less">

</style>
