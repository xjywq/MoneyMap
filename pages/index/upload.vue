<template>
	<view class="uni-max-wrap">
		<view class="uni-header-text">
			<text>{{income_text}}</text>
			<button class="change_income_button" type="default" @click="change_income">切换</button>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset" ref="submit_form">
				<view class="uni-form-item uni-column">
					<view class="title">价格</view>
					<input class="uni-input" v-model="price" number="true" name="price" focus placeholder="请输入价格" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">标签</view>
					<radio-group name="tag">
						<view class="uni-list-cell" v-for="(item, index) in radioItems">
							<view>
								<radio id="item.value" :value=item.value :checked="item.checked"></radio>
							</view>
							<label class="label-2-text">
								<text>{{item.value}}</text>
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
					<button form-type="submit">确认</button>
					<button type="default" @click="formReset">返回</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script >
	import "../../common/basic_method.js"
	import {
		generatesql,
		openDB,
		selectSQL,	//not use
		closeDB,
		executeSql,
		movetable,
	} from "../../common/DB_method.js"
	var graceChecker = require("../../common/graceChecker.js");
	
	export default {
		data() {
			var date = new Date();
			var db = 'moneymap'
			var table_name = uni.getStorageSync('uni-id');
			if (table_name == '') {table_name = 'initial'};
			var global_setting = require("../../global setting.json");
			return {
				price: '',
				tag: '',
				date: date.format('YYYY-MM-DD hh:mm'),
				comment: '',
				isimportant: true,
				income_text: '收入',
				income: true,
				db: db,
				table_name: table_name,
				radioItems: global_setting['UploadSetting']['Tags'],
			}
		},
		methods: {
			change_income: function() {
				if (this.income) {
					this.income = false;
					this.income_text = '支出';
				} else {
					this.income = true;
					this.income_text = '收入';
				}
			},
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
						'create table if not exists ' + this.table_name + '("income" INT(1),"price" INT(10),"tags" TEXT(200),"comment" TEXT(200), "isimportant" INT(1), "day" DATE, "time" DATETIME)';
					var sql_query = generatesql(this.income, formData.price, formData.tag, formData.isimportant, formData.comment, this.date, this.table_name);
					executeSql(this.db, sql_table, sql_query);
					setTimeout(function () {
						uni.navigateBack();
						uni.showToast({
							title: "上传成功",
							icon: "none"
						});
					} ,100);
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
			}
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
		font-size: 10rpx;
	}

	.label-2-text {
		flex: 1;
	}
</style>
