import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Article from '../views/article'
import Archive from '../views/archive'
import About from '../views/about'
import Error from '../views/error'
Vue.use(Router)
const routes = [{
	path: '/',
	component: Home //Home
}, {
	path: '/article/:id',
	component: Article,
	name: 'article'
}, {
	path: '/archive',
	component: Archive
},{
	path: '/home',
	redirect: '/'
},{
	path: '/about',
	component: About
},{
	path: '/error',
	component: Error
}];
const router = new Router({
	routes,
	mode: 'hash'
})
//router.beforeEach((to, from, next) => {
//	var route = Object.assign({}, to)
//	console.log(route);
//	next()
//})
export default router