<template>
	<footer class="footer">
		<div class="has-ripple purple">
			<md-ink-ripple />© 2017 -by Mike.hor
		</div>
	</footer>
</template>

<script>
	export default {
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

<style scoped>
	.footer {
		border-top: 1px solid #ddd;
		padding: 20px 0;
		text-decoration: none;
		padding-bottom: 15px;
		width: 100%;
		max-width: 740px;
		position: fixed;
		bottom: 0px;
		text-align: center;
		cursor: pointer;
		margin: 0 auto;
		left: 0;
		right: 0;
	}
	
	.has-ripple {
		margin-bottom: 0px;
		display: inline-block;
		position: relative;
	}
	.purple{
		color: #42b983;
	}
	.copy {
		/*position: absolute;
		top: 0;
		right: 25px;
		height: 100%;
		text-align: left;
		padding-left: 1rem;*/
	}
</style>