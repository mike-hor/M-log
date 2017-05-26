<template>
	<transition name="fade" mode="in-out">
		<div class="article-warp">
			<apptoolbar v-on:back="back" v-on:player="player" v-on:comment="opencomment"></apptoolbar>
			<md-dialog md-open-from="#comment-button" md-close-to="#comment-button" ref="comment">
				<md-dialog-title>写下你的评论吧!</md-dialog-title>
				<md-dialog-content>
					<!-- 来必力City版安装代码 -->
					<div id="lv-container" data-id="city" data-uid="MTAyMC8yODU2My81MTM0">

					</div>
					<!-- City版安装代码已完成 -->
				</md-dialog-content>
			</md-dialog>
			<div id="article" ref="article">
				<loading :show="loading"></loading>
				<div class="wrap">
					<article ref="content" class="markdown-body">
					</article>
				</div>
				<div v-show="showpager" class="pager">
					<a class="prev" v-if="pager.prev" @click.prevent="prev(pager.prev.sha)" href="" id="">{{'上一篇-' + pager.prev.title}}</a>
					<span class="prev" v-else>上一篇-没有了</span>
					<a class="next" v-if="pager.next" @click.prevent="next(pager.next.sha)" href="" id="">{{'下一篇-' + pager.next.title}}</a>
					<span class="next" v-else>下一篇-没有了</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Apptoolbar from '../components/toolbar'
	import Ps from 'perfect-scrollbar'
	import marked from 'marked'
	import 'github-markdown-css/github-markdown.css'
	import 'highlight.js/styles/tomorrow.css'
	import Loading from '../components/Loading'
	import httpService from '../api/httpService'
	import hljs from '../helpers/highlight'
	export default {
		data() {
			return {
				loading: true,
				livere: false,
				showpager: true,
				pager: {
					prev: null,
					next: null
				},
				article: {
					//					content: "# Section 1 \n Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <br><br> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
					content: ''
				}
			}
		},
		components: {
			Loading,
			Apptoolbar
		},
		created: function() {

		},
		computed: {},
		//keep-live 后只能在此处实现获取数据
		activated: function() {
			//			console.log('activated')
			this.fetchData()
		},
		mounted: function() {
			this.$refs.article.style.height = (document.body.clientHeight - 160) + 'px';
			Ps.initialize(this.$refs.article, {
				wheelSpeed: 2,
				wheelPropagation: false,
				minScrollbarLength: 2
			});
			window.addEventListener("resize", () => {
				this.resize();
			});
		},
		beforeRouteUpdate(to, from, next) {
			next();
			this.fetchData()
			//			console.log('beforeRouteUpdate');
		},
		methods: {
			resize() {
				this.$refs.article.style.height = (document.body.clientHeight - 160) + 'px';
				Ps.update(this.$refs.article);
			},
			back(event) {
				this.$router.go(-1);
			},
			prev(sha) {
				this.$router.push({
					path: "/article/" + sha,
					query: {
						currentIndex: (+this.$route.query.currentIndex - 1)
					}
				});
			},
			next(sha) {
				this.$router.push({
					path: "/article/" + sha,
					query: {
						currentIndex: (+this.$route.query.currentIndex + 1)
					}
				});
			},
			player() {
				this.$emit('player');
			},
			opencomment() {
				this.$refs.comment.open();
				if(this.livere) {
					return
				}
				this.livere = true;
				this.Initlivere();
			},
			Initlivere() {
				(function(d, s) {
					var j, e = d.getElementsByTagName(s)[0];

					if(typeof LivereTower === 'function') {
						return;
					}

					j = d.createElement(s);
					j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
					j.async = true;

					e.parentNode.insertBefore(j, e);
				})(document, 'script');
			},
			fetchData() {
				this.pager.prev = null;
				this.pager.next = null;
				this.loading = true;
				this.showpager = true;
				httpService.Getarticle(this.$route.params.id, (response) => {
					this.loading = false;
					this.$refs.content.innerHTML = marked(response.data, {
						sanitize: false,
						smartypants: true,
						highlight(code, lang) {
							try {
								return hljs.highlight(lang, code).value
							} catch(e) {
								return hljs.highlightAuto(code).value
							}
						}
					});
				}, (response) => {
					this.loading = false;
					this.$router.push("/error");
					console.log(response);
				})
				var index = this.$route.query.currentIndex;
				if(index == -1) {
					this.showpager = false;
					return
				}
				var list = JSON.parse(window.sessionStorage.getItem('list'));
				//console.log('当前index:' + index)
				if(index > 0) this.pager.prev = list[+index - 1];
				if(index < list.length) this.pager.next = list[+index + 1];
				var article = this.$refs.article;
				article.scrollTop = 0;
				Ps.update(article);
			}
		}
	}
</script>

<style scoped>
	#article {
		position: fixed;
		top: 100px;
		max-width: 750px;
		height: 80%;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
	
	.pager {
		text-align: center;
		line-height: 29px;
		padding: 0 18px 0 8px;
		margin-top: 10px;
	}
	
	.pager:after {
		content: '';
		display: table;
		clear: both;
	}
	
	.pager .prev {
		float: left;
	}
	
	.pager .next {
		float: right;
	}
	
	.article-warp {
		position: relative;
	}
	
	.wrap {
		display: block;
		padding-right: 18px;
		padding-left: 12px;
	}
	
	@media only screen and (min-width: 768px) .overlay .wrap {
		margin: 150px auto 0;
	}
	
	.close {
		position: absolute;
		top: 50px;
		right: 50px;
		font-size: 36px;
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
</style>
<style>
	#article .markdown-body blockquote {
		background-color: #f4f4f4;
		padding: 5px 15px;
	}
	
	.markdown-body blockquote.tip {
		border-left: 4px solid #f66;
		position: relative;
	}
	
	.markdown-body blockquote.tip:before {
		content: "!";
		background: #f66;
		border-radius: 100%;
		color: #fff;
		font-size: 14px;
		font-weight: 600;
		line-height: 20px;
		text-align: center;
		width: 20px;
		height: 20px;
		position: absolute;
		top: calc(50% - 10px);
		left: -12px;
		box-sizing: border-box;
	}
	
	.md-dialog {
		min-width: 600px;
	}
	
	@media screen and (max-width:800px) {
		.pager {
			text-align: center;
		}
		.pager .prev,
		.pager .next {
			width: 100%;
		}
		.md-dialog {
			min-width: 90%;
		}
	}
	
	.md-theme-default .markdown-body code:not(.hljs) {
		color: #333;
		background-color: transparent;
	}
</style>