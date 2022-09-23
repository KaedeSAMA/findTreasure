<template>
<view>
<checkbox-group name="" @change="change">
	<label>
		<checkbox/><text></text>
	</label>
</checkbox-group>
		<button @click="isCheck">demo</button>

	
</view>
</template>
<script>
	export default {
		data() {
			return {
				qwq:false,
			};
		},
		onLoad() {
		},
		methods: {
			isCheck(){
				console.log(this.qwq);
			},
			change(e){
				this.qwq=!this.qwq
				console.log('qwq');
			}
		},
		mounted(){
			this.isCheck()
		}
	}
</script>