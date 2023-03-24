<template>
	<view class="home">
		<scroll-view scroll-x class="navScroll" @click="switchArticleList($event)">
			<view class="item" v-for="nav in navList" :key="nav.id" :data-cid="nav.id">
				{{nav.classname}}
			</view>
		</scroll-view>
		<view class="content">
			<view class="row" v-for="item in articleList" :key="item.id" @click="articleDetail(cid,item.id)">
				<article-item :item="item"></article-item>

			</view>
			<text class="loading">
				{{more?'下拉加载更多':'没有更多了！'}}
			</text>
		</view>
	</view>
</template>

<script>
	import articleMixins from '../../mixins/articleMixin.js'
	export default {
		mixins: [articleMixins],
		data() {
			return {
				cid: 50,
				articleList: [],
				navList: [],
				pageInfo: {
					num: 10,
					page: 1
				},
				more: true

			}
		},
		onLoad() {
			this.getNavList();
			this.getArticleList()
		},
		methods: {
			// 点击切换
			switchArticleList(e) {
				this.pageInfo.page = 1
				this.more = true;
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
			// 刷新加载新闻列表
			onReachBottom() {
				if (!this.more) return
				console.log('我执行了');
				this.pageInfo.page = this.pageInfo.page + 1;
				this.getArticleList()
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
							this.more = false
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
			position: fixed;
			top: var(--window-top);
			z-index: 11111;
			left: 0;
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
			padding-top: 130rpx;

			.row {
				border-bottom: 1rpx solid #efefef;
				padding: 15rpx 0;
				overflow: hidden;
			}

			.loading {
				font-size: 30rpx;
				color: #333;
				display: block;
				text-align: center;
			}
		}
	}
</style>
