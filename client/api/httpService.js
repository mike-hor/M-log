import axios from 'axios'
import Qs from 'qs'
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'Content-Type:text/html';
//axios.defaults.baseURL = '';
function getListUrl() {
	// @see https://developer.github.com/v3/repos/contents/#get-contents	
	let url = `https://api.github.com/repos/mike-hor/writings/contents/posts?ref=master`
	return url
}
const Cache = {
	get: (key) => {
		if(!window.sessionStorage) return false
		return JSON.parse(window.sessionStorage.getItem(key))
	},
	set: (key, data) => {
		if(!window.sessionStorage) return false
		window.sessionStorage.setItem(key, JSON.stringify(data))
		return true
	},
	has: (key) => {
		return Boolean(window.sessionStorage && window.sessionStorage.hasOwnProperty(key))
	}
};

export default {
	Getarticlelist: function(success, error) {
		if(Cache.has('list')) {
			success(Cache.get('list'));
		} else {
			axios.get(getListUrl()).then(res => {
				const list = []
				res.data.forEach((v, i, arr) => {
					if(v.type == 'file') {
						list.unshift({
							title: v.name.split('_')[1],
							date: v.name.split('_')[0],
							tag: v.name.split('_')[2].split('.')[0],
							sha: v.sha
						})
					} else {
						return
					}
				})
				list.sort(function(a, b) {
					return Date.parse(b.date) - Date.parse(a.date); //时间正序
				});
				Cache.set('list', list)
				success(list)
			}, response => {
				error(response)
			});
		}
	},
	Getarticle: function(hash, success, error) {
		const httpOpts = {
			headers: {
				Accept: 'application/vnd.github.v3.raw'
			}
		}
		const cacheKey = 'post.' + hash
		if(Cache.has(cacheKey)) {
			success(Cache.get(cacheKey));
		} else {
			axios.get(this.getPostUrl(hash), httpOpts).then(response => {
				//save cache
				Cache.set(cacheKey, response)
				success(response)
			}, response => {
				error(response)
			});
		}
	},
	Getabout: function(success, error) {
		this.Getarticle('c7fb75b59991d7f7a1fbe9cd35570eef80fac41c', success, error);
	},
	Getarchive: function(success, error) {
		if(Cache.has('archive')) {
			success(Cache.get('archive'));
		} else {
			if(Cache.has('list')) {
				success(this.sortArchive(Cache.get('list'), 'year'));
			} else {
				this.Getarticlelist((res) => {
					success(this.sortArchive(res, 'year'));
				}, (res) => {
					error(res);
				})
			}
		}
	},
	sortArchive: function(list, type) {
		if(type == 'year') {
			var archive = {};
			list.forEach((v, i, arr) => {
				var year = v.date.split('-')[0];
				var month = v.date.split('-')[1];
				if(year in archive) {
					if(month in archive[year]) {
						archive[year][month].push(v);
					} else {
						archive[year][month] = [];
						archive[year][month].push(v);
					}
				} else {
					archive[year] = {};
					archive[year][month] = [];
					archive[year][month].push(v);
				}
			})
			Cache.set('archive', archive);
			return archive;
		} else if(type == 'type') {
			console.log('使用文章tag分类')
			var archive = {};
			list.forEach((v, i, arr) => {
				var tag = [];
				tag.push(v.tag);
				if(tag.indexOf('&')) {
					tag = tag.split('&');
					tag.forEach((value, key, arry) => {
						if(value in archive) {
							archive[value].push(v);
						} else {
							archive[value] = [];
							archive[value].push(v);
						}
					})
				}

			})
		}

	},
	getPostUrl: function(hash) {
		// @see https://developer.github.com/v3/git/blobs/#get-a-blob
		return `https://api.github.com/repos/mike-hor/writings/git/blobs/${hash}`

		//example:		https://api.github.com/repos/mike-hor/writings/git/blobs/d2056d8e3399e912c0c3907e56995d152d10
	}
}