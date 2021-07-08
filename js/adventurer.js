;((window) => {
    /*冒险者 1个*/
    function Adventurer(options) {
        options = options || {}
        // 挂载创建的冒险者
        this.adventurers = options.adventurers || []

        this.map = options.map || document.querySelector("#view")
        this.ID = options.ID || ("A-" + ((Math.random() * 1) * 100000))
        this.number = options.number || 3 // 剩余碰撞次数

        this.width = options.width || 20
        this.height = options.height || 20
        this.x = options.x || 20
        this.y = options.y || 20 // 本体距离底部的距离

        this.color = options.color || "red"
        this.describe = options.describe || "Jack"
        this.background = options.background || `linear-gradient(
            0,
            rgb(${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))}),
            rgb(${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))})
        )`

        // 缓存定时器
        this.jumpUpTimer = 0
        this.jumpDownTimer = 0
    }
    // 创建冒险者
    Adventurer.prototype.create = function() {
        let div = document.createElement("div")
        div.style.position = "absolute"
        div.style.transform = `translate(${this.x + "px"}, ${this.y + "px"})`

        div.style.width = this.width + "px"
        div.style.height = this.height + "px"
        div.style.background = this.background
        div.style.borderRadius = "50%"
        div.style.boxShadow = "0px 0px 10px white"
        div.setAttribute("number", this.number)
        this.adventurers.push(div)
        this.map.appendChild(div)
    }
    // 让冒险者动起来
    Adventurer.prototype.move = function () {
        let adventurer = this.adventurers[0]
        // 存储冒险者原始高度
        let originTop = this.y
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 32) {// 空格
                // 1.清除往上定时器
                clearInterval(this.jumpDownTimer)
                this.jumpDownTimer = 0
                // 空格 跳跃，设置定时器改变 x y
                if (this.jumpUpTimer) return
                this.jumpUpTimer = setInterval(() => {
                    this.y -= 1
                    if (this.y <= 0) this.y = 0
                    adventurer.style.transform = `translate(${this.x + "px"}, ${this.y + "px"})`
                })
            }
        })
        window.addEventListener("keyup", (e) => {
            if (e.keyCode == 32) {// 空格
                // 1.清除往上定时器
                clearInterval(this.jumpUpTimer)
                this.jumpUpTimer = 0
                // 2.自动往右移动 x y 发生变化
                if (this.jumpDownTimer) return
                this.jumpDownTimer = setInterval(() => {
                    // console.log("获取高度",this.y)
                    this.y += 1
                    adventurer.style.transform = `translate(${this.x + "px"}, ${this.y + "px"})`
                    // 3.清除往下定时器
                    if (this.y >= originTop) {
                        clearInterval(this.jumpDownTimer)
                        this.jumpDownTimer = 0
                    }
                })
            }
        })

        window.addEventListener("touchstart", (e) => {
            // console.log("touchstart", e)
            // 1.清除往上定时器
            clearInterval(this.jumpDownTimer)
            this.jumpDownTimer = 0
            // 空格 跳跃，设置定时器改变 x y
            if (this.jumpUpTimer) return
            this.jumpUpTimer = setInterval(() => {
                // console.log(this.y)
                this.y -= 2
                if (this.y <= 0) this.y = 0
                adventurer.style.transform = `translate(${this.x + "px"}, ${this.y + "px"})`
            })
        })
        window.addEventListener("touchend", () => {
            // console.log("touchend")
            // 1.清除往上定时器
            clearInterval(this.jumpUpTimer)
            this.jumpUpTimer = 0
            // 2.自动往右移动 x y 发生变化
            if (this.jumpDownTimer) return
            this.jumpDownTimer = setInterval(() => {
                // console.log("获取高度",this.y)
                this.y += 1
                adventurer.style.transform = `translate(${this.x + "px"}, ${this.y + "px"})`
                // 3.清除往下定时器
                if (this.y >= originTop) {
                    clearInterval(this.jumpDownTimer)
                    this.jumpDownTimer = 0
                }
            })
        })
    }
    window.Adventurer = Adventurer
})(window)
