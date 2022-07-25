
/*const Compiler = require('../src/compiler');
let compiler = new Compiler()
test("parseTextExp",()=>{
    expect(compiler.parseTextExp("111{{msg+\"---\"}}222")).toBe("\"111\"+msg+\"---\"+\"222\"")
})*/
import Vue from "../src/index"

test("v-on_Test",()=>{
    document.body.innerHTML = `
        <div id="app">
            <p>111{{msg+"---"}}222 </p>
            <p v-text="msg">   </p>
            <label>
                <input v-model="msg" type="text" id="cInput">
            </label>
            <button @click="myClick" id="bt"> click </button>
        </div>
    `
    const vm = new Vue({
        el:"#app",
        data:{
            msg:"我是msg变量的初始值",
            newMsg:"",
            info: {
                id:"1",
            },
        },
        methods:{
            myClick:function (){
                this.msg = "这是新的msg的值噢~";
            }
        }
    })

    document.getElementById("bt").click();
    const expectValue = "这是新的msg的值噢~";
    expect(vm.msg).toBe(expectValue)
})

/*test("v-model_Test",()=>{
    document.body.innerHTML = `
        <div id="app">
            <p>111{{msg+"---"}}222 </p>
            <p v-text="msg">   </p>
            <label>
                <input v-model="msg" type="text" id="cInput">
            </label>
            <button @click="myClick" id="bt"> click </button>
        </div>
    `
    const vm = new Vue({
        el:"#app",
        data:{
            msg:"我是msg变量的初始值",
            newMsg:"",
            info: {
                id:"1",
            },
        },
        methods:{
            myClick:function (){
                this.msg = "这是新的msg的值噢~";
            }
        }
    })

    document.getElementById("cInput").value = "测试v-model";
    const expectValue = "测试v-model";
    expect(vm.msg).toBe(expectValue)
})*/

test("v-text_Test",()=>{
    document.body.innerHTML = `
        <div id="app">
            <p>111{{msg+"---"}}222 </p>
            <p v-text="textContent">   </p>
            <label>
                <input v-model="msg" type="text">
            </label>
            <button @click="myClick"> 点我得到新的值 </button>
        </div>
    `
    const vm = new Vue({
        el:"#app",
        data:{
            msg:"我是msg变量的初始值",
            newMsg:"",
            textContent:"我是text的初始值",
            info: {
                id:"1",
            },
        },
        methods:{
            myClick:function (){
                this.msg = "这是新的msg的值噢~";
            }
        }
    })

    vm.textContent = "我是text的更新值";
    const expectValue = "我是text的更新值";
    expect(vm.textContent).toBe(expectValue)
})
