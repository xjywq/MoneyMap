<template>
	<view class="content">
		<text class="content1">关于作者，联系我们</text>
		<image class="logo" src="/static/cqkxglogo.jpg" mode="aspectFit"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<text class="content2">uniapp首页通用模板之一</text>
	    <text class="content3">顶部作者logo图片显示\n+上部自定义导航带气泡菜单\n+图文列表到详情页面切换\n+底部导航栏\n+搜索页面\n+下拉刷新\n+上拉加载更多 </text>
		<text class="content3">名称：lxm-popupmenu-list,版本：1.0.0,传奇开心果制作</text>
		<text class="content3">联系作者，微信：lxm1093220242</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello，传奇开心果'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		margin-top: 30rpx;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;
	}
	
	.content1 {
		display: flex;
		margin-top: 20rpx;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;
	}
	
	.content2 {
		display: flex;
		margin-top: 30rpx;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
	}
	
	.content3 {
		display: flex;
		margin-top: 20rpx;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 16rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 20rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		display: flex;
		justify-content: center;
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
