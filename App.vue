<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			uni.getSystemInfo({ //设置屏幕高度
				success: res => {
					//减去tabbar的高度，默认为50px
					this.globalData.screenHeight = res.screenHeight;
					console.log('screenH = ',this.globalData.screenHeight);
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
