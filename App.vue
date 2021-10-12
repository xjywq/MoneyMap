<script>
	import {
		openDB,
		closeDB
	} from "common/DB_method.js"
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
			var appData = require('global setting.json');
			console.log(appData);
			console.log("data");
		},
		onShow: function() {
			openDB();
			console.log('App Show')
		},
		onHide: function() {
			closeDB();
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
