<template>
	<view class="detail">
		<view class="title">{{detailObj.title}}</view>
		<view class="info">
			<view class="author">编辑：{{detailObj.author}}</view>
			<view class="time">发布时间：{{detailObj.posttime}}</view>
		</view>
		<view class="content">
			<rich-text :nodes="detailObj.content"></rich-text>
		</view>
		<view class="state">
			声明：本站的内容均采集与腾讯新闻，如果侵权请联系管理（1724417279@qq.com）进行整改删除，本站进行了内容采集不代表本站及作者观点，若有侵犯请及时联系管理员，谢谢您的支持。
		</view>
	</view>
</template>

<script>
	import {
		parseTime
	} from '@/utils/dateFormatUtil.js'


	export default {
		data() {
			return {
				detailObj: {},
				options: {}
			};
		},
		onLoad(options) {
			this.options = options;
			this.getDetail(options)
		},
		methods: {
			//获取详情
			getDetail() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/detail.php",
					data: this.options,
					success: res => {
						this.detailObj = Object.assign(res.data, {
							posttime: parseTime(res.data.posttime),
							content: res.data.content.replace(/<img/gi,
								'<img style="max-width:100%;"')
						})

						let historyArr = uni.getStorageSync("historyArr") || [];

						let oneData = {
							id: this.detailObj.id,
							classid: this.detailObj.classid,
							picurl: this.detailObj.picurl,
							title: this.detailObj.title,
							looktime: parseTime(Date.now())
						}

						let index = historyArr.findIndex(item => {
							return item.id == oneData.id
						})

						if (index >= 0) {
							historyArr.splice(index, 1)
						}

						historyArr.unshift(oneData);
						historyArr = historyArr.slice(0, 10);

						uni.setStorageSync("historyArr", historyArr);


					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 50rpx 30rpx;

		.title {
			font-size: 50rpx;
			line-height: 1.6em;
		}

		.info {
			padding: 0 30rpx;
			margin: 50rpx 0;
			height: 80rpx;
			background: #f6f6f6;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 22rpx;
			color: #888;
		}

		.state {
			background: #FEF0F0;
			font-size: 26rpx;
			padding: 20rpx;
			color: #F89898;
			line-height: 1.8em;
		}

	}
</style>