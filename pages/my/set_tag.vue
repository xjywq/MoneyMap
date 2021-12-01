<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-common-mt">
			
			
			<!-- <view class="uni-form-item uni-column">
				<view class="title">支出</view>
				<checkbox-group class="uni-list" @change="checkboxChange_out">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in radioItems" :key="item.value">
						<view>
							<checkbox :value="item.value" :checked="item.checked"></checkbox>	
						</view>
						<view>{{item.value}}</view>
					</label>
				</checkbox-group>
			</view> -->
			
			<view class="uni-form-item uni-column">
				<view class="title">支出</view>
				<checkbox-group class="uni-list" @change="checkboxChange_out">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in select_out" :key="item">
						<view>
							<checkbox :value="item" :checked="true"></checkbox>	
						</view>
						<view>{{item}}</view>
					</label>
					
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in not_mark_out" :key="item">
						<view>
							<checkbox :value="item" :checked="false"></checkbox>	
						</view>
						<view>{{item}}</view>
					</label>
				</checkbox-group>
			</view>
			
			<view class="uni-form-item uni-column">
				<view class="title">收入</view>
				<checkbox-group class="uni-list" @change="checkboxChange_in">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in radioItems" :key="item.value"> 
						<view>
							<checkbox :value="item.value" :checked="item.checked"></checkbox>	
						</view>
						<view>{{item.value}}</view>
					</label>
				</checkbox-group>
			</view>

			<!-- <view class="uni-form-item uni-column">
				<view class="title">label用for标识表单组件</view>
				<radio-group class="uni-list" @change="radioChange">
					<view class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in radioItems" :key="index">
						<view>
							<radio :id="item.name" :value="item.name" :checked="item.checked"></radio>
						</view>
                        <label class="label-2-text" :for="item.name">
                            <text>{{item.value}}</text>
                        </label>
					</view>
				</radio-group>
			</view> -->

			<!-- <view class="uni-form-item uni-column">
				<view class="title">label内有多个时选中第一个</view>
				<checkbox-group class="uni-list" @change="checkboxChange">
					<label class="label-3">
						<view class="uni-list-cell uni-list-cell-pd">
							<checkbox class="checkbox-3">选项一</checkbox>
						</view>
						<view class="uni-list-cell uni-list-cell-pd">
							<checkbox class="checkbox-3">选项二</checkbox>
						</view>
						<view class="uni-link uni-center" style="margin-top:20rpx;">点击该label下的文字默认选中第一个checkbox</view>
					</label>
				</checkbox-group>
			</view> -->

		</view>
	</view>
</template>
<script>
	// import {
	// 	set_storage_out,
	// 	set_storage_in,
	// 	get_storage_out,
	// 	get_storage_in,
	// } from "@/common/util.js";
	export default {
		data() {
			var global_setting = require("../../global setting.json");
			// console.log(global_setting)
			return {
				title: 'label',
				checkboxItems: [{
						name: 'USA',
						value: '美国',
						checked: 'false'	//初始是否勾选
					},
					{
						name: 'CHN',
						value: '中国',
						checked: 'false'
					}
				],
				radioItems: global_setting['UploadSetting']['Tags'],
				select_out: [],
				not_mark_out: [],
				
				// radioItems: [{
				// 		name: 'USA',
				// 		value: '美国'
				// 	},
				// 	{
				// 		name: 'CHN',
				// 		value: '中国',
				// 		checked: 'true'
				// 	}
				// ],
				// hidden: false
			}
		},
		onShow: function() {	//获得缓存中对应的标签
			console.log('更改分类页面');
			
			try {	//获取支出
			    this.select_out = uni.getStorageSync('xiaoming');
			    if (this.select_out) {
			        console.log('select_out',this.select_out);
			    } else {
					console.log('nothing in '+'xiaoming')
				}
			} catch (e) {
			    console.log('error: get_storage_out');
			}
			this.not_mark_out = [];
			for(var k in this.radioItems){
				if (this.select_out.indexOf(this.radioItems[k]["value"]) == -1){
					
					this.not_mark_out.push(this.radioItems[k]["value"]);
				}
			}
			console.log('not_mark_out',this.not_mark_out);
		},
		methods: {
			checkboxChange_out: function(e) {
				var checked = e.detail.value;
				this.select_out = checked;
				console.log('this.select_out', this.select_out);
				
				try {
				    uni.setStorageSync('xiaoming', this.select_out);
					console.log('set to xiaoming');
				} catch (e) {
				    console.log('error: set_storage_out');
				}
				
				this.not_mark_out = [];
				for(var k in this.radioItems){
					if (this.select_out.indexOf(this.radioItems[k]["value"]) == -1){
						
						this.not_mark_out.push(this.radioItems[k]["value"]);
					}
				}
				console.log('not_mark_out',this.not_mark_out);
				
			},
			checkboxChange_in: function(e) {
				var checked = e.detail.value;
				console.log('收入分类：', checked)

			},
			
			set_storage_out: function(KEY,DATA) {	//KEY为username，DATA为选择的分类
				try {
				    uni.setStorageSync('storage_key', 'hello');
					console.log('storage_key', 'hello');
				} catch (e) {
				    console.log('error: set_storage_out');
				}
			},
			set_storage_in: function(KEY,DATA) {
				try {
				    uni.setStorageSync('storage_key', 'hello');
					console.log('storage_key', 'hello');
				} catch (e) {
				    console.log('error: set_storage_out');
				}
			},
			
			get_storage_out: function(KEY) {
				console.log('get_out ', KEY);
			},
			get_storage_in: function(KEY) {
				console.log('get_in ', KEY);
			},
			// radioChange: function(e) {
			// 	var checked = e.detail.value
			// 	console.log(checked)
			// }
		}
	}
</script>

<style>
	.uni-list-cell {
		justify-content: flex-start
	}

	.uni-list .label-3 {
		padding: 0;
	}
    
    .label-2-text {
        flex: 1;
    }
</style>