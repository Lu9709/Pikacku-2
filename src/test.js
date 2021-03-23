import string from './css.js'
// 导入 模块化

const player = {
    id: undefined,
    time: 100,
    n: 1,
    ui: {
        demo1: document.querySelector('#demo1'),
        demo2: document.querySelector('#demo2')
    },
    events: {
        '#btnPause':'pause',
        '#btnPlay':'play',
        '#btnNormal':'Normal',
        '#btnSlow':'Slow',
        '#btnQuick':'Quick'
    },
    //初始化内容
    init: () => {
        player.ui.demo1.innerText = string.substr(0, player.n)
        player.ui.demo2.innerHTML = string.substr(0, player.n)
        player.play()
        player.bindEvents()
    },
    bindEvents:()=>{
        for(let key in player.events){
            if(player.events.hasOwnProperty(key)){
                // 看play.events的key是否为自身属性
                const value = player.events[key] //遍历events事件内的值
                document.querySelector(key).onclick = player[value] //直接调用player的方法
            }
        }
    },
    run: () => {
        player.n += 1
        if (string.length < player.n) {
            window.clearInterval(player.id)
            //   取消计时器
            return
        }
        player.ui.demo1.innerText = string.substr(0, player.n)
        player.ui.demo2.innerHTML = string.substr(0, player.n)
        player.ui.demo1.scrollTop = player.ui.demo1.scrollHeight
//    将滚动条拉到底 有问题scrollHeight要减去滚动条的高度
    },
    play: () => {
        window.clearInterval(player.id)
        // 解决多次点击播放后，无法暂停的问题
        // 因为点击多次后 设置了一个新的定时器，无法暂停旧的定时器了
        player.id = setInterval(player.run, player.time)
    },
    pause: () => {
        window.clearInterval(player.id)
    },
    Normal: () => {
        player.pause()
        player.time = 100
        player.play()
    },
    Slow: () => {
        player.pause()
        player.time = 200
        player.play()
    },
    Quick: () => {
        player.pause()
        player.time = 0
        player.play()
    }
}

player.init()

