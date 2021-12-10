/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))


Vue.component('global-home', require('./components/GlobalHome.vue').default);
Vue.component('pagination', require('laravel-vue-pagination'));
Vue.component('register', require('./components/Register.vue').default);
Vue.component('login', require('./components/Login.vue').default);



/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
*/

import router from './routes/routes';

import Vuex from 'vuex' ;
import axios from 'axios';

Vue.use(Vuex);

// sate action mutations getters
const store = new Vuex.Store({
    state: {
        userToken : null
    },
    // functions 
    getters: { // Centred data from store
        isLogged(state){
            return !!state.userToken;
        }
    },
    // edit store data(Synchronous)
    mutations:{
        setUserToken(state,userToken){
            state.userToken=userToken;
            localStorage.setItem('userToken',JSON.stringify(userToken));
            axios.defaults.headers.common.Authorization= `Bearer ${userToken}`;
        },
        removeUserToken(state){
            state.userToken = null;
            localStorage.removeItem('userToken'); 
        }
    },
    // entre components et mutations(asynchronous)
    actions: {
        RegisterUser({commit},payload){
            axios.post('/api/register',payload)
            .then(res=>{
                console.log(res);
                commit('setUserToken',res.data.data.token)
            })
            .catch(err =>{
                console.log(err);
            })
        },
        LoginUser({commit},payload){
            axios.post('/api/login',payload)
            .then(res=>{ 
                console.log(res);
                commit('setUserToken',res.data.data.token)
            })
            .catch(err =>{
                console.log(err);
            })
        }


    }
})

const app = new Vue({
    el: '#app',
    router,
    store:store

});
