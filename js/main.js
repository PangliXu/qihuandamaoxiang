;((window) => {
    let game = new Game()
    let startBtn = document.querySelectorAll("#start>ul li")
    for (let i in startBtn) {
        if (i == 0) continue
        startBtn[i].onclick = function () {
            alert("正在启动游戏")
            switch (this.innerText) {
                case "简单":
                    game.start(5)
                    break
                case "中级":
                    game.start(20, 250)
                    break
                case "困难":
                    game.start(40, 50)
                    break
            }
        }
    }
})(window)
