<template>
	<div id="app">
		<md-sidenav class="md-left" ref="leftSidenav">
			<div class="slider-content">
				<ul>
					<md-button v-for='(data,index) in buttons' v-bind:class='{active:index==currentClass}' @click.native="gopage(data.tag,index)">{{data.title}}</md-button>
				</ul>
			</div>
		</md-sidenav>
		<appheader v-on:Sidenav="Sidenav"></appheader>
		<keep-alive>
			<router-view v-on:player="player"></router-view>
		</keep-alive>
		<appfooter></appfooter>
		<transition name="bounce">
			<div v-show="showplayer" class="player">
				<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=110 src="//music.163.com/outchain/player?type=0&id=648141017&auto=0&height=90"></iframe>
			</div>
		</transition>
		<div class="live2d-container">
			<canvas id="glcanvas" width="340" height="470"></canvas>
		</div>
	</div>
</template>

<style scoped>
	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, helvetica, 'helvetica neue', Ubuntu, 'segoe ui', arial, sans-serif;
	}
	.live2d-container{
		position: absolute;
		left: 0px;
		top: 50%;
	}
	.slider-content {
		padding: 0 15px;
	}
	
	.slider-content ul {
		height: 100%;
		overflow-y: auto;
		padding: 0;
		padding-top: 60px;
		padding-bottom: 10px;
		margin: 0;
	}
	
	.slider-content ul li {
		list-style: none;
	}
	
	.slider-content .md-button:hover:not([disabled]):not(.md-raised):not(.md-icon-button):not(.md-fab) {
		background-color: hsl(153, 46%, 48%);
		color: #fff;
	}
	
	.slider-content .md-button.active {
		background-color: hsl(153, 47%, 49%);
		color: #fff;
	}
	
	.slider-content .md-button:not(.active) {
		color: #7f8c8d;
	}
	
	.player {
		position: fixed;
		right: 0px;
		bottom: 106px;
	}
	
	#app {
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		min-height: 100%;
		flex-direction: column;
		align-items: center;
	}
	
	.bounce-enter-active {
		animation: bounce-in .5s;
	}
	
	.bounce-leave-active {
		animation: bounce-out .5s;
	}
	
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}
	
	@keyframes bounce-out {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(0);
		}
	}
</style>
<style>	
	.md-sidenav .md-sidenav-content {
		width: 158px;
	}
	
	#app {
		width: 100%;
		height: 100%;
	}
	
	#app:after {
		content: '';
		display: table;
		clear: both;
	}
	
	::-webkit-scrollbar {
		width: 14px;
		height: 14px;
	}
	
	::-webkit-scrollbar-track,
	::-webkit-scrollbar-thumb {
		border-radius: 999px;
		border: 5px solid transparent;
	}
	
	::-webkit-scrollbar-track {
		box-shadow: 1px 1px 5px rgba(0, 0, 0, .2) inset;
	}
	
	::-webkit-scrollbar-thumb {
		min-height: 20px;
		background-clip: content-box;
		box-shadow: 0 0 0 5px rgba(0, 0, 0, .2) inset;
	}
	
	::-webkit-scrollbar-corner {
		background: transparent;
	}
</style>
<script>
	import Appheader from '../components/header'
	import Appfooter from '../components/footer'
	import Hub from 'Hub.js'
	export default {
		data() {
			return {
				showplayer: false,
				buttons: [{
						title: '首页',
						tag: 'index'
					}, {
						title: '关于',
						tag: 'about'
					},
					{
						title: '归档',
						tag: 'archive'
					}
				],
				currentClass: 0
			}
		},
		components: {
			Appheader,
			Appfooter
		},
		computed: {
			//			count() {
			//				return this.$store.state.count
			//			}
		},
		methods: {
			player: function() {
				this.showplayer = !this.showplayer;
			},
			Sidenav: function() {
				this.$refs.leftSidenav.toggle();
			},
			gopage(pagetype, index) {
				const Pages = {
					'index': () => {
						localStorage.setItem('index-scrollTop', 0);
						this.$router.push("/");
						if(this.$router.currentRoute.path == "/") {
							Hub.$emit('home-top');
						}
					},
					'about': () => {
						this.$router.push("/about")
					},
					'archive': () => {
						localStorage.setItem('archive-scrollTop', 0);
						this.$router.push("/archive")
						if(this.$router.currentRoute.path == "/archive") {
							Hub.$emit('archive-top');
						}
					},
				}
				pagetype in Pages && Pages[pagetype]();
				this.currentClass = index;
				this.Sidenav();
				//this.$router.push("/article/" + event.currentTarget.dataset.id);
			},
		}
	}
</script>