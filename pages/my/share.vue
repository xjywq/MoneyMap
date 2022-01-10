<template>
	<view>
		<qiun-title-bar title="各省大学生月均消费统计" />
		<br>
		<view class="charts-box" style="height: 400px;">
		  <qiun-data-charts type="map" :opts="{extra:{map:{mercator:true}}}" :chartData="chartsDataMap"/>
		</view><br>
		<view>
			<qiun-title-bar title="各省月均支出" />
			<uni-table border stripe emptyText="无更多数据">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">省级行政区</uni-th>
					<uni-th align="center">月均支出</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(item, index) in data">
					<uni-td align="center"><span>{{item["name"]}}</span></uni-td>
					<uni-td align="center"><span>￥{{item["value"]}}</span></uni-td>
				</uni-tr>
		
			</uni-table><br>
		</view>
	</view>
</template>

<script>
import mapdata from '@/mockdata/mapdata.json'
import demodata from '@/mockdata/demodata.json';
	
	export default {
		data() {
			return {
				chartsDataMap:{},
				data: [],
			}
		},
		methods: {
			onReady() {
			  var data = this.getData(1);
			  var name, value, index;
			  data.forEach(item => {
				  name = item["properties"]["name"];
				  index = name.indexOf(":");
				  value = name.substr(index + 2);
				  name = name.substr(0, index);
				  if (name)
					  this.data.push({
						  "name": name,
						  "value": value,
					  })
			  })
			},
			
			seededRandom: function(min, max, seed=0) { 
				max = max || 1;
				min = min || 0;
				seed = (seed * 9301 + 49297) % 233280;
				var rnd = seed / 233280.0;
				return Math.floor(min + rnd * (max - min));
			},
			
			getData(random_seed=0) {
				var data = mapdata.features;
				var value, n = this.seededRandom(0, 0x7fffffff, random_seed);
				data.forEach(item => {
					n = this.seededRandom(0, 0x7fffffff, n);
					value = this.seededRandom(700, 2000, n);
					if (item["properties"]["name"].indexOf(":") < 0)
						item["properties"]["name"] += ": " + (item["properties"]["name"]? value.toString() : "0");
					//console.log(item["properties"]["name"]);
				});
				this.chartsDataMap = {series:data};
				return data;
			}
		}
	}
</script>

<style>

</style>
