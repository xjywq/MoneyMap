<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-btn-v"><button type="primary" @click="openDB">打开数据库Mymoney.db</button></view>
			<view class="uni-btn-v"><button type="primary" @click="executeSQL">创建表database及插入数据</button></view>
			<view class="uni-btn-v"><button type="primary" @click="selectSQL">查询表database的数据</button></view>
			<view class="uni-btn-v"><button type="primary" @click="droptable">删除表database</button></view>
			<view class="uni-btn-v"><button type="primary" @click="closeDB">关闭数据库Mymoney.db</button></view>
			<view class="uni-btn-v"><button type="primary" @click="isOpenDB">查询是否打开数据库</button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'SQLite'
		};
	},
	methods: {
		openDB: function() {
			plus.sqlite.openDatabase({
				name: 'moneymap',
				path: '_doc/Mymoney.db',
				success: function(e) {
					plus.nativeUI.alert('打开数据库Mymoney.db成功 ');
				},
				fail: function(e) {
					plus.nativeUI.alert('打开数据库Mymoney.db失败: ' + JSON.stringify(e));
				}
			});
		},
		// 执行SQL语句
		executeSQL: function() {
			plus.sqlite.executeSql({
				name: 'moneymap',
				sql: 'create table if not exists database("name" CHAR(110),"sex" CHAR(10),"age" INT(11))',
				success: function(e) {
					plus.sqlite.executeSql({
						name: 'moneymap',
						sql: "insert into database values('彦','女','7000')",
						success: function(e) {
							plus.nativeUI.alert('创建表table和插入数据成功');
						},
						fail: function(e) {
							plus.nativeUI.alert('创建表table成功但插入数据失败: ' + JSON.stringify(e));
						}
					});
				},
				fail: function(e) {
					plus.nativeUI.alert('创建表table失败: ' + JSON.stringify(e));
				}
			});
		},
		// 查询SQL语句
		selectSQL: function() {
			plus.sqlite.selectSql({
				name: 'moneymap',
				sql: 'select * from database',
				success: function(e) {
					plus.nativeUI.alert('查询SQL语句成功: ' + JSON.stringify(e));
				},
				fail: function(e) {
					plus.nativeUI.alert('查询SQL语句失败: ' + JSON.stringify(e));
				}
			});
		},
		// 删除表
		droptable: function() {
			plus.sqlite.executeSql({
				name: 'moneymap',
				sql: 'drop table database',
				success: function(e) {
					plus.nativeUI.alert('删除表database成功');
				},
				fail: function(e) {
					plus.nativeUI.alert('删除表database失败: ' + JSON.stringify(e));
				}
			});
		},
		// 关闭数据库
		closeDB: function() {
			plus.sqlite.closeDatabase({
				name: 'moneymap',
				success: function(e) {
					plus.nativeUI.alert('关闭数据库成功');
				},
				fail: function(e) {
					plus.nativeUI.alert('关闭数据库失败: ' + JSON.stringify(e));
				}
			});
		},
		isOpenDB: function() {
			if (
				plus.sqlite.isOpenDatabase({
					name: 'moneymap',
					path: '_doc/Mymoney.db'
				})
			) {
				plus.nativeUI.alert('Opened!');
			} else {
				plus.nativeUI.alert('Unopened!');
			}
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

