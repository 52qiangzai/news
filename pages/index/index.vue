<template>
	<view class="home">
		<scroll-view scroll-x class="navScroll" @click="switchArticleList($event)">
			<view class="item" v-for="nav in navList" :key="nav.id" :data-cid="nav.id">{{nav.classname}}</view>
		</scroll-view>
		<view class="content">
			<view class="row" v-for="item in articleList" :key="item.id">
				<article-item :item="item"></article-item>
			</view>
			<uni-load-more :status="status" iconType="auto" @clickLoadMore="loadingMore"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cid: 50,
				articleList: [],
				navList: [],
				pageInfo: {
					num: 10,
					page: 1
				},
				status: "more"
			}
		},
		onLoad() {
			this.getNavList();
			this.getArticleList()
		},
		methods: {
			// 点击切换
			switchArticleList(e) {
				if (!e.target.dataset.cid) {
					return
				}
				this.cid = e.target.dataset.cid
				this.getArticleList()
				console.log('点击了', e);
			},
			// 获取nav列表
			getNavList() {
				uni.request({
					url: 'https://ku.qingnian8.com/dataApi/news/navlist.php', //仅为示例，并非真实接口地址。
					success: (res) => {
						this.navList = res.data;
						console.log(res.data);
						this.text = 'request success';
					}
				})
			},
			// 刷新新闻列表
			loadingMore() {
				if (this.status === 'no-more') return
				console.log('我触发了');
				this.status = "loading";
				this.pageInfo.page = this.pageInfo.page + 1;
				setTimeout(() => {
					this.getArticleList();
					this.status = "more";
				}, 1000)

			},
			// 获取新闻列表
			getArticleList() {
				uni.request({
					url: 'https://ku.qingnian8.com/dataApi/news/newslist.php', //仅为示例，并非真实接口地址。
					data: {
						cid: this.cid,
						...this.pageInfo
					},
					success: (res) => {
						if (res.data.length !== 0) {
							if (this.pageInfo.page === 1) {
								this.articleList = res.data
							} else {
								this.articleList.push(...res.data)
							}
						} else {
							this.status = "no-more"
						}
						console.log(res.data);
						this.text = 'request success';
					}
				})


			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		.navScroll {
			height: 100rpx;
			background-color: #f7f8fa;
			white-space: nowrap;

			/deep/ ::-webkit-scrollbar {
				width: 4px !important;
				height: 1px !important;
				overflow: auto !important;
				background: transparent !important;
				-webkit-appearance: auto !important;
				display: block;
			}

			.item {
				font-size: 40rpx;
				display: inline-block;
				line-height: 100rpx;
				padding: 0 30rpx;
				color: #333;
			}
		}

		.content {
			padding: 30rpx;

			.row {
				border-bottom: 1rpx solid #efefef;
				padding: 15rpx 0;
				overflow: hidden;
			}
		}
	}
</style>
