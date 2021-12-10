<template>
	<view>
		<view class="content">
			<uni-nav-bar left-icon="search" @clickLeft="navigateTo" right-icon="plus" @clickRight="value1=!value1" title="传奇开心果模板"></uni-nav-bar>
			<view class="light">
				<text @tap="taptext($event,0)"></text>
				<text @tap="value1=!value1"></text>
			</view>
			<view class="dark">
				<view>
					<text @tap="taptext($event,2)"></text>
					<text @tap="taptext($event,3)"></text>
				</view>
				<view>
					<text @tap="taptext($event,4)"></text>
					<text @tap="taptext($event,5)"></text>
				</view>
			</view>
			<chunLei-popups v-model="value0" :x="x" :y="y" dynamic>
			</chunLei-popups>
			<chunLei-popups v-model="value1" :popData="data1" @tapPopup="tapPopup" :x="270" :y="40" placement="top-end">	
			</chunLei-popups>
			<chunLei-popups v-model="value2" :popData="data2" @tapPopup="tapPopup" :x="x" :y="y" direction="row" theme="dark" dynamic>
			</chunLei-popups>
			<chunLei-popups v-model="value3" :popData="data2" @tapPopup="tapPopup" :x="x" :y="y" direction="row" theme="dark" placement="top-end" dynamic>
			</chunLei-popups>
			<chunLei-popups v-model="value4" :popData="data2" @tapPopup="tapPopup" :x="x" :y="y" direction="row" theme="dark" placement="bottom-start" dynamic>	
			</chunLei-popups>
			<chunLei-popups v-model="value5" :popData="data2" @tapPopup="tapPopup" :x="x" :y="y" direction="row" theme="dark" placement="bottom-end" dynamic>	
			</chunLei-popups>
			<view class="light">
				<text @tap="taptext($event,0)"></text>
				<text @tap="tapOut($event,5)" id="text"></text>
			</view>
		</view>
		<view class="banner" @click="goDetail(banner)">
			<image class="banner-img" :src="banner.cover"></image>
			<view class="banner-title">{{ banner.title }}</view>
		</view>
		<view class="uni-list">
			<block v-for="(value, index) in listData" :key="index">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="goDetail(value)">
					<view class="uni-media-list">
						<image class="uni-media-list-logo" :src="value.cover"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{ value.title }}</view>
							<view class="uni-media-list-text-bottom">
								<text>{{ value.author_name }}</text>
								<text>{{ value.published_at }}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- #ifdef APP-PLUS -->
				<view class="ad-view" v-if="(index > 0 && (index+1) % 10 == 0)">
					<ad :adpid="adpid" @error="aderror"></ad>
				</view>
				<!-- #endif -->
			</block>
		</view>
		<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
	</view>
</template>

<script>
	import chunLeiPopups from "@/components/chunLei-popups/chunLei-popups.vue";
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import { dateUtils } from  '../../common/util.js';

	export default {
		components: {
			chunLeiPopups,
			uniLoadMore
		},
		data() {
			return {
				value0:false,
				value1:false,
				value2:false,
				value3:false,
				value4:false,
				value5:false,
				x:0,
				y:0,
				data1:[
					{
						title:'创建群聊',
						icon:'../../static/chuangjianqunliao-lan.png',
						disabled:true
					},
					{
						title:'加好友/群',
						icon:'../../static/tianjiahaoyou.png'
					},
					{
						title:'扫一扫',
						icon:'../../static/scan_icon.png'
					},
					{
						title:'面对面快传',
						icon:'../../static/zhifeiji.png'
					},
					{
						title:'收付款',
						icon:'../../static/shoufukuan.png'
					}
				],
				data2:[{title:'复制',disabled:true},{title:'转发'},{title:'回复'},{title:'删除'}],
				banner: {},
				listData: [],
				last_id: '',
				reload: false,
				status: 'more',
				adpid: '',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			};
		},
		onLoad() {
			this.adpid = this.$adpid;
			this.getBanner();
			this.getList();
		},
		onPullDownRefresh() {
			this.reload = true;
			this.last_id = '';
			this.getBanner();
			this.getList();
		},
		onReachBottom() {
			this.status = 'more';
			this.getList();
		},
		//监听滚动隐藏
		onPageScroll(){
			for (let i = 0; i < 6; i++) {
				this[`value${i}`] = false
			}
		},
		methods: {
			navigateTo() {
				//在起始页面跳转到about.vue页面并传递参数
				uni.navigateTo({
				    url: './search/search'
				});
			},
			tapPopup(e){
				uni.showToast({
					title:e.title,
					icon:'none'
				})
			},
			taptext(e,index){
				this.x = e.touches[0].clientX
				this.y = e.touches[0].clientY
				
				this[`value${index}`] = !this[`value${index}`]
			},
			tapOut(e,index){
				let dom = uni.createSelectorQuery().in(this)
				dom.select("#text").boundingClientRect()
				dom.exec((data) => {
					this.x = (data[0].left+data[0].right)/2
					this.y = data[0].top
					this[`value${index}`] = !this[`value${index}`]
				})
			
			},
			getBanner() {
				let data = {
					column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
				};
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/banner/36kr',
					data: data,
					success: data => {
						uni.stopPullDownRefresh();
						if (data.statusCode == 200) {
							this.banner = data.data;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				});
			},
			getList() {
				var data = {
					column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
				};
				if (this.last_id) {
					//说明已有数据，目前处于上拉加载
					this.status = 'loading';
					data.minId = this.last_id;
					data.time = new Date().getTime() + '';
					data.pageSize = 10;
				}
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news',
					data: data,
					success: data => {
						if (data.statusCode == 200) {
							let list = this.setTime(data.data);
							this.listData = this.reload ? list : this.listData.concat(list);
							this.last_id = list[list.length - 1].id;
							this.reload = false;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				});
			},
			goDetail: function(e) {
				// 				if (!/前|刚刚/.test(e.published_at)) {
				// 					e.published_at = dateUtils.format(e.published_at);
				// 				}
				let detail = {
					author_name: e.author_name,
					cover: e.cover,
					id: e.id,
					post_id: e.post_id,
					published_at: e.published_at,
					title: e.title
				};
				uni.navigateTo({
					url: '../list2detail-detail/list2detail-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
				});
			},
			setTime: function(items) {
				var newItems = [];
				items.forEach(e => {
					newItems.push({
						author_name: e.author_name,
						cover: e.cover,
						id: e.id,
						post_id: e.post_id,
						published_at: dateUtils.format(e.published_at),
						title: e.title
					});
				});
				return newItems;
			},
			aderror(e) {
				console.log("aderror: " + JSON.stringify(e.detail));
			}
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size:16px;
		.light{
			display: flex;
			width: 100%;
			justify-content: space-between;
			margin-bottom:0rpx;
		}
		.dark{
			margin-bottom:0rpx;
			padding: 0rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 0rpx;
			width: 80%;
			view{
				display: flex;
				justify-content: space-between;
			}
		}
	}
	.banner {
		height: 360rpx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84rpx;
		overflow: hidden;
		position: absolute;
		left: 30rpx;
		bottom: 30rpx;
		width: 90%;
		font-size: 32rpx;
		font-weight: 400;
		line-height: 42rpx;
		color: white;
		z-index: 11;
	}

	.uni-media-list-logo {
		width: 180rpx;
		height: 140rpx;
	}

	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}

	.uni-media-list-text-top {
		height: 74rpx;
		font-size: 28rpx;
		overflow: hidden;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
