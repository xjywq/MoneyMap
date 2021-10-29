<script>
	import {
		openDB,
		closeDB
	} from "common/DB_method.js"
	
	export default {
		onLaunch: function() {
			var table_name = 'moneymap'
			var sql_table =
				'create table if not exists initial("income" INT(1),"price" INT(10),"tags" TEXT(200),"comment" TEXT(200), "isimportant" INT(1), "day" DATE, "time" DATETIME)';
			openDB(table_name);
			// plus.nativeUI.alert('成功打开tablemoneymap');
			plus.sqlite.executeSql({
				name: table_name,
				sql: sql_table,
				success: function(e) {
					// plus.nativeUI.alert('创建或打开表table成功');
				},
				fail: function(e) {
					plus.nativeUI.alert('创建表table失败: ' + JSON.stringify(e));
				}
			});
			
			// plus.nativeUI.alert('成功关闭tablemoneymap');
			
			
			var sql_table =
				'create table if not exists xiaoming("income" INT(1),"price" INT(10),"tags" TEXT(200),"comment" TEXT(200), "isimportant" INT(1), "day" DATE, "time" DATETIME)';
			// plus.nativeUI.alert('成功打开tablexiaoming');
			plus.sqlite.executeSql({
				name: table_name,
				sql: sql_table,
				success: function(e) {
					// plus.nativeUI.alert('创建或打开表table成功');
				},
				fail: function(e) {
					plus.nativeUI.alert('创建表table失败: ' + JSON.stringify(e));
				}
			});
			// plus.nativeUI.alert('成功关闭tablexiaoming');
			
			
			
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			// closeDB();
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import 'common/uni.css';
	
	.container {
		padding-top: 50rpx;
		padding: 20rpx;
		font-size: 14rpx;
		line-height: 24rpx;
	}
	
</style>
