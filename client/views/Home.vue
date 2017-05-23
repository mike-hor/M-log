<template>
	<transition name="fade" mode="in-out">
		<div class="home" ref="home" @scroll="scroller" @ps-scroll-y="scrolly">
			<loading :show="loading"></loading>
			<div class="card-warp" v-for="({title,date,sha},index) in list" @click="detail(sha,index)">
				<md-card md-with-hover>
					<md-ink-ripple class="ripple"></md-ink-ripple>
					<md-card-header>
						<div class="md-title">{{title}}</div>
						<div class="md-subhead">
							<!--<md-icon>location_on</md-icon>-->
							<span>{{TranslateTime(date)}}</span>
						</div>
					</md-card-header>
				</md-card>
			</div>
		</div>
	</transition>
</template>
<script>
	import Hub from 'Hub.js'
	import Ps from 'perfect-scrollbar'
	import Loading from '../components/Loading'
	import httpService from '../api/httpService'
	export default {
		data() {
			return {
				loading: true,
				list: [],
				HomeEl: null
			}
		},
		components: {
			Loading
		},
		computed: {

		},
		created: function() {
			Hub.$on('home-top', () => {
				this.top();
			});

			httpService.Getarticlelist((res) => {
				this.loading = false;
				if(res.length >= 15) {
					this.list = res.slice(1, 15);
				} else {
					this.list = res;
				}
			}, (response) => {
				console.log(response);
			})

		},
		beforeDestroy: function() {
			Hub.$off('home-top');
		},
		//keep-live 后只能在此处实现获取数据
		activated: function() {
			//console.log((document.body.clientHeight  - 130) + 'px');			
		},
		mounted: function() {
			this.$refs.home.style.height = (document.body.clientHeight - 160) + 'px';
			Ps.initialize(this.$refs.home, {
				wheelSpeed: 1,
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
					var homeEl = vm.$refs.home;
					homeEl.scrollTop = localStorage.getItem('index-scrollTop');
					Ps.update(homeEl);
				});
			} else {
				next();
			}
		},
		methods: {
			resize(){
				this.$refs.home.style.height = (document.body.clientHeight - 160) + 'px';
				Ps.update(this.$refs.home);				
			},
			detail(sha, currentIndex) {
				this.$router.push({
					path: "/article/" + sha,
					query: {
						currentIndex
					}
				});
			},
			scrolly(event) {
				//console.log(event.target.scrollTop);
				let scrollTop = event.target.scrollTop
				//				if(event.target.scrollTop == 0) {
				//					return
				//				}
				localStorage.setItem('index-scrollTop', scrollTop);
			},
			top() {
				var homeEl = this.$refs.home;
				homeEl.scrollTop = 0;
				Ps.update(homeEl);
			},
			scroller() {
				if(this.loading) {
					this.$refs.home.scrollTop = 0
					Ps.update(this.$refs.home);
				}
			},
			//转换时间标识
			TranslateTime(time) {
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var halfamonth = day * 15;
				var month = day * 30;
				var year = month * 12;
				var date = time.substring(0, 19);
				date = date.replace(/-/g, '/').replace(/T/g, ' ').replace(/Z/g, ' '); //转换得到的时间
				var timestamp1 = new Date(date).getTime() + 28800000; //       
				var now = new Date(); // 
				var result;
				var diffValue = now - timestamp1;
				if(diffValue < 0) {
					//alert("结束日期不能小于开始日期！");
				}
				var year = diffValue / year;
				var monthC = diffValue / month;
				var weekC = diffValue / (7 * day);
				var dayC = diffValue / day;
				var hourC = diffValue / hour;
				var minC = diffValue / minute;
				if(year >= 1) {
					result = parseInt(year) + "年前";
				} else if(monthC >= 1) {
					result = parseInt(monthC) + "个月前";
				} else if(weekC >= 1) {
					result = parseInt(weekC) + "周前";
				} else if(dayC >= 1) {
					result = parseInt(dayC) + "天前";
				} else if(hourC >= 1) {
					result = parseInt(hourC) + "个小时前";
				} else if(minC >= 1) {
					result = parseInt(minC) + "分钟前";
				} else
					result = "刚刚发表";
				return result;
			}
		},
		destoryed: function() {

		}
	}
</script>
<style>
	.home .card-warp {
		color: #34495e;
	}
	
	.card-warp .md-button:hover:not([disabled]):not(.md-raised):not(.md-icon-button):not(.md-fab) {
		background-color: hsl(153, 46%, 48%);
		color: #fff;
	}
	
	.home .md-card .md-title {
		margin-bottom: 20px;
		font-size: 22px;
	}
	
	.home .md-card .md-subhead>span {
		font-size: 14px;
		color: #888;
		border-top: 1px solid #ddd;
		padding-top: 12px;
	}
	/*控制涟漪的颜色*/
	
	.home .md-ripple {
		background-color: #eee;
	}
	
	.home {
		padding-bottom: 15px;
		/*padding: 130px 30px 15px;*/
		padding: 0px 15px 15px 15px;
		width: 100%;
		max-width: 740px;
		/*flex: 1;
		flex-direction: row;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		flex-wrap: wrap;
		justify-content: space-around;
		align-content: space-around;*/
		height: 83%;
		position: fixed;
		top: 100px;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
	
	.home .card-warp {
		box-sizing: border-box;
		/*		width: 50%;*/
		padding: 5px;
	}
	
	.home .card-warp:not(:nth-child(2)) {
		margin-top: 15px;
	}
	
	.home .md-card-content {
		max-height: 126px;
		color: rgba(0, 0, 0, 0.61);
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