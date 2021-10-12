<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-btn-v"><button type="primary" @click="OpenDB">打开数据库Mymoney.db</button></view>
			<view class="uni-btn-v"><button type="primary" @click="SelectSQL">查询表database的数据</button></view>
			<view class="uni-btn-v"><button type="primary" @click="Droptable">删除表database</button></view>
			<view class="uni-btn-v"><button type="primary" @click="CloseDB">关闭数据库Mymoney.db</button></view>
			<button class="jump" @tap="navigateTo">上传</button>
			<button class="jump" @tap="updateClick">刷新</button>
			<view class="uni-list-cell" v-for="(item, index) in sql_data">
				<view>
					<span>{{item.price}}<br>{{item.tags}}</span><br>
					<span>{{item.comment}}<br>{{item.income}}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		generatesql,
		openDB,
		selectSQL,
		closeDB,
		executeSql
	} from "../../common/DB_method.js"
	
	export default {
		data() {
			openDB();
			return {
				title: 'SQLite',
				sql_data: []
			};
		},
		onLoad: function() {
			openDB();
			this.reload();
		},
		onPullDownRefresh: function(a) {
			this.updateClick();
		},
		methods: {
			OpenDB: function() {
				openDB();
			},
			// 查询SQL语句
			SelectSQL: function() {
				selectSQL();
			},
			// 删除表
			Droptable: function() {
				droptable();
			},
			// 关闭数据库
			CloseDB: function() {
				closeDB();
			},
			navigateTo: function() {
				uni.navigateTo({
					url: 'upload'
				})
			},
			updateClick: function() {
				this.reload();
				uni.showToast({
					title: '刷新成功',
				});
			},
			reload() {
				var a = this
				plus.sqlite.selectSql({
					name: 'moneymap',
					sql: 'select * from database',
					success: function(e) {
						a.sql_data = e;
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
	.uni-btn-v {
		margin: 20rpx 0;
		padding: 0;
	}
</style>
