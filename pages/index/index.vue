<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<qiun-title-bar title="预计支出" />
			<view class="char-box">
				<qiun-data-charts type="arcbar" :chartData="cdata" background="none" />
			</view>
			<view style="text-align: center;">
				<el-button type="primary" class="jump" @tap="navigateTo" icon="el-icon-upload"
					style="font-size: 30rpx;">上传</el-button>
				<el-button type="primary" class="jump" @tap="updateClick" icon="el-icon-search"
					style="font-size: 30rpx;">刷新</el-button><br><br>
			</view>
			<qiun-title-bar title="支出" />

			<uni-table border stripe emptyText="无更多支出数据">
				<uni-swipe-action v-for="record in sql_data.slice().reverse()" v-if="record.income==0">
					<uni-swipe-action-item :right-options="modify(record)" @click="bindClick">
						<uni-tr>
							<uni-td width="50">{{record["tags"]}}</uni-td>
							<uni-td width="110">{{record["day"]}}</uni-td>
							<uni-td width="30">{{record["time"]}}</uni-td>
							<uni-td width="70">{{record["price"]}}</uni-td>
							<uni-td width="110">{{record["comment"]?record["comment"]:"无" | numfilter(5)}}</uni-td>
						</uni-tr>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</uni-table><br>

			<!--@click="hideorshow"-->
			<PengpaiFadeInOut :left="10" :top="700" :radius="100" :contents="tips" />

			<qiun-title-bar title="收入" />
			<uni-table border stripe emptyText="无更多收入数据">
				<uni-swipe-action v-for="record in sql_data.slice().reverse()" v-if="record.income==1">
					<uni-swipe-action-item :right-options="modify(record)" @click="bindClick">
						<uni-tr>
							<uni-td width="50">{{record["tags"]}}</uni-td>
							<uni-td width="110">{{record["day"]}}</uni-td>
							<uni-td width="30">{{record["time"]}}</uni-td>
							<uni-td width="70">{{record["price"]}}</uni-td>
							<uni-td width="110">{{record["comment"]?record["comment"]:"无" | numfilter(5)}}</uni-td>
						</uni-tr>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</uni-table><br>
		</view>
	</view>
</template>

<script>
	import "@/common/basic_method.js";
	import PengpaiFadeInOut from "@/components/Pengpai-FadeInOut/Pengpai-FadeInOut.vue";
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
		components: {
			PengpaiFadeInOut
		},
		data() {
			var date1 = new Date();
			var startdate = new Date(date1);
			startdate.setDate(date1.getDate() - 7);
			var table_name = uni.getStorageSync('uni-id');
			if (table_name == '') {
				table_name = 'initial'
			};
			var edate = new Date();
			edate.setDate(1);
			return {
				start_date: startdate.format("YYYY-MM-DD"),
				db: 'moneymap',
				table_name: table_name,
				sql_data: [],
				cdata: {},
				s: 0,
				cOpts: {},
				edate: edate.format("YYYY-MM-DD"),
				expect: 2000,
				tips: []
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

			bindClick(e) {
				if (e.position === 'right') {
					uni.navigateTo({
						url: "reload?record=" + JSON.stringify(e.content.record)
					})
				};
			},

			modify(record) {
				return [{
					record: record,
					text: '修改',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			},
			datelist: function() {
				var l = [];
				for (var i = 0; i < this.delta_date; i++) {
					l.push(0);
				}
				return l;
			},
			reloadtips() {
				this.tips = [];
				var sql_data = this.sql_data;
				var outcount = 0,
					incount = 0;
				var outData = {},
					inData = {};
				var l1 = this.datelist(),
					l2 = this.datelist();
				var sd = Date.parse(this.start_date);
				var daycost = {};
				var eat = 0;
				var total = 0;
				var maxtag = "";
				var maxitem = "";
				var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
				var myDate = "";
				var Date1 = "";
				var maxprice = 0;
				var maxdayratio = 0;
				var ratio = 0
				var maxday = "";
				var Engel = 0;
				sql_data.forEach(function(item) {
					if (item["income"] == 1) {
						if (!inData.hasOwnProperty(item["tags"])) inData[item["tags"]] = item["price"];
						else inData[item["tags"]] += item["price"];
					} else {
						outcount += item["price"];
						if (item["tags"] == "餐饮") eat += item["price"];
						if (!outData.hasOwnProperty(item["tags"])) outData[item["tags"]] = item["price"];
						else outData[item["tags"]] += item["price"];
						total += item["price"];
						if (maxitem == "") maxitem = item["tags"];
						if (item["price"] > maxprice) {
							maxitem = item["tags"];
							maxprice = item["price"];
						}
						if (maxtag == "") maxtag = item["tags"];
						if (outData[item["tags"]] > outData[maxtag]) maxtag = item["tags"];
						myDate = new Date(Date.parse(item["day"]));
						Date1 = weekDay[myDate.getDay()];
						if (!daycost.hasOwnProperty(Date1)) daycost[Date1] = item["price"];
						else daycost[Date1] += item["price"];
					}
				});
				for (var i = 0; i < 7; i++) {
					if (daycost.hasOwnProperty(weekDay[i])) {
						if (maxday == "") maxday = weekDay[i];
						if (daycost[weekDay[i]] > daycost[maxday]) maxday = weekDay[i];
					}
				}
				ratio = total / 20;
				ratio = ratio.toFixed(2);
				if (total == 0) {
					Engel = 0;
					maxdayratio = 0;
				} else {
					Engel = eat / total;
					Engel = Engel.toFixed(2);
					maxdayratio = daycost[maxday] / (total / 7) * 100;
					maxdayratio = maxdayratio.toFixed(1);
				}
				this.tips.push("您本月目前的支出占预算的" + ratio + "%");
				this.tips.push("您本月恩格尔系数为" + Engel);
				this.tips.push('本月最多的开销种类为"' + maxtag + '"');
				if (Engel < 0.4 && Engel > 0)
					this.tips.push("悄悄告诉您，恩格尔系数较低，可以考虑适当进行理财哦~");
				if (ratio < 0.3)
					this.tips.push("这个月预算还很充足！^_^");
				if (ratio >= 0.3 && ratio < 0.7)
					this.tips.push("用度适中，加油干哦~");
				if (ratio >= 0.7)
					this.tips.push("预算紧张，要精打细算啦！");
				this.tips.push("您在" + maxday + "的平均开销最大，是每日均值的" + maxdayratio + "%");
				this.tips.push('本月最大单笔开销种类为"' + maxitem + '"');
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
							if (item["income"] != 1) {
								sum = sum - item["price"]; //这里修改了预计支出的逻辑
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
						a.reloadtips();
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

	.jump {
		width: 300rpx;
		height: 60rpx;
		line-height: 45rpx;
		font-size: 30rpx;
	}

	.whatever-some-font {
		font-family: "STKaiti";
		font-size: 35rpx;
		font-style: italic;
	}



	.content-box {
		flex: 1;
		height: 44px;
		line-height: 44px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		border: 1px solid #f5f5f5;
	}
</style>
