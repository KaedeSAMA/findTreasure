<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
		    uni.$on('emitParams',data => {
		        console.log(data)
		    })
		}
	}
</script>

<style lang="less">

</style>
