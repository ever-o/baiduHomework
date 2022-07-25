// webpack打包的入口文件，框架实现的控制器

import Observer from "./observer";
import Compiler from "./compiler";

export default class Vue{
    private $el: any;
    private $data: any;
    private $methods: any;
    constructor(options) {
        // 获取元素的dom对象
            // this.$el 是vue实例化的对象上的成员变量el
        this.$el = document.querySelector(options.el)
        // 转存数据
        this.$data = options.data || {};
        // 转存方法
        this.$methods = options.methods;
        // 数据代理和函数代理
        this._proxyData(this.$data)
        this._proxyMethods(this.$methods)
        // 数据劫持
        new Observer(this.$data)
        // 模板编译
            // this指向vue实例
        console.log("0")
        new Compiler(this)
    }

    /**
     * 数据代理,访问this.msg时，实际返回this.$data.msg
     * @param data
     * @private
     */
    _proxyData(data){
        Object.keys(data).forEach(key=>{
            Object.defineProperty(this,key,{
                get(){
                   return data[key];
                },
                set(newValue){
                    data[key] = newValue;
                },
            })
        })
    }

    /**
     * 函数代理
     * @param methods
     * @private
     */
    _proxyMethods(methods){
        if (methods && typeof methods === "object"){
            Object.keys(methods).forEach(key=>{
                this[key] = methods[key]
            })
        }
    }
}
// @ts-ignore
window.Vue = Vue
