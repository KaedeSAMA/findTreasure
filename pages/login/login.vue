<template>
	<view class="loginRoot">
		<!-- 头部标题栏，里面三个div是图标，文字和按钮 -->
		<view class="title">
			<view class="title_back">
				<u-icon name="arrow-leftward" color="rgb(16, 16, 16)" size="20" @click="backToUser()"></u-icon>
				<view class="title_font">返回</view>
			</view>
			<!-- debug -->
			<!-- <view class="title_font">密码登录</view> -->
		</view>
		<!-- 头部标题栏的图片 -->
		<view class="titleImage">
			<view>觅 宝</view>
		</view>
		<!-- 主输入框，里面两个input用来输账号密码 -->
		<view class="mainInput">
			<!-- 两个输入框共用一个inputDiv选择器 -->
			<!-- 第一个输入框：手机号框 -->
			<view class="inputDiv">
				<view class="plus86">+86</view>
				<u--input placeholder="请输入手机号码" border="none" v-model="phone" fontSize="32rpx"></u--input>
				<!-- 验证码的小竖线 -->
				<view class="verticalLine"></view>
				<!-- 发送验证码组件 -->
				<view class="uCode">
					<u-code ref="uCode2" @change="codeChange" keep-running start-text="获取验证码"></u-code>
					<text @tap="getCode" :text="uCodetips" class="uCodeFont">{{uCodetips}}</text>
				</view>
			</view>
			<!-- 第二个输入框：验证码框 -->
			<view class="inputDiv">
				<view class="justCode">
					验证码
				</view>
				<u--input placeholder="请输入验证码" border="none" v-model="justCode" fontSize="32rpx"></u--input>
			</view>
		</view>
		<!-- 注册按钮 -->
		<view class="loginBtnDiv">
			<u-button text="验证登录" size="large" type="success" color="#4E577E" @click="login()"></u-button>
		</view>
		<!-- 开发者协议 -->
		<view class="agreement">
			<!-- 勾选用户协议盒子 -->
			<view class="pendingBlock">
				<checkbox-group name="" @change="changeIsAgree">
					<label>
						<checkbox style="transform: scale(0.7)" /><text></text>
					</label>
				</checkbox-group>
				<view class="pendingFont">
					我已阅读并同意
					<text class="blue">用户协议和隐私政策</text>
					，未注册绑定的手机号验证成功后将自动注册
				</view>
			</view>
			<!-- 查看帮助盒子 -->
			<view class="findHelp">遇到问题？
				<text class="blue">查看帮助</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uCodetips: '',
				phone: '',
				isAgree: false,
				justCode: ''
			};
		},
		methods: {
			codeChange(text) {
				this.uCodetips = text;
			},
			checkMobile(telphone) {
				let isChinaMobile = /^134[0-8]\d{7}$|^(?:13[5-9]|147|15[0-27-9]|178|18[2-478])\d{8}$/; //移动方面最新答复 
				let isChinaUnion = /^(?:13[0-2]|145|15[56]|166|176|18[56])\d{8}$/; //向联通微博确认并未回复 
				let isChinaTelcom = /^0?(133|149|153|17[34]|177|18[01]|189|199)\d{8}$/; //1349号段 电信方面没给出答复，视作不存在 
				let isOtherTelphone = /^170\\d{7}$/; //其他运营商
				if (telphone.length !== 11) {
					return false
				} else {
					if (isChinaMobile.test(telphone)) {
						return true;
					} else if (isChinaUnion.test(telphone)) {
						return true;
					} else if (isChinaTelcom.test(telphone)) {
						return true;
					} else if (isOtherTelphone.test(telphone)) {
						var num = isOtherTelphone.exec(telphone);
						return true;
					} else {
						return false;
					}
				}
			},
			getCode() {
				//debug
				//这里以后要优化表单验证
				if (this.$refs.uCode2.canGetCode) {
					if (this.isAgree === true) {
						if (this.checkMobile(this.phone)) {
							console.log('开始发送请求')
							// 模拟向后端请求验证码
							uni.showLoading({
								title: '正在获取验证码'
							})
							uni.$http.post("/send", {
								phoneNum: this.phone,
								// type传1是登录，传2是注册
								// 不知道后端为啥这么写
							}).then((res) => {
								console.log(res)
								uni.hideLoading();
								// 这里此提示会被this.start()方法中的提示覆盖
								uni.$u.toast('验证码已发送');
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode2.start();
							})
							// setTimeout(() => {
							// }, 2000);
						} else {
							uni.$u.toast('请输入正确的手机号');
						}

					} else {
						uni.$u.toast('请勾选同意用户协议后再操作');
					}

				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			async login() {
				if (this.isAgree === true) {
					if (this.checkMobile(this.phone)) {
						console.log('开始发送请求')
						const res = await uni.$http.post('/login', {
							phoneNum: this.phone,
							verificationCode: this.justCode
						})
						//debug
						// console.log("res.data.data=",res.data.data)
						//判断是否有cookie
						if (res.data.data){
							//存cookie
							uni.setStorageSync('tokenCode', res.data.data);
							this.$store.commit('modifyIsLogin', {isLogin:true})
							uni.$u.toast('登录成功，即将跳转到首页。')
							setTimeout(()=>{
								uni.switchTab({
									url: '/pages/home/home'
								});
							},1000)
						}
						console.log('getCookie',uni.getStorageSync('tokenCode'))
						
					} else {
						uni.$u.toast('请输入正确的手机号');
					}
				
				} else {
					uni.$u.toast('请勾选同意用户协议后再操作');
				}
				

			},
			changeIsAgree() {
				this.isAgree = !this.isAgree
			},
			changePageTo(val) {
				uni.navigateTo({
					url: val
				})
			},
			backPageTo(val) {
				uni.navigateBack({
					delta: val
				});
			},
			backToUser(){
				uni.switchTab({
					url: '/pages/home/home'
				});
			},
			initStack(){
				let pages = getCurrentPages()
				console.log('pages路由数组是：',pages);
				console.log('当前的页面栈第一个页面的路由为：',pages[0].route)
			}
		},
		onShow(){
			this.initStack()
		},
		onBackPress(e) {
		    if (e.from == "backbutton") {
				//debug
		         console.log("用户使用了物理返回键");
		         //在这里操作代码
				 uni.switchTab({
				 	url:'/pages/home/home'
				 })
		        return true//如果不写就会返回
		    }
		},
	}
</script>

<style lang="less">
	.blue {
		color: rgb(46, 134, 255);
	}

	.loginRoot {
		padding-top: 55rpx;
		display: flex;
		flex-direction: column;
		align-items: center
	}

	.title {
		width: 700rpx;
		height: 116rpx;
		//颜色调试盒子大小
		// background-color: #3f3f3f;
		//左右内边距避免左右顶格
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.title_back {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

		}

	}

	.title_font {
		padding-left: 10rpx;
		font-size: 38rpx;
	}

	.titleImage {
		width: 100%;
		color: white;
		font-family: PMZDBiaoTi-regular;
		font-size: 56rpx;
		// background-color: #31406B;
		background: url('../../static/icon/loginBack.png') no-repeat;
		background-size: cover;
		height: 154rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.mainInput {
		.inputDiv {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin: 0 30rpx 0 30rpx;
			height: 120rpx;
			border-bottom: rgba(0, 0, 0, 10%) solid 2rpx;

			.plus86 {

				width: 150rpx;
				font-size: 32rpx;
			}

			.verticalLine {
				background-color: rgba(0, 0, 0, 10%);
				width: 2rpx;
				height: 70rpx;
				margin-right: 44rpx;
			}
		}
	}

	.uCodeFont {
		color: rgb(46, 134, 255);
	}

	.justCode {
		width: 150rpx;
		font-size: 32rpx;
	}

	.loginBtnDiv {
		width: 700rpx;
		padding: 0 25rpx 0 25rpx;
		height: 102rpx;
		margin: 40rpx 0 40rpx 0;
	}

	.agreement {
		font-size: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #9a9a9a;

		.pendingBlock {
			width: 700rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			align-items: flex-start;

			.pendingFont {
				width: 650rpx;
				font-size: 30rpx;
				line-height: 52rpx;
			}
		}
	}

	.findHelp {
		width: 280rpx;
		margin-top: 30rpx;
	}
</style>
