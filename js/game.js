;((window) => {
    function Game() {
        this.map = document.querySelector("#view")
    }
    // 启动游戏
    Game.prototype.start = function(number, speed = 500) {
        let view = this.map
        // 建工路
        let highway = new Highway({
            "width": view.offsetWidth,
            "height": 50,
            "bottom": 0,
            "map": view,
            "background": `linear-gradient(
                 0,
                 rgb(${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))}),
                 rgb(${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))})
             )`
        })
        highway.create()
        // 画出冒险者
        let adventurer = new Adventurer({
            y: view.offsetHeight - highway.height - 21,
            background: `linear-gradient(
                0,
                rgb(${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))}),
                rgb(${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))})
            )`
        })
        adventurer.create()
        adventurer.move()
        // 建怪物
        let monster = new Monsters({
            x: view.offsetWidth
        })
        // 画出怪物20只
        monster.create(number, highway, speed)
        monster.move(highway)
        monster.collision(adventurer)
    }
    window.Game = Game
})(window)
