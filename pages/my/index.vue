<template>
	<view class="content">
		<!-- <view class="uni-flex uni-row" style="-webkit-justify-content: flex-end;justify-content: flex-end;">
			<image src="@/static/setting.png" style="padding: 3px; width: 25px;height: 25px;" @tap="setup"></image>
		</view> -->
		<block v-if="hasUserInfo == false">
			<view class="uni-center" style="font-size:0; padding-left: 70rpx; padding-right: 100rpx; padding-top: 150rpx;">
				<image src="/static/default.jpeg"
					style="border-radius: 50%;text-align: center; width: 70px;height: 70px;"></image>
				<view class="uni-h2 uni-center uni-common-mt">未登录</view>
				<input type="text" v-model="username" placeholder="用户名/邮箱/手机号" />
				<input type="text" v-model="password" password="true" placeholder="密码" />
				<input v-if="check == true" type="text" v-model="password1" password="true" placeholder="确认密码" />
			</view><br>
			<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
				<el-button v-if="check == true" class="elbtn" style="font-size: 30rpx; width: 600rpx;" type="success" @tap="register">确认</el-button>
				<el-button v-if="check == false" class="elbtn" style="font-size: 30rpx;" type="success" @tap="regis">注册</el-button>
				<el-button v-if="check == false" class="elbtn" style="font-size: 30rpx;" type="primary" @tap="login">登录</el-button>
			</view><br>
		</block>

		<block v-if="hasUserInfo == true"> <!-- v-if="hasUserInfo == true" -->
			<view @click="fileLoad" class="uni-center" style="font-size:0; padding-left: 70rpx; padding-right: 100rpx; padding-top: 150rpx;">
				<image v-if="avatar_path == ''" src="/static/default.jpeg"
					style="border-radius: 50%;text-align: center; width: 70px;height: 70px;"></image>
				<image v-else :src="avatar_path"
					style="border-radius: 50%;text-align: center; width: 70px;height: 70px;"></image>
			</view>
			<view class="uni-h2 uni-center">{{username}}</view>
			<view class="uni-center" style="background:#FFFFFF; font-size:0;">
				<input v-if="check == true" type="text" v-model="password" password="true" placeholder="输入旧密码" />
				<input v-if="check == true" type="text" v-model="password1" password="true" placeholder="输入新密码" />
			</view><br>
			<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
				<!-- <button v-if="check == false" type="default" @tap="fileLoad">上传头像</button> -->
				<el-button v-if="check == true" class="elbtn" style="font-size: 30rpx; width: 600rpx;" type="primary" @tap="updatePwd">确认</el-button>
				<el-button v-if="check == false" class="elbtn" style="font-size: 30rpx;" type="success" @tap="update">修改密码</el-button>
				<el-button v-if="check == false" class="elbtn" style="font-size: 30rpx;" type="warning" @tap="logout">退出登录</el-button><br>
			</view>
			<view class="uni-btn-v" style="text-align: center;">
				<el-button v-if="check == false" class="elbtn" style="width: 600rpx; font-size: 30rpx;" type="primary" @tap="upload_confirm">上传数据</el-button>
				<el-button v-if="check == false" class="elbtn" style="width: 600rpx; font-size: 30rpx;" type="primary" @tap="restore">恢复数据</el-button>
			</view><br>
		</block>
		<view class="uni-btn-v" style="text-align: center;">
			<el-button type="danger" class="elbtn" style="width: 600rpx; font-size: 30rpx;" @click="Droptable">清除数据</el-button>
		</view>
		<view class="uni-btn-v" style="text-align: center;">
			<el-button type="primary" class="elbtn" style="width: 600rpx; font-size: 30rpx;" @tap="navigateTo">设置标签</el-button>
		</view>
	</view>
</template>

