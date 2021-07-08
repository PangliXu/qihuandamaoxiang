;((window) => {
    /*创建路线*/
    function Highway(options) {
        options = options || {}
        this.map = options.map || document.querySelector("#view")
        this.highway = options.highway || null

        this.width = options.width || 200
        this.height = options.height || 4
        this.bottom = options.bottom === 0 ? options.bottom : 50

        // this.backgroundColor = options.backgroundColor || "black"
        this.background = options.background || `linear-gradient(
            0,
            rgb(${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))}),
            rgb(${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))},${(Math.round(Math.random() * 255))})
        )`
    }
    Highway.prototype.create = function () {
        let div = document.createElement("div")
        div.style.position = "absolute"
        div.style.left = "0px"
        div.style.bottom = this.bottom + "px"

        div.style.width = this.width + "px"
        div.style.height = this.height + "px"
        // div.style.backgroundColor = this.backgroundColor
        div.style.background = this.background
        this.highway = div
        this.map.appendChild(div)
    }
    window.Highway = Highway
})(window)
