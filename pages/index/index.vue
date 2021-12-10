<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<qiun-title-bar title="预计支出" />
			<view class="char-box">
				<qiun-data-charts type="arcbar" :chartData="cdata" background="none" />
			</view>
			<button class="jump" @tap="navigateTo">上传</button>
			<button class="jump" @tap="updateClick">刷新</button>
			<qiun-title-bar title="支出" />
			<uni-table border stripe emptyText="无更多支出数据">
				<uni-tr v-for="record in sql_data.slice().reverse()" v-if="record.income==0">
					<uni-td>{{record["tags"]}}</uni-td>
					<uni-td>{{record["day"]}}</uni-td>
					<uni-td>{{record["time"]}}</uni-td>
					<uni-td>{{record["price"]}}</uni-td>
					<uni-td>{{record["comment"]?record["comment"]:"无" | numfilter(5)}}</uni-td>
				</uni-tr>
			</uni-table><br>
			<qiun-title-bar title="收入" />
			<uni-table border stripe emptyText="无更多收入数据">
				<uni-tr v-for="record in sql_data.slice().reverse()" v-if="record.income==1">
					<uni-td>{{record["tags"]}}</uni-td>
					<uni-td>{{record["day"]}}</uni-td>
					<uni-td>{{record["time"]}}</uni-td>
					<uni-td>{{record["price"]}}</uni-td>
					<uni-td>{{record["comment"]?record["comment"]:"无"}}</uni-td>
				</uni-tr>
			</uni-table><br>
		</view>
		<!-- <view class="uni-btn-v"><button type="primary" @click="OpenDB">打开数据库Mymoney.db</button></view> -->
		<!-- <view class="uni-btn-v"><button type="primary" @click="moveTable">转移table的数据</button></view> -->
		<!-- <view class="uni-btn-v"><button type="primary" @click="Droptable">删除table</button></view> -->
		<!-- <view class="uni-btn-v"><button type="primary" @click="CloseDB">关闭数据库Mymoney.db</button></view> -->
	</view>
</template>

<script>
	import "@/common/basic_method.js";
	import {
		openDB,
		createTable,
		droptable,
		closeDB,
		moveTable,
	} from "@/common/DB_method.js";
	import {
		dateUtils
	} from "@/common/util.js";
	export default {
		data() {
			var table_name = uni.getStorageSync('uni-id');
			if (table_name == '') {
				table_name = 'initial'
			};
			var edate = new Date();
			edate.setDate(1);
			return {
				db: 'moneymap',
				table_name: table_name,
				sql_data: [],
				cdata: {},
				s: 0,
				cOpts: {},
				edate: edate.format("YYYY-MM-DD"),
				expect: 2000
			};
		},
		onLoad: function() {
			openDB();
			createTable(this.db, this.table_name);
			this.reload();
		},
		onShow: function() {
			var table_name = uni.getStorageSync('uni-id');
			if (table_name == '') {
				table_name = 'initial'
			};
			this.table_name = table_name;
			var edate = new Date();
			edate.setDate(1);
			this.edate = edate.format("YYYY-MM-DD");
			this.reload();
		},
		onPullDownRefresh: function(a) {
			this.updateClick();
		},
		methods: {
			OpenDB() {
				openDB(this.db);
			},
			// 查询SQL语句
			SelectSQL: function() {
				selectSQL(this.db, 'select * from ' + this.table_name);
			},
			// 转移数据
			moveTable: function() {
				var table_name1 = 'xiaoming';
				var table_name2 = 'initial';
				moveTable(this.db, table_name1, table_name2);
			},
			// 删除表
			Droptable: function() {
				droptable(this.db, this.table_name);
			},
			// 关闭数据库
			CloseDB: function() {
				closeDB(this.db);
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
			reload() {
				var a = this;
				plus.sqlite.selectSql({
					name: 'moneymap',
					sql: 'select * from ' + a.table_name + ' WHERE day >= "' + a.edate + '"',
					success: function(e) {
						a.sql_data = e;
						var sum = 0;
						e.forEach(function(item) {
							if (item["income"] == 1) {
								sum = sum + item["price"];
							} else {
								sum = sum - item["price"];
							}
						});
						if (sum > 0) {
							sum = 0;
						}
						var ratio = -sum / a.expect;
						if (ratio > 1) {
							ratio = 1;
						}
						a.cdata = {
							"series": [{
								"data": ratio,
							}],
						};
						a.s = a.cdata["series"][0]["data"]
						uni.stopPullDownRefresh();
					},
					fail: function(e) {
						// plus.nativeUI.alert('查询SQL语句失败: ' + JSON.stringify(e));
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
