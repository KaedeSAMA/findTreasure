<template>
	<view class="settingsRoot">
		<!-- 标题组件 -->
		<my-title title="设置个人信息"></my-title>
		<view class="formBox" :style="'height:'+(screenHeight * 0.35)+'px'">
			<!-- 上传头像盒子 -->
			<view class="aliginHead uploadAvatar">
				上传用户头像
			</view>
			<u-upload
				:fileList="fileList1"
				@afterRead="afterRead"
				@delete="deletePic"
				name="1"
				:multiple = "true"
				:maxCount="1"
			></u-upload>
			<view class="aliginHead uploadAvatar">
				修改昵称
			</view>
			<view class="ipt">
				<u--input
				    placeholder="请输入昵称"
				    border="surround"
				    v-model="nickName"
				>
				</u--input>
			</view>
			<view class="aliginHead uploadAvatar">
				修改个性签名
			</view>
			<view class="ipt">
				<u--input
				    placeholder="请输入签名"
				    border="surround"
				    v-model="sign"
				>
				</u--input>
			</view>
			<u-button text="修改信息" size="large" type="success" @click="commitForm()"></u-button>
		</view>
	</view>
</template>

<script>
import myTitle from "../../components/myTitle.vue"
	export default {
		components:{
			myTitle,
		},
		data() {
			return {
				fileList1: [],
				nickName:'',
				sign:'',
				screenHeight:1000,
				
			}
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				console.log('afterRead');
				let lists = [].concat(event.file)
				console.log(this[`fileList${event.name}`]);
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				// for (let i = 0; i < lists.length; i++) {
				for (let i = 0; i < 1; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				console.log(typeof url)
				console.log("url",url)
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						fileType:'image',
						header: {
							token:uni.getStorageSync('tokenCode'), //读取本地保存好的上一次cookie
							// 'content-type': 'multipart/form-data'
						},
						url: 'http://haorui.xyz:8085/personal/set/head', // 仅为示例，非真实的接口地址
						filePath: url,
						// file : url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						},
						fail:(err)=>{
							console.log(err)
						}
					});
				})
			},
			commitForm(){
				uni.$http.post('')
			}
		},
		onShow(){
			this.screenHeight = getApp().globalData.screenHeight
		}
	}
</script>

<style>
.settingsRoot{
	margin: 70rpx 30rpx 0 30rpx;
}
.formBox{
	width: 100%;
	margin-top: 120rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
}
.aliginHead{
	margin: 25rpx 0 55rpx 0;
	align-self: flex-start;
}
</style>