<script>
	import {
		moveTable,
		droptable,
		checktable
	} from '@/common/DB_method.js'
	export default {
		data() {
			var username = uni.getStorageSync('uni-id');
			if (!username) {
				username = 'initial';
			}
			return {
				check: false,
				db: 'moneymap',
				password: '',
				password1: '',
				hasUserInfo: uni.getStorageSync('hasUserInfo'),
				username: username,
				avatar_path: uni.getStorageSync('avatar_path'),
			}
		},
		methods: {
			navigateTo() {
				uni.navigateTo({
					url: 'set_tag'
				})
			},
			setup() {
				console.log("nothing happened!");
			},
			regis() {
				this.check = true;
			},
			update() {
				this.check = true;
			},
			register() {
				if (this.password1 != this.password) {
					uni.showModal({
						showCancel: false,
						content: "两次输入的密码不同！"
					})
				} else {
					var i = 0;
					while (i < this.username.length) {
						if ((this.username[i] >= 'a' && this.username[i] <= 'z') || (this.username[i] >= 'A' && this
								.username[i] <= 'Z') || (i != 0 && this.username[i] >= '0' && this.username[i] <= '9'))
							i += 1;
						else
							break;
					}
					if (this.password == '' || this.username == '') {
						uni.showModal({
							showCancel: false,
							content: "不能为空！"
						})
					} else if (i < this.username.length) {
						uni.showModal({
							showCancel: false,
							content: "非法用户名！\n请注意用户名只能由英文字母和数字组成, 且第一个字符必须为英文"
						})
					} else {
						uniCloud.callFunction({
							name: 'uni-id-test',
							data: {
								action: 'register',
								params: {
									username: this.username,
									password: this.password,
									needPermission: false
								}
							},
							success(res) {
								console.log(JSON.stringify(res.result))
								if (res.result['errMsg'] == "") {
									uni.showModal({
										showCancel: false,
										content: "注册成功！"
									})
									a.hasUserInfo = true
									a.password = '';
									a.password1 = '';
									uni.setStorageSync('uni-id', a.username)
									uni.setStorageSync('hasUserInfo', true)
									uni.setStorageSync('avatar_path', '')
									moveTable(a.db, a.username, 'initial');
									droptable(a.db, 'initial')
								} else
									uni.showModal({
										showCancel: false,
										content: res.result['errMsg']
									})
							},
							fail(e) {
								console.error(e)
								uni.showModal({
									showCancel: false,
									content: '注册失败，请稍后再试'
								})
							}
						})
					}
				}
				this.check = false;
				this.password1 = ""
			},
			restore() {
				var a = this;
				uni.showModal({
					title: '警告',
					showCancel: true,
					content: '您确定要从云端恢复数据吗?\n本地数据将会被覆盖',
					success(res) {
						if (res.confirm) {
							plus.sqlite.selectSql({
								name: a.db,
								sql: 'select 1 from ' + a.username+'_backup',
								success: function(e) {
									droptable(a.db, a.username)
									moveTable(a.db, a.username, a.username+'_backup');
								},
								fail: function(e) {
									uni.showToast({
										icon: 'error',
										title: "备份不存在!"
									})
								}
							});
						}
					}
				})
			},
			login() {
				var a = this
				uniCloud.callFunction({
					name: 'uni-id-test',
					data: {
						action: 'login',
						params: {
							username: a.username,
							password: a.password,
							needPermission: false
						}
					},
					success(res) {
						if (res.result['errMsg'] == "") {
							uni.showModal({
								showCancel: false,
								content: "登录成功！"
							})
							a.hasUserInfo = true
							a.password = '';
							a.password1 = '';
							uni.setStorageSync('uni-id', a.username);
							uni.setStorageSync('hasUserInfo', true);
							uni.setStorageSync('avatar_path', '');
							moveTable(a.db, a.username, 'initial');
						} else
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
				if (this.password1 == "") {
					uni.showModal({
						showCancel: false,
						content: "密码不能为空！"
					})
				} else {
					var a = this;
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
							if (res.result['errMsg'] == "") {
								uni.showModal({
									showCancel: false,
									content: "修改成功"
								});
								a.password = '';
								a.password1 = '';
							} else
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
					})
				}
				this.check = false;
			},
			resetPwd() {
				uniCloud.callFunction({
					name: 'uni-id-test',
					data: {
						action: 'resetPwd',
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
			logout() {
				var a = this;
				uni.showModal({
					title: '警告',
					showCancel: true,
					content: '您确定要退出登录吗?\n再次登录以恢复数据',
					success(res) {
						if (res.confirm) {
							a.username = '';
							a.hasUserInfo = false;
							a.avatar_path = '';
							uni.setStorageSync('uni-id', '');
							uni.setStorageSync('avatar_path', '');
							uni.setStorageSync('hasUserInfo', false);
						}
					}
				})
			},
			fileLoad() {
				var a = this;
				uni.showActionSheet({
					itemList: ["查看头像", "从相册选择图片"],
					success(e) {
						var index = e.tapIndex
						if (index === 0) {
							if (a.avatar_path == '') {
								a.avatar_path = '/static/default.jpeg';
							}
							let arr = [a.avatar_path]
							uni.previewImage({
								urls: arr
							})
						} else if (index === 1) {
							uni.chooseImage({
								count: 1,
								sizeType: ['compressed'],
								sourceType: ['album'],
								crop: {
									width: 100,
									height: 100,
								},
								success: function(res) {
									a.avatar_path = res.tempFilePaths["0"]
									uni.saveFile({
										tempFilePath: a.avatar_path,
										success: function(res) {
											a.avatar_path = res.savedFilePath;
											console.log(a.avatar_path)
										}
									});

									uni.setStorageSync('avatar_path', a.avatar_path)
									uniCloud.callFunction({
										name: 'uni-id-test',
										data: {
											action: 'setavatar',
											params: {
												avatar: a.avatar_path
											},
										},
										success(res) {
											console.log(res)
										},
										fail(e) {
											console.error(e)
											uni.showModal({
												showCancel: false,
												content: '上传失败，请稍后再试'
											})
										}
									})
								}
							});
						}
					}
				});
			},
			Droptable: function() {
				var a = this;
				uni.showModal({
					title: '警告',
					content: '您确定要清楚当前全部数据吗, 此操作不可逆!',
					confirmColor: '#FF0000',
					success(res) {
						if (res.confirm) {
							droptable(a.db, a.username);
						}
					}
				})
			},
			
			upload_confirm: function() {
				var a = this;
				uni.showModal({
					title: '确认信息',
					content: '您确定要将数据上传吗\n我们不会泄露您的个人信息',
					confirmColor: '#44AAFF',
					success(res) {
						if (res.confirm) {
							droptable(a.db, a.username+'_backup');
							moveTable(a.db, a.username+'_backup', a.username);
							a.update();
						}
					}
				})
			},
			
			update: function() {
				uni.navigateTo({
					url: "share"
				});
			}
		},
	}
</script>

<style>
	input {
		display: block;
		width: 100%;
		height: 34px;
		padding: 6px 12px;
		font-size: 14px;
		line-height: 1.428571429;
		vertical-align: middle;
		background-color: #FFFFFF;
		border-radius: 4px;
		transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	}
	
	.elbtn {
		width: 300rpx;
		height: 60rpx;
		line-height: 45rpx;
		font-size: 30rpx;
		margin-top: 20rpx;
	}

</style>
