<template>
	<transition name="fade" mode="in-out">
		<div id="error" ref="error">
			<loading :show="loading"></loading>
			<div class="wrap">
				<div class="wrap-container">
					<img src="../img/ds-1.gif">
					<div class="tips"> 哎呀,断网咯 (´･ω･`) </div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Ps from 'perfect-scrollbar'
	import Loading from '../components/Loading'
	export default {
		data() {
			return {
				loading: true,
			}
		},
		components: {
			Loading
		},
		computed: {

		},
		//keep-live 后只能在此处实现获取数据
		activated: function() {
			this.loading = false;

		},
		mounted: function() {
			this.$refs.error.style.height = (document.body.clientHeight - 160) + 'px';
			Ps.initialize(this.$refs.error, {
				wheelSpeed: 2,
				wheelPropagation: false,
				minScrollbarLength: 2
			});
			window.addEventListener("resize", () => {
				this.resize();
			});
		},
		methods: {
			resize() {
				this.$refs.error.style.height = (document.body.clientHeight - 160) + 'px';
				Ps.update(this.$refs.error);
			},

		}
	}
</script>

<style scoped>
	#error {
		position: fixed;
		top: 100px;
		max-width: 750px;
		height: 80%;
		left: 0;
		right: 0;
		margin: 0 auto;
		padding: 20px 10px 10px;
	}
	
	.wrap {
		padding-right: 15px;
		text-align: center;
		display: flex;
		justify-content: center;
	}
	.wrap-container{
		width: 200px;
		
	}
	.tips {
		border-radius: 5px;
		padding: 15px;
		border: solid 1px #ddd;
		background-color: #f5f5f5;
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