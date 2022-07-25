export default class  Dep{

    // 订阅者名单，客户名单
    private subs: {};
    static target : any;
    constructor() {
        // 存放所有watcher
        this.subs = {}
    }

    addSub(target){
        this.subs[target.uid] = target;
    }

    notify(){
        for (let uid in this.subs){
            this.subs[uid].update();
        }
    }
}
