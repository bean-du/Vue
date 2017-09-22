/**
 * Created by Administrator on 2017/9/16.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default ({
    state : {
        msg : "test message",
        test : [
            {name : "bean" ,age : "23"},
            {name : "acorn" , age : "29"}
        ],
    },
    getters : {
        testMessage (){
            return this.state.msg;
        }
    },
    mutations : {
        setTest (state,payload){
            state.test[payload.index].name = payload.name;
        }
    }
})