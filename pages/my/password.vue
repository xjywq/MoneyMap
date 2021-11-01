<template>
	<view class="content">
		<block v-if="hasUserInfo == false">
			<view class="uni-flex uni-row" style="-webkit-justify-content: flex-end;justify-content: flex-end;">
			<image src="@/static/设置.png" style="padding: 3px; width: 25px;height: 25px;" @tap="setup"></image>
			</view>
			<view class="uni-center" style="font-size:0;">
				<image src="/static/default.jpeg" style="border-radius: 50%;text-align: center; width: 70px;height: 70px;"></image>
			<view class="uni-h4 uni-center uni-common-mt">未登录</view>
			<input type="text" v-model="username" placeholder="用户名/邮箱/手机号" />
			<input type="text" v-model="password" password="true" placeholder="密码" />
			<input v-if="check == true" type="text" v-model="password1" password="true" placeholder="确认密码" />
			</view>
			<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
				<button v-if="check == true" type="default" @tap="register">确认</button>
				<button v-if="check == false" type="default" @tap="regis">注册</button>
				<button v-if="check == false" type="default" @tap="login">登录</button>
			</view>
		</block>
		<block v-if="hasUserInfo == true">
			<view class="uni-flex uni-row" style="-webkit-justify-content: flex-end;justify-content: flex-end;">
			<image src="@/static/设置.png" style="width: 30px;height: 30px;" @tap="setup"></image>
			</view>
			<view class="uni-center" style=" font-size:0;">
				<image v-if="avatar_path == ''" src="/static/default.jpeg" style="border-radius: 50%;text-align: center; width: 70px;height: 70px;"></image>
				<image v-else :src="avatar_path" style="border-radius: 50%;text-align: center; width: 70px;height: 70px;"></image>
			</view>
			<view class="uni-h3 uni-center uni-common-mt">{{username}}</view>
			<view class="uni-center" style="background:#FFFFFF; font-size:0;">
				<input v-if="check == true" type="text" v-model="password1" password="true" placeholder="输入新密码" />
			</view>
			<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
				<button v-if="check == false" type="default" @tap="fileLoad">上传头像</button>
				<button v-if="check == true" type="default" @tap="updatePwd">确认</button>
				<button v-if="check == false" type="default" @tap="update">修改密码</button>
				<button class="footer" v-if="check == false" type="default" @tap="logout">退出登录</button>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			console.log(uniCloud.getCurrentUserInfo());
			return {
				username: uni.getStorageSync('uni_id_token'),
				password: '',
				check: false,
				password1: '',
				avatar_path: uni.getStorageSync('avatar_path'+a.username),
				hasUserInfo: uni.getStorageSync('hasUserInfo')
			}
		},
		methods: {
			setup(){
				console.log("nothing happened!")
			},
			regis(){
				this.check= true;
			},
			update(){
				this.check= true;
			},
			register() {
				if (this.password1!=this.password)
				{
					uni.showModal({
						showCancel: false,
						content: "两次输入的密码不同！"
					})}
				else{
				var i=0;
				while (i<this.username.length)
				{
					if ((this.username[i]>='a'&&this.username[i]<='z')||(this.username[i]>='A'&&this.username[i]<='Z')||(i!=0&&this.username[i]>='0'&&this.username[i]<='9'))
						i+=1;
					else
						break;
				}
				if (this.password==''||this.username=='')
				{
					uni.showModal({
						showCancel: false,
						content: "不能为空！"
					})}
				else 
				if (i<this.username.length)
				{
					uni.showModal({
						showCancel: false,
						content: "非法用户名！\n请注意用户名只能由英文字母和数字组成, 且第一个字符必须为英文"
					})}
				else {
					var a = this
				uniCloud.callFunction({
					name: 'uni-id-test',
					data: {
						action: 'register',
						params: {
							username: this.username,
							password: this.password,
							needPermission: this.needPermission
						}
					},
					success(res) {
						console.log(JSON.stringify(res.result))
						if (res.result['errMsg']=="")
						{
						uni.showModal({
							showCancel: false,
							content: "注册成功！"
						})
						a.hasUserInfo = true
						uni.setStorageSync('uni_id_token', a.username)
						uni.setStorageSync('hasUserInfo',true)
						uni.setStorageSync('avatar_path'+a.username,'')
						console.log(res)}
						else
						uni.showModal({
							showCancel: false,
							content: res.result['errMsg']
						})
					},
					fail(e) {
						console.error(e)
						uni.showModal({
							showCancel: false,
							content: '注册失败，请稍后再试'})}
					})
					}}
				this.check= false;
				this.password1= ""
			},
			login() {
				var a = this
				uniCloud.callFunction({
					name: 'uni-id-test',
					data: {
						action: 'login',
						params: {
							username: this.username,
							password: this.password,
							needPermission: this.needPermission
						}
					},
					success(res) {
						if (res.result['errMsg']=="")
						{
						uni.showModal({
							showCancel: false,
							content: "登录成功！"
						})
						console.log(res)
						console.log(uniCloud.getCurrentUserInfo());
						a.hasUserInfo = true
						uni.setStorageSync('uni_id_token', a.username)
						uni.setStorageSync('hasUserInfo',true)
						a.avatar_path=uni.getStorageSync('avatar_path'+a.username)
						else
						uni.showModal({
							showCancel: false,
							content: res.result['errMsg']
						})
					},
					fail(e) {
						console.error(e)
						uni.showModal({
							showCancel: false,
							content: '登录失败，请稍后再试'
						})
					}
				})
			},
			updatePwd() {
				if (this.password1=="")
				{
					uni.showModal({
						showCancel: false,
						content: "密码不能为空！"
					})}
				else{
				var a=this;
				uniCloud.callFunction({
					name: 'uni-id-test',
					data: {
						action: 'updatePwd',
						params: {
							oldPassword: a.password,
							newPassword: a.password1
						}
					},
					success(res) {
						if (res.result['errMsg']=="")
						uni.showModal({
							showCancel: false,
							content: "修改成功"
						})
						else
						uni.showModal({
							showCancel: false,
							content: res.result['errMsg']
						})
					},
					fail(e) {
						console.error(e)
						uni.showModal({
							showCancel: false,
							content: '修改失败，请稍后再试'
						})
					}
				})}
				this.check= false;
			},
			resetPwd() {
				uniCloud.callFunction({
					name: 'uni-id-test',
					data: {
						action: 'resetPwd'
					},
					success(res) {
						if (res.result.code === 0) {
							uni.showModal({
								showCancel: false,
								content: '密码已重置为123456'
							})
						} else {
							uni.showModal({
								showCancel: false,
								content: JSON.stringify(res.result)
							})
						}
					},
					fail(e) {
						console.error(e)
						uni.showModal({
							showCancel: false,
							content: '重置失败，请稍后再试'
						})
					}
				})
			},
			logout(){
				var a= this;
				a.username='';
				a.hasUserInfo=false;
				a.avatar_path='';
				uni.setStorageSync('uni_id_token','');
				uni.setStorageSync('hasUserInfo',false);
			},
			fileLoad() {
				var a= this;
			    uni.chooseImage({
			        count: 1,
			        sizeType: ['compressed'],
			        sourceType: ['album'],
					crop:{
						width: 50,
						height: 50,
					},
			        success: function(res) {
						a.avatar_path=res.tempFilePaths["0"]
						uni.saveFile({
						      tempFilePath: a.avatar_path,
						      success: function (res) {
						        a.avatar_path = res.savedFilePath;
								console.log(a.avatar_path)
						      }
						    });
							
							uni.setStorageSync('avatar_path'+a.username,a.avatar_path)
						uniCloud.callFunction({
							name: 'uni-id-test',
							data: {
								action: 'setavatar',
								params: {
									avatar: a.avatar_path
									},
								},
							success(res){
								console.log(res)
								/*uni.showModal({
									showCancel: false,
									content: JSON.stringify(res.result)
								})*/
							},
							fail(e) {
								console.error(e)
								uni.showModal({
									showCancel: false,
									content: '上传失败，请稍后再试'
								})
							}})
						
							}
			        });
			},
		}
	}
</script>

<style>
	page{
		background-color:#EFEFFF;
		font-family: SIMYOU;
	}
	@font-face {
		font-family: SIMYOU;//字体
		src: url('/static/SIMYOU.ttf');//包路径
	}
	.footer{}
</style>
