Fx.Slide = new Class({
  Extends : Fx,
  options : {
    mode : "vertical"
  },
  /**
   * @param {?} element
   * @param {?} options
   * @return {undefined}
   */
  initialize : function(element, options) {
    this.addEvent("complete", function() {
      /** @type {boolean} */
      this.open = this.wrapper["offset" + this.layout.capitalize()] != 0;
      if (this.open && Browser.Engine.webkit419) {
        this.element.dispose().inject(this.wrapper);
      }
    }, true);
    this.element = this.subject = $(element);
    this.parent(options);
    var wrapper = this.element.retrieve("wrapper");
    this.wrapper = wrapper || (new Element("div", {
      styles : $extend(this.element.getStyles("margin", "position"), {
        overflow : "hidden"
      })
    })).wraps(this.element);
    this.element.store("wrapper", this.wrapper).setStyle("margin", 0);
    /** @type {Array} */
    this.now = [];
    /** @type {boolean} */
    this.open = true;
  },
  /**
   * @return {undefined}
   */
  vertical : function() {
    /** @type {string} */
    this.margin = "margin-top";
    /** @type {string} */
    this.layout = "height";
    this.offset = this.element.offsetHeight;
  },
  /**
   * @return {undefined}
   */
  horizontal : function() {
    /** @type {string} */
    this.margin = "margin-left";
    /** @type {string} */
    this.layout = "width";
    this.offset = this.element.offsetWidth;
  },
  /**
   * @param {Array} now
   * @return {?}
   */
  set : function(now) {
    this.element.setStyle(this.margin, now[0]);
    this.wrapper.setStyle(this.layout, now[1]);
    return this;
  },
  /**
   * @param {Array} from
   * @param {Array} to
   * @param {?} delta
   * @return {?}
   */
  compute : function(from, to, delta) {
    /** @type {Array} */
    var now = [];
    /** @type {number} */
    var child = 2;
    child.times(function(i) {
      now[i] = Fx.compute(from[i], to[i], delta);
    });
    return now;
  },
  /**
   * @param {string} how
   * @param {(Object|boolean|number|string)} mode
   * @return {?}
   */
  start : function(how, mode) {
    if (!this.check(arguments.callee, how, mode)) {
      return this;
    }
    this[mode || this.options.mode]();
    var D = this.element.getStyle(this.margin).toInt();
    var C = this.wrapper.getStyle(this.layout).toInt();
    /** @type {Array} */
    var caseIn = [[D, C], [0, this.offset]];
    /** @type {Array} */
    var caseOut = [[D, C], [-this.offset, 0]];
    var start;
    switch(how) {
      case "in":
        /** @type {Array} */
        start = caseIn;
        break;
      case "out":
        /** @type {Array} */
        start = caseOut;
        break;
      case "toggle":
        /** @type {Array} */
        start = this.wrapper["offset" + this.layout.capitalize()] == 0 ? caseIn : caseOut;
    }
    return this.parent(start[0], start[1]);
  },
  /**
   * @param {string} mode
   * @return {?}
   */
  slideIn : function(mode) {
    return this.start("in", mode);
  },
  /**
   * @param {string} mode
   * @return {?}
   */
  slideOut : function(mode) {
    return this.start("out", mode);
  },
  /**
   * @param {(Object|boolean|number|string)} mode
   * @return {?}
   */
  hide : function(mode) {
    this[mode || this.options.mode]();
    /** @type {boolean} */
    this.open = false;
    return this.set([-this.offset, 0]);
  },
  /**
   * @param {(Object|boolean|number|string)} mode
   * @return {?}
   */
  show : function(mode) {
    this[mode || this.options.mode]();
    /** @type {boolean} */
    this.open = true;
    return this.set([0, this.offset]);
  },
  /**
   * @param {string} mode
   * @return {?}
   */
  toggle : function(mode) {
    return this.start("toggle", mode);
  }
});
Element.Properties.slide = {
  /**
   * @param {?} options
   * @return {?}
   */
  set : function(options) {
    var slide = this.retrieve("slide");
    if (slide) {
      slide.cancel();
    }
    return this.eliminate("slide").store("slide:options", $extend({
      link : "cancel"
    }, options));
  },
  /**
   * @param {boolean} options
   * @return {?}
   */
  get : function(options) {
    if (options || !this.retrieve("slide")) {
      if (options || !this.retrieve("slide:options")) {
        this.set("slide", options);
      }
      this.store("slide", new Fx.Slide(this, this.retrieve("slide:options")));
    }
    return this.retrieve("slide");
  }
};
Element.implement({
  /**
   * @param {string} how
   * @param {string} mode
   * @return {?}
   */
  slide : function(how, mode) {
    how = how || "toggle";
    var slide = this.get("slide");
    var A;
    switch(how) {
      case "hide":
        slide.hide(mode);
        break;
      case "show":
        slide.show(mode);
        break;
      case "toggle":
        var flag = this.retrieve("slide:flag", slide.open);
        slide[flag ? "slideOut" : "slideIn"](mode);
        this.store("slide:flag", !flag);
        /** @type {boolean} */
        A = true;
        break;
      default:
        slide.start(how, mode);
    }
    if (!A) {
      this.eliminate("slide:flag");
    }
    return this;
  }
});
