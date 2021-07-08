;((window) => {
    /*怪物 多个*/
    function Monsters(options) {
        options = options || {}
        this.map = options.map || document.querySelector("#view")
        // 存储怪物
        this.monsters = options.monsters || []

        this.width = options.width || 20
        this.height = options.height || 20
        this.x = options.x || 20
        // this.y = options.y || 20

        this.color = options.color || "white"
        // this.backgroundColor = options.backgroundColor || `rgb(${(Math.round(Math.random() * 255))}, ${(Math.round(Math.random() * 255))}, ${(Math.round(Math.random() * 255))})`

        // 挂载定时器
        this.createTimer = 0
        this.moveTimer = 0
        this.collisionTimer = 0// 碰撞
    }
    // 创建 number 个怪物
    Monsters.prototype.create = function (number, highway, speed = 500) {
        if (this.createTimer) return
        this.createTimer = setInterval(() => {
            // 到达创建数量，停止创建
            if (this.monsters.length >= number) {
                clearInterval(this.createTimer)
                this.createTimer = 0
            }
            let div = document.createElement("div")

            let top = Math.floor(Math.random() * this.map.offsetHeight)
            if (top >= highway.highway.offsetTop) top = highway.highway.offsetTop - 20
            if (top <= this.height) top = this.height
            div.style.position = "absolute"
            div.style.transform = `translate(${this.x + "px"}, ${top + "px"})`
            div.setAttribute("x", this.x)
            div.setAttribute("y", top)

            div.id = ("M-" + Math.floor((Math.random() * 1) * 10000))
            div.style.width = this.width + "px"
            div.style.height = this.height + "px"
            // div.style.backgroundColor = this.backgroundColor
            div.style.background = `radial-gradient(
                circle,
                rgb(${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))}),
                rgb(${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))}),
                rgb(${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))})
            )`
            div.style.boxShadow = "0px 0px 10px blue"
            // div.style.borderRadius = `${Math.floor(Math.random() * 50) + 1}%`
            div.style.borderRadius = "50%"
            this.monsters.push(div)
            this.map.appendChild(div)
        }, speed)
    }
    // 让怪物动起来
    Monsters.prototype.move = function (highway) {
        if (this.moveTimer) return
        this.moveTimer = setInterval(() => {
            let monsters = this.monsters
            for(var i in monsters) {
                var x = parseInt(monsters[i].getAttribute("x")) - 1
                var y = monsters[i].getAttribute("y")
                monsters[i].style.transform = `translate(${x + "px"}, ${y + "px"})`
                monsters[i].setAttribute("x", x)
                if (x <= 0) {
                    // console.log(this.map.offsetWidth + 20)
                    // 更新出现的位置
                    let top = Math.round(Math.random() * this.map.offsetHeight)
                    if (top >= highway.highway.offsetTop) top = highway.highway.offsetTop - this.height
                    if (top <= this.height) top = this.height

                    monsters[i].style.transform = `translate(${(this.map.offsetWidth + 20) + "px"}, ${top + "px"})`
                    monsters[i].setAttribute("x", this.map.offsetWidth + 20)
                    monsters[i].setAttribute("y", top)
                }
            }
        })
    }
    // 发生碰撞
    Monsters.prototype.collision = function (adventurer) {
        if (this.collisionTimer) return
        this.collisionTimer = setInterval(() => {
            var monsters = this.monsters
            for (var i in monsters) {
                // 冒险者坐标 右 上 下
                var aX = adventurer.x
                var aY = adventurer.y
                // 怪物坐标 左 上 下
                var mX = monsters[i].getAttribute("x")
                var mY = monsters[i].getAttribute("y")
                if (
                    (mX <= (aX + adventurer.width))
                    && ((mY >= aY) && (mY < aY + adventurer.height))
                ) {
                    let number = parseInt(adventurer.adventurers[0].getAttribute("number")) - 1
                    if (number === 0) {
                        alert("游戏结束")
                        clearInterval(this.collisionTimer)
                        clearInterval(this.moveTimer)
                        clearInterval(adventurer.jumpUpTimer)
                        clearInterval(adventurer.jumpDownTimer)
                        this.collisionTimer = 0
                        this.moveTimer = 0
                        this.jumpUpTimer = 0
                        this.jumpDownTimer = 0
                        window.location.reload()
                        return
                    }
                    if (number) alert("你还有" + number + "次机会")
                    adventurer.adventurers[0].setAttribute("number", number)
                    monsters[i].parentNode.removeChild(monsters[i])
                    this.monsters.splice(i, 1)
                }
            }
        })
    }
    window.Monsters = Monsters
})(window)
