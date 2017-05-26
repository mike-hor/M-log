<template>
	<transition name="fade" mode="in-out">
		<div ref="archive" id="archive" @ps-scroll-y="scrolly">
			<loading :show="loading"></loading>
			<div class="archive-wrap">
				<article ref="content" class="markdown-body">
					<ul v-if="ConfigType=='YEAR'">
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
					<div class="archive-type" v-else>
						<md-button-toggle md-single style="float: right;">
							<md-button @click.native="changeType(key,index)" v-for="(value, key,index) in content" :class="{'md-toggle':index==currentIndex}">{{key}}</md-button>							
						</md-button-toggle>
						<div class="clear"></div>
						<div class="type-item" v-for="(item,index) in currentType">
							<a>{{item.title}}</a>				
						</div>
					</div>
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
	import Config from '../config/config.js'
	export default {
		data() {
			return {
				loading: true,
				content: null,
				currentType:null,
				currentIndex:0
			}
		},
		components: {
			Loading
		},
		computed: {
			ConfigType: function() {
				return Config.Archive_Type
			}
		},
		created: function() {
			//this.loading = true;
			Hub.$on('archive-top', () => {
				this.top();
			});
			httpService.Getarchive((res) => {
				this.loading = false;
				this.content = res;
				this.currentType = res[Object.keys(res)[0]];
			}, (response) => {
				this.$router.push("/error");
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
			window.addEventListener("resize", () => {
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
			resize() {
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
			changeType(key,index){
				this.currentIndex = index;
				this.currentType = this.content[key];
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
	.clear:after{
		content: '';
		display: table;
		clear: both;
		
	}
	.type-item{
		margin-top:20px;		
	}
	.archive-type .md-button {
		background-color: rgba(0, 0, 0, .12);
		margin-right: 8px;
		margin-bottom: 4px;
		height: 32px;
		padding: 8px 12px;
		display: inline-block;
		border-radius: 32px;
		transition: all .4s cubic-bezier(.25, .8, .25, 1);
		font-size: 13px;
		line-height: 16px;
		white-space: nowrap;
		color: rgba(0, 0, 0, .87);
	}
	
	.archive-type .md-button.md-toggle {
		color: #fff;
		background-color: hsl(153, 47%, 49%);
		cursor: pointer;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
	}
	
	.archive-type .md-button.md-toggle:hover:not([disabled]) {
		background-color: hsl(153, 46%, 48%);
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
<style type="text/css">
	#archive .md-ink-ripple {
		border-radius: 15px;
	}
</style>