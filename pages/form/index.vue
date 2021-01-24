<template>
	<div class="container">
		<div class="container DataContainer">
			<div class="Consum">{{$data.Date}}</div>
			<div class="Consum">日期</div>
		</div>
		<div class="container ChartContainer">
			<h1 class="title">我的账单</h1>
			<text>本月支出</text>
			<view class="uni-flex uni-row" style="width: 100%;">
				<view class="flex-item uni-bg-red">A</view>
				<view class="flex-item uni-bg-green">B</view>
				<view class="flex-item uni-bg-blue">C</view>
			</view>
			<view id="main" style="width: 300rpx;height:300rpx;">
				<echarts :option="option" style="width: 100%; height: 100%" @click="echartsClick"></echarts>
			</view>
			<view id="main" style="width: 300rpx;height:300rpx;">
				<text>本月支出</text>
				<echarts-el :option="option" style="width: 100%; height: 100%"></echarts-el>
			</view>
			<button @click="updateClick">切换数据</button>
		</div>
	</div>
</template>

<script>
	import Echarts from '@/components/echarts/echarts.vue'
	import EchartsEl from '@/components/echarts/echarts-el.vue'
	export default {
		data() {
			Date.prototype.format = function (fmt) {
			  var o = {
			      "M+": this.getMonth() + 1, //月份
			      "d+": this.getDate(), //日
			  };
			  if (/(y+)/.test(fmt)) {
			    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			  }
			  for (var k in o) {
			    if (new RegExp("(" + k + ")").test(fmt)) {
			      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
			        (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			    }
			  }
			  return fmt;
			}
			var get_date = new Date()
			return {
				Date: (get_date).format("yyyy-MM-dd"),
				option: {},
				option2: {
					notMerge: true, // 自定义变量：true代表不合并数据，比如从折线图变为柱形图则需设置为true；false或不写代表合并
					tooltip: {
						trigger: 'axis',
						positionStatus: true,
						formatterStatus: true, // 自定义变量：是否格式化tooltip，设置为false时下面三项均不起作用
						formatterUnit: '元', // 自定义变量：数值后面的单位
						formatFloat2: true, // 自定义变量：是否格式化为两位小数
						formatThousands: true // 自定义变量：是否添加千分位
					},
					legend: {
						data: ['邮件', '手机']
					},
					grid: {
						left: '5%',
						right: '8%',
						bottom: '5%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: ['周一', '周二', '周三', '周四', '周五']
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
							name: '邮件',
							type: 'bar',
							data: [120, 132, 101, 134, 90],
							// 自定义变量，以数组形式传递渐变参数
							linearGradient: [0, 0, 0, 1,
								[{
										offset: 0,
										color: '#2378f7'
									},
									{
										offset: 0.7,
										color: '#2378f7'
									},
									{
										offset: 1,
										color: '#83bff6'
									}
								]
							]
						},
						{
							name: '手机',
							type: 'bar',
							data: [220, 182, 191, 234, 290],
							// 自定义变量，以数组形式传递渐变参数
							linearGradient: [0, 0, 0, 1,
								[{
										offset: 0,
										color: '#0bac00'
									},
									{
										offset: 0.7,
										color: '#0dcb00'
									},
									{
										offset: 1,
										color: '#0fef00'
									}
								]
							]
						}
					]
				}
			};
		},
		components: {
			Echarts,
			EchartsEl
		},
		onLoad() {
			this.option = this.option2
		},
		methods: {
			/**
			 * 点击事件
			 * @param {Object} params
			 */
			echartsClick(params) {
				console.log('点击数据', params)
			},
			/**
			 * 切换数据
			 */
			updateClick() {
				uni.showToast({
					title: '刷新成功',
				})
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
	}
</style>
