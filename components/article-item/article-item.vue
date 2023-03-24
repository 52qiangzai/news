<template>
	<view class="articleItem">
		<view class="pic">
			<image :src="item.picurl" mode="aspectFill"></image>
		</view>
		<view class="text">
			<view class="title">
				<view class="content">
					{{item.title}}
				</view>
			</view>
			<view class="info" v-show="!item.looktime">
				<view class="font">{{item.author}}</view>
				<view class="font">浏览量{{item.hits}}</view>
			</view>
			<view class="info" v-show="item.looktime">
				<view class="font">浏览器时间 {{item.looktime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "ArticleItem",
		props: {
			item: {
				type: Object,
				default: () => {
					return {
						author: "作者名",
						classid: "51",
						hits: "999",
						id: "0",
						picurl: "https://via.placeholder.com/230x160.png/ff0000",
						posttime: "1667802784",
						title: "我是默认标题"
					}
				}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.articleItem {
		display: flex;

		.pic {
			flex-shrink: 0;
			width: 230rpx;
			height: 160rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.text {
			flex: 1;
			padding-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				.content {
					font-size: 36rpx;
					color: #333;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}

			.info {
				font-size: 26rpx;
				color: #999;
				display: flex;

				.font {
					padding-right: 20rpx;
				}
			}
		}
	}
</style>
