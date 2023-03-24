<template>
	<view class="user">
		<view class="top">
			<image src="/static/images/user_top.png" mode="aspectFill"></image>
			<view class="title">浏览历史</view>
		</view>
		<view class="content" v-if="historyArr.length">
			<view class="item" v-for="item in historyArr" :key="item.id" @click="articleDetail(item.classid,item.id)">
				<article-item :item="item"></article-item>
			</view>

		</view>
		<view class="noContent" v-else>
			<image src="/static/images//no_history.png" mode="widthFix"></image>
			<div class="text">暂无浏览记录</div>
		</view>
	</view>
</template>

<script>
	import articleMixins from '../../mixins/articleMixin.js'
	export default {
		mixins: [articleMixins],
		data() {
			return {
				historyArr: []
			};
		},
		onShow() {
			this.historyArr = uni.getStorageSync('historyArr')
		},
	}
</script>

<style lang="scss">
	.user {
		.top {
			background: #f8f8f8;
			padding: 50rpx 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 150rpx;
				height: 150rpx;
			}

			.title {
				font-size: 38rpx;
				color: #666;
				padding-top: 30rpx;
			}
		}

		.content {
			.item {
				padding: 20rpx;
				border-bottom: 1rpx #e2e2e2 dotted;
			}
		}

		.noContent {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			image {
				width: 150rpx;
			}

			.text {
				font-size: 30rpx;
				color: #888;
			}
		}
	}
</style>