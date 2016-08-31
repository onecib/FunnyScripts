function Counter() {
    this.itemCount = {};
    this.getCounts = function () {
      console.log(this.itemCount);
    }
    this.count = function (id) {
        if(this.itemCount[id] != null)
            this.itemCount[id]++;
        else
            this.itemCount[id] = 1;
    }
}

var count = new Counter();