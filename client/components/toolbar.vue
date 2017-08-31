<template>
	<div id="toolbar">
		<md-card class="toolbar-pc">
			<md-card-media-actions>
				<md-card-actions>
					<md-button class="md-icon-button" @click.native="back">
						<md-icon class="ico-back my-button" style="font-size: 35px;top: -9px;left: -8px;">keyboard_backspace</md-icon>
					</md-button>
					<md-button id="comment-button" class="md-icon-button" @click.native="comment">
						<i class="comment"></i>
					</md-button>

					<md-button id="player-button" @click.native="showplayer" class="md-icon-button">
						<!--<i v-bind:class='{active:player}' class="ico-player">♫</i>-->
						<!--<md-icon class="ico-player">♫</md-icon>-->
						<!--<i class="material-icons">music_note</i>-->
						<md-icon class="ico-player my-button" v-bind:class='{active:player}' style="font-size: 35px;top: -9px;left: -8px;">music_note</md-icon>
					</md-button>
				</md-card-actions>
			</md-card-media-actions>
		</md-card>
		<md-speed-dial md-mode="scale" class="md-fab-bottom-right toolbar-mobile">
			<md-button class="md-fab" md-fab-trigger>
				<md-icon md-icon-morph>close</md-icon>
				<md-icon>dashboard</md-icon>
			</md-button>
			<md-button class="md-fab md-mini md-clean" @click.native="comment">
				<md-icon>comment</md-icon>
			</md-button>
			<md-button class="md-fab md-mini md-clean" @click.native="back">
				<md-icon>home</md-icon>
			</md-button>
		</md-speed-dial>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				comments: false,
				player: false
			}
		},
		methods: {
			back: function() {
				this.$emit('back');
			},
			comment: function() {
				this.$emit('comment');
			},
			showplayer: function() {
				this.player = !this.player;
				this.$emit('player');
			}
		},
	}
</script>

<style scoped>
	#toolbar .toolbar-mobile {
		display: none;
	}
	
	i.comment {
		width: 25px;
		height: 25px;
		box-shadow: inset 0 0 0 32px;
		border-radius: 50%;
		margin: 1px 1px 2px 2px;
		display: inline-block;
		vertical-align: middle;
		position: relative;
		font-style: normal;
		color: hsl(153, 46%, 48%);
		text-align: left;
		text-indent: -9999px;
		direction: ltr;
	}
	
	i.comment:after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border: 5px solid transparent;
		border-top: 10px solid;
		-webkit-transform: rotate(50deg);
		-ms-transform: rotate(50deg);
		transform: rotate(50deg);
		left: -6px;
		top: 16px;
	}
	
	.my-button {
		font-size: 38px;
		top: -9px;
		left: -5px;
	}
	
	#toolbar {
		position: absolute;
		right: -470px;
		top: 400px;
	}
	
	@media screen and (max-width:800px) {
		#toolbar .toolbar-pc {
			display: none;
		}
		#toolbar {
			position: fixed;
			right: 10px;
			bottom: 65px;
			z-index: 1;
		}
		#toolbar .toolbar-mobile {
			display: flex;
		}
	}
	
	.md-card .md-card-media-actions {
		padding: 0;
	}
	
	.md-card .md-card-media-actions .md-card-actions {
		margin-left: 0px;
	}
	
	#player-button .ico-player {
		/*width: 30px;
		min-width: 24px;
		height: 30px;
		min-height: 24px;
		font-size: 30px;
		margin: auto;
		display: inline-flex;
		align-items: center;
		fill: currentColor;
		text-rendering: optimizeLegibility;
		vertical-align: middle;*/
		color: #aaa;
	}
	
	#player-button .ico-player.active {
		color: #e91e63;
	}

</style>