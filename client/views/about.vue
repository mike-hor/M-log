<template>
	<transition name="fade" mode="in-out">
		<div id="about" ref="about">
			<loading :show="loading"></loading>
			<div class="wrap">
				<article ref="content" class="markdown-body">
				</article>
			</div>
		</div>
	</transition>
</template>

<script>
	import Apptoolbar from '../components/toolbar'
	import Ps from 'perfect-scrollbar'
	import marked from 'marked'
	import 'github-markdown-css/github-markdown.css'
	import Loading from '../components/Loading'
	import httpService from '../api/httpService'
	export default {
		data() {
			return {
				loading: true,
				livere: false,
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
		computed: {

		},
		//keep-live 后只能在此处实现获取数据
		activated: function() {
			this.loading = true;
			httpService.Getabout((response) => {
				this.loading = false;
				this.$refs.content.innerHTML = marked(response.data, {
					sanitize: true
				});
			}, (response) => {
				this.loading = false;
				console.log(response);
			})
		},
		mounted: function() {
			this.$refs.about.style.height = (document.body.clientHeight - 160) + 'px';
			Ps.initialize(this.$refs.about, {
				wheelSpeed: 2,
				wheelPropagation: false,
				minScrollbarLength: 2
			});
			window.addEventListener("resize",() => {
				this.resize();
			});
		},
		methods: {
			resize(){
				this.$refs.about.style.height = (document.body.clientHeight - 160) + 'px';
				Ps.update(this.$refs.about);				
			},
			back(event) {
				this.$router.go(-1);
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
			}
		}
	}
</script>

<style scoped>
	#about {
		position: fixed;
		top: 100px;
		max-width: 750px;
		height: 80%;
		left: 0;
		right: 0;
		margin: 0 auto;
		padding: 20px 10px 10px;
	}
	.wrap{
		padding-right: 15px;
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