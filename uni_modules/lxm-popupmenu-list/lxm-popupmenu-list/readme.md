# lxm-popupmenu-list 是uniapp项目通用前端页面框架之一，顶部logo+自定义上部导航+气泡菜单+搜索页面+图文列表到详情页面切换+底部导航+下拉刷新+上拉加载更多。一般是用来做首页模板。
> **组件名：lxm-nav，版本：1.0.1**


首页框架模板：顶部logo上部自定义导航连带气泡菜单导航底部导航。

> **注意事项**
> 为了避免错误使用，给大家带来不好的开发体验，请在使用组件前仔细阅读下面的注意事项，可以帮你避免一些错误。


### 安装方式

1.本组件从`HBuilderX 3.1.0`起，只需将本组件以非uni_modules方式导入项目，需要在页面中`import`和注册`components`，然后在页面`template`中使用。
2.使用本组件，同时需要导入uni-icons、uni-nav-bar、uni-search-bar、uni-scss、三个uni_modules插件，还需要导入chunLei-popups、amap-wx、uni-load-more三个非uni_modules插件，三个非uni_modules插件需要在页面中`import`和注册`components`。
3.使用本组件页面路由可以根据配置需要在pages.json中做修改。
4.需要复制common中所有文件到自己项目文件的同名文件当中，uni.css文件必须App.vue中引入。
5.必须有网络，才能加载数据。
### 基本用法


1.在 ``template`` 中使用组件

```html
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

2.在pages.json文件中配置路由等参考下面模板进行。

{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "",
				"titleImage": "/static/logo3.png",
				 "enablePullDownRefresh":true
			}
		},
		{
            "path" : "pages/list2detail-detail/list2detail-detail",
            "style" :                                                                                    
            {
                "navigationBarTitleText": "",
				"titleImage": "/static/logo3.png",
                "enablePullDownRefresh": false
            }
            
        },
		{
            "path" : "pages/about/about",
            "style" :                                                                                    
            {
                "navigationBarTitleText": "",
				"titleImage": "/static/logo3.png",
                "enablePullDownRefresh": false
            }
            
        },
		{
			"path": "pages/index/search/search",
			"style": {
				"navigationBarTitleText": "",
				"titleImage": "/static/logo3.png",
				"enablePullDownRefresh": false
		}
		},
        {
            "path" : "pages/shequ/shequ",
            "style" :                                                                                    
            {
                "navigationBarTitleText": "",
				"titleImage": "/static/logo3.png",
                "enablePullDownRefresh": false
            }
            
        }
        ,{
            "path" : "pages/test/test",
            "style" :                                                                                    
            {
                "navigationBarTitleText": "",
				"titleImage": "/static/logo3.png",
                "enablePullDownRefresh": false
            }
            
        }
    ],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "uni-app",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8"
	},
	"tabBar": {
			"color": "#cdcdcd",
			"selectedColor": "#50B7EA",
			"borderStyle": "white",
			"list": [{
					"pagePath": "pages/index/index",
					"text": "首页",
					"iconPath": "static/home_default.png",
					"selectedIconPath": "static/home_select.png"
				},
				{
					"pagePath": "pages/shequ/shequ",
					"text": "社区",
					"iconPath": "static/shequ_default.png",
					"selectedIconPath": "static/shequ_select.png"
				},
				{
					"pagePath": "pages/test/test",
					"text": "测试",
					"iconPath": "static/test_default.png",
					"selectedIconPath": "static/test_select.png"
				},
				{
					"pagePath": "pages/about/about",
					"text": "我的",
					"iconPath": "static/my_default.png",
					"selectedIconPath": "static/my_select.png"
				}
			]
		}
}

```

3.lxm-search-toptab传奇开心果模板V1.0.0，传奇开心果制作。