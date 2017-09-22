<template>

    <div class="upload">
        <div class="box" ref="box">
            <input id="id" type="file"  @change="handleFileChange" ref="inputer"/>
            <label for="id"></label>
            <i class="iconfont"></i>
            <img v-if="dataUrl" :src="dataUrl" />
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'upload',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                postData : {user: 'bean',pwd:'123'},
                value : {
                    default : undefined
                },
                dataUrl : '',
            }
        },
        methods : {
            // 上传文件
            upload () {
                var formData = new FormData;
                console.log(formData);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                formData.append('file',event.target.files[0]);
                formData.append('action','test');
                console.log(formData);
                axios.post("http://excel.dev/importExample.php",formData,config).then(function (data) {
                    console.log(data)
                })
            },
            // 图片预览
            imgPreview (file){
                let self = this;

                if (!file || !window.FileReader) return;

                if (/^image/.test(file.type)){
                    var reader = new FileReader;

                    reader.readAsDataURL(file);

                    reader.onloadend = function () {
                        self.dataUrl = this.result
                    }
                }
            },
            // 监听文件改变
            handleFileChange (e,FILE){

                let inputDOM = this.$refs.inputer;
                // 数据赋值改动，这样就兼容两种选择方式了
                this.file = FILE || inputDOM.files[0];

                this.imgPreview(this.file);

                this.errorText = '';

                let size = Math.floor(this.file.size / 1024);

                if (size > 40){
                    return false;
                }
                this.$emit('input',this.file);

                this.fileName = this.file.name;

                this.onChange && this.onChange(this.file,inputDOM.value)
            },
            // 阻止默认事件
            preventDefaultEvent (eventName){
                document.addEventListener(eventName,function (e) {
                    e.preventDefault();
                },false)
            },
            // 添加拖入事件支持
            addDropSupport (){
                let BOX = this.$refs.box;
                // 新增监听 drop 事件
                BOX.addEventListener('drop', (e) => {
                    // 阻止默认事件
                    e.preventDefault();
                    this.errorText = '';
                    // 获取拖拽数据
                    let fileList = e.dataTransfer.files;
                    //  文件数量
                    if(fileList === 0){
                        return false;
                    }
                    // 限制格式
                    if (fileList[0].type.indexOf('image') === -1){
                        this.errorText = '请选择图片';
                        return false;
                    }
                    // 限制上传文件数量为一个
                    if (fileList.length > 1){
                        this.errorText = '暂不支持多文件上传';
                        return false;
                    }
                    console.log(fileList);
                    this.handleFileChange(null,fileList[0]);
                })
            },

        },
        mounted () {
            var self = this;
            ['dragleave','drop','dragenter','dragover'].forEach(function (e) {
                self.preventDefaultEvent(e);
            });
            this.addDropSupport()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .box {
        width: 300px;
        height: 240px;
        position: relative;
        background-color: cornsilk;

    }
    .box img{
        width: 300px;
        height: 240px;
    }
    input {
        position: absolute;
        left: -9999px;
    }
    /* 使label充满整个box*/
    label {
        position: absolute;
        top: 0;left: 0;right: 0;bottom: 0;
        z-index: 10;
    }
</style>
