<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-btn-v"><button type="primary" @click="OpenDB">打开数据库Mymoney.db</button></view>
			<view class="uni-btn-v"><button type="primary" @click="selectSQL">查询表database的数据</button></view>
			<view class="uni-btn-v"><button type="primary" @click="droptable">删除表database</button></view>
			<view class="uni-btn-v"><button type="primary" @click="closeDB">关闭数据库Mymoney.db</button></view>
			<button class="jump" @tap="navigateTo">上传</button>
			<button class="jump" @tap="updateClick">刷新</button>
			<qiun-title-bar title="支出" />
			<uni-table border stripe emptyText="无更多支出数据" >
				<uni-tr v-for="record in sql_data" v-if="record.income=='false'">
					<uni-td>{{record["tags"]}}</uni-td>
					<uni-td>{{record["day"]}}</uni-td>
					<uni-td>{{record["price"]}}</uni-td>
					<uni-td>{{record["comment"]?record["comment"]:"无"}}</uni-td>
				</uni-tr>
			</uni-table><br>
			<qiun-title-bar title="收入" />
			<uni-table border stripe emptyText="无更多收入数据" >
				<uni-tr v-for="record in sql_data" v-if="record.income=='true'">
					<uni-td>{{record["tags"]}}</uni-td>
					<uni-td>{{record["day"]}}</uni-td>
					<uni-td>{{record["price"]}}</uni-td>
					<uni-td>{{record["comment"]?record["comment"]:"无"}}</uni-td>
				</uni-tr>
			</uni-table><br>
		</view>
	</view>
</template>

<script>
	import "../../common/basic_method.js";
	import {openDB} from "../../common/DB_method.js";
	export default {
		data() {
			return {
				timeIndex: 0,
				title: 'SQLite',
				sql_data: []
			};
		},
		onLoad: function() {
			openDB();
			this.reload();
		},
		onShow: function() {
			this.reload();
		},
		onPullDownRefresh: function(a) {
			this.updateClick();
		},
		methods: {
			timeFrameChange(e) {
				this.timeIndex = e.target.value;
				this.reload();
			},
			OpenDB: function() {
				openDB();
			},
			// 查询SQL语句
			selectSQL: function() {
				plus.sqlite.selectSql({
					name: 'moneymap',
					sql: 'select * from database',
					success: function(e) {
						// plus.nativeUI.alert('查询SQL语句成功: ' + JSON.stringify(e));
					},
					fail: function(e) {
						plus.nativeUI.alert('查询SQL语句失败: ' + JSON.stringify(e));
					}
				});
			},
			// 删除表
			droptable: function() {
				plus.sqlite.executeSql({
					name: 'moneymap',
					sql: 'drop table database',
					success: function(e) {
						plus.nativeUI.alert('删除表database成功');
					},
					fail: function(e) {
						plus.nativeUI.alert('删除表database失败: ' + JSON.stringify(e));
					}
				});
			},
			// 关闭数据库
			closeDB: function() {
				plus.sqlite.closeDatabase({
					name: 'moneymap',
					success: function(e) {
						plus.nativeUI.alert('关闭数据库成功');
					},
					fail: function(e) {
						plus.nativeUI.alert('关闭数据库失败: ' + JSON.stringify(e));
					}
				});
			},
			navigateTo() {
				uni.navigateTo({
					url: 'upload'
				})
			},
			updateClick() {
				this.reload();
				uni.showToast({
					title: '刷新成功',
				});
			},

			dic2list(dic) {
				var ret = new Array();
				for (var key in dic) {
					ret.push({
						"name": key,
						"value": dic[key]
					});
				}
				return ret;
			},
			reload() {
				var a = this;
				var date = new Date();
				plus.sqlite.selectSql({
					name: 'moneymap',
					sql: 'select * from database',
					success: function(e) {
						a.sql_data = e;
						console.log(a.sql_data)
						uni.stopPullDownRefresh();
					},
					fail: function(e) {
						plus.nativeUI.alert('查询SQL语句失败: ' + JSON.stringify(e));
						a.sql_data = [];
						uni.stopPullDownRefresh();
					}
				});

			},
		}
	};
</script>

<style>
	.uni-btn-v {
		margin: 20rpx 0;
		padding: 0;
	}

	.charts-box {
		width: 100%;
		height: 300px;
	}
	.line-box {
		width: 100%;
		height: 50px;
	}
	.whatever-some-font {
		font-family: "STKaiti";
		font-size: 35rpx;
		font-style: italic;
	}
</style>
