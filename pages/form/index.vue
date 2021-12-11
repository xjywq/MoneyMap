<template>
	<view>
		<!-- <div class="container"> -->
		<div class="container DataContainer">
			<qiun-title-bar :title="'日期: ' + date" />
		</div>
		<div class="container ChartContainer">
			<qiun-title-bar title="统计时间" />
			<view class="leave_cont">
				<view class="ul">
					<view class="li">
						<text>开始时间</text>
						<view class="flex1">
							<picker mode="date" :end="(end_date == '无') ? date: end_date" @change="bindDateChange">
								<view class="date" @longpress="start_date = '无'">{{start_date}}</view>
							</picker>
						</view>
					</view>
					<view class="li">
						<text>结束时间</text>
						<view class="flex1">
							<picker mode="date" :start="(start_date == '无') ? '1970-01-01': start_date" :end="date"
								@change="bindDateChange2">
								<view class="date" @longpress="end_date = '无'">{{end_date}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view><br>

			<qiun-title-bar title="收支总览" />

			<uni-table border stripe emptyText="暂无更多数据">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center" width=80%>支出</uni-th>
					<uni-th align="center" width=80%>收入</uni-th>
					<uni-th align="center" width=80%>结余</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr>
					<uni-td align="center" v-for="(record, index) in outOpts['subtitle']"><text
							style="color: #FF0000;">￥{{record}}</text>
					</uni-td>
					<uni-td align="center" v-for="(record, index) in inOpts['subtitle']"><text>￥{{record}}</text>
					</uni-td>
					<uni-td align="center" v-for="(record, index) in subOpts['subtitle']">
						<view v-if="record>=0"><text>￥{{record}}</text></view>
						<view v-if="record<0"><text style="color: #FF0000;">￥{{record}}</text></view>
					</uni-td>
				</uni-tr>
			</uni-table>
			</script>

			<qiun-title-bar title="收支折线图" />
			<view class="line-box">
				<qiun-data-charts type="line" :chartData="linedata" :ontouch="true" />
			</view>

			<qiun-title-bar v-if="outData.series[0].data.length" title="支出情况" />
			<view v-if="outData.series[0].data.length" class="charts-box">
				<qiun-data-charts type="rose" :opts="outOpts" :chartData="outData" />
			</view>

			<qiun-title-bar v-if="inData.series[0].data.length" title="收入情况" />
			<view v-if="inData.series[0].data.length" class="charts-box" @longpress="inDetail">
				<qiun-data-charts type="rose" :opts="inOpts" :chartData="inData" />
			</view>
			<button @click="updateClick">刷新</button>


		</div>
		<!-- </div> -->

		<PengpaiFadeInOut @click="hideorshow" :left="10" :top="800" :radius="100" :contents="tips" />



		<!-- syh -->
		<view v-if="show_chart">
			<qiun-title-bar title="支出情况表" />
			<uni-table border stripe emptyText="无更多数据">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">分类</uni-th>
					<uni-th align="center">金额</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(record, index) in outData['series'][0]['data']">
					<uni-td align="center"><span
							@click="(category=record['name'])&&outDetail()">{{record["name"]}}</span></uni-td>
					<uni-td align="center"><span
							@click="(category=record['name'])&&outDetail()">￥{{record["value"]}}</span></uni-td>
				</uni-tr>

			</uni-table><br>
		</view><br>

		<view v-if="show_chart">
			<qiun-title-bar title="收入情况表" />
			<uni-table border stripe emptyText="无更多数据">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">分类</uni-th>
					<uni-th align="center">金额</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(record, index) in inData['series'][0]['data']">
					<uni-td align="center"><span
							@click="(category=record['name'])&&inDetail()">{{record["name"]}}</span></uni-td>
					<uni-td align="center"><span
							@click="(category=record['name'])&&inDetail()">￥{{record["value"]}}</span></uni-td>
				</uni-tr>

			</uni-table><br>
		</view>
	</view>
</template>

<script>
	import PengpaiFadeInOut from "@/components/Pengpai-FadeInOut/Pengpai-FadeInOut.vue";
	import "@/common/basic_method.js";
	import {
		dateUtils
	} from "@/common/util.js";
	import * as GlobalSetting from "@/global setting.json";
	import {
		generatesql,
		openDB,
		createTable,
		closeDB,
		executeSql
	} from "@/common/DB_method.js"

	export default {
		components: {
			PengpaiFadeInOut
		},
		data() {
			var date1 = new Date();
			var startdate = new Date(date1);
			var table_name = uni.getStorageSync('uni-id');
			if (table_name == '') {
				table_name = 'initial'
			};
			startdate.setDate(date1.getDate() - 7);
			return {
				start_date: startdate.format("YYYY-MM-DD"),
				end_date: date1.format("YYYY-MM-DD"),
				delta_date: 7,
				outData: {},
				outOpts: {},
				inData: {},
				inOpts: {},
				subOpts: {},
				linedata: {},
				sql_data: [],
				date: date1.format("YYYY-MM-DD"),
				table_name: table_name,
				option: {},
				show_chart: true,
				category: '',
				Engel: 0,
				ratio: 0,
				maxtag: '',
				maxitem: '',
				maxday: '',
				meancost: 0,
				maxdayratio: 0,
				tips: []
			};
		},
		onLoad: function() {
			createTable('moneymap', this.table_name);
			this.reload();
		},

		onShow: function() {
			var table_name = uni.getStorageSync('uni-id');
			if (table_name == '') {
				table_name = 'initial'
			};
			this.table_name = table_name
			createTable('moneymap', this.table_name);
			this.reload();
		},

		onPullDownRefresh: function(a) {
			this.updateClick();
		},

		methods: {
			bindDateChange: function(e) {
				this.start_date = e.target.value;
				this.reload();

			},
			bindDateChange2: function(e) {
				this.end_date = e.target.value;
				this.reload();
			},

			updateClick() {
				this.reload();
				uni.showToast({
					title: '刷新成功',
				});
				uni.stopPullDownRefresh();
			},

			timeFrameChange(e) {
				this.timeIndex = e.target.value;
				this.reload();
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

			datelist: function() {
				var l = [];
				for (var i = 0; i < this.delta_date; i++) {
					l.push(0);
				}
				return l;
			},
			datemlist: function() {
				var l = [];
				for (var i = 0; i < this.delta_date; i++) {
					var getdate = new Date();
					var newdate = new Date(getdate);
					newdate.setDate(getdate.getDate() - this.delta_date + i)
					if (i == 0 || (i + 1) % 15 == 0) {
						l.push(newdate.format('MM-DD'));
					} else l.push('');
				}
				return l;
			},


			updateChart() {
				var sql_data = this.sql_data;
				var outcount = 0,
					incount = 0;
				var outData = {},
					inData = {};
				var linedata = {};
				var in_co = {},
					out_co = {},
					sub_co = {};
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
				sql_data.forEach(function(item) {
					var ed = Date.parse(item["day"]);
					var delta_date = (ed - sd) / (1 * 24 * 60 * 60 * 1000);
					//console.log(delta_date);
					if (item["income"] == 1) {
						incount += item["price"];
						l1[delta_date - 1] += item["price"];
						if (!inData.hasOwnProperty(item["tags"])) inData[item["tags"]] = item["price"];
						else inData[item["tags"]] += item["price"];
					} else {
						outcount += item["price"];
						l2[delta_date - 1] += item["price"];
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
				var maxday = "";
				for (var i = 0; i < 7; i++) {
					if (daycost.hasOwnProperty(weekDay[i])) {
						if (maxday == "") maxday = weekDay[i];
						if (daycost[weekDay[i]] > daycost[maxday]) maxday = weekDay[i];
					}
				}
				this.maxday = maxday;
				this.maxitem = maxitem;
				this.maxtag = maxtag;
				this.ratio = total / 2000;
				this.ratio = this.ratio.toFixed(2);
				if (total == 0) {
					this.Engel = 0;
					this.maxdayratio = 0;
				} else {
					this.Engel = eat / total;
					this.Engel = this.Engel.toFixed(2);
					this.maxdayratio = daycost[maxday] * 100 / (total / 7);
					this.maxdayratio = this.maxdayratio.toFixed(2);
				}
				this.outOpts = {
					legend: {
						position: 'bottom'
					},
					extra: {
						ring: {
							ringWidth: 30,
							linearType: 'custom',
							centerColor: '#FFF'
						}
					},
					title: {
						name: "总支出"
					},
					subtitle: {
						name: outcount
					}
				};
				this.inOpts = {
					legend: {
						position: 'bottom'
					},
					extra: {
						ring: {
							ringWidth: 30,
							linearType: 'custom',
							centerColor: '#FFF'
						}
					},
					title: {
						name: "总收入"
					},
					subtitle: {
						name: incount
					}
				};

				this.subOpts = {
					subtitle: {
						name: incount - outcount
					}
				};
				this.outData = {
					"series": [{
						"data": this.dic2list(outData)
					}]
				};
				this.inData = {
					"series": [{
						"data": this.dic2list(inData)
					}]
				};
				this.linedata = {
					categories: this.datemlist(),
					series: [{
							name: "收入",
							data: l1
						},
						{
							name: "支出",
							data: l2
						}
					]
				};
				this.show_chart = true;
				this.tips.push("您本月收入与预算比为" + this.ratio);
				this.tips.push("您本月恩格尔系数为" + this.Engel);
				this.tips.push('本月最多的开销种类为"' + this.maxtag + '"');
				if (this.Engel < 0.4 && this.Engel > 0)
					this.tips.push("悄悄告诉你，恩格尔系数较低，可以考虑适当进行理财哦~");
				if (this.ratio < 0.3)
					this.tips.push("这个月预算还很充足！^_^");
				if (this.ratio >= 0.3 && this.ratio < 0.7)
					this.tips.push("用度适中，加油干哦~");
				if (this.ratio >= 0.7)
					this.tips.push("预算紧张，要精打细算啦！");
				this.tips.push('本月最大单笔开销种类为"' + this.maxitem + '"');
				this.tips.push("我们发现，您在" + this.maxday + "的平均开销最大，高于平均值" + this.maxdayratio);
			},

			reload() {
				var sd = Date.parse(this.start_date);
				var ed = Date.parse(this.end_date);
				var t = this;
				this.delta_date = (ed - sd) / (1 * 24 * 60 * 60 * 1000);
				this.category = '';
				this.outData = {
					"series": [{
						"data": []
					}]
				};
				this.inData = {
					"series": [{
						"data": []
					}]
				};
				this.show_chart = false;

				var sqlWhere = (this.start_date == '无') ? '' : ' WHERE day >= "' + this.start_date + '"';
				sqlWhere += (this.end_date == '无') ? '' : ((sqlWhere == '' ? ' WHERE' : ' AND') + ' day <= "' + this
					.end_date + '"'
				);
				plus.sqlite.selectSql({
					name: 'moneymap',
					sql: 'select * from ' + this.table_name + sqlWhere,
					success: function(e) {
						t.sql_data = e;
						t.updateChart();
						uni.stopPullDownRefresh();
					},
					fail: function(e) {
						plus.nativeUI.alert('查询SQL语句失败: ' + JSON.stringify(e));
						t.sql_data = [];
						uni.stopPullDownRefresh();
					}
				});
			},

			outDetail() {
				uni.navigateTo({
					url: "detail?type=out&category=" + this.category + "&sql_data=" + JSON.stringify(this.sql_data)
				});
			},

			inDetail() {
				uni.navigateTo({
					url: "detail?type=in&category=" + this.category + "&sql_data=" + JSON.stringify(this.sql_data)
				});
			},
		}
	};
</script>

<style>
	.container {
		background-color: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
		margin-left: 50rpx;
		margin-right: 50rpx;
		padding: 1 1 1 1;
	}

	.graph {
		width: 500rpx;
		height: 500rpx;
		margin: unset;
		padding: unset;
	}

	.leave_cont .ul {
		padding-left: 40rpx;
	}

	.leave_cont .ul .li {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #aa00ff;
	}

	.leave_cont .ul .li text {
		padding: 20rpx 0;
		font-size: 24rpx;
		font-family: '黑体';
	}

	.leave_cont .ul .li .flex1 {
		flex: 1;
		text-align: right;
		padding-right: 25rpx;
		color: #999999;
		font-size: 22rpx;
	}

	.date {
		height: 42rpx;
	}

	.charts-box {
		width: 100%;
		height: 300px;
	}

	.line-box {
		width: 100%;
		height: 200px;
	}

	.char-box {
		width: 100%;
		height: 200px;
	}
</style>
