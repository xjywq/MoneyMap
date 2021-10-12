<template>
	<view class="container">
		<div style="height: 100;"></div>
		<center>
			<image src='/static/头像.jpg' class="photo"></image>
		</center>
		<uni-list>
			<uni-list-item>设置</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			var appData = require('../../global setting.json');
			console.log(appData);
			return {
			}
		},

		methods: {

		}
	}
</script>

<style>
	.photo {
		border-radius: 50%;
		overflow: hidden;
		height: 200rpx;
		width: 200rpx;
	}
</style>
