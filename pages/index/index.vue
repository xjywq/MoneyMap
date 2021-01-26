<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-btn-v"><button type="primary" @click="openDB">打开数据库Mymoney.db</button></view>
			<view class="uni-btn-v"><button type="primary" @click="selectSQL">查询表database的数据</button></view>
			<view class="uni-btn-v"><button type="primary" @click="droptable">删除表database</button></view>
			<view class="uni-btn-v"><button type="primary" @click="closeDB">关闭数据库Mymoney.db</button></view>
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
	export default {
		data() {
			this.openDB();
			return {
				title: 'SQLite',
				sql_data: []
			};
		},
		onLoad: function() {
			this.reload();
		},
		onPullDownRefresh: function(a) {
			this.updateClick();
		},
		methods: {
			openDB() {
				if (
					plus.sqlite.isOpenDatabase({
						name: 'moneymap',
						path: '_doc/Mymoney.db'
					})
				) {
					// plus.nativeUI.alert('Opened!');
				} else {
					// plus.nativeUI.alert('Unopened!');
					plus.sqlite.openDatabase({
						name: 'moneymap',
						path: '_doc/Mymoney.db',
						success: function(e) {
							// plus.nativeUI.alert('打开数据库Mymoney.db成功 ');
						},
						fail: function(e) {
							plus.nativeUI.alert('打开数据库Mymoney.db失败: ' + JSON.stringify(e));
						}
					});
				}
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
