<template>
	<view class="uni-max-wrap">
		<swiper class="swiper" circular :indicator-dots="false" :autoplay="false">
			<swiper-item>
				<view class="uni-header-text">
					<text>支出</text>
				</view>
				<view class="uni-padding-wrap uni-common-mt">
					<form @submit="formSubmit" @reset="formReset" ref="submit_form">
						<view class="uni-form-item uni-column">
							<view class="title">价格</view>
							<input class="uni-input" v-model="price" number="true" name="price" focus
								placeholder="请输入价格" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">标签</view>
							<radio-group name="tag">
								<view class="uni-list-cell" v-for="item in select_out">
									<view>
										<radio id="item.value" :value="item" :checked="true"></radio>
										<image class="image" mode="widthFix" :src="img_src[item]" />
									</view>
									<label class="label-2-text">
										<text>{{item}}</text>
									</label>
								</view>
							</radio-group>
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">必要</view>
							<view>
								<switch name="isimportant" checked="true" />
							</view>
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">备注</view>
							<input class="uni-input" v-model="comment" name="comment" placeholder="备注" />
						</view>
						<view class="uni-btn-v" >
							<el-button type="success" class="elbtn" form-type="submit" style="font-size: 30rpx;">确认</el-button>
							<el-button type="info" class="elbtn" @click="formReset" style="font-size: 30rpx;">返回</el-button>
						</view>
					</form>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="uni-header-text">
					<text>收入</text>
				</view>
				<view class="uni-padding-wrap uni-common-mt">
					<form @submit="formSubmit1" @reset="formReset" ref="submit_form">
						<view class="uni-form-item uni-column">
							<view class="title">价格</view>
							<input class="uni-input" v-model="price" number="true" name="price" placeholder="请输入价格" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">标签</view>
							<radio-group name="tag">
								<view class="uni-list-cell" v-for="item in select_in">
									<view>
										<radio id="item.value" :value="item" :checked="true"></radio>
										<image class="image" mode="widthFix" :src="img_src[item]" />
									</view>
									<label class="label-2-text">
										<text>{{item}}</text>
									</label>
								</view>
							</radio-group>
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">必要</view>
							<view>
								<switch name="isimportant" checked="true" />
							</view>
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">备注</view>
							<input class="uni-input" v-model="comment" name="comment" placeholder="备注" />
						</view>
						<view class="uni-btn-v">
							<el-button class="elbtn" type="success" form-type="submit" style="font-size: 30rpx;">确认</el-button>
							<el-button class="elbtn" type="info" @click="formReset" style="font-size: 30rpx;">返回</el-button>
						</view>
					</form>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import "@/common/basic_method.js"
	import {
		generatesql,
		executeSql,
	} from "@/common/DB_method.js"
	var graceChecker = require("../../common/graceChecker.js");

	export default {
		data() {
			var date = new Date();
			var db = 'moneymap'
			var table_name = uni.getStorageSync('uni-id');
			if (table_name == '') {
				table_name = 'initial'
			};
			var global_setting = require("../../global setting.json");
			return {
				price: '',
				tag: '',
				date: date.format('YYYY-MM-DD hh:mm'),
				comment: '',
				isimportant: true,
				income: 0,
				db: db,
				table_name: table_name,
				select_out: [],
				select_in: [],
				user_name_out: '',
				user_name_in: '',
				img_src: global_setting['UploadSetting']['img_src'],
			}
		},
		onShow: function() {	//获得缓存中对应的标签
			// console.log('upload page');
			
			var user_id = '';
			try {	//获取支出
			    user_id = uni.getStorageSync('uni-id');
			    if (user_id) {
			        // console.log('log in and get id',user_id);
			    } else {
					user_id = 'xiaoming';
					// console.log('not log in');
				}
			} catch (e) {
			    console.log('error: get_user');
			}
			this.get_user(user_id);	//根据用户名获得缓存
			this.get_storage_out();
			this.get_storage_in();
		},
		methods: {
			formSubmit: function(e) {
				//定义表单规则
				var rule = [{
					name: "price",
					checkType: "price",
					errorMsg: "请输入正确的价格"
				}];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					var sql_table =
						'create table if not exists ' + this.table_name +
						'("income" INT(1),"price" INT(10),"tags" TEXT(200),"comment" TEXT(200), "isimportant" INT(1), "day" DATE, "time" DATETIME)';
					var sql_query = generatesql(0, formData.price, formData.tag, formData.isimportant,
						formData.comment, this.date, this.table_name);
					console.log(sql_query);
					executeSql(this.db, sql_table, sql_query);
					setTimeout(function() {
						uni.navigateBack();
						uni.showToast({
							title: "上传成功",
							icon: "none"
						});
					}, 100);
					// closeDB(this.table_name);
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			formSubmit1: function(e) {
				//定义表单规则
				var rule = [{
					name: "price",
					checkType: "price",
					errorMsg: "请输入正确的价格"
				}];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					var sql_table =
						'create table if not exists ' + this.table_name +
						'("income" INT(1),"price" INT(10),"tags" TEXT(200),"comment" TEXT(200), "isimportant" INT(1), "day" DATE, "time" DATETIME)';
					var sql_query = generatesql(1, formData.price, formData.tag, formData.isimportant,
						formData.comment, this.date, this.table_name);
					console.log(sql_query);
					executeSql(this.db, sql_table, sql_query);
					setTimeout(function() {
						uni.navigateBack();
						uni.showToast({
							title: "上传成功",
							icon: "none"
						});
					}, 100);
					// closeDB(this.table_name);
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			formReset: function(e) {
				uni.navigateBack();
			},
			get_user: function(user_name) {
				this.user_name_in = user_name+"_in";
				// console.log(user_name+"_in")
				this.user_name_out = user_name+"_out";
				// console.log(user_name+"_out")
			},
			
			get_storage_out: function() {
				try {	//获取支出
				    this.select_out = uni.getStorageSync(this.user_name_out);
				    if (this.select_out) {
				        // console.log('select_out',this.select_out);
				    } else {
						// console.log('nothing in '+this.user_name_out)
					}
				} catch (e) {
				    console.log('error: get_storage_out');
				}
			},
			get_storage_in: function() {
				try {	//获取收入
				    this.select_in = uni.getStorageSync(this.user_name_in);
				    if (this.select_in) {
				        // console.log('select_in',this.select_in);
				    } else {
						// console.log('nothing in '+this.user_name_in)
					}
				} catch (e) {
				    console.log('error: get_storage_in');
				}
			},
		}
	}
</script>

<style>
	.uni-header-text {
		font-size: 50rpx;
		text-align: center;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		font-weight: 800;
	}

	.change_income_button {
		height: 100rpx;
		font-size: 30rpx;
	}

	.label-2-text {
		flex: 1;
	}
	
	.swiper {
		height: 2000rpx;
	}
	
	.elbtn {
		width: 300rpx;
		height: 60rpx;
		line-height: 45rpx;
		font-size: 30rpx;
	}
	
	.uni-btn-v {
		text-align: center;
	}
</style>
