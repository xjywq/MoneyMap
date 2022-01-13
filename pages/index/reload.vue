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
							<input class="uni-input" v-model="price" number="true" name="price" type="number" focus
								placeholder="请输入价格" />
						</view>
						<view class="uni-form-item uni-column tabs">
							<view class="title">标签</view>
							<radio-group name="tag">
								<view class="uni-list-cell" v-for="item in select_out">
									<view>
										<radio id="item.value" :value="item['value']" :checked="item['checked']">
										</radio>
										<image class="category" mode="widthFix" :src="img_src[item['value']]" />
									</view>
									<label class="label-2-text">
										<text>{{item['value']}}</text>
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
							<button type="success" class="elbtn" form-type="submit"
								style="background-color: #33cc33;">确认</button>
						</view>
						<view class="uni-btn-v">
							<button type="info" class="elbtn" @click="formReset"
								style="background-color: #999999">返回</button>
						</view>
						<view class="uni-btn-v">
							<button class="elbtn" type="success" @click="formdel"
								style="background-color: #cc3333;">删除</button>
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
							<input class="uni-input" v-model="price" number="true" name="price" type="number"
								placeholder="请输入价格" />
						</view>
						<view class="uni-form-item uni-column tabs">
							<view class="title">标签</view>
							<radio-group name="tag">
								<view class="uni-list-cell" v-for="item in select_in">
									<view>
										<radio id="item.value" :value="item['value']" :checked="item['checked']">
										</radio>
										<image class="category" mode="widthFix" :src="img_src[item['value']]" />
									</view>
									<label class="label-2-text">
										<text>{{item['value']}}</text>
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
							<button type="success" class="elbtn" form-type="submit"
								style="background-color: #33cc33;">确认</button>
						</view>
						<view class="uni-btn-v">
							<button type="info" class="elbtn" @click="formReset"
								style="background-color: #999999">返回</button>
						</view>
						<view class="uni-btn-v">
							<button class="elbtn" type="success" @click="formdel"
								style="background-color: #cc3333;">删除</button>
						</view>
					</form>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import "@/common/basic_method.js";
	import {
		generatesql,
		executeSql,
	} from "@/common/DB_method.js";
	import {
		get_storage_in,
		get_storage_out,
	} from "@/common/util.js";
	var graceChecker = require("../../common/graceChecker.js");

	export default {
		onLoad(e) {
			this.rec = JSON.parse(e.record);
			this.id = this.rec['id'];
			this.price = this.rec['price'];
			this.tag = this.rec['tags'];
			this.date = (new Date()).format('YYYY-MM-DD hh:mm');
			this.comment = this.rec['comment'];
			this.isimportant = this.rec['isimportant'];
			this.time = this.rec['time'];
		},
		data() {
			var db = 'moneymap'
			var table_name = uni.getStorageSync('uni-id');
			if (table_name == '') {
				table_name = 'initial'
			};
			var global_setting = require("../../global setting.json");
			return {
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
		onShow: function() {
			// console.log('upload page');
			this.select_out = get_storage_out(this.table_name);
			this.select_in = get_storage_in(this.table_name);
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
						'("id" integer PRIMARY KEY autoincrement, "income" INT(1),"price" INT(10),"tags" TEXT(200),"comment" TEXT(200), "isimportant" INT(1), "day" DATE, "time" DATETIME)';
					var sql_query = generatesql(0, formData.price, formData.tag, formData.isimportant,
						formData.comment, this.date, this.table_name);
					var del_query = "delete from " + this.table_name + " where id=" + this.id;
					console.log(del_query);
					executeSql(this.db, sql_table, del_query);
					executeSql(this.db, sql_table, sql_query);
					setTimeout(function() {
						uni.navigateBack();
						uni.showToast({
							title: "修改成功",
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
			formdel: function(e) {
				var sql_table =
					'create table if not exists ' + this.table_name +
					'("id" integer PRIMARY KEY autoincrement, "income" INT(1),"price" INT(10),"tags" TEXT(200),"comment" TEXT(200), "isimportant" INT(1), "day" DATE, "time" DATETIME)';
				var del_query = "delete from " + this.table_name + " where id=" + this.id;
				console.log(del_query);
				executeSql(this.db, sql_table, del_query);
				setTimeout(function() {
					uni.navigateBack();
					uni.showToast({
						title: "删除成功",
						icon: "none"
					});
				}, 100);
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
						'("id" integer PRIMARY KEY autoincrement, "income" INT(1),"price" INT(10),"tags" TEXT(200),"comment" TEXT(200), "isimportant" INT(1), "day" DATE, "time" DATETIME)';
					var sql_query = generatesql(1, formData.price, formData.tag, formData.isimportant,
						formData.comment, this.date, this.table_name);
					console.log(sql_query);
					executeSql(this.db, sql_table, sql_query);
					setTimeout(function() {
						uni.navigateBack();
						uni.showToast({
							title: "修改成功",
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
		font-size: 35rpx;
		text-align: center;
	}

	.uni-btn-v {
		text-align: center;
		display: flex;
		/*设置显示样式**/
		align-items: center;
		/**子view垂直居中*/
		justify-content: center;
		/**内容居中*/
		margin: 0 0 0 0;
		padding: 0 0 0 0;
	}

	.category {
		width: 50rpx;
	}

	.tabs {
		height: 400rpx;
	}
</style>
