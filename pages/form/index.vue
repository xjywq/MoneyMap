<template>
	<view>
		<!-- <div class="container"> -->
			<div class="container DataContainer">
				<qiun-title-bar :title="'日期: ' + date" />
			</div>
			<div class="container ChartContainer">
				<!-- <h1 class="title">我的账单</h1> -->
				<!-- <text>本月支出</text>
				<view id="main" class="graph">
					<echarts :option="option" style="width: 100%; height: 100%" @click="echartsClick"></echarts>
				</view> -->
				<!-- <text>本月支出</text> -->
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
				
				<uni-table border stripe emptyText="暂无更多数据" >
					<!-- 表头行 -->
					<uni-tr>
						<uni-th align="center" width=80%>支出</uni-th>
						<uni-th align="center" width=80%>收入</uni-th>
						<uni-th align="center" width=80%>结余</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<uni-tr>
						<uni-td align="center" v-for="(record, index) in outOpts['subtitle']"><span>{{record}}</span></uni-td>
						<uni-td align="center" v-for="(record, index) in inOpts['subtitle']"><span>{{record}}</span></uni-td>
						<uni-td align = "center" v-for="(record, index) in subOpts['subtitle']"><span>{{record}}</span></uni-td>
					</uni-tr>
				</uni-table>
				</script>
				
				<qiun-title-bar title="收支折线图" />
				<view class="line-box">
					<qiun-data-charts type="line" 
					:chartData="linedata"
					
					:ontouch="true"/>
				</view>

				<qiun-title-bar title="支出情况" />
				<view class="charts-box">
					<qiun-data-charts type="rose" :opts="outOpts" :chartData="outData" />
				</view>

				<qiun-title-bar title="收入情况" />
				<view class="charts-box" @longpress="inDetail">
					<qiun-data-charts type="rose" :opts="inOpts" :chartData="inData" />
				</view>
				<button @click="updateClick">刷新</button>
				<qiun-title-bar title="预计支出" />
				<view class="char-box">
					<qiun-data-charts
					type="arcbar"
					:chartData="cdata"
					background="none"
				/>
				</view>
			</div>
		<!-- </div> -->



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
	import "@/common/basic_method.js";
	import {
		dateUtils
	} from "@/common/util.js";
	import * as GlobalSetting from "@/global setting.json";
	import {
		generatesql,
		openDB,
		selectSQL,
		closeDB,
		executeSql
	} from "@/common/DB_method.js"

	export default {
		data() {
			var date1 = new Date();
			var startdate = new Date(date1);
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
				cdata:{},
				sql_data: [],
				date: date1.format("YYYY-MM-DD"),
				sql: 'select * from database',
				option: {},
				show_chart: true,
				category: '',
			};
		},

		onLoad: function() {
			this.reload();
		},

		onShow: function() {
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
					newdate.setDate(getdate.getDate()-this.delta_date+i)
					if(i==0 || (i+1) %15 ==0){
						l.push(newdate.format('MM-DD'));
					}
					else l.push('');
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
				var in_co = {}, out_co = {}, sub_co ={};
				var l1 = this.datelist(),
					l2 = this.datelist();
				var sd = Date.parse(this.start_date);
				
				sql_data.forEach(function(item) {
					var ed = Date.parse(item["day"]);
					var delta_date = (ed - sd) / (1 * 24 * 60 * 60 * 1000);
					//console.log(delta_date);
					if (item["income"] == "true") {
						incount += item["price"];
						l1[delta_date-1] += item["price"];
						if (!inData.hasOwnProperty(item["tags"])) inData[item["tags"]] = item["price"];
						else inData[item["tags"]] += item["price"];
					} else {
						outcount += item["price"];
						l2[delta_date-1] += item["price"];
						if (!outData.hasOwnProperty(item["tags"])) outData[item["tags"]] = item["price"];
						else outData[item["tags"]] += item["price"];
					}
					//console.log(l1);
				});
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
						name: "￥-" + outcount
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
						name: "￥" + incount
					}
				};
				this.subOpts = {subtitle: {
						name: "￥" + (incount-outcount)
					}};
				//console.log(this.inOpts["subtitle"]["name"]);
				this.outData = {
					"series": [{
						"data": this.dic2list(outData)
					}]
				};
				console.log(this.outData);
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
				console.log(outcount);
				this.cdata =
				{
				    "series": [
				        {
				            "data": outcount/2000,
				            "color": "#ff0202"
				        }
				    ]
				};
				this.show_chart = true;
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
				console.log('select * from database' + sqlWhere);
				plus.sqlite.selectSql({
					name: 'moneymap',
					sql: 'select * from database' + sqlWhere,
					success: function(e) {
						console.log("here1");
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
				console.log("ont");
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
	
	.charts-box{
	  width: 100%;
	  height:300px;
	}
	
	.line-box{
		width: 100%;
		height:200px;
	}
	.char-box{
		width: 100%;
		height:200px;
	}
</style>
