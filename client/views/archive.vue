<template>
	<transition name="fade" mode="in-out">
		<div ref="archive" id="archive" @ps-scroll-y="scrolly">
			<loading :show="loading"></loading>
			<div class="archive-wrap">
				<article ref="content" class="markdown-body">
					<ul>
						<li v-for="(value, key, index) in content">
							<h4>{{key}} <!--<span class="pages">({{value.length}})</span>--></h4>
							<ul>
								<li v-for="(v, k, i) in value">
									<h5>{{k+ '月'}} <span class="pages">({{v.length}})</span></h5>
									<ul>
										<li v-for="(item, index) in v">
											<a href="" @click.prevent="detail(item.sha)">{{item.title}}</a><span v-if="item.tag">({{item.tag}})</span>
										</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</article>
			</div>
		</div>
	</transition>
</template>

<script>
	import Hub from 'Hub.js'
	import 'github-markdown-css/github-markdown.css'
	import Ps from 'perfect-scrollbar'
	import Loading from '../components/Loading'
	import httpService from '../api/httpService'
	export default {
		data() {
			return {
				loading: true,
				content: null
			}
		},
		components: {
			Loading
		},
		computed: {

		},
		created: function() {
			//this.loading = true;
			Hub.$on('archive-top', () => {
				this.top();
			});
			httpService.Getarchive((res) => {
				this.loading = false;
				this.content = res;
			}, (response) => {
				this.$router.push("/error");
				console.log(response);
			})
		},
		//keep-live 后只能在此处实现获取数据
		activated: function() {

		},
		beforeDestroy: function() {
			Hub.$off('archive-top');
		},
		mounted: function() {
			this.$refs.archive.style.height = (document.body.clientHeight - 160) + 'px';
			Ps.initialize(this.$refs.archive, {
				wheelSpeed: 2,
				wheelPropagation: false,
				minScrollbarLength: 2
			});
			window.addEventListener("resize",() => {
				this.resize();
			});
		},
		beforeRouteEnter(to, from, next) {
			//恢复滚动条
			if(from.path.indexOf('/article/') > -1) {
				next(vm => {
					var archiveEl = vm.$refs.archive;
					archiveEl.scrollTop = localStorage.getItem('archive-scrollTop');
					Ps.update(archiveEl);
				});
			} else {
				next();
			}
		},
		methods: {
			resize(){
				this.$refs.archive.style.height = (document.body.clientHeight - 160) + 'px';
				Ps.update(this.$refs.archive);				
			},
			detail(sha) {
				this.$router.push({
					path: "/article/" + sha,
					query: {
						currentIndex: -1
					}
				});
			},
			scrolly(event) {
				let scrollTop = event.target.scrollTop
				localStorage.setItem('archive-scrollTop', scrollTop);
			},
			top() {
				var archiveEl = this.$refs.archive;
				archiveEl.scrollTop = 0;
				Ps.update(archiveEl);
			}
		}
	}
</script>

<style scoped>
	#archive {
		padding-bottom: 15px;
		width: 100%;
		max-width: 740px;
		height: 83%;
		position: fixed;
		top: 100px;
		left: 0;
		right: 0;
		margin: 0 auto;
		padding: 0 12px;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}
	
	.fade-enter,
	.fade-leave-to
	/* .fade-leave-active in <2.1.8 */
	
	{
		opacity: 0
	}
	
	.md-theme-default a:not(.md-button) {
		color: #42b983;
		text-decoration: none;
	}
	
	.md-theme-default a:not(.md-button):hover {
		color: #42b983;
		text-decoration: underline;
	}
	
	.pages {
		color: #7f8c8d;
	}
</style>