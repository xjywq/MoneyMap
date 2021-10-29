<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-btn-v"><button type="primary" @click="OpenDB">打开数据库Mymoney.db</button></view>
			<view class="uni-btn-v"><button type="primary" @click="SelectSQL">查询table的数据</button></view>
			<view class="uni-btn-v"><button type="primary" @click="Movetalbe">转移table的数据</button></view>
			<view class="uni-btn-v"><button type="primary" @click="Droptable">删除table</button></view>
			<view class="uni-btn-v"><button type="primary" @click="CloseDB">关闭数据库Mymoney.db</button></view>
			<button class="jump" @tap="navigateTo">上传</button>
			<button class="jump" @tap="updateClick">刷新</button>
			<view>
				<qiun-title-bar title="统计时间"/>
				<picker mode="selector" @change="timeFrameChange" :range="timeArray" :value="0">
					<view style="padding-left: 40rpx;"><span class="whatever-some-font">{{timeArray[timeIndex]}}</span></view>
				</picker>
			</view><br>
			<qiun-title-bar title="支出情况"/>
			<view class="charts-box" @longpress="outDetail" >
				<qiun-data-charts type="ring" :opts="outOpts" :chartData="outData"/>
			</view>
			
			<qiun-title-bar title="收入情况"/>
			<view class="charts-box" @longpress="inDetail" >
				<qiun-data-charts type="ring" :opts="inOpts" :chartData="inData"/>
			</view>
		</view>
	</view>
</template>

<script>
	import "../../common/basic_method.js";
	import {
		generatesql,
		openDB,
		selectSQL,
		droptable,
		closeDB,
		executeSql,
		movetable,
	} from "../../common/DB_method.js"
	export default {
		data() {
			this.OpenDB();
			return {
				outData:{},
				outOpts: {},
				inData:{},
				inOpts: {},
				timeArray: ["近一年", "近一个月", "近一周"],
				timeIndex: 0,
				title: 'SQLite',
				sql_data: []
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
			timeFrameChange (e) {
				this.timeIndex = e.target.value;
				this.reload();
			},
			OpenDB() {
				var db = 'moneymap';
				openDB(db);
			},
			// 查询SQL语句
			SelectSQL: function() {
				var db = 'moneymap';
				var table_name = 'initial';
				var log_in = true;
				if (log_in) {
					table_name = 'xiaoming';
				}
				selectSQL(db,'select * from ' + table_name);
			},
			// 转移数据
			Movetalbe: function() {
				var db = 'moneymap';
				var table_name1 = 'initial';
				var table_name2 = 'xiaoming';
				movetable(db, table_name1, table_name2);
			},
			// 删除表
			Droptable: function() {
				var db = 'moneymap';
				var table_name = 'initial';
				var log_in = true;
				if (log_in) {
					table_name = 'xiaoming';
				}
				droptable(db, table_name);
			},
			// 关闭数据库
			CloseDB: function() {
				var db = 'moneymap';
				closeDB(db);
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
					ret.push({"name":key, "value": dic[key]});
				}
				return ret;
			},
			
			updateChart () {
				var sql_data = this.sql_data;
				var outcount = 0, incount = 0;
				var outData = {}, inData = {};
				sql_data.forEach( function(item) {
					if (item["income"] == "true") {
						incount += item["price"];
						if (!inData.hasOwnProperty(item["tags"])) inData[item["tags"]] = item["price"];
						else inData[item["tags"]] += item["price"];
					}
					else {
						outcount += item["price"];
						if (!outData.hasOwnProperty(item["tags"])) outData[item["tags"]] = item["price"];
						else outData[item["tags"]] += item["price"];
					}
				});
				this.outOpts = {
					legend:{position: 'bottom'},
					extra:{ring:{ringWidth: 40,linearType:'custom',centerColor:'#FFF'}},
					title: {name: "总支出"},
					subtitle: {name: "￥"+outcount}
				};
				this.inOpts = {
					legend:{position: 'bottom'},
					extra:{ring:{ringWidth: 40,linearType:'custom',centerColor:'#FFF'}},
					title: {name: "总收入"},
					subtitle: {name: "￥"+incount}
				};
				//console.log(outData);
				//console.log(inData);
				this.outData = {"series": [{"data": this.dic2list(outData)}]};
				this.inData = {"series": [{"data": this.dic2list(inData)}]};
			},
			
			reload() {
				this.outData = {"series": [{"data": []}]};
				this.inData = {"series": [{"data": []}]};
				var a = this;
				var date = new Date();
				var last_time;
				switch (this.timeArray[this.timeIndex]) {
					case "近一年": last_time = 365 * 24 * 3600; break;
					case "近一个月": last_time = 30 * 24 * 3600; break;
					case "近一周": last_time = 7 * 24 * 3600; break;
					default: console.log("error");
				}
				var start_time = new Date(Math.round(date) - last_time * 1000);
				var sqlWhere = ' Where day >= ' + start_time.format("YYYY-MM-DD");
				console.log('select * from database' + sqlWhere);
				plus.sqlite.selectSql({
					name: 'moneymap',
					sql: 'select * from database' + sqlWhere,
					success: function(e) {
						a.sql_data = e;
						a.updateChart();
						uni.stopPullDownRefresh();
					},
					fail: function(e) {
						// plus.nativeUI.alert('查询SQL语句失败: ' + JSON.stringify(e));
						a.sql_data = [];
						uni.stopPullDownRefresh();
					}
				});
				
			},
			
			outDetail () {
				uni.navigateTo({
					url: "detail?type=out&time_range=" + this.timeArray[this.timeIndex] + "&sql_data=" + JSON.stringify(this.sql_data)
				});
			},
			
			inDetail () {
				uni.navigateTo({
					url: "detail?type=in&time_range=" + this.timeArray[this.timeIndex] + "&sql_data=" + JSON.stringify(this.sql_data)
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
	
	.whatever-some-font {
		font-family: "STKaiti";
		font-size: 35rpx;
		font-style: italic;
	}
</style>
