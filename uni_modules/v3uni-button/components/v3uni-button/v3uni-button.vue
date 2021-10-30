<template>
	<view class="v3uni-button-wrapper">
		<view
			class="btn-wrapper"
			:class="[
				type,
				shape,
				`${type}-${theme}`,
				`${type}-${disabled ? 'disabled' : ''}`,
				size
			]"
			:hover-class="disabled ? '' : `${type}-hover-${theme}`"
			:hover-stay-time="200"
			@tap.stop="tap"
			@click.stop="click"
		>
			<slot></slot>
		</view>
	</view>
</template>
<script>
// #ifdef VUE2
export default {
	props: {
		type: {
			default: 'primary'
		},
		shape: {
			default: 'square'
		},
		theme: {
			default: 'light'
		},
		size:{
			default:"middle"
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		tap() {
			if (!this.disabled) {
				this.$emit('tap');
			}
		},
		click() {
			if (!this.disabled) {
				this.$emit('click');
			}
		}
	}
};
// #endif

// #ifdef VUE3
import {defineComponent} from 'vue';
export default defineComponent({
	emit:['tap','click'],
	props: {
		type: {
			default: 'primary'
		},
		shape: {
			default: 'square'
		},
		theme: {
			default: 'light'
		},
		size:{
			default:"middle"
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup(props,ctx){
		console.log('current mode vue 3.0');
		const tap = () => {
			if(!props.disabled) {
				ctx.emit('tap');
			} 
		}
		
		const click = ()=> {
			if(!props.disabled) {
				ctx.emit('click');
			} 
		}
		
		return {
			tap,
			click
		}
	}
});
// #endif
</script>
<style lang="less" scoped>
@import '../theme.less';
.v3uni-button-wrapper {
	.btn-wrapper {
		padding: 16rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 20rpx;
		font-size: 24rpx;
		border: 1px solid #fff;
	}
	.circle {
		border-radius: 40rpx;
	}
	.square {
		border-radius: 8rpx;
	}
	.middle {
		padding: 16rpx;
		font-size: 24rpx;
	}
	.large {
		padding: 20rpx;
		font-size: 28rpx;
	}
	.big {
		padding: 22rpx;
		font-size: 30rpx;
	}
	.small {
		padding: 12rpx;
		font-size: 24rpx;
	}
	.mini {
		padding: 10rpx;
		font-size: 20rpx;
	}

	.primary {
		background-color: @primary-color;
		color: #fff;
	}
	.primary-dark {
		background-color: @primary-color-dark;
		color: #fff;
	}
	.primary-disabled {
		background-color: @primary-color-disabled;
	}
	.primary-hover-light {
		background-color: @primary-color-light !important;
		border: 1px solid @primary-color;
		color: @primary-color;
	}
	.primary-hover-dark {
		background-color: @primary-color-light !important;
		border: 1px solid @primary-color-dark;
		color: @primary-color-dark;
	}

	.error {
		background-color: @error-color;
		color: #fff;
	}
	.error-dark {
		background-color: @error-color-dark;
		color: #fff;
	}
	.error-disabled {
		background-color: @error-color-disabled;
	}
	.error-hover-light {
		background-color: @error-color-light !important;
		border: 1px solid @error-color;
		color: @error-color;
	}
	.error-hover-dark {
		background-color: @error-color-light !important;
		border: 1px solid @error-color-dark;
		color: @error-color-dark;
	}

	.warning {
		background-color: @warning-color;
		color: #fff;
	}
	.warning-dark {
		background-color: @warning-color-dark;
		color: #fff;
	}
	.warning-disabled {
		background-color: @warning-color-disabled;
	}
	.warning-hover-light {
		background-color: @warning-color-light !important;
		border: 1px solid @warning-color;
		color: @warning-color;
	}
	.warning-hover-dark {
		background-color: @warning-color-light !important;
		border: 1px solid @warning-color-dark;
		color: @warning-color-dark;
	}

	.info {
		background-color: @info-color;
		color: #fff;
	}
	.info-dark {
		background-color: @info-color-dark;
		color: #fff;
	}
	.info-disabled {
		background-color: @info-color-disabled;
	}
	.info-hover-light {
		background-color: @info-color-light !important;
		border: 1px solid @info-color;
		color: @info-color;
	}
	.info-hover-dark {
		background-color: @info-color-light !important;
		border: 1px solid @info-color-dark;
		color: @info-color-dark;
	}

	.success {
		background-color: @success-color;
		color: #fff;
	}
	.success-dark {
		background-color: @success-color-dark;
		color: #fff;
	}
	.success-disabled {
		background-color: @success-color-disabled;
	}
	.success-hover-light {
		background-color: @success-color-light !important;
		border: 1px solid @success-color;
		color: @success-color;
	}
	.success-hover-dark {
		background-color: @success-color-light !important;
		border: 1px solid @success-color-dark;
		color: @success-color-dark;
	}

	.warning {
		background-color: @warning-color;
		color: #fff;
	}
	.warning-dark {
		background-color: @warning-color-dark;
		color: #fff;
	}
	.warning-disabled {
		background-color: @warning-color-disabled;
	}
	.warning-hover-light {
		background-color: @warning-color-light !important;
		border: 1px solid @warning-color;
		color: @warning-color;
	}
	.warning-hover-dark {
		background-color: @warning-color-light !important;
		border: 1px solid @warning-color-dark;
		color: @warning-color-dark;
	}
}
</style>
