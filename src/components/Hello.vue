<template>
  <div class="hello">
    <upload-excel></upload-excel>
  </div>
</template>

<script>
    import axios from 'axios'
    import uploadExcel from './uploadExcel'
    export default {
        name: 'hello',
        components : {
            uploadExcel
        },
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                postData : {user: 'bean',pwd:'123'}
            }
        },
        methods : {
            test (){
                axios.get('http://127.0.0.1:8090/test').then(function (data) {
                    console.log(data)
                })
            },
            posts (){
                axios.post('http://127.0.0.1:8090/user','user=bean&pwd=123').then(function (data) {
                  console.log(data)
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
