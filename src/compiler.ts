// 实现模板编译
import Watcher from "./watcher";
export  default class Compiler{
    public $el: any;
    public context: any;
    public $fragment: DocumentFragment;
    constructor(context) {

        this.$el = context.$el;
        this.context = context;
        if(this.$el){
            // 将原始dom转化为文档片段
            this.$fragment = this.nodeToFragment(this.$el);
            // 编译模板
            this.compiler(this.$fragment)
            // 把文档片段添加到页面中
            this.$el.append(this.$fragment)
        }
    }

    /**
     * 将所有元素转化未文档片段
     * @param node
     */
    nodeToFragment(node){
        let fragment = document.createDocumentFragment(); // 创建空文档
        if (node.childNodes && node.childNodes.length !== 0){
            node.childNodes.forEach(cNode=>{
                // 判断当前节点是否是需要节点（应当忽略换行，注释等节点）,
                if (!this.ignorable(cNode)){
                    fragment.append(cNode)
                }
            })
        }
        return fragment;
    }

    /**
     * 判断当前节点是否需要忽略
     * @param node
     */
    ignorable(node){
        let reg = /^[\t\n\r]+/
        return (node.nodeType === 8 || (node.nodeType === 3 && reg.test(node.textContent)))
    }

    /**
     * 模板编译
     * @param node
     */
    compiler(node){
        if (node.childNodes && node.childNodes.length !== 0){
            node.childNodes.forEach(child=>{
                // 判断node类型
                if (child.nodeType === 1){
                    // nodeType===1,当前node为元素节点
                    this.compilerElementNode(child);
                } else if (child.nodeType === 3){
                    // nodeType===3,当前node为文本节点
                    this.compilerTextNode(child);
                }
            })
        }
    }

    /**
     * 编译元素节点,递归
     * @param node
     */
    compilerElementNode(node){
        // 实现元素属性编译
        let attrs = [...node.attributes]; // 获取当前元素所有属性
        attrs.forEach(attr=>{
            let that = this;
            let {name:attrName,value:attrValue} = attr; // 解构赋值
            if (attrName.indexOf("v-") === 0){
                let dirName = attrName.slice(2);
                switch (dirName){
                    case "text":
                        new Watcher(attrValue,this.context,newValue=>{
                            node.textContent = newValue;
                        })
                        break;
                    case "model":
                        new Watcher(attrValue,this.context,newValue=>{
                            node.value = newValue; // node.value当前节点对应显示的值
                        })
                        // 绑定事件，当输入后触发data中对应数值的更新
                        node.addEventListener("input",e=>{
                            that.context[attrValue] = e.target.value;
                        })
                        break;
                }
            }
            if (attrName.indexOf("@") === 0){
                this.compilerMethods(this.context,node,attrName,attrValue)
            }
        })
        this.compiler(node)
    }

    /**
     * 函数编译
     * @param scope
     * @param node
     * @param attrName
     * @param attrValue
     */
    compilerMethods(scope,node,attrName,attrValue){
        let type = attrName.slice(1);
        let fn = scope[attrValue];
        node.addEventListener(type,fn.bind(scope))
    }

    /**
     * 编译文本节点
     * @param node
     */
    compilerTextNode(node){
        let text = node.textContent.trim()
        if (text){
            // 将text字符串转化为表达式
            let exp = this.parseTextExp(text);
            // 添加订阅者！计算表达式的值。
            // 当表达式依赖的数据发生变化时：1.观察者通知订阅者，重新计算表达式的值；2.node.textContent给最新的值。这样即可完成model -> view的响应式
            new Watcher(exp,this.context,(newValue)=>{
                node.textContent = newValue
            })
        }
    }

    /**
     * 实现文本到表达式的转换
     * 111{{msg+"---"}}222 转化为 "111" + msg + "---" + "222"
     * @param text 待转化文本
     * @return string 转化后表达式
     */
    parseTextExp(text){
        // 匹配插值表达式正则
        let regText = /\{\{(.+?)\}\}/g;
        // 分割插值表达式前后内容
        let pieces = text.split(regText);
        // 匹配插值表达式
        let matchStr = text.match(regText);
        // 表达式数组，加上+号后形成完整表达式
        let tokens = [];
        pieces.forEach(item=>{
            if (matchStr && matchStr.indexOf("{{"+item+"}}")>-1){
                // 当前item是插值表达式
                tokens.push("("+item+")")
            }else{
                tokens.push("`"+item+"`")
            }
        })
        return tokens.join("+");
    }
}
