// 文章相关mixin

export default {
	methods: {
		// 跳转文章详情
		articleDetail(cid, id) {
			uni.navigateTo({
				url: `/pages/detail/detail?cid=${cid}&id=${id}`,
				success() {
					console.log('我运行咯', cid, id);
				}
			})

		}
	}
}