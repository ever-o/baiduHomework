import Dep from "./dep";

let $uid = 0;
export default class Watcher{
    private readonly exp: any;
    private readonly scope: any;
    private readonly cb: any;
    private uid: number;
    constructor(exp,scope,cb) {
        this.exp = exp;
        this.scope = scope;
        this.cb = cb;
        this.uid = $uid++;
        this.update();
    }

    /**
     * 计算表达式
     */
    get(){
        Dep.target = this;
        let newValue = Watcher.computeExpression(this.exp,this.scope);
        Dep.target = null;
        return newValue;
    }

    /**
     * 完成回调函数的调用
     */
    update(){
        let newValue = this.get();
        this.cb && this.cb(newValue);
    }

    static computeExpression(exp,scope){
        // 创建函数
        // 把scope当作作用域
        // 函数内部使用with来制定作用域
        // 执行函数，得到表达式的值
        let fn = new Function("scope","with(scope){return "+ exp +"}") // 这条语句的意思是在scope的范围内获取exp的值，scope是整个vm，包括其data的所有内容，所以会触发observer中的get方法
        return fn(scope)
    }
}
