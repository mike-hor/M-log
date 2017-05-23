<template>
	<div class="header-wrap">
		<md-whiteframe md-elevation="3">
			<md-toolbar class="toolbar-pc">
				<div class="logo">
					<div class="st-loader"><span class="equal"></span></div>
				</div>
				<h2 class="md-title" style="flex: 1">M-log</h2>
				<md-button v-for='(data,index) in buttons' v-bind:class='{active:index==currentClass}' @click.native="gopage(data.tag,index)">{{data.title}}</md-button>
				<a href="http://weibo.com/u/3097519113" target="_blank" ref="weibo"></a>
				<a href="https://github.com/mike-hor" target="_blank" ref="gitthub"></a>
				<md-menu md-align-trigger>
					<md-button md-menu-trigger>链接</md-button>
					<md-menu-content>
						<md-menu-item data-link="weibo" @click.native="openlink">微博</md-menu-item>
						<md-menu-item data-link="gitthub" @click.native="openlink">gitthub</md-menu-item>
					</md-menu-content>
				</md-menu>
			</md-toolbar>
		</md-whiteframe>
		<md-toolbar class="toolbar-mobile">
			<img @click="toggleLeftSidenav" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICA8cmVjdCB4PSI2IiB5PSIxMiIgd2lkdGg9IjM2IiBoZWlnaHQ9IjQiIGZpbGw9IiM3NTc1NzUiIC8+CiAgPHJlY3QgeD0iNiIgeT0iMjIiIHdpZHRoPSIzNiIgaGVpZ2h0PSI0IiBmaWxsPSIjNzU3NTc1IiAvPgogIDxyZWN0IHg9IjYiIHk9IjMyIiB3aWR0aD0iMzYiIGhlaWdodD0iNCIgZmlsbD0iIzc1NzU3NSIgLz4KPC9zdmc+Cg==" class="menu-icon">
			<!--<md-button class="md-icon-button" @click.native="toggleLeftSidenav">
				<md-icon>=</md-icon>
			</md-button>-->
			<h2 class="md-title" style="margin: auto;">M-log</h2>
		</md-toolbar>
	</div>
</template>

<script>
	import Hub from 'Hub.js'
	export default {
		data() {
			return {
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
		created: function() {

		},
		destoryed: function() {

		},
		components: {

		},
		computed: {

		},
		mounted: function() {

		},
		methods: {
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
				//this.$router.push("/article/" + event.currentTarget.dataset.id);
			},
			openlink(event) {
				var linker = event.currentTarget.dataset.link;
				this.$refs[linker].click();
			},
			toggleLeftSidenav() {				
				this.$emit('Sidenav');
			}
		}
	}
</script>

<style scoped>
	.menu-icon {
		cursor: pointer;
		height: 32px;
		width: 32px;
	}
	
	.toolbar-mobile {
		display: none;
		border-bottom: 1px solid #ddd;
		background: hsla(0, 0%, 100%, .8);
		padding: 0 8px;
	}
	
	.st-loader {
		left: 35px;
		transform: scale(0.8);
		transition: all 0.5s;
	}
	
	.st-loader:hover {
		width: 12em;
	}
	
	.st-loader .equal {
		height: 70px;
		width: 43px;
		top: 2px;
		animation: none;
		border-top: none;
		transform: rotate(115deg);
		left: 23px;
	}
	
	.logo {
		display: inline-block;
		height: 32px;
		vertical-align: middle;
		position: relative;
	}
	
	.md-title {
		color: #34495e;
	}
	
	.md-toolbar.toolbar-pc {
		padding: 0 76px;
		max-width: 980px;
		margin: 0 auto;
		color: #333;
		background-color: #fff;
	}
	
	@media screen and (max-width: 999px) {
		.md-toolbar.toolbar-pc {
			padding: 0px 90px;
		}
		.header-wrap {
			box-shadow: none;
		}
	}
	
	@media screen and (max-width:800px) {
		.toolbar-pc {
			display: none;
		}
		.toolbar-mobile {
			display: flex;
		}
	}
	
	.header-wrap {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 1;
	}
	
	.md-theme-default.md-toolbar {
		background-color: #fff;
		color: #000;
	}
	
	.md-toolbar .md-button:hover:not([disabled]):not(.md-raised):not(.md-icon-button):not(.md-fab) {
		background-color: hsl(153, 46%, 48%);
		color: #fff;
	}
	/*.md-list-item-container.md-button:hover:not([disabled]):not(.md-raised) {
		color: hsl(153, 47%, 49%);
		background-color: transparent;
	}*/
	
	.md-toolbar .md-button.active {
		background-color: hsl(153, 47%, 49%);
		color: #fff;
	}
	
	.md-toolbar .md-button:not(.active) {
		color: #7f8c8d;
	}
</style>
<style>
	/*.md-list-item-container.md-button:hover:not([disabled]):not(.md-raised) {
		color: hsl(153, 47%, 49%);
		background-color: transparent;
	}*/
	
	.md-list-item-container.md-button:hover {
		color: hsl(153, 47%, 49%);
		background-color: transparent;
	}
	
	.md-button.md-button-ghost.md-theme-default {
		/*color: red;*/
		display: none;
	}
</style>