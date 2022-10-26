<template>
	<view class="settingsRoot">
		<!-- 标题组件 -->
		<my-title title="用户上传"></my-title>
		<view class="formBox" :style="'height:'+(screenHeight * 0.6)+'px'">
			<!-- 上传头像盒子 -->
			<template v-if="showImg">
				<view class="aliginHead uploadAvatar">
					上传藏品图片
				</view>
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" :multiple="true"
					:maxCount="1"></u-upload>
			</template>
			<template v-if="!showImg">
				<view class="aliginHead uploadAvatar">
					名称
				</view>
				<view class="ipt">
					<u--input placeholder="藏品名" border="surround" v-model="name">
					</u--input>
				</view>
				<view class="aliginHead uploadAvatar">
					简介
				</view>
				<view class="ipt">
					<u--input placeholder="简介" border="surround" v-model="description">
					</u--input>
				</view>
				<view class="aliginHead uploadAvatar">
					更多
				</view>
				<view class="ipt">
					<u--input placeholder="更多" border="surround" v-model="more">
					</u--input>
				</view>
				<view class="aliginHead uploadAvatar">
					特征
				</view>
				<view class="ipt">
					<u--input placeholder="特征" border="surround" v-model="feature">
					</u--input>
				</view>
				<view class="aliginHead uploadAvatar">
					位置
				</view>
				<view class="ipt">
					<u--input placeholder="位置" border="surround" v-model="location">
					</u--input>
				</view>
				<u-button text="提交" size="large" type="success" @click="commitForm()"></u-button>
			</template>
		</view>
	</view>
</template>

<script>
	import myTitle from "../../components/myTitle.vue"
	export default {
		components: {
			myTitle,
		},
		data() {
			return {
				fileList1: [],
				name: '',
				description: '',
				more: '',
				feature: '',
				location: '',
				screenHeight: 1000,
				showImg: false,
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
				console.log("url", url)
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						fileType: 'image',
						header: {
							token: uni.getStorageSync('tokenCode'), //读取本地保存好的上一次cookie
							// 'content-type': 'multipart/form-data'
						},
						url: 'http://haorui.xyz:8085/add/img', // 仅为示例，非真实的接口地址
						filePath: url,
						// file : url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							uni.showToast({
								title: '上传成功，即将跳转到首页',
								icon: 'none'
							});
							setTimeout(() => {
								uni.navigateBack({delta:1});
								resolve(res.data.data)
							}, 1000)
						},
						fail: (err) => {
							console.log(err)
						}
					});
				})
			},
			commitForm() {
				uni.$http.post('/add/content', {
					name: this.name,
					description: this.description,
					dynastyId: 15,
					tagId: 8,
					more: this.more,
					feature: this.feature,
					location: this.location,
					museumId: 11,
				}).then((res) => {
					console.log(res.data);
					if (res.data.code === "00000") {
						uni.showToast({
							title: '上传成功',
							icon: 'none',
						});
						this.showImg = true;
					}
				})
			}
		},
		onShow() {
			this.screenHeight = getApp().globalData.screenHeight
		}
	}
</script>

<style>
	.settingsRoot {
		margin: 70rpx 30rpx 0 30rpx;
	}

	.formBox {
		width: 100%;
		margin-top: 120rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
	}

	.aliginHead {
		margin: 20rpx 0 20rpx 0;
		align-self: flex-start;
	}
</style>
