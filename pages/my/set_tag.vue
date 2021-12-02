<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-common-mt">
			
			<view class="uni-form-item uni-column">
				<view class="title">支出</view>
				<checkbox-group class="uni-list" @change="checkboxChange_out">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in select_out" :key="item">
						<view>
							<checkbox :value="item" :checked="true"></checkbox>	
						</view>
						<view>{{item}}<image class="image" mode="widthFix" :src="img_src[item]" /></view>
					</label>
					
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in not_mark_out" :key="item">
						<view>
							<checkbox :value="item" :checked="false"></checkbox>	
						</view>
						<view>{{item}}<image class="image" mode="widthFix" :src="img_src[item]" /></view>
					</label>
				</checkbox-group>
			</view>
			
			<view class="uni-form-item uni-column">
				<view class="title">收入</view>
				<checkbox-group class="uni-list" @change="checkboxChange_in">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in select_in" :key="item">
						<view>
							<checkbox :value="item" :checked="true"></checkbox>	
						</view>
						<view>{{item}}<image class="image" mode="widthFix" :src="img_src[item]" /></view>
					</label>
					
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in not_mark_in" :key="item">
						<view>
							<checkbox :value="item" :checked="false"></checkbox>	
						</view>
						<view>{{item}}<image class="image" mode="widthFix" :src="img_src[item]" /></view>
					</label>
				</checkbox-group>
			</view>
			

		</view>
	</view>
</template>
<script>
	// import {
	// 	get_user,
	// 	get_storage_out,
	// 	get_storage_in,
	// } from "@/common/util.js";
	export default {
		data() {
			var global_setting = require("../../global setting.json");
			// console.log(global_setting)
			return {
				title: 'label',
				
				radioItems_out: global_setting['UploadSetting']['Out'],
				user_name_out: '',
				select_out: [],
				not_mark_out: [],
				
				radioItems_in: global_setting['UploadSetting']['In'],
				user_name_in: '',
				select_in: [],
				not_mark_in: [],
				
				img_src: global_setting['UploadSetting']['img_src'],
			}
		},
		onShow: function() {	//获得缓存中对应的标签
			var user_id = '';
			try {	//获取支出
			    user_id = uni.getStorageSync('uni-id');
			    if (user_id) {
			        // console.log('log in and get id',user_id);
			    } else {
					user_id = 'xiaoming';
					// console.log('not log in');
				}
			} catch (e) {
			    console.log('error: get_user');
			}
			this.get_user(user_id);	//根据用户名获得缓存
			this.get_storage_out();
			this.get_storage_in();
		},
		methods: {
			checkboxChange_out: function(e) {
				this.select_out = e.detail.value;
				// console.log('this.select_out', this.select_out);
				
				try {
				    uni.setStorageSync(this.user_name_out, this.select_out);
					// console.log('set to '+this.user_name_out);
				} catch (e) {
				    console.log('error: set_storage_out');
				}
				
				this.not_mark_out = [];
				for(var k in this.radioItems_out){
					if (this.select_out.indexOf(this.radioItems_out[k]["value"]) == -1){
						
						this.not_mark_out.push(this.radioItems_out[k]["value"]);
					}
				}
				// console.log('not_mark_out',this.not_mark_out);
			},
			checkboxChange_in: function(e) {
				this.select_in = e.detail.value;
				// console.log('this.select_in', this.select_in);
				
				try {
				    uni.setStorageSync(this.user_name_in, this.select_in);
					// console.log('set to '+this.user_name_in);
				} catch (e) {
				    console.log('error: set_storage_in');
				}
				
				this.not_mark_in = [];
				for(var k in this.radioItems_in){
					if (this.select_in.indexOf(this.radioItems_in[k]["value"]) == -1){
						
						this.not_mark_in.push(this.radioItems_in[k]["value"]);
					}
				}
				// console.log('not_mark_in',this.not_mark_in);

			},
			get_user: function(user_name) {
				this.user_name_in = user_name+"_in";
				// console.log(user_name+"_in")
				this.user_name_out = user_name+"_out";
				// console.log(user_name+"_out")
			},
			
			get_storage_out: function() {
				try {	//获取支出
				    this.select_out = uni.getStorageSync(this.user_name_out);
				    if (this.select_out) {
				        // console.log('select_out',this.select_out);
				    } else {
						// console.log('nothing in '+this.user_name_out)
					}
				} catch (e) {
				    console.log('error: get_storage_out');
				}
				this.not_mark_out = [];
				for(var k in this.radioItems_out){
					if (this.select_out.indexOf(this.radioItems_out[k]["value"]) == -1){
						this.not_mark_out.push(this.radioItems_out[k]["value"]);
					}
				}
				// console.log('not_mark_out',this.not_mark_out);
			},
			get_storage_in: function() {
				try {	//获取收入
				    this.select_in = uni.getStorageSync(this.user_name_in);
				    if (this.select_in) {
				        // console.log('select_in',this.select_in);
				    } else {
						// console.log('nothing in '+this.user_name_in)
					}
				} catch (e) {
				    console.log('error: get_storage_in');
				}
				this.not_mark_in = [];
				for(var k in this.radioItems_in){
					if (this.select_in.indexOf(this.radioItems_in[k]["value"]) == -1){
						
						this.not_mark_in.push(this.radioItems_in[k]["value"]);
					}
				}
				// console.log('not_mark_in',this.not_mark_in);
			},
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