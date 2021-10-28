<template>
	<div class="container">
		<div class="container DataContainer">
			<div class="Consum">{{date}}</div>
			<div class="Consum">日期</div>
		</div>
		<div class="container ChartContainer">
			<h1 class="title">我的账单</h1>
			<!-- <text>本月支出</text>
			<view id="main" class="graph">
				<echarts :option="option" style="width: 100%; height: 100%" @click="echartsClick"></echarts>
			</view> -->
			<text>本月支出</text>
			<view id="main" class="graph">
				<echarts-el :option="option" style="width: 100%; height: 100%" @click="echartsClick"></echarts-el>
			</view>
			<button @click="updateClick">刷新成功</button>
		</div>
	</div>
</template>

<script>
	import Echarts from '@/components/echarts/echarts.vue';
	import EchartsEl from '@/components/echarts/echarts-el.vue';
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
			var get_date = dateUtils.format(new Date())
			return {
				date: get_date,
				sql: 'select * from database',
				option: {},
			};
		},
		components: {
			Echarts,
			EchartsEl
		},
		onLoad: function() {
			this.reload();
		},
		onPullDownRefresh: function(a) {
			this.updateClick();
		},
		methods: {
			echartsClick(params) {
				console.log('点击数据', params)
			},
			updateClick() {
				this.reload();
				uni.showToast({
					title: '刷新成功',
				});
				uni.stopPullDownRefresh();
			},
			reload() {
				var a = this
				var spl = a.sql
				plus.sqlite.selectSql({
					name: 'moneymap',
					sql: a.sql,
					success: function(e) {
						var tag_sum = {}
						for (var index = 0; index < e.length; index++) {
							var item = e[index];
							if (item.tags in tag_sum) {
								tag_sum[item.tags] += parseFloat(item.price);
							} else {
								tag_sum[item.tags] = parseFloat(item.price);
							}
						}
						var tags = [];
						var tag_data = [];
						for (var index in tag_sum) {
							tags.push(index);
							tag_data.push({
								'value': tag_sum[index],
								'name': index,
								'price': tag_sum[index]
							})
						}

						var option = {
							baseOption: {
								// 调色盘颜色列表
								// color:['#015196','#0084f1', '#6abaff','#d6d6d6'],
								title: { // 标题组件，包含主标题和副标题。
									show: true,
									left: '48%', // 标题组件距离 图表组件走边的距离
									bottom: '80%',
									itemGap: 5,
									text: '可用额度: ' + '2000',
									textStyle: {
										color: '#464646',
										fontWeight: 'normal',
										fontSize: 15,
									}
								},
								notMerge: false, // 自定义变量：true代表不合并数据，比如从折线图变为柱形图则需设置为true；false或不写代表合并
								tooltip: {
									show: true,
									trigger: 'item',
									formatter: function(params) {
										console.log(params);
										//系列名称
										var seriesName = params.seriesName;
										//类目名称
										var name = params.name;
										//百分比
										var percent = params.percent;
										return seriesName + '<br/>类别：' + name + '<br/>' + '所占百分比例：' +
											percent + '%';

									},
								},
								legend: {
									type: 'scroll',
									left: '48%', //图列组件距离 图表组件走边的距离 (% or px)
									top: '20%',
									orient: 'vertical',
									align: 'left',
									itemGap: 13,
									selectedMode: true,
									itemWidth: 15,
									itemHeight: 15,
									height: 210, //图例组件的高度，设置指定高度确定显示图例出来的个数。
									textStyle: {
										fontWeight: 'bold',
										fontSize: 12
									},
									scrollDataIndex: 0,
									//默认选中，暂未实现
									formatter: function(name) {
										var arrays = option.baseOption.series[0].data;
										for (var i = 0; i < arrays.length; i++) {
											//名称
											var type_name = arrays[i].name;
											//人民币占比
											var price = arrays[i].price;
											if (type_name == name) {
												return name + '\n' + price;
												break;
											}
										}
									},
									data: tags
								},
								grid: {
									left: '5%',
									right: '8%',
									bottom: '5%',
									containLabel: true
								},
								series: [{
									type: 'pie',
									name: '图表详情',
									center: ['25%', '40%'],
									radius: ['23%', '50%'],
									//图形上的文本标签
									label: {
										normal: {
											/**
											 * outside:饼图扇区外侧，通过视觉引导线连到相应的扇区。
											 * inside:饼图扇区内部。
											 * center:在饼图中心位置
											 */
											position: 'inside',
											formatter: '{d}%',
										},
									},
									data: tag_data
								}]
							}
						};
						a.option = option;
						uni.stopPullDownRefresh();
					},
					fail: function(e) {
						plus.nativeUI.alert('查询SQL语句失败: ' + JSON.stringify(e));
						a.sql_data = [];
						uni.stopPullDownRefresh();
					}
				});
			}
		}
	};
</script>

<style>
	.container {
		background-color: #52e2f8;
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
</style>
