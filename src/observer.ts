// 实现数据劫持
import Dep from "./dep";

export  default class Observer{
    private data: any;
    constructor(data) {
        this.data = data;
        // 遍历对象，实现所有数据的劫持
        this.walk(this.data)
    }

    /**
     * 遍历data对象
     * @param data
     */
    walk(data){
        if (!data || typeof data !== "object"){
            return ;
        }
        // Object.keys(data) 返回对象里的所有key形成的数组，再对每个key进行数据劫持
        Object.keys(data).forEach(key=>{
            this.defineReactive(data,key,data[key])
        })
    }

    /**
     * 动态设置响应式数据
     *
     * @param data 需要设置的数据整体对象
     * @param key  需要设置的属性的key
     * @param value 需要设置的key的新值
     */
    defineReactive(data,key,value){
        let dep = new Dep(); // 每个数据都对应一个watcher名单，因为一个数据可能在多个地方用到，需要单独的一个dep来存储所有watcher
        Object.defineProperty(data,key,{
            enumerable: true, // 可遍历，可以使用foreach循环
            configurable: false, // 不可再配置
            // get方法是当前属性被访问时调用
            get: () => {
                // @ts-ignore
                Dep.target && dep.addSub(Dep.target)

                return value
            },
            // set方法时当前属性被赋值时调用
            set: (newValue) => {
                console.log("set")
                value = newValue
                dep.notify()
            },
        })
        this.walk(value) // 递归设置
    }
}
