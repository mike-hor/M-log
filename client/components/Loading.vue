<template>
	<div class="loading-warp" v-show="show">
		<div class="mask" v-show="show"></div>
		<div class="loading" v-show="show">
			<!--<md-spinner :md-size="80" :md-stroke="3" class="md-accent" md-indeterminate></md-spinner>-->
			<div class="st-loader"><span class="equal"></span></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {

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

		}
	}
</script>

<style>
	.loading-warp {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 10;
		overflow: hidden;
		left: 0;
	}
	
	.loading-warp .mask {
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.95);
		position: absolute;
	}
	
	.loading-warp .loading {
		display: inline-block;
		position: absolute;
		top: 50%;
		left: 50%;
	}
	/*loading css*/
	
	@keyframes loading {
		0% {
			left: 0;
		}
		50% {
			left: 8em;
		}
		100% {
			left: 0;
		}
	}
	
	.st-loader {
		width: 10em;
		height: 2.5em;
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -1.25em 0 0 -5em;
		box-sizing: border-box;
	}
	
	.st-loader:before,
	.st-loader:after {
		content: "";
		display: block;
		position: absolute;
		top: 3px;
		bottom: 0;
		width: 2em;
		height: 2em;
		box-sizing: border-box;
		border: 0.25em solid hsl(153, 46%, 48%);
		border-bottom: none;
		border-left: none;
		transform: rotate(45deg);
		border-radius: 0 4px 0 0;
	}
	
	.st-loader:before {
		left: -15px;
		content: '';
		pointer-events: none;
		transform: rotate(-135deg);
	}
	
	.st-loader:after {
		right: -15px;
		content: '';
		pointer-events: none;
	}
	
	.st-loader .equal {
		display: block;
		position: absolute;
		top: 50%;
		margin-top: -0.5em;
		left: 4.16667em;
		height: 1em;
		width: 1.66667em;
		border: 0.25em solid hsl(153, 46%, 48%);
		box-sizing: border-box;
		border-width: 0.25em 0;
		transform: translate3d(0, 0, 0);
		animation: loading 1.5s infinite ease-in-out;
		/*will-change: transform;*/
	}
</style>