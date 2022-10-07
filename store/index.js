import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
const store = new Vuex.Store({
	state: {
		vuex_token: '',
		isLogin :false,
		isFirstLoad:true,
		homeList:{
			cardListL: [],
			cardListR: [],
		}
	},
	mutations: {
		// payload为用户传递的值，可以是单一值或者对象
		modifyIsLogin(state, payload) {
			state.isLogin = payload.isLogin;
			console.log("isLogin = true");
		},
	}
})
 
export default store
//修改的方法
//this.$store.commit('modifyToken', {token: 'xxxyyyzzz'})