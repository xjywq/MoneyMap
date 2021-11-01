<template>
	<view>
		<view v-if="show_detail">
			<view v-for="(item, key) in detail_data">
				<qiun-title-bar :title="key + ((type == 'in') ? '收入' : '支出' ) + '情况'" />
				<uni-table border stripe emptyText="无更多数据" >
					<!-- 表头行 -->
					<uni-tr>
						<uni-th align="center" width="110">日期</uni-th>
						<uni-th align="center" width="85">时间</uni-th>
						<uni-th align="center" width="50">金额</uni-th>
						<uni-th align="center">备注</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<uni-tr v-for="record in item.slice().reverse()">
						<uni-td align="center">{{record["day"]}}</uni-td>
						<uni-td align="center">{{record["time"]}}</uni-td>
						<uni-td align="center">{{record["price"]}}</uni-td>
						<uni-td align="center">{{record["comment"]?record["comment"]:"无"}}</uni-td>
					</uni-tr>
				
				</uni-table><br>
			</view>
		</view>
	</view>
</template>

<script>
	import "../../common/basic_method.js";
	export default {
		data() {
			return {
				sql_data: [],
				detail_data: {},
				type: "",
				category: "",
				show_detail: false,
			}
		},
		onShow() {

		},
		onLoad(e) {
			this.sql_data = JSON.parse(e.sql_data);
			this.type = e.type;
			this.category = e.category;
		},
		onReady() {
			for (var i = 0; i < this.sql_data.length; i++) {
				if (this.sql_data[i]["income"] == "true" && this.type == "out" || this.sql_data[i]["income"] == "false" && this.type == "in" || this.category && this.category != this.sql_data[i]["tags"]) continue;
				if (!this.detail_data.hasOwnProperty(this.sql_data[i]["tags"])) this.detail_data[this.sql_data[i]["tags"]] = [];
				this.detail_data[this.sql_data[i]["tags"]].push(this.sql_data[i]);
			}
			this.show_detail = true;
		},
		methods: {
		
		}
	}
</script>

<style>

</style>
