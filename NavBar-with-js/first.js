var MooTools = {
  version : "1.2.0",
  build : ""
}; 
/**
 * @param {Object} options
 * @return {?}
 */
var Native = function(options) {
  options = options || {};
  var afterImplement = options.afterImplement || function() {
  };
  var generics = options.generics;
  /** @type {boolean} */
  generics = generics !== false;
  var legacy = options.legacy;
  var initialize = options.initialize;
  var protect = options.protect;
  var n = options.name;
  var object = initialize || legacy;
  /** @type {function (Object): ?} */
  object.constructor = Native;
  object.$family = {
    name : "native"
  };
  if (legacy && initialize) {
    object.prototype = legacy.prototype;
  }
  object.prototype.constructor = object;
  if (n) {
    var family = n.toLowerCase();
    object.prototype.$family = {
      name : family
    };
    Native.typize(object, family);
  }
  /**
   * @param {Object} obj
   * @param {?} name
   * @param {Function} method
   * @param {boolean} force
   * @return {?}
   */
  var add = function(obj, name, method, force) {
    if (!protect || (force || !obj.prototype[name])) {
      /** @type {Function} */
      obj.prototype[name] = method;
    }
    if (generics) {
      Native.genericize(obj, name, protect);
    }
    afterImplement.call(obj, name, method);
    return obj;
  };
  /**
   * @param {?} opt_attributes
   * @param {Function} a2
   * @param {boolean} a3
   * @return {?}
   */
  object.implement = function(opt_attributes, a2, a3) {
    if (typeof opt_attributes == "string") {
      return add(this, opt_attributes, a2, a3);
    }
    var p;
    for (p in opt_attributes) {
      add(this, p, opt_attributes[p], a2);
    }
    return this;
  };
  /**
   * @param {Object} a1
   * @param {?} a2
   * @param {?} a3
   * @return {?}
   */
  object.alias = function(a1, a2, a3) {
    if (typeof a1 == "string") {
      a1 = this.prototype[a1];
      if (a1) {
        add(this, a2, a1, a3);
      }
    } else {
      var a;
      for (a in a1) {
        this.alias(a, a1[a], a2);
      }
    }
    return this;
  };
  return object;
};
/**
 * @param {?} opt_attributes
 * @param {Object} replacementHash
 * @return {undefined}
 */
Native.implement = function(opt_attributes, replacementHash) {
  /** @type {number} */
  var i = 0;
  var valuesLen = opt_attributes.length;
  for (;i < valuesLen;i++) {
    opt_attributes[i].implement(replacementHash);
  }
};
/**
 * @param {Object} object
 * @param {?} property
 * @param {boolean} check
 * @return {undefined}
 */
Native.genericize = function(object, property, check) {
  if ((!check || !object[property]) && typeof object.prototype[property] == "function") {
    /**
     * @return {?}
     */
    object[property] = function() {
      /** @type {Array.<?>} */
      var args = Array.prototype.slice.call(arguments);
      return object.prototype[property].apply(args.shift(), args);
    };
  }
};
/**
 * @param {Event} object
 * @param {string} family
 * @return {undefined}
 */
Native.typize = function(object, family) {
  if (!object.type) {
    /**
     * @param {Object} item
     * @return {?}
     */
    object.type = function(item) {
      return $type(item) === family;
    };
  }
};
/**
 * @param {string} a1
 * @param {string} key
 * @param {?} to
 * @param {?} a2
 * @return {undefined}
 */
Native.alias = function(a1, key, to, a2) {
  /** @type {number} */
  var i = 0;
  var len = a1.length;
  for (;i < len;i++) {
    a1[i].alias(key, to, a2);
  }
};
(function(types) {
  var t;
  for (t in types) {
    Native.typize(types[t], t);
  }
})({
  /** @type {function (new:Boolean, *=): boolean} */
  "boolean" : Boolean,
  /** @type {function (Object): ?} */
  "native" : Native,
  /** @type {function (new:Object, *=): ?} */
  object : Object
});
(function(inExpected) {
  var n;
  for (n in inExpected) {
    new Native({
      name : n,
      initialize : inExpected[n],
      protect : true
    });
  }
})({
  /** @type {function (new:String, *=): string} */
  String : String,
  /** @type {function (new:Function, ...[*]): ?} */
  Function : Function,
  /** @type {function (new:Number, *=): number} */
  Number : Number,
  /** @type {function (new:Array, ...[*]): Array} */
  Array : Array,
  /** @type {function (new:RegExp, *=, *=): RegExp} */
  RegExp : RegExp,
  /** @type {function (new:Date, ?=, ?=, ?=, ?=, ?=, ?=, ?=): string} */
  Date : Date
});
(function(obj, fileExtensions) {
  /** @type {number} */
  var i = fileExtensions.length;
  for (;i--;i) {
    Native.genericize(obj, fileExtensions[i], true);
  }
  return arguments.callee;
})(Array, ["pop", "push", "reverse", "shift", "sort", "splice", "unshift", "concat", "join", "slice", "toString", "valueOf", "indexOf", "lastIndexOf"])(String, ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "match", "replace", "search", "slice", "split", "substr", "substring", "toLowerCase", "toUpperCase", "valueOf"]);
/**
 * @param {boolean} obj
 * @return {?}
 */
function $chk(obj) {
  return!!(obj || obj === 0);
}
/**
 * @param {?} timer
 * @return {?}
 */
function $clear(timer) {
  clearTimeout(timer);
  clearInterval(timer);
  return null;
}
/**
 * @param {Object} obj
 * @return {?}
 */
function $defined(obj) {
  return obj != undefined;
}
/**
 * @return {undefined}
 */
function $empty() {
}
/**
 * @param {number} recurring
 * @return {?}
 */
function $arguments(recurring) {
  return function() {
    return arguments[recurring];
  };
}
/**
 * @param {string} value
 * @return {?}
 */
function $lambda(value) {
  return typeof value == "function" ? value : function() {
    return value;
  };
}
/**
 * @param {Object} original
 * @param {Object} extended
 * @return {?}
 */
function $extend(original, extended) {
  var key;
  for (key in extended || {}) {
    original[key] = extended[key];
  }
  return original;
}
/**
 * @param {Object} object
 * @return {?}
 */
function $unlink(object) {
  var unlinked;
  switch($type(object)) {
    case "object":
      unlinked = {};
      var i;
      for (i in object) {
        unlinked[i] = $unlink(object[i]);
      }
      break;
    case "hash":
      unlinked = $unlink(object.getClean());
      break;
    case "array":
      /** @type {Array} */
      unlinked = [];
      /** @type {number} */
      var p = 0;
      var n = object.length;
      for (;p < n;p++) {
        unlinked[p] = $unlink(object[p]);
      }
      break;
    default:
      return object;
  }
  return unlinked;
}
/**
 * @return {?}
 */
function $merge() {
  var mix = {};
  /** @type {number} */
  var i = 0;
  /** @type {number} */
  var argLength = arguments.length;
  for (;i < argLength;i++) {
    var object = arguments[i];
    if ($type(object) != "object") {
      continue;
    }
    var key;
    for (key in object) {
      var op = object[key];
      var mp = mix[key];
      mix[key] = mp && ($type(op) == "object" && $type(mp) == "object") ? $merge(mp, op) : $unlink(op);
    }
  }
  return mix;
}
/**
 * @return {?}
 */
function $pick() {
  /** @type {number} */
  var i = 0;
  /** @type {number} */
  var argLength = arguments.length;
  for (;i < argLength;i++) {
    if (arguments[i] != undefined) {
      return arguments[i];
    }
  }
  return null;
}
/**
 * @param {number} min
 * @param {number} max
 * @return {?}
 */
function $random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * @param {?} obj
 * @return {?}
 */
function $splat(obj) {
  var type = $type(obj);
  return type ? type != "array" && type != "arguments" ? [obj] : obj : [];
}
/** @type {function (): number} */
var $time = Date.now || function() {
  return(new Date).getTime();
};
/**
 * @return {?}
 */
function $try() {
  /** @type {number} */
  var i = 0;
  /** @type {number} */
  var argLength = arguments.length;
  for (;i < argLength;i++) {
    try {
      return arguments[i]();
    } catch (C) {
    }
  }
  return null;
}
/**
 * @param {Object} obj
 * @return {?}
 */
function $type(obj) {
  if (obj == undefined) {
    return false;
  }
  if (obj.$family) {
    return obj.$family.name == "number" && !isFinite(obj) ? false : obj.$family.name;
  }
  if (obj.nodeName) {
    switch(obj.nodeType) {
      case 1:
        return "element";
      case 3:
        return/\S/.test(obj.nodeValue) ? "textnode" : "whitespace";
    }
  } else {
    if (typeof obj.length == "number") {
      if (obj.callee) {
        return "arguments";
      } else {
        if (obj.item) {
          return "collection";
        }
      }
    }
  }
  return typeof obj;
}
var Hash = new Native({
  name : "Hash",
  /**
   * @param {Object} object
   * @return {?}
   */
  initialize : function(object) {
    if ($type(object) == "hash") {
      object = $unlink(object.getClean());
    }
    var key;
    for (key in object) {
      this[key] = object[key];
    }
    return this;
  }
});
Hash.implement({
  /**
   * @return {?}
   */
  getLength : function() {
    /** @type {number} */
    var length = 0;
    var prop;
    for (prop in this) {
      if (this.hasOwnProperty(prop)) {
        length++;
      }
    }
    return length;
  },
  /**
   * @param {Function} fn
   * @param {?} thisv
   * @return {undefined}
   */
  forEach : function(fn, thisv) {
    var key;
    for (key in this) {
      if (this.hasOwnProperty(key)) {
        fn.call(thisv, this[key], key, this);
      }
    }
  },
  /**
   * @return {?}
   */
  getClean : function() {
    var old = {};
    var name;
    for (name in this) {
      if (this.hasOwnProperty(name)) {
        old[name] = this[name];
      }
    }
    return old;
  }
});
Hash.alias("forEach", "each");
/**
 * @param {?} object
 * @return {?}
 */
function $H(object) {
  return new Hash(object);
}
Array.implement({
  /**
   * @param {Function} block
   * @param {?} thisObject
   * @return {undefined}
   */
  forEach : function(block, thisObject) {
    /** @type {number} */
    var i = 0;
    var l = this.length;
    for (;i < l;i++) {
      block.call(thisObject, this[i], i, this);
    }
  }
});
Array.alias("forEach", "each");
/**
 * @param {Object} array
 * @return {?}
 */
function $A(array) {
  if (array.item) {
    /** @type {Array} */
    var o = [];
    /** @type {number} */
    var i = 0;
    var array_length = array.length;
    for (;i < array_length;i++) {
      o[i] = array[i];
    }
    return o;
  }
  return Array.prototype.slice.call(array);
}
/**
 * @param {Object} iterable
 * @param {?} fn
 * @param {?} bind
 * @return {undefined}
 */
function $each(iterable, fn, bind) {
  var type = $type(iterable);
  (type == "arguments" || (type == "collection" || type == "array") ? Array : Hash).each(iterable, fn, bind);
}
var Browser = new Hash({
  Engine : {
    name : "unknown",
    version : ""
  },
  Platform : {
    name : (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase()
  },
  Features : {
    xpath : !!document.evaluate,
    air : !!window.runtime
  },
  Plugins : {}
});
if (window.opera) {
  Browser.Engine = {
    name : "presto",
    version : document.getElementsByClassName ? 950 : 925
  };
} else {
  if (window.ActiveXObject) {
    Browser.Engine = {
      name : "trident",
      version : window.XMLHttpRequest ? 5 : 4
    };
  } else {
    if (!navigator.taintEnabled) {
      Browser.Engine = {
        name : "webkit",
        version : Browser.Features.xpath ? 420 : 419
      };
    } else {
      if (document.getBoxObjectFor != null) {
        Browser.Engine = {
          name : "gecko",
          version : document.getElementsByClassName ? 19 : 18
        };
      }
    }
  }
}
/** @type {boolean} */
Browser.Engine[Browser.Engine.name] = Browser.Engine[Browser.Engine.name + Browser.Engine.version] = true;
if (window.orientation != undefined) {
  /** @type {string} */
  Browser.Platform.name = "ipod";
}
/** @type {boolean} */
Browser.Platform[Browser.Platform.name] = true;
/**
 * @return {?}
 */
Browser.Request = function() {
  return $try(function() {
    return new XMLHttpRequest;
  }, function() {
    return new ActiveXObject("MSXML2.XMLHTTP");
  });
};
/** @type {boolean} */
Browser.Features.xhr = !!Browser.Request();
Browser.Plugins.Flash = function() {
  var A = ($try(function() {
    return navigator.plugins["Shockwave Flash"].description;
  }, function() {
    return(new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version");
  }) || "0 r0").match(/\d+/g);
  return{
    version : parseInt(A[0] || (0 + "." + A[1] || 0)),
    build : parseInt(A[2] || 0)
  };
}();
/**
 * @param {string} text
 * @return {?}
 */
function $exec(text) {
  if (!text) {
    return text;
  }
  if (window.execScript) {
    window.execScript(text);
  } else {
    /** @type {Element} */
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    /** @type {string} */
    script.text = text;
    document.head.appendChild(script);
    document.head.removeChild(script);
  }
  return text;
}
/** @type {number} */
Native.UID = 1;
/** @type {function (Object): ?} */
var $uid = Browser.Engine.trident ? function(item) {
  return(item.uid || (item.uid = [Native.UID++]))[0];
} : function(item) {
  return item.uid || (item.uid = Native.UID++);
};
var Window = new Native({
  name : "Window",
  legacy : Browser.Engine.trident ? null : window.Window,
  /**
   * @param {Window} win
   * @return {?}
   */
  initialize : function(win) {
    $uid(win);
    if (!win.Element) {
      /** @type {function (): undefined} */
      win.Element = $empty;
      if (Browser.Engine.webkit) {
        win.document.createElement("iframe");
      }
      win.Element.prototype = Browser.Engine.webkit ? window["[[DOMElement.prototype]]"] : {};
    }
    return $extend(win, Window.Prototype);
  },
  /**
   * @param {string} property
   * @param {?} value
   * @return {undefined}
   */
  afterImplement : function(property, value) {
    window[property] = Window.Prototype[property] = value;
  }
});
Window.Prototype = {
  $family : {
    name : "window"
  }
};
new Window(window);
var Document = new Native({
  name : "Document",
  legacy : Browser.Engine.trident ? null : window.Document,
  /**
   * @param {Object} doc
   * @return {?}
   */
  initialize : function(doc) {
    $uid(doc);
    doc.head = doc.getElementsByTagName("head")[0];
    doc.html = doc.getElementsByTagName("html")[0];
    doc.window = doc.defaultView || doc.parentWindow;
    if (Browser.Engine.trident4) {
      $try(function() {
        doc.execCommand("BackgroundImageCache", false, true);
      });
    }
    return $extend(doc, Document.Prototype);
  },
  /**
   * @param {string} property
   * @param {?} value
   * @return {undefined}
   */
  afterImplement : function(property, value) {
    document[property] = Document.Prototype[property] = value;
  }
});
Document.Prototype = {
  $family : {
    name : "document"
  }
};
new Document(document);
Array.implement({
  /**
   * @param {Function} f
   * @param {?} opt_obj
   * @return {?}
   */
  every : function(f, opt_obj) {
    /** @type {number} */
    var i = 0;
    var l = this.length;
    for (;i < l;i++) {
      if (!f.call(opt_obj, this[i], i, this)) {
        return false;
      }
    }
    return true;
  },
  /**
   * @param {Function} fn
   * @param {?} scope
   * @return {?}
   */
  filter : function(fn, scope) {
    /** @type {Array} */
    var values = [];
    /** @type {number} */
    var i = 0;
    var l = this.length;
    for (;i < l;i++) {
      if (fn.call(scope, this[i], i, this)) {
        values.push(this[i]);
      }
    }
    return values;
  },
  /**
   * @return {?}
   */
  clean : function() {
    return this.filter($defined);
  },
  /**
   * @param {?} item
   * @param {number} from
   * @return {?}
   */
  indexOf : function(item, from) {
    var length = this.length;
    var i = from < 0 ? Math.max(0, length + from) : from || 0;
    for (;i < length;i++) {
      if (this[i] === item) {
        return i;
      }
    }
    return-1;
  },
  /**
   * @param {Function} fn
   * @param {?} elems
   * @return {?}
   */
  map : function(fn, elems) {
    /** @type {Array} */
    var mapped = [];
    /** @type {number} */
    var i = 0;
    var l = this.length;
    for (;i < l;i++) {
      mapped[i] = fn.call(elems, this[i], i, this);
    }
    return mapped;
  },
  /**
   * @param {Function} f
   * @param {?} opt_obj
   * @return {?}
   */
  some : function(f, opt_obj) {
    /** @type {number} */
    var i = 0;
    var l = this.length;
    for (;i < l;i++) {
      if (f.call(opt_obj, this[i], i, this)) {
        return true;
      }
    }
    return false;
  },
  /**
   * @param {Array} keys
   * @return {?}
   */
  associate : function(keys) {
    var obj = {};
    /** @type {number} */
    var length = Math.min(this.length, keys.length);
    /** @type {number} */
    var i = 0;
    for (;i < length;i++) {
      obj[keys[i]] = this[i];
    }
    return obj;
  },
  /**
   * @param {Object} path
   * @return {?}
   */
  link : function(path) {
    var out = {};
    /** @type {number} */
    var j = 0;
    var l = this.length;
    for (;j < l;j++) {
      var i;
      for (i in path) {
        if (path[i](this[j])) {
          out[i] = this[j];
          delete path[i];
          break;
        }
      }
    }
    return out;
  },
  /**
   * @param {string} item
   * @param {?} from
   * @return {?}
   */
  contains : function(item, from) {
    return this.indexOf(item, from) != -1;
  },
  /**
   * @param {Object} array
   * @return {?}
   */
  extend : function(array) {
    /** @type {number} */
    var i = 0;
    var array_length = array.length;
    for (;i < array_length;i++) {
      this.push(array[i]);
    }
    return this;
  },
  /**
   * @return {?}
   */
  getLast : function() {
    return this.length ? this[this.length - 1] : null;
  },
  /**
   * @return {?}
   */
  getRandom : function() {
    return this.length ? this[$random(0, this.length - 1)] : null;
  },
  /**
   * @param {string} item
   * @return {?}
   */
  include : function(item) {
    if (!this.contains(item)) {
      this.push(item);
    }
    return this;
  },
  /**
   * @param {Array} array
   * @return {?}
   */
  combine : function(array) {
    /** @type {number} */
    var i = 0;
    var array_length = array.length;
    for (;i < array_length;i++) {
      this.include(array[i]);
    }
    return this;
  },
  /**
   * @param {string} item
   * @return {?}
   */
  erase : function(item) {
    var i = this.length;
    for (;i--;i) {
      if (this[i] === item) {
        this.splice(i, 1);
      }
    }
    return this;
  },
  /**
   * @return {?}
   */
  empty : function() {
    /** @type {number} */
    this.length = 0;
    return this;
  },
  /**
   * @return {?}
   */
  flatten : function() {
    /** @type {Array} */
    var array = [];
    /** @type {number} */
    var i = 0;
    var l = this.length;
    for (;i < l;i++) {
      var type = $type(this[i]);
      if (!type) {
        continue;
      }
      /** @type {Array} */
      array = array.concat(type == "array" || (type == "collection" || type == "arguments") ? Array.flatten(this[i]) : this[i]);
    }
    return array;
  },
  /**
   * @param {boolean} deepDataAndEvents
   * @return {?}
   */
  hexToRgb : function(deepDataAndEvents) {
    if (this.length != 3) {
      return null;
    }
    var ret = this.map(function(value) {
      if (value.length == 1) {
        value += value;
      }
      return value.toInt(16);
    });
    return deepDataAndEvents ? ret : "rgb(" + ret + ")";
  },
  /**
   * @param {boolean} array
   * @return {?}
   */
  rgbToHex : function(array) {
    if (this.length < 3) {
      return null;
    }
    if (this.length == 4 && (this[3] == 0 && !array)) {
      return "transparent";
    }
    /** @type {Array} */
    var hex = [];
    /** @type {number} */
    var unlock = 0;
    for (;unlock < 3;unlock++) {
      /** @type {string} */
      var bit = (this[unlock] - 0).toString(16);
      hex.push(bit.length == 1 ? "0" + bit : bit);
    }
    return array ? hex : "#" + hex.join("");
  }
});
Function.implement({
  /**
   * @param {Object} properties
   * @return {?}
   */
  extend : function(properties) {
    var key;
    for (key in properties) {
      this[key] = properties[key];
    }
    return this;
  },
  /**
   * @param {?} options
   * @return {?}
   */
  create : function(options) {
    var wrapper = this;
    options = options || {};
    return function(event) {
      var args = options.arguments;
      args = args != undefined ? $splat(args) : Array.slice(arguments, options.event ? 1 : 0);
      if (options.event) {
        args = [event || window.event].extend(args);
      }
      /**
       * @return {?}
       */
      var returns = function() {
        return wrapper.apply(options.bind || null, args);
      };
      if (options.delay) {
        return setTimeout(returns, options.delay);
      }
      if (options.periodical) {
        return setInterval(returns, options.periodical);
      }
      if (options.attempt) {
        return $try(returns);
      }
      return returns();
    };
  },
  /**
   * @param {string} args
   * @param {Object} bind
   * @return {?}
   */
  pass : function(args, bind) {
    return this.create({
      arguments : args,
      bind : bind
    });
  },
  /**
   * @param {?} args
   * @param {Object} bind
   * @return {?}
   */
  attempt : function(args, bind) {
    return this.create({
      arguments : args,
      bind : bind,
      attempt : true
    })();
  },
  /**
   * @param {Object} bind
   * @param {?} args
   * @return {?}
   */
  bind : function(bind, args) {
    return this.create({
      bind : bind,
      arguments : args
    });
  },
  /**
   * @param {Object} bind
   * @param {Object} args
   * @return {?}
   */
  bindWithEvent : function(bind, args) {
    return this.create({
      bind : bind,
      event : true,
      arguments : args
    });
  },
  /**
   * @param {number} opt_attributes
   * @param {Object} bind
   * @param {string} args
   * @return {?}
   */
  delay : function(opt_attributes, bind, args) {
    return this.create({
      delay : opt_attributes,
      bind : bind,
      arguments : args
    })();
  },
  /**
   * @param {number} periodical
   * @param {Object} bind
   * @param {string} args
   * @return {?}
   */
  periodical : function(periodical, bind, args) {
    return this.create({
      periodical : periodical,
      bind : bind,
      arguments : args
    })();
  },
  /**
   * @param {?} args
   * @param {?} bind
   * @return {?}
   */
  run : function(args, bind) {
    return this.apply(bind, $splat(args));
  }
});
Number.implement({
  /**
   * @param {?} min
   * @param {?} max
   * @return {?}
   */
  limit : function(min, max) {
    return Math.min(max, Math.max(min, this));
  },
  /**
   * @param {number} precision
   * @return {?}
   */
  round : function(precision) {
    /** @type {number} */
    precision = Math.pow(10, precision || 0);
    return Math.round(this * precision) / precision;
  },
  /**
   * @param {Function} iterator
   * @param {?} context
   * @return {undefined}
   */
  times : function(iterator, context) {
    /** @type {number} */
    var value = 0;
    for (;value < this;value++) {
      iterator.call(context, value, this);
    }
  },
  /**
   * @return {?}
   */
  toFloat : function() {
    return parseFloat(this);
  },
  /**
   * @param {number} base
   * @return {?}
   */
  toInt : function(base) {
    return parseInt(this, base || 10);
  }
});
Number.alias("times", "each");
(function(opt_attributes) {
  var attributes = {};
  opt_attributes.each(function(name) {
    if (!Number[name]) {
      /**
       * @return {?}
       */
      attributes[name] = function() {
        return Math[name].apply(null, [this].concat($A(arguments)));
      };
    }
  });
  Number.implement(attributes);
})(["abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", "floor", "log", "max", "min", "pow", "sin", "sqrt", "tan"]);
String.implement({
  /**
   * @param {string} regex
   * @param {Function} params
   * @return {?}
   */
  test : function(regex, params) {
    return(typeof regex == "string" ? new RegExp(regex, params) : regex).test(this);
  },
  /**
   * @param {string} string
   * @param {Object} separator
   * @return {?}
   */
  contains : function(string, separator) {
    return separator ? (separator + this + separator).indexOf(separator + string + separator) > -1 : this.indexOf(string) > -1;
  },
  /**
   * @return {?}
   */
  trim : function() {
    return this.replace(/^\s+|\s+$/g, "");
  },
  /**
   * @return {?}
   */
  clean : function() {
    return this.replace(/\s+/g, " ").trim();
  },
  /**
   * @return {?}
   */
  camelCase : function() {
    return this.replace(/-\D/g, function(charsetPart) {
      return charsetPart.charAt(1).toUpperCase();
    });
  },
  /**
   * @return {?}
   */
  hyphenate : function() {
    return this.replace(/[A-Z]/g, function(charsetPart) {
      return "-" + charsetPart.charAt(0).toLowerCase();
    });
  },
  /**
   * @return {?}
   */
  capitalize : function() {
    return this.replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    });
  },
  /**
   * @return {?}
   */
  escapeRegExp : function() {
    return this.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1");
  },
  /**
   * @param {number} base
   * @return {?}
   */
  toInt : function(base) {
    return parseInt(this, base || 10);
  },
  /**
   * @return {?}
   */
  toFloat : function() {
    return parseFloat(this);
  },
  /**
   * @param {boolean} deepDataAndEvents
   * @return {?}
   */
  hexToRgb : function(deepDataAndEvents) {
    var hex = this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
    return hex ? hex.slice(1).hexToRgb(deepDataAndEvents) : null;
  },
  /**
   * @param {boolean} array
   * @return {?}
   */
  rgbToHex : function(array) {
    var rgb = this.match(/\d{1,3}/g);
    return rgb ? rgb.rgbToHex(array) : null;
  },
  /**
   * @param {boolean} option
   * @return {?}
   */
  stripScripts : function(option) {
    /** @type {string} */
    var scripts = "";
    var text = this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function() {
      scripts += arguments[1] + "\n";
      return "";
    });
    if (option === true) {
      $exec(scripts);
    } else {
      if ($type(option) == "function") {
        option(scripts, text);
      }
    }
    return text;
  },
  /**
   * @param {Array} object
   * @param {RegExp} regexp
   * @return {?}
   */
  substitute : function(object, regexp) {
    return this.replace(regexp || /\\?\{([^}]+)\}/g, function(match, name) {
      if (match.charAt(0) == "\\") {
        return match.slice(1);
      }
      return object[name] != undefined ? object[name] : "";
    });
  }
});
Hash.implement({
  /** @type {function (this:Object, *): boolean} */
  has : Object.prototype.hasOwnProperty,
  /**
   * @param {?} value
   * @return {?}
   */
  keyOf : function(value) {
    var key;
    for (key in this) {
      if (this.hasOwnProperty(key) && this[key] === value) {
        return key;
      }
    }
    return null;
  },
  /**
   * @param {?} value
   * @return {?}
   */
  hasValue : function(value) {
    return Hash.keyOf(this, value) !== null;
  },
  /**
   * @param {?} properties
   * @return {?}
   */
  extend : function(properties) {
    Hash.each(properties, function(value, key) {
      Hash.set(this, key, value);
    }, this);
    return this;
  },
  /**
   * @param {?} properties
   * @return {?}
   */
  combine : function(properties) {
    Hash.each(properties, function(value, key) {
      Hash.include(this, key, value);
    }, this);
    return this;
  },
  /**
   * @param {string} key
   * @return {?}
   */
  erase : function(key) {
    if (this.hasOwnProperty(key)) {
      delete this[key];
    }
    return this;
  },
  /**
   * @param {string} key
   * @return {?}
   */
  get : function(key) {
    return this.hasOwnProperty(key) ? this[key] : null;
  },
  /**
   * @param {string} events
   * @param {string} novisibility
   * @return {?}
   */
  set : function(events, novisibility) {
    if (!this[events] || this.hasOwnProperty(events)) {
      /** @type {string} */
      this[events] = novisibility;
    }
    return this;
  },
  /**
   * @return {?}
   */
  empty : function() {
    Hash.each(this, function(dataAndEvents, timeoutKey) {
      delete this[timeoutKey];
    }, this);
    return this;
  },
  /**
   * @param {Function} key
   * @param {?} val
   * @return {?}
   */
  include : function(key, val) {
    var label = this[key];
    if (label == undefined) {
      this[key] = val;
    }
    return this;
  },
  /**
   * @param {Function} fn
   * @param {?} bind
   * @return {?}
   */
  map : function(fn, bind) {
    var results = new Hash;
    Hash.each(this, function(value, key) {
      results.set(key, fn.call(bind, value, key, this));
    }, this);
    return results;
  },
  /**
   * @param {Function} fn
   * @param {?} scope
   * @return {?}
   */
  filter : function(fn, scope) {
    var results = new Hash;
    Hash.each(this, function(value, key) {
      if (fn.call(scope, value, key, this)) {
        results.set(key, value);
      }
    }, this);
    return results;
  },
  /**
   * @param {Function} fn
   * @param {?} bind
   * @return {?}
   */
  every : function(fn, bind) {
    var key;
    for (key in this) {
      if (this.hasOwnProperty(key) && !fn.call(bind, this[key], key)) {
        return false;
      }
    }
    return true;
  },
  /**
   * @param {Function} fn
   * @param {?} bind
   * @return {?}
   */
  some : function(fn, bind) {
    var key;
    for (key in this) {
      if (this.hasOwnProperty(key) && fn.call(bind, this[key], key)) {
        return true;
      }
    }
    return false;
  },
  /**
   * @return {?}
   */
  getKeys : function() {
    /** @type {Array} */
    var rv = [];
    Hash.each(this, function(dataAndEvents, spaceName) {
      rv.push(spaceName);
    });
    return rv;
  },
  /**
   * @return {?}
   */
  getValues : function() {
    /** @type {Array} */
    var assigns = [];
    Hash.each(this, function(vvar) {
      assigns.push(vvar);
    });
    return assigns;
  },
  /**
   * @param {string} base
   * @return {?}
   */
  toQueryString : function(base) {
    /** @type {Array} */
    var queryString = [];
    Hash.each(this, function(value, key) {
      if (base) {
        /** @type {string} */
        key = base + "[" + key + "]";
      }
      var result;
      switch($type(value)) {
        case "object":
          result = Hash.toQueryString(value, key);
          break;
        case "array":
          var qs = {};
          value.each(function(val, i) {
            qs[i] = val;
          });
          result = Hash.toQueryString(qs, key);
          break;
        default:
          /** @type {string} */
          result = key + "=" + encodeURIComponent(value);
      }
      if (value != undefined) {
        queryString.push(result);
      }
    });
    return queryString.join("&");
  }
});
Hash.alias({
  keyOf : "indexOf",
  hasValue : "contains"
});
var Event = new Native({
  name : "Event",
  /**
   * @param {Object} event
   * @param {Object} win
   * @return {?}
   */
  initialize : function(event, win) {
    win = win || window;
    var doc = win.document;
    event = event || win.event;
    if (event.$extended) {
      return event;
    }
    /** @type {boolean} */
    this.$extended = true;
    var type = event.type;
    var tapElement = event.target || event.srcElement;
    for (;tapElement && tapElement.nodeType == 3;) {
      tapElement = tapElement.parentNode;
    }
    if (type.test(/key/)) {
      var code = event.which || event.keyCode;
      var key = Event.Keys.keyOf(code);
      if (type == "keydown") {
        /** @type {number} */
        var fKey = code - 111;
        if (fKey > 0 && fKey < 13) {
          /** @type {string} */
          key = "f" + fKey;
        }
      }
      key = key || String.fromCharCode(code).toLowerCase();
    } else {
      if (type.match(/(click|mouse|menu)/i)) {
        doc = !doc.compatMode || doc.compatMode == "CSS1Compat" ? doc.html : doc.body;
        var page = {
          x : event.pageX || event.clientX + doc.scrollLeft,
          y : event.pageY || event.clientY + doc.scrollTop
        };
        var client = {
          x : event.pageX ? event.pageX - win.pageXOffset : event.clientX,
          y : event.pageY ? event.pageY - win.pageYOffset : event.clientY
        };
        if (type.match(/DOMMouseScroll|mousewheel/)) {
          /** @type {number} */
          var wheel = event.wheelDelta ? event.wheelDelta / 120 : -(event.detail || 0) / 3
        }
        /** @type {boolean} */
        var rightClick = event.which == 3 || event.button == 2;
        /** @type {null} */
        var related = null;
        if (type.match(/over|out/)) {
          switch(type) {
            case "mouseover":
              related = event.relatedTarget || event.fromElement;
              break;
            case "mouseout":
              related = event.relatedTarget || event.toElement;
          }
          if (!function() {
            for (;related && related.nodeType == 3;) {
              related = related.parentNode;
            }
            return true;
          }.create({
            attempt : Browser.Engine.gecko
          })()) {
            /** @type {boolean} */
            related = false;
          }
        }
      }
    }
    return $extend(this, {
      event : event,
      type : type,
      page : page,
      client : client,
      rightClick : rightClick,
      wheel : wheel,
      relatedTarget : related,
      target : tapElement,
      code : code,
      key : key,
      shift : event.shiftKey,
      control : event.ctrlKey,
      alt : event.altKey,
      meta : event.metaKey
    });
  }
});
Event.Keys = new Hash({
  enter : 13,
  up : 38,
  down : 40,
  left : 37,
  right : 39,
  esc : 27,
  space : 32,
  backspace : 8,
  tab : 9,
  "delete" : 46
});
Event.implement({
  /**
   * @return {?}
   */
  stop : function() {
    return this.stopPropagation().preventDefault();
  },
  /**
   * @return {?}
   */
  stopPropagation : function() {
    if (this.event.stopPropagation) {
      this.event.stopPropagation();
    } else {
      /** @type {boolean} */
      this.event.cancelBubble = true;
    }
    return this;
  },
  /**
   * @return {?}
   */
  preventDefault : function() {
    if (this.event.preventDefault) {
      this.event.preventDefault();
    } else {
      /** @type {boolean} */
      this.event.returnValue = false;
    }
    return this;
  }
});
var Class = new Native({
  name : "Class",
  /**
   * @param {Object} parent
   * @return {?}
   */
  initialize : function(parent) {
    parent = parent || {};
    /**
     * @param {Function} response
     * @return {?}
     */
    var klass = function(response) {
      var i;
      for (i in this) {
        this[i] = $unlink(this[i]);
      }
      var mutator;
      for (mutator in Class.Mutators) {
        if (!this[mutator]) {
          continue;
        }
        Class.Mutators[mutator](this, this[mutator]);
        delete this[mutator];
      }
      /** @type {function (Function): ?} */
      this.constructor = klass;
      if (response === $empty) {
        return this;
      }
      var instance = this.initialize ? this.initialize.apply(this, arguments) : this;
      if (this.options && this.options.initialize) {
        this.options.initialize.call(this);
      }
      return instance;
    };
    $extend(klass, this);
    klass.constructor = Class;
    /** @type {Object} */
    klass.prototype = parent;
    return klass;
  }
});
Class.implement({
  /**
   * @return {?}
   */
  implement : function() {
    Class.Mutators.Implements(this.prototype, Array.slice(arguments));
    return this;
  }
});
Class.Mutators = {
  /**
   * @param {Object} elements
   * @param {?} items
   * @return {undefined}
   */
  Implements : function(elements, items) {
    $splat(items).each(function(klass) {
      $extend(elements, $type(klass) == "class" ? new klass($empty) : klass);
    });
  },
  /**
   * @param {Object} result
   * @param {Function} klass
   * @return {undefined}
   */
  Extends : function(result, klass) {
    var object = new klass($empty);
    delete object.parent;
    delete object.parentOf;
    var key;
    for (key in object) {
      var val = result[key];
      var value = object[key];
      if (val == undefined) {
        result[key] = value;
        continue;
      }
      var type = $type(val);
      var form = $type(value);
      if (type != form) {
        continue;
      }
      switch(type) {
        case "function":
          if (!arguments.callee.caller) {
            /** @type {*} */
            result[key] = eval("(" + String(val).replace(/\bthis\.parent\(\s*(\))?/g, function(deepDataAndEvents, dataAndEvents) {
              return "arguments.callee._parent_.call(this" + (dataAndEvents || ", ");
            }) + ")");
          }
          result[key]._parent_ = value;
          break;
        case "object":
          result[key] = $merge(value, val);
      }
    }
    /**
     * @return {?}
     */
    result.parent = function() {
      return arguments.callee.caller._parent_.apply(this, arguments);
    };
    /**
     * @param {?} child
     * @return {?}
     */
    result.parentOf = function(child) {
      return child._parent_.apply(this, Array.slice(arguments, 1));
    };
  }
};
var Chain = new Class({
  /**
   * @return {?}
   */
  chain : function() {
    this.$chain = (this.$chain || []).extend(arguments);
    return this;
  },
  /**
   * @return {?}
   */
  callChain : function() {
    return this.$chain && this.$chain.length ? this.$chain.shift().apply(this, arguments) : false;
  },
  /**
   * @return {?}
   */
  clearChain : function() {
    if (this.$chain) {
      this.$chain.empty();
    }
    return this;
  }
});
var Events = new Class({
  /**
   * @param {string} type
   * @param {Function} fn
   * @param {?} newFunction
   * @return {?}
   */
  addEvent : function(type, fn, newFunction) {
    type = Events.removeOn(type);
    if (fn != $empty) {
      this.$events = this.$events || {};
      this.$events[type] = this.$events[type] || [];
      this.$events[type].include(fn);
      if (newFunction) {
        /** @type {boolean} */
        fn.internal = true;
      }
    }
    return this;
  },
  /**
   * @param {Object} events
   * @return {?}
   */
  addEvents : function(events) {
    var type;
    for (type in events) {
      this.addEvent(type, events[type]);
    }
    return this;
  },
  /**
   * @param {string} type
   * @param {Object} args
   * @param {number} delay
   * @return {?}
   */
  fireEvent : function(type, args, delay) {
    type = Events.removeOn(type);
    if (!this.$events || !this.$events[type]) {
      return this;
    }
    this.$events[type].each(function(fn) {
      fn.create({
        bind : this,
        delay : delay,
        "arguments" : args
      })();
    }, this);
    return this;
  },
  /**
   * @param {string} type
   * @param {string} fn
   * @return {?}
   */
  removeEvent : function(type, fn) {
    type = Events.removeOn(type);
    if (!this.$events || !this.$events[type]) {
      return this;
    }
    if (!fn.internal) {
      this.$events[type].erase(fn);
    }
    return this;
  },
  /**
   * @param {string} events
   * @return {?}
   */
  removeEvents : function(events) {
    var type;
    for (type in this.$events) {
      if (events && events != type) {
        continue;
      }
      var fns = this.$events[type];
      var i = fns.length;
      for (;i--;i) {
        this.removeEvent(type, fns[i]);
      }
    }
    return this;
  }
});
/**
 * @param {string} string
 * @return {?}
 */
Events.removeOn = function(string) {
  return string.replace(/^on([A-Z])/, function(dataAndEvents, m3) {
    return m3.toLowerCase();
  });
};
var Options = new Class({
  /**
   * @return {?}
   */
  setOptions : function() {
    this.options = $merge.run([this.options].extend(arguments));
    if (!this.addEvent) {
      return this;
    }
    var option;
    for (option in this.options) {
      if ($type(this.options[option]) != "function" || !/^on[A-Z]/.test(option)) {
        continue;
      }
      this.addEvent(option, this.options[option]);
      delete this.options[option];
    }
    return this;
  }
});
Document.implement({
  /**
   * @param {string} tag
   * @param {string} props
   * @return {?}
   */
  newElement : function(tag, props) {
    if (Browser.Engine.trident && props) {
      ["name", "type", "checked"].each(function(attribute) {
        if (!props[attribute]) {
          return;
        }
        tag += " " + attribute + '="' + props[attribute] + '"';
        if (attribute != "checked") {
          delete props[attribute];
        }
      });
      /** @type {string} */
      tag = "<" + tag + ">";
    }
    return $.element(this.createElement(tag)).set(props);
  },
  /**
   * @param {?} text
   * @return {?}
   */
  newTextNode : function(text) {
    return this.createTextNode(text);
  },
  /**
   * @return {?}
   */
  getDocument : function() {
    return this;
  },
  /**
   * @return {?}
   */
  getWindow : function() {
    return this.defaultView || this.parentWindow;
  },
  /**
   * @return {undefined}
   */
  purge : function() {
    var codeSegments = this.getElementsByTagName("*");
    /** @type {number} */
    var i = 0;
    var valuesLen = codeSegments.length;
    for (;i < valuesLen;i++) {
      Browser.freeMem(codeSegments[i]);
    }
  }
});
var Element = new Native({
  name : "Element",
  legacy : window.Element,
  /**
   * @param {string} tag
   * @param {string} props
   * @return {?}
   */
  initialize : function(tag, props) {
    var konstructor = Element.Constructors.get(tag);
    if (konstructor) {
      return konstructor(props);
    }
    if (typeof tag == "string") {
      return document.newElement(tag, props);
    }
    return $(tag).set(props);
  },
  /**
   * @param {?} key
   * @param {?} value
   * @return {undefined}
   */
  afterImplement : function(key, value) {
    if (!Array[key]) {
      Elements.implement(key, Elements.multi(key));
    }
    Element.Prototype[key] = value;
  }
});
Element.Prototype = {
  $family : {
    name : "element"
  }
};
Element.Constructors = new Hash;
var IFrame = new Native({
  name : "IFrame",
  generics : false,
  /**
   * @return {?}
   */
  initialize : function() {
    var params = Array.link(arguments, {
      properties : Object.type,
      /** @type {function (Object): ?} */
      iframe : $defined
    });
    var props = params.properties || {};
    var iframe = $(params.iframe) || false;
    var onload = props.onload || $empty;
    delete props.onload;
    props.id = props.name = $pick(props.id, props.name, iframe.id, iframe.name, "IFrame_" + $time());
    /** @type {Element} */
    iframe = new Element(iframe || "iframe", props);
    /**
     * @return {undefined}
     */
    var onFrameLoad = function() {
      var host = $try(function() {
        return iframe.contentWindow.location.host;
      });
      if (host && host == window.location.host) {
        /** @type {Window} */
        var win = new Window(iframe.contentWindow);
        /** @type {Document} */
        var doc = new Document(iframe.contentWindow.document);
        $extend(win.Element.prototype, Element.Prototype);
      }
      onload.call(iframe.contentWindow, iframe.contentWindow.document);
    };
    if (!window.frames[props.id]) {
      iframe.addListener("load", onFrameLoad);
    } else {
      onFrameLoad();
    }
    return iframe;
  }
});
var Elements = new Native({
  /**
   * @param {Array} elements
   * @param {Error} options
   * @return {?}
   */
  initialize : function(elements, options) {
    options = $extend({
      ddup : true,
      cash : true
    }, options);
    elements = elements || [];
    if (options.ddup || options.cash) {
      var uniques = {};
      /** @type {Array} */
      var assigns = [];
      /** @type {number} */
      var i = 0;
      var valuesLen = elements.length;
      for (;i < valuesLen;i++) {
        var vvar = $.element(elements[i], !options.cash);
        if (options.ddup) {
          if (uniques[vvar.uid]) {
            continue;
          }
          /** @type {boolean} */
          uniques[vvar.uid] = true;
        }
        assigns.push(vvar);
      }
      /** @type {Array} */
      elements = assigns;
    }
    return options.cash ? $extend(elements, this) : elements;
  }
});
Elements.implement({
  /**
   * @param {Object} filter
   * @param {?} bind
   * @return {?}
   */
  filter : function(filter, bind) {
    if (!filter) {
      return this;
    }
    return new Elements(Array.filter(this, typeof filter == "string" ? function(fullName) {
      return fullName.match(filter);
    } : filter, bind));
  }
});
/**
 * @param {?} key
 * @return {?}
 */
Elements.multi = function(key) {
  return function() {
    /** @type {Array} */
    var items = [];
    /** @type {boolean} */
    var elements = true;
    /** @type {number} */
    var i = 0;
    var l = this.length;
    for (;i < l;i++) {
      var returns = this[i][key].apply(this[i], arguments);
      items.push(returns);
      if (elements) {
        /** @type {boolean} */
        elements = $type(returns) == "element";
      }
    }
    return elements ? new Elements(items) : items;
  };
};
Window.implement({
  /**
   * @param {Object} el
   * @param {?} nocash
   * @return {?}
   */
  $ : function(el, nocash) {
    if (el && (el.$family && el.uid)) {
      return el;
    }
    var type = $type(el);
    return $[type] ? $[type](el, nocash, this.document) : null;
  },
  /**
   * @param {string} selector
   * @return {?}
   */
  $$ : function(selector) {
    if (arguments.length == 1 && typeof selector == "string") {
      return this.document.getElements(selector);
    }
    /** @type {Array} */
    var elements = [];
    var resolveValues = Array.flatten(arguments);
    /** @type {number} */
    var i = 0;
    var length = resolveValues.length;
    for (;i < length;i++) {
      var item = resolveValues[i];
      switch($type(item)) {
        case "element":
          /** @type {Array} */
          item = [item];
          break;
        case "string":
          item = this.document.getElements(item, true);
          break;
        default:
          /** @type {boolean} */
          item = false;
      }
      if (item) {
        elements.extend(item);
      }
    }
    return new Elements(elements);
  },
  /**
   * @return {?}
   */
  getDocument : function() {
    return this.document;
  },
  /**
   * @return {?}
   */
  getWindow : function() {
    return this;
  }
});
/**
 * @param {Object} id
 * @param {boolean} nocash
 * @param {Object} element
 * @return {?}
 */
$.string = function(id, nocash, element) {
  id = element.getElementById(id);
  return id ? $.element(id, nocash) : null;
};
/**
 * @param {Object} el
 * @param {boolean} nocash
 * @return {?}
 */
$.element = function(el, nocash) {
  $uid(el);
  if (!nocash && (!el.$family && !/^object|embed$/i.test(el.tagName))) {
    var attrs = Element.Prototype;
    var attr;
    for (attr in attrs) {
      el[attr] = attrs[attr];
    }
  }
  return el;
};
/**
 * @param {Event} map
 * @param {boolean} nocash
 * @param {Object} doc
 * @return {?}
 */
$.object = function(map, nocash, doc) {
  if (map.toElement) {
    return $.element(map.toElement(doc), nocash);
  }
  return null;
};
$.textnode = $.whitespace = $.window = $.document = $arguments(0);
Native.implement([Element, Document], {
  /**
   * @param {string} selector
   * @param {?} nocash
   * @return {?}
   */
  getElement : function(selector, nocash) {
    return $(this.getElements(selector, true)[0] || null, nocash);
  },
  /**
   * @param {string} tags
   * @param {boolean} dataAndEvents
   * @return {?}
   */
  getElements : function(tags, dataAndEvents) {
    tags = tags.split(",");
    /** @type {Array} */
    var elements = [];
    /** @type {boolean} */
    var ddup = tags.length > 1;
    tags.each(function(buf) {
      var partial = this.getElementsByTagName(buf.trim());
      if (ddup) {
        elements.extend(partial);
      } else {
        elements = partial;
      }
    }, this);
    return new Elements(elements, {
      ddup : ddup,
      cash : !dataAndEvents
    });
  }
});
Element.Storage = {
  /**
   * @param {string} options
   * @return {?}
   */
  get : function(options) {
    return this[options] || (this[options] = {});
  }
};
Element.Inserters = new Hash({
  /**
   * @param {?} context
   * @param {Node} node
   * @return {undefined}
   */
  before : function(context, node) {
    if (node.parentNode) {
      node.parentNode.insertBefore(context, node);
    }
  },
  /**
   * @param {?} node
   * @param {Node} element
   * @return {undefined}
   */
  after : function(node, element) {
    if (!element.parentNode) {
      return;
    }
    var sibling = element.nextSibling;
    if (sibling) {
      element.parentNode.insertBefore(node, sibling);
    } else {
      element.parentNode.appendChild(node);
    }
  },
  /**
   * @param {?} element
   * @param {Element} node
   * @return {undefined}
   */
  bottom : function(element, node) {
    node.appendChild(element);
  },
  /**
   * @param {?} context
   * @param {Element} element
   * @return {undefined}
   */
  top : function(context, element) {
    var first = element.firstChild;
    if (first) {
      element.insertBefore(context, first);
    } else {
      element.appendChild(context);
    }
  }
});
Element.Inserters.inside = Element.Inserters.bottom;
Element.Inserters.each(function(inserter, d) {
  var where = d.capitalize();
  Element.implement("inject" + where, function(el) {
    inserter(this, $(el, true));
    return this;
  });
  Element.implement("grab" + where, function(el) {
    inserter($(el, true), this);
    return this;
  });
});
Element.implement({
  /**
   * @return {?}
   */
  getDocument : function() {
    return this.ownerDocument;
  },
  /**
   * @return {?}
   */
  getWindow : function() {
    return this.ownerDocument.getWindow();
  },
  /**
   * @param {Object} id
   * @param {boolean} nocash
   * @return {?}
   */
  getElementById : function(id, nocash) {
    var elem = this.ownerDocument.getElementById(id);
    if (!elem) {
      return null;
    }
    var parent = elem.parentNode;
    for (;parent != this;parent = parent.parentNode) {
      if (!parent) {
        return null;
      }
    }
    return $.element(elem, nocash);
  },
  /**
   * @param {string} prop
   * @param {string} value
   * @return {?}
   */
  set : function(prop, value) {
    switch($type(prop)) {
      case "object":
        var p;
        for (p in prop) {
          this.set(p, prop[p]);
        }
        break;
      case "string":
        var property = Element.Properties.get(prop);
        if (property && property.set) {
          property.set.apply(this, Array.slice(arguments, 1));
        } else {
          this.setProperty(prop, value);
        }
      ;
    }
    return this;
  },
  /**
   * @param {string} prop
   * @return {?}
   */
  get : function(prop) {
    var property = Element.Properties.get(prop);
    return property && property.get ? property.get.apply(this, Array.slice(arguments, 1)) : this.getProperty(prop);
  },
  /**
   * @param {string} prop
   * @return {?}
   */
  erase : function(prop) {
    var property = Element.Properties.get(prop);
    if (property && property.erase) {
      property.erase.apply(this, Array.slice(arguments, 1));
    } else {
      this.removeProperty(prop);
    }
    return this;
  },
  /**
   * @param {RegExp} tag
   * @return {?}
   */
  match : function(tag) {
    return!tag || Element.get(this, "tag") == tag;
  },
  /**
   * @param {Object} element
   * @param {string} context
   * @return {?}
   */
  inject : function(element, context) {
    Element.Inserters.get(context || "bottom")(this, $(element, true));
    return this;
  },
  /**
   * @param {Node} el
   * @param {string} where
   * @return {?}
   */
  wraps : function(el, where) {
    el = $(el, true);
    return this.replaces(el).grab(el, where);
  },
  /**
   * @param {(Node|string)} element
   * @param {string} where
   * @return {?}
   */
  grab : function(element, where) {
    Element.Inserters.get(where || "bottom")($(element, true), this);
    return this;
  },
  /**
   * @param {?} text
   * @param {string} where
   * @return {?}
   */
  appendText : function(text, where) {
    return this.grab(this.getDocument().newTextNode(text), where);
  },
  /**
   * @return {?}
   */
  adopt : function() {
    Array.flatten(arguments).each(function(newContent) {
      newContent = $(newContent, true);
      if (newContent) {
        this.appendChild(newContent);
      }
    }, this);
    return this;
  },
  /**
   * @return {?}
   */
  dispose : function() {
    return this.parentNode ? this.parentNode.removeChild(this) : this;
  },
  /**
   * @param {boolean} dataAndEvents
   * @param {boolean} deepDataAndEvents
   * @return {?}
   */
  clone : function(dataAndEvents, deepDataAndEvents) {
    switch($type(this)) {
      case "element":
        var attrs = {};
        /** @type {number} */
        var k = 0;
        var l = this.attributes.length;
        for (;k < l;k++) {
          var node = this.attributes[k];
          var key = node.nodeName.toLowerCase();
          if (Browser.Engine.trident && (/input/i.test(this.tagName) && /width|height/.test(key))) {
            continue;
          }
          var item = key == "style" && this.style ? this.style.cssText : node.nodeValue;
          if (!$chk(item) || (key == "uid" || key == "id" && !deepDataAndEvents)) {
            continue;
          }
          if (item != "inherit" && ["string", "number"].contains($type(item))) {
            attrs[key] = item;
          }
        }
        /** @type {Element} */
        var element = new Element(this.nodeName.toLowerCase(), attrs);
        if (dataAndEvents !== false) {
          /** @type {number} */
          var i = 0;
          var n = this.childNodes.length;
          for (;i < n;i++) {
            var activeClassName = Element.clone(this.childNodes[i], true, deepDataAndEvents);
            if (activeClassName) {
              element.grab(activeClassName);
            }
          }
        }
        return element;
      case "textnode":
        return document.newTextNode(this.nodeValue);
    }
    return null;
  },
  /**
   * @param {(Node|string)} element
   * @return {?}
   */
  replaces : function(element) {
    element = $(element, true);
    element.parentNode.replaceChild(this, element);
    return this;
  },
  /**
   * @param {string} className
   * @return {?}
   */
  hasClass : function(className) {
    return this.className.contains(className, " ");
  },
  /**
   * @param {string} className
   * @return {?}
   */
  addClass : function(className) {
    if (!this.hasClass(className)) {
      this.className = (this.className + " " + className).clean();
    }
    return this;
  },
  /**
   * @param {string} classNames
   * @return {?}
   */
  removeClass : function(classNames) {
    this.className = this.className.replace(new RegExp("(^|\\s)" + classNames + "(?:\\s|$)"), "$1").clean();
    return this;
  },
  /**
   * @param {string} className
   * @return {?}
   */
  toggleClass : function(className) {
    return this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
  },
  /**
   * @param {string} property
   * @return {?}
   */
  getComputedStyle : function(property) {
    if (this.currentStyle) {
      return this.currentStyle[property.camelCase()];
    }
    var computed = this.getWindow().getComputedStyle(this, null);
    return computed ? computed.getPropertyValue([property.hyphenate()]) : null;
  },
  /**
   * @return {?}
   */
  empty : function() {
    $A(this.childNodes).each(function(node) {
      Browser.freeMem(node);
      Element.empty(node);
      Element.dispose(node);
    }, this);
    return this;
  },
  /**
   * @return {?}
   */
  destroy : function() {
    Browser.freeMem(this.empty().dispose());
    return null;
  },
  /**
   * @return {?}
   */
  getSelected : function() {
    return new Elements($A(this.options).filter(function(pane) {
      return pane.selected;
    }));
  },
  /**
   * @return {?}
   */
  toQueryString : function() {
    /** @type {Array} */
    var tagNameArr = [];
    this.getElements("input, select, textarea").each(function(el) {
      if (!el.name || el.disabled) {
        return;
      }
      var value = el.tagName.toLowerCase() == "select" ? Element.getSelected(el).map(function($provide) {
        return $provide.value;
      }) : (el.type == "radio" || el.type == "checkbox") && !el.checked ? null : el.value;
      $splat(value).each(function(sectionName) {
        if (sectionName) {
          tagNameArr.push(el.name + "=" + encodeURIComponent(sectionName));
        }
      });
    });
    return tagNameArr.join("&");
  },
  /**
   * @param {?} attribute
   * @return {?}
   */
  getProperty : function(attribute) {
    var t = Element.Attributes;
    var key = t.Props[attribute];
    var value = key ? this[key] : this.getAttribute(attribute, 2);
    return t.Bools[attribute] ? !!value : key ? value : value || null;
  },
  /**
   * @return {?}
   */
  getProperties : function() {
    var args = $A(arguments);
    return args.map(function(prop) {
      return this.getProperty(prop);
    }, this).associate(args);
  },
  /**
   * @param {string} attribute
   * @param {boolean} value
   * @return {?}
   */
  setProperty : function(attribute, value) {
    var t = Element.Attributes;
    var key = t.Props[attribute];
    var isFunction = $defined(value);
    if (key && t.Bools[attribute]) {
      /** @type {boolean} */
      value = value || !isFunction ? true : false;
    } else {
      if (!isFunction) {
        return this.removeProperty(attribute);
      }
    }
    if (key) {
      /** @type {boolean} */
      this[key] = value;
    } else {
      this.setAttribute(attribute, value);
    }
    return this;
  },
  /**
   * @param {Object} attributes
   * @return {?}
   */
  setProperties : function(attributes) {
    var attribute;
    for (attribute in attributes) {
      this.setProperty(attribute, attributes[attribute]);
    }
    return this;
  },
  /**
   * @param {string} attribute
   * @return {?}
   */
  removeProperty : function(attribute) {
    var t = Element.Attributes;
    var key = t.Props[attribute];
    var checked = key && t.Bools[attribute];
    if (key) {
      /** @type {(boolean|string)} */
      this[key] = checked ? false : "";
    } else {
      this.removeAttribute(attribute);
    }
    return this;
  },
  /**
   * @return {?}
   */
  removeProperties : function() {
    Array.each(arguments, this.removeProperty, this);
    return this;
  }
});
(function() {
  /**
   * @param {Object} element
   * @param {string} walk
   * @param {Object} start
   * @param {?} match
   * @param {boolean} recurring
   * @param {?} nocash
   * @return {?}
   */
  var walk = function(element, walk, start, match, recurring, nocash) {
    var el = element[start || walk];
    /** @type {Array} */
    var elements = [];
    for (;el;) {
      if (el.nodeType == 1 && (!match || Element.match(el, match))) {
        elements.push(el);
        if (!recurring) {
          break;
        }
      }
      el = el[walk];
    }
    return recurring ? new Elements(elements, {
      ddup : false,
      cash : !nocash
    }) : $(elements[0], nocash);
  };
  Element.implement({
    /**
     * @param {?} match
     * @param {?} nocash
     * @return {?}
     */
    getPrevious : function(match, nocash) {
      return walk(this, "previousSibling", null, match, false, nocash);
    },
    /**
     * @param {?} match
     * @param {?} nocash
     * @return {?}
     */
    getAllPrevious : function(match, nocash) {
      return walk(this, "previousSibling", null, match, true, nocash);
    },
    /**
     * @param {?} match
     * @param {?} nocash
     * @return {?}
     */
    getNext : function(match, nocash) {
      return walk(this, "nextSibling", null, match, false, nocash);
    },
    /**
     * @param {?} match
     * @param {?} nocash
     * @return {?}
     */
    getAllNext : function(match, nocash) {
      return walk(this, "nextSibling", null, match, true, nocash);
    },
    /**
     * @param {?} match
     * @param {?} nocash
     * @return {?}
     */
    getFirst : function(match, nocash) {
      return walk(this, "nextSibling", "firstChild", match, false, nocash);
    },
    /**
     * @param {?} match
     * @param {?} nocash
     * @return {?}
     */
    getLast : function(match, nocash) {
      return walk(this, "previousSibling", "lastChild", match, false, nocash);
    },
    /**
     * @param {?} match
     * @param {?} nocash
     * @return {?}
     */
    getParent : function(match, nocash) {
      return walk(this, "parentNode", null, match, false, nocash);
    },
    /**
     * @param {?} match
     * @param {?} nocash
     * @return {?}
     */
    getParents : function(match, nocash) {
      return walk(this, "parentNode", null, match, true, nocash);
    },
    /**
     * @param {?} match
     * @param {?} nocash
     * @return {?}
     */
    getChildren : function(match, nocash) {
      return walk(this, "nextSibling", "firstChild", match, true, nocash);
    },
    /**
     * @param {Text} child
     * @return {?}
     */
    hasChild : function(child) {
      child = $(child, true);
      return!!child && $A(this.getElementsByTagName(child.tagName)).contains(child);
    }
  });
})();
Element.Properties = new Hash;
Element.Properties.style = {
  /**
   * @param {Object} style
   * @return {undefined}
   */
  set : function(style) {
    /** @type {Object} */
    this.style.cssText = style;
  },
  /**
   * @return {?}
   */
  get : function() {
    return this.style.cssText;
  },
  /**
   * @return {undefined}
   */
  erase : function() {
    /** @type {string} */
    this.style.cssText = "";
  }
};
Element.Properties.tag = {
  /**
   * @return {?}
   */
  get : function() {
    return this.tagName.toLowerCase();
  }
};
Element.Properties.href = {
  /**
   * @return {?}
   */
  get : function() {
    return!this.href ? null : this.href.replace(new RegExp("^" + document.location.protocol + "//" + document.location.host), "");
  }
};
Element.Properties.html = {
  /**
   * @return {?}
   */
  set : function() {
    return this.innerHTML = Array.flatten(arguments).join("");
  }
};
Native.implement([Element, Window, Document], {
  /**
   * @param {string} type
   * @param {Function} fn
   * @return {?}
   */
  addListener : function(type, fn) {
    if (this.addEventListener) {
      this.addEventListener(type, fn, false);
    } else {
      this.attachEvent("on" + type, fn);
    }
    return this;
  },
  /**
   * @param {string} type
   * @param {Function} fn
   * @return {?}
   */
  removeListener : function(type, fn) {
    if (this.removeEventListener) {
      this.removeEventListener(type, fn, false);
    } else {
      this.detachEvent("on" + type, fn);
    }
    return this;
  },
  /**
   * @param {string} property
   * @param {Object} value
   * @return {?}
   */
  retrieve : function(property, value) {
    var storage = Element.Storage.get(this.uid);
    var fn = storage[property];
    if ($defined(value) && !$defined(fn)) {
      fn = storage[property] = value;
    }
    return $pick(fn);
  },
  /**
   * @param {string} options
   * @param {?} value
   * @return {?}
   */
  store : function(options, value) {
    var store = Element.Storage.get(this.uid);
    store[options] = value;
    return this;
  },
  /**
   * @param {string} property
   * @return {?}
   */
  eliminate : function(property) {
    var storage = Element.Storage.get(this.uid);
    delete storage[property];
    return this;
  }
});
Element.Attributes = new Hash({
  Props : {
    html : "innerHTML",
    "class" : "className",
    "for" : "htmlFor",
    text : Browser.Engine.trident ? "innerText" : "textContent"
  },
  Bools : ["compact", "nowrap", "ismap", "declare", "noshade", "checked", "disabled", "readonly", "multiple", "selected", "noresize", "defer"],
  Camels : ["value", "accessKey", "cellPadding", "cellSpacing", "colSpan", "frameBorder", "maxLength", "readOnly", "rowSpan", "tabIndex", "useMap"]
});
/**
 * @param {Object} item
 * @return {undefined}
 */
Browser.freeMem = function(item) {
  if (!item) {
    return;
  }
  if (Browser.Engine.trident && /object/i.test(item.tagName)) {
    var p;
    for (p in item) {
      if (typeof item[p] == "function") {
        /** @type {function (): undefined} */
        item[p] = $empty;
      }
    }
    Element.dispose(item);
  }
  if (item.uid && item.removeEvents) {
    item.removeEvents();
  }
};
(function(data) {
  var bools = data.Bools;
  var scope = data.Camels;
  data.Bools = bools = bools.associate(bools);
  Hash.extend(Hash.combine(data.Props, bools), scope.associate(scope.map(function(m3) {
    return m3.toLowerCase();
  })));
  data.erase("Camels");
})(Element.Attributes);
window.addListener("unload", function() {
  window.removeListener("unload", arguments.callee);
  document.purge();
  if (Browser.Engine.trident) {
    CollectGarbage();
  }
});
Element.Properties.events = {
  /**
   * @param {string} events
   * @return {undefined}
   */
  set : function(events) {
    this.addEvents(events);
  }
};
Native.implement([Element, Window, Document], {
  /**
   * @param {string} type
   * @param {Function} fn
   * @return {?}
   */
  addEvent : function(type, fn) {
    var events = this.retrieve("events", {});
    events[type] = events[type] || {
      keys : [],
      values : []
    };
    if (events[type].keys.contains(fn)) {
      return this;
    }
    events[type].keys.push(fn);
    /** @type {string} */
    var realType = type;
    var custom = Element.Events.get(type);
    /** @type {Function} */
    var condition = fn;
    var self = this;
    if (custom) {
      if (custom.onAdd) {
        custom.onAdd.call(this, fn);
      }
      if (custom.condition) {
        /**
         * @param {?} i
         * @return {?}
         */
        condition = function(i) {
          if (custom.condition.call(this, i)) {
            return fn.call(this, i);
          }
          return false;
        };
      }
      realType = custom.base || realType;
    }
    /**
     * @return {?}
     */
    var defn = function() {
      return fn.call(self);
    };
    var B = Element.NativeEvents[realType] || 0;
    if (B) {
      if (B == 2) {
        /**
         * @param {Object} event
         * @return {undefined}
         */
        defn = function(event) {
          /** @type {Event} */
          event = new Event(event, self.getWindow());
          if (condition.call(self, event) === false) {
            event.stop();
          }
        };
      }
      this.addListener(realType, defn);
    }
    events[type].values.push(defn);
    return this;
  },
  /**
   * @param {string} type
   * @param {?} element
   * @return {?}
   */
  removeEvent : function(type, element) {
    var events = this.retrieve("events");
    if (!events || !events[type]) {
      return this;
    }
    var classes = events[type].keys.indexOf(element);
    if (classes == -1) {
      return this;
    }
    var A = events[type].keys.splice(classes, 1)[0];
    var value = events[type].values.splice(classes, 1)[0];
    var custom = Element.Events.get(type);
    if (custom) {
      if (custom.onRemove) {
        custom.onRemove.call(this, element);
      }
      type = custom.base || type;
    }
    return Element.NativeEvents[type] ? this.removeListener(type, value) : this;
  },
  /**
   * @param {Object} events
   * @return {?}
   */
  addEvents : function(events) {
    var type;
    for (type in events) {
      this.addEvent(type, events[type]);
    }
    return this;
  },
  /**
   * @param {string} type
   * @return {?}
   */
  removeEvents : function(type) {
    var events = this.retrieve("events");
    if (!events) {
      return this;
    }
    if (!type) {
      var ev;
      for (ev in events) {
        this.removeEvents(ev);
      }
      /** @type {null} */
      events = null;
    } else {
      if (events[type]) {
        for (;events[type].keys[0];) {
          this.removeEvent(type, events[type].keys[0]);
        }
        /** @type {null} */
        events[type] = null;
      }
    }
    return this;
  },
  /**
   * @param {string} type
   * @param {Object} args
   * @param {number} delay
   * @return {?}
   */
  fireEvent : function(type, args, delay) {
    var events = this.retrieve("events");
    if (!events || !events[type]) {
      return this;
    }
    events[type].keys.each(function(fn) {
      fn.create({
        bind : this,
        delay : delay,
        "arguments" : args
      })();
    }, this);
    return this;
  },
  /**
   * @param {(Element|string)} from
   * @param {string} type
   * @return {?}
   */
  cloneEvents : function(from, type) {
    from = $(from);
    var fevents = from.retrieve("events");
    if (!fevents) {
      return this;
    }
    if (!type) {
      var evType;
      for (evType in fevents) {
        this.cloneEvents(from, evType);
      }
    } else {
      if (fevents[type]) {
        fevents[type].keys.each(function(sqlt) {
          this.addEvent(type, sqlt);
        }, this);
      }
    }
    return this;
  }
});
Element.NativeEvents = {
  click : 2,
  dblclick : 2,
  mouseup : 2,
  mousedown : 2,
  contextmenu : 2,
  mousewheel : 2,
  DOMMouseScroll : 2,
  mouseover : 2,
  mouseout : 2,
  mousemove : 2,
  selectstart : 2,
  selectend : 2,
  keydown : 2,
  keypress : 2,
  keyup : 2,
  focus : 2,
  blur : 2,
  change : 2,
  reset : 2,
  select : 2,
  submit : 2,
  load : 1,
  unload : 1,
  beforeunload : 2,
  resize : 1,
  move : 1,
  DOMContentLoaded : 1,
  readystatechange : 1,
  error : 1,
  abort : 1,
  scroll : 1
};
(function() {
  /**
   * @param {Object} event
   * @return {?}
   */
  var $check = function(event) {
    var related = event.relatedTarget;
    if (related == undefined) {
      return true;
    }
    if (related === false) {
      return false;
    }
    return $type(this) != "document" && (related != this && (related.prefix != "xul" && !this.hasChild(related)));
  };
  Element.Events = new Hash({
    mouseenter : {
      base : "mouseover",
      /** @type {function (Object): ?} */
      condition : $check
    },
    mouseleave : {
      base : "mouseout",
      /** @type {function (Object): ?} */
      condition : $check
    },
    mousewheel : {
      base : Browser.Engine.gecko ? "DOMMouseScroll" : "mousewheel"
    }
  });
})();
Element.Properties.styles = {
  /**
   * @param {string} styles
   * @return {undefined}
   */
  set : function(styles) {
    this.setStyles(styles);
  }
};
Element.Properties.opacity = {
  /**
   * @param {string} opacity
   * @param {string} novisibility
   * @return {undefined}
   */
  set : function(opacity, novisibility) {
    if (!novisibility) {
      if (opacity == 0) {
        if (this.style.visibility != "hidden") {
          /** @type {string} */
          this.style.visibility = "hidden";
        }
      } else {
        if (this.style.visibility != "visible") {
          /** @type {string} */
          this.style.visibility = "visible";
        }
      }
    }
    if (!this.currentStyle || !this.currentStyle.hasLayout) {
      /** @type {number} */
      this.style.zoom = 1;
    }
    if (Browser.Engine.trident) {
      /** @type {string} */
      this.style.filter = opacity == 1 ? "" : "alpha(opacity=" + opacity * 100 + ")";
    }
    /** @type {string} */
    this.style.opacity = opacity;
    this.store("opacity", opacity);
  },
  /**
   * @return {?}
   */
  get : function() {
    return this.retrieve("opacity", 1);
  }
};
Element.implement({
  /**
   * @param {string} value
   * @return {?}
   */
  setOpacity : function(value) {
    return this.set("opacity", value, true);
  },
  /**
   * @return {?}
   */
  getOpacity : function() {
    return this.get("opacity");
  },
  /**
   * @param {string} property
   * @param {string} value
   * @return {?}
   */
  setStyle : function(property, value) {
    switch(property) {
      case "opacity":
        return this.set("opacity", parseFloat(value));
      case "float":
        /** @type {string} */
        property = Browser.Engine.trident ? "styleFloat" : "cssFloat";
    }
    property = property.camelCase();
    if ($type(value) != "string") {
      var attrList = (Element.Styles.get(property) || "@").split(" ");
      value = $splat(value).map(function(val, i) {
        if (!attrList[i]) {
          return "";
        }
        return $type(val) == "number" ? attrList[i].replace("@", Math.round(val)) : val;
      }).join(" ");
    } else {
      if (value == String(Number(value))) {
        /** @type {number} */
        value = Math.round(value);
      }
    }
    /** @type {string} */
    this.style[property] = value;
    return this;
  },
  /**
   * @param {string} property
   * @return {?}
   */
  getStyle : function(property) {
    switch(property) {
      case "opacity":
        return this.get("opacity");
      case "float":
        /** @type {string} */
        property = Browser.Engine.trident ? "styleFloat" : "cssFloat";
    }
    property = property.camelCase();
    var result = this.style[property];
    if (!$chk(result)) {
      /** @type {Array} */
      result = [];
      var style;
      for (style in Element.ShortStyles) {
        if (property != style) {
          continue;
        }
        var s;
        for (s in Element.ShortStyles[style]) {
          result.push(this.getStyle(s));
        }
        return result.join(" ");
      }
      result = this.getComputedStyle(property);
    }
    if (result) {
      /** @type {string} */
      result = String(result);
      /** @type {(Array.<string>|null)} */
      var color = result.match(/rgba?\([\d\s,]+\)/);
      if (color) {
        /** @type {string} */
        result = result.replace(color[0], color[0].rgbToHex());
      }
    }
    if (Browser.Engine.presto || Browser.Engine.trident && !$chk(parseInt(result))) {
      if (property.test(/^(height|width)$/)) {
        /** @type {Array} */
        var cursor = property == "width" ? ["left", "right"] : ["top", "bottom"];
        /** @type {number} */
        var size = 0;
        cursor.each(function(value) {
          size += this.getStyle("border-" + value + "-width").toInt() + this.getStyle("padding-" + value).toInt();
        }, this);
        return this["offset" + property.capitalize()] - size + "px";
      }
      if (Browser.Engine.presto && String(result).test("px")) {
        return result;
      }
      if (property.test(/(border(.+)Width|margin|padding)/)) {
        return "0px";
      }
    }
    return result;
  },
  /**
   * @param {Object} styles
   * @return {?}
   */
  setStyles : function(styles) {
    var style;
    for (style in styles) {
      this.setStyle(style, styles[style]);
    }
    return this;
  },
  /**
   * @return {?}
   */
  getStyles : function() {
    var result = {};
    Array.each(arguments, function(key) {
      result[key] = this.getStyle(key);
    }, this);
    return result;
  }
});
Element.Styles = new Hash({
  left : "@px",
  top : "@px",
  bottom : "@px",
  right : "@px",
  width : "@px",
  height : "@px",
  maxWidth : "@px",
  maxHeight : "@px",
  minWidth : "@px",
  minHeight : "@px",
  backgroundColor : "rgb(@, @, @)",
  backgroundPosition : "@px @px",
  color : "rgb(@, @, @)",
  fontSize : "@px",
  letterSpacing : "@px",
  lineHeight : "@px",
  clip : "rect(@px @px @px @px)",
  margin : "@px @px @px @px",
  padding : "@px @px @px @px",
  border : "@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)",
  borderWidth : "@px @px @px @px",
  borderStyle : "@ @ @ @",
  borderColor : "rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)",
  zIndex : "@",
  zoom : "@",
  fontWeight : "@",
  textIndent : "@px",
  opacity : "@"
});
Element.ShortStyles = {
  margin : {},
  padding : {},
  border : {},
  borderWidth : {},
  borderStyle : {},
  borderColor : {}
};
["Top", "Right", "Bottom", "Left"].each(function(direction) {
  var Short = Element.ShortStyles;
  var All = Element.Styles;
  ["margin", "padding"].each(function(style) {
    var sd = style + direction;
    /** @type {string} */
    Short[style][sd] = All[sd] = "@px";
  });
  /** @type {string} */
  var bd = "border" + direction;
  /** @type {string} */
  Short.border[bd] = All[bd] = "@px @ rgb(@, @, @)";
  /** @type {string} */
  var bdw = bd + "Width";
  /** @type {string} */
  var bds = bd + "Style";
  /** @type {string} */
  var bdc = bd + "Color";
  Short[bd] = {};
  /** @type {string} */
  Short.borderWidth[bdw] = Short[bd][bdw] = All[bdw] = "@px";
  /** @type {string} */
  Short.borderStyle[bds] = Short[bd][bds] = All[bds] = "@";
  /** @type {string} */
  Short.borderColor[bdc] = Short[bd][bdc] = All[bdc] = "rgb(@, @, @)";
});
(function() {
  /**
   * @param {?} element
   * @param {string} style
   * @return {?}
   */
  function styleNumber(element, style) {
    return styleString(element, style).toInt() || 0;
  }
  /**
   * @param {string} element
   * @return {?}
   */
  function borderBox(element) {
    return styleString(element, "-moz-box-sizing") == "border-box";
  }
  /**
   * @param {?} element
   * @return {?}
   */
  function topBorder(element) {
    return styleNumber(element, "border-top-width");
  }
  /**
   * @param {?} element
   * @return {?}
   */
  function leftBorder(element) {
    return styleNumber(element, "border-left-width");
  }
  /**
   * @param {?} element
   * @return {?}
   */
  function isBody(element) {
    return/^(?:body|html)$/i.test(element.tagName);
  }
  /**
   * @param {?} element
   * @return {?}
   */
  function getCompatElement(element) {
    var doc = element.getDocument();
    return!doc.compatMode || doc.compatMode == "CSS1Compat" ? doc.html : doc.body;
  }
  Element.implement({
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    scrollTo : function(x, y) {
      if (isBody(this)) {
        this.getWindow().scrollTo(x, y);
      } else {
        this.scrollLeft = x;
        this.scrollTop = y;
      }
      return this;
    },
    /**
     * @return {?}
     */
    getSize : function() {
      if (isBody(this)) {
        return this.getWindow().getSize();
      }
      return{
        x : this.offsetWidth,
        y : this.offsetHeight
      };
    },
    /**
     * @return {?}
     */
    getScrollSize : function() {
      if (isBody(this)) {
        return this.getWindow().getScrollSize();
      }
      return{
        x : this.scrollWidth,
        y : this.scrollHeight
      };
    },
    /**
     * @return {?}
     */
    getScroll : function() {
      if (isBody(this)) {
        return this.getWindow().getScroll();
      }
      return{
        x : this.scrollLeft,
        y : this.scrollTop
      };
    },
    /**
     * @return {?}
     */
    getScrolls : function() {
      var element = this;
      var position = {
        x : 0,
        y : 0
      };
      for (;element && !isBody(element);) {
        position.x += element.scrollLeft;
        position.y += element.scrollTop;
        element = element.parentNode;
      }
      return position;
    },
    /**
     * @return {?}
     */
    getOffsetParent : function() {
      var element = this;
      if (isBody(element)) {
        return null;
      }
      if (!Browser.Engine.trident) {
        return element.offsetParent;
      }
      for (;(element = element.parentNode) && !isBody(element);) {
        if (styleString(element, "position") != "static") {
          return element;
        }
      }
      return null;
    },
    /**
     * @return {?}
     */
    getOffsets : function() {
      var element = this;
      var position = {
        x : 0,
        y : 0
      };
      if (isBody(this)) {
        return position;
      }
      for (;element && !isBody(element);) {
        position.x += element.offsetLeft;
        position.y += element.offsetTop;
        if (Browser.Engine.gecko) {
          if (!borderBox(element)) {
            position.x += leftBorder(element);
            position.y += topBorder(element);
          }
          var parent = element.parentNode;
          if (parent && styleString(parent, "overflow") != "visible") {
            position.x += leftBorder(parent);
            position.y += topBorder(parent);
          }
        } else {
          if (element != this && (Browser.Engine.trident || Browser.Engine.webkit)) {
            position.x += leftBorder(element);
            position.y += topBorder(element);
          }
        }
        element = element.offsetParent;
        if (Browser.Engine.trident) {
          for (;element && !element.currentStyle.hasLayout;) {
            element = element.offsetParent;
          }
        }
      }
      if (Browser.Engine.gecko && !borderBox(this)) {
        position.x -= leftBorder(this);
        position.y -= topBorder(this);
      }
      return position;
    },
    /**
     * @param {Object} relative
     * @return {?}
     */
    getPosition : function(relative) {
      if (isBody(this)) {
        return{
          x : 0,
          y : 0
        };
      }
      var offset = this.getOffsets();
      var scroll = this.getScrolls();
      var center2 = {
        x : offset.x - scroll.x,
        y : offset.y - scroll.y
      };
      var center1 = relative && (relative = $(relative)) ? relative.getPosition() : {
        x : 0,
        y : 0
      };
      return{
        x : center2.x - center1.x,
        y : center2.y - center1.y
      };
    },
    /**
     * @param {Object} element
     * @return {?}
     */
    getCoordinates : function(element) {
      if (isBody(this)) {
        return this.getWindow().getCoordinates();
      }
      var position = this.getPosition(element);
      var size = this.getSize();
      var obj = {
        left : position.x,
        top : position.y,
        width : size.x,
        height : size.y
      };
      obj.right = obj.left + obj.width;
      obj.bottom = obj.top + obj.height;
      return obj;
    },
    /**
     * @param {Object} obj
     * @return {?}
     */
    computePosition : function(obj) {
      return{
        left : obj.x - styleNumber(this, "margin-left"),
        top : obj.y - styleNumber(this, "margin-top")
      };
    },
    /**
     * @param {Object} obj
     * @return {?}
     */
    position : function(obj) {
      return this.setStyles(this.computePosition(obj));
    }
  });
  Native.implement([Document, Window], {
    /**
     * @return {?}
     */
    getSize : function() {
      var win = this.getWindow();
      if (Browser.Engine.presto || Browser.Engine.webkit) {
        return{
          x : win.innerWidth,
          y : win.innerHeight
        };
      }
      var doc = getCompatElement(this);
      return{
        x : doc.clientWidth,
        y : doc.clientHeight
      };
    },
    /**
     * @return {?}
     */
    getScroll : function() {
      var win = this.getWindow();
      var doc = getCompatElement(this);
      return{
        x : win.pageXOffset || doc.scrollLeft,
        y : win.pageYOffset || doc.scrollTop
      };
    },
    /**
     * @return {?}
     */
    getScrollSize : function() {
      var doc = getCompatElement(this);
      var min = this.getSize();
      return{
        x : Math.max(doc.scrollWidth, min.x),
        y : Math.max(doc.scrollHeight, min.y)
      };
    },
    /**
     * @return {?}
     */
    getPosition : function() {
      return{
        x : 0,
        y : 0
      };
    },
    /**
     * @return {?}
     */
    getCoordinates : function() {
      var size = this.getSize();
      return{
        top : 0,
        left : 0,
        bottom : size.y,
        right : size.x,
        height : size.y,
        width : size.x
      };
    }
  });
  var styleString = Element.getComputedStyle;
})();
Native.implement([Window, Document, Element], {
  /**
   * @return {?}
   */
  getHeight : function() {
    return this.getSize().y;
  },
  /**
   * @return {?}
   */
  getWidth : function() {
    return this.getSize().x;
  },
  /**
   * @return {?}
   */
  getScrollTop : function() {
    return this.getScroll().y;
  },
  /**
   * @return {?}
   */
  getScrollLeft : function() {
    return this.getScroll().x;
  },
  /**
   * @return {?}
   */
  getScrollHeight : function() {
    return this.getScrollSize().y;
  },
  /**
   * @return {?}
   */
  getScrollWidth : function() {
    return this.getScrollSize().x;
  },
  /**
   * @return {?}
   */
  getTop : function() {
    return this.getPosition().y;
  },
  /**
   * @return {?}
   */
  getLeft : function() {
    return this.getPosition().x;
  }
});
Native.implement([Document, Element], {
  /**
   * @param {string} expression
   * @param {boolean} dataAndEvents
   * @return {?}
   */
  getElements : function(expression, dataAndEvents) {
    expression = expression.split(",");
    var items;
    var local = {};
    /** @type {number} */
    var i = 0;
    var l = expression.length;
    for (;i < l;i++) {
      var selector = expression[i];
      var elements = Selectors.Utils.search(this, selector, local);
      if (i != 0 && elements.item) {
        elements = $A(elements);
      }
      items = i == 0 ? elements : items.item ? $A(items).concat(elements) : items.concat(elements);
    }
    return new Elements(items, {
      ddup : expression.length > 1,
      cash : !dataAndEvents
    });
  }
});
Element.implement({
  /**
   * @param {RegExp} selector
   * @return {?}
   */
  match : function(selector) {
    if (!selector) {
      return true;
    }
    var tagid = Selectors.Utils.parseTagAndID(selector);
    var tag = tagid[0];
    var id = tagid[1];
    if (!Selectors.Filters.byID(this, id) || !Selectors.Filters.byTag(this, tag)) {
      return false;
    }
    var item = Selectors.Utils.parseSelector(selector);
    return item ? Selectors.Utils.filter(this, item, {}) : true;
  }
});
var Selectors = {
  Cache : {
    nth : {},
    parsed : {}
  }
};
Selectors.RegExps = {
  id : /#([\w-]+)/,
  tag : /^(\w+|\*)/,
  quick : /^(\w+|\*)$/,
  splitter : /\s*([+>~\s])\s*([a-zA-Z#.*:\[])/g,
  combined : /\.([\w-]+)|\[(\w+)(?:([!*^$~|]?=)["']?(.*?)["']?)?\]|:([\w-]+)(?:\(["']?(.*?)?["']?\)|$)/g
};
Selectors.Utils = {
  /**
   * @param {Object} item
   * @param {?} uniques
   * @return {?}
   */
  chk : function(item, uniques) {
    if (!uniques) {
      return true;
    }
    var uid = $uid(item);
    if (!uniques[uid]) {
      return uniques[uid] = true;
    }
    return false;
  },
  /**
   * @param {string} argument
   * @return {?}
   */
  parseNthArgument : function(argument) {
    if (Selectors.Cache.nth[argument]) {
      return Selectors.Cache.nth[argument];
    }
    var parsed = argument.match(/^([+-]?\d*)?([a-z]+)?([+-]?\d*)?$/);
    if (!parsed) {
      return false;
    }
    /** @type {number} */
    var inta = parseInt(parsed[1]);
    /** @type {number} */
    var a = inta || inta === 0 ? inta : 1;
    var special = parsed[2] || false;
    /** @type {number} */
    var b = parseInt(parsed[3]) || 0;
    if (a != 0) {
      b--;
      for (;b < 1;) {
        b += a;
      }
      for (;b >= a;) {
        b -= a;
      }
    } else {
      /** @type {number} */
      a = b;
      /** @type {string} */
      special = "index";
    }
    switch(special) {
      case "n":
        parsed = {
          a : a,
          b : b,
          special : "n"
        };
        break;
      case "odd":
        parsed = {
          a : 2,
          b : 0,
          special : "n"
        };
        break;
      case "even":
        parsed = {
          a : 2,
          b : 1,
          special : "n"
        };
        break;
      case "first":
        parsed = {
          a : 0,
          special : "index"
        };
        break;
      case "last":
        parsed = {
          special : "last-child"
        };
        break;
      case "only":
        parsed = {
          special : "only-child"
        };
        break;
      default:
        parsed = {
          a : a - 1,
          special : "index"
        };
    }
    return Selectors.Cache.nth[argument] = parsed;
  },
  /**
   * @param {RegExp} selector
   * @return {?}
   */
  parseSelector : function(selector) {
    if (Selectors.Cache.parsed[selector]) {
      return Selectors.Cache.parsed[selector];
    }
    var m;
    var parsed = {
      classes : [],
      pseudos : [],
      attributes : []
    };
    for (;m = Selectors.RegExps.combined.exec(selector);) {
      var copies = m[1];
      var an = m[2];
      var ao = m[3];
      var av = m[4];
      var pn = m[5];
      var pa = m[6];
      if (copies) {
        parsed.classes.push(copies);
      } else {
        if (pn) {
          var parser = Selectors.Pseudo.get(pn);
          if (parser) {
            parsed.pseudos.push({
              parser : parser,
              argument : pa
            });
          } else {
            parsed.attributes.push({
              name : pn,
              operator : "=",
              value : pa
            });
          }
        } else {
          if (an) {
            parsed.attributes.push({
              name : an,
              operator : ao,
              value : av
            });
          }
        }
      }
    }
    if (!parsed.classes.length) {
      delete parsed.classes;
    }
    if (!parsed.attributes.length) {
      delete parsed.attributes;
    }
    if (!parsed.pseudos.length) {
      delete parsed.pseudos;
    }
    if (!parsed.classes && (!parsed.attributes && !parsed.pseudos)) {
      /** @type {null} */
      parsed = null;
    }
    return Selectors.Cache.parsed[selector] = parsed;
  },
  /**
   * @param {string} selector
   * @return {?}
   */
  parseTagAndID : function(selector) {
    var horizontalOffset = selector.match(Selectors.RegExps.tag);
    var iconCls = selector.match(Selectors.RegExps.id);
    return[horizontalOffset ? horizontalOffset[1] : "*", iconCls ? iconCls[1] : false];
  },
  /**
   * @param {Object} item
   * @param {Object} selector
   * @param {?} local
   * @return {?}
   */
  filter : function(item, selector, local) {
    var i;
    if (selector.classes) {
      i = selector.classes.length;
      for (;i--;i) {
        var cn = selector.classes[i];
        if (!Selectors.Filters.byClass(item, cn)) {
          return false;
        }
      }
    }
    if (selector.attributes) {
      i = selector.attributes.length;
      for (;i--;i) {
        var att = selector.attributes[i];
        if (!Selectors.Filters.byAttribute(item, att.name, att.operator, att.value)) {
          return false;
        }
      }
    }
    if (selector.pseudos) {
      i = selector.pseudos.length;
      for (;i--;i) {
        var psd = selector.pseudos[i];
        if (!Selectors.Filters.byPseudo(item, psd.parser, psd.argument, local)) {
          return false;
        }
      }
    }
    return true;
  },
  /**
   * @param {HTMLElement} ctx
   * @param {string} tag
   * @param {Object} id
   * @return {?}
   */
  getByTagAndID : function(ctx, tag, id) {
    if (id) {
      var item = ctx.getElementById ? ctx.getElementById(id, true) : Element.getElementById(ctx, id, true);
      return item && Selectors.Filters.byTag(item, tag) ? [item] : [];
    } else {
      return ctx.getElementsByTagName(tag);
    }
  },
  /**
   * @param {Node} self
   * @param {string} expression
   * @param {?} local
   * @return {?}
   */
  search : function(self, expression, local) {
    /** @type {Array} */
    var splitters = [];
    var codeSegments = expression.trim().replace(Selectors.RegExps.splitter, function(deepDataAndEvents, m1, dataAndEvents) {
      splitters.push(m1);
      return ":)" + dataAndEvents;
    }).split(":)");
    var items;
    var F;
    var filtered;
    var item;
    /** @type {number} */
    var i = 0;
    var valuesLen = codeSegments.length;
    for (;i < valuesLen;i++) {
      var selector = codeSegments[i];
      if (i == 0 && Selectors.RegExps.quick.test(selector)) {
        items = self.getElementsByTagName(selector);
        continue;
      }
      var splitter = splitters[i - 1];
      var tagid = Selectors.Utils.parseTagAndID(selector);
      var tag = tagid[0];
      var id = tagid[1];
      if (i == 0) {
        items = Selectors.Utils.getByTagAndID(self, tag, id);
      } else {
        var uniques = {};
        /** @type {Array} */
        var found = [];
        /** @type {number} */
        var j = 0;
        var k = items.length;
        for (;j < k;j++) {
          found = Selectors.Getters[splitter](found, items[j], tag, id, uniques);
        }
        items = found;
      }
      var elem = Selectors.Utils.parseSelector(selector);
      if (elem) {
        /** @type {Array} */
        filtered = [];
        /** @type {number} */
        var a = 0;
        var al = items.length;
        for (;a < al;a++) {
          item = items[a];
          if (Selectors.Utils.filter(item, elem, local)) {
            filtered.push(item);
          }
        }
        /** @type {Array} */
        items = filtered;
      }
    }
    return items;
  }
};
Selectors.Getters = {
  /**
   * @param {Array} caseSensitive
   * @param {undefined} self
   * @param {string} tag
   * @param {Object} id
   * @param {?} uniques
   * @return {?}
   */
  " " : function(caseSensitive, self, tag, id, uniques) {
    var items = Selectors.Utils.getByTagAndID(self, tag, id);
    /** @type {number} */
    var i = 0;
    var valuesLen = items.length;
    for (;i < valuesLen;i++) {
      var item = items[i];
      if (Selectors.Utils.chk(item, uniques)) {
        caseSensitive.push(item);
      }
    }
    return caseSensitive;
  },
  /**
   * @param {Array} paragraph
   * @param {undefined} self
   * @param {string} tag
   * @param {Object} id
   * @param {?} uniques
   * @return {?}
   */
  ">" : function(paragraph, self, tag, id, uniques) {
    var children = Selectors.Utils.getByTagAndID(self, tag, id);
    /** @type {number} */
    var i = 0;
    var l = children.length;
    for (;i < l;i++) {
      var child = children[i];
      if (child.parentNode == self && Selectors.Utils.chk(child, uniques)) {
        paragraph.push(child);
      }
    }
    return paragraph;
  },
  /**
   * @param {Array} found
   * @param {(Object|string)} self
   * @param {string} tag
   * @param {?} id
   * @param {?} uniques
   * @return {?}
   */
  "+" : function(found, self, tag, id, uniques) {
    for (;self = self.nextSibling;) {
      if (self.nodeType == 1) {
        if (Selectors.Utils.chk(self, uniques) && (Selectors.Filters.byTag(self, tag) && Selectors.Filters.byID(self, id))) {
          found.push(self);
        }
        break;
      }
    }
    return found;
  },
  /**
   * @param {Array} found
   * @param {(Object|string)} self
   * @param {string} tag
   * @param {?} id
   * @param {?} uniques
   * @return {?}
   */
  "~" : function(found, self, tag, id, uniques) {
    for (;self = self.nextSibling;) {
      if (self.nodeType == 1) {
        if (!Selectors.Utils.chk(self, uniques)) {
          break;
        }
        if (Selectors.Filters.byTag(self, tag) && Selectors.Filters.byID(self, id)) {
          found.push(self);
        }
      }
    }
    return found;
  }
};
Selectors.Filters = {
  /**
   * @param {Object} self
   * @param {string} tag
   * @return {?}
   */
  byTag : function(self, tag) {
    return tag == "*" || self.tagName && self.tagName.toLowerCase() == tag;
  },
  /**
   * @param {Object} self
   * @param {?} id
   * @return {?}
   */
  byID : function(self, id) {
    return!id || self.id && self.id == id;
  },
  /**
   * @param {Node} self
   * @param {string} klass
   * @return {?}
   */
  byClass : function(self, klass) {
    return self.className && self.className.contains(klass, " ");
  },
  /**
   * @param {Object} self
   * @param {Function} parser
   * @param {?} argument
   * @param {?} local
   * @return {?}
   */
  byPseudo : function(self, parser, argument, local) {
    return parser.call(self, argument, local);
  },
  /**
   * @param {Object} self
   * @param {?} name
   * @param {?} operator
   * @param {string} value
   * @return {?}
   */
  byAttribute : function(self, name, operator, value) {
    var result = Element.prototype.getProperty.call(self, name);
    if (!result) {
      return false;
    }
    if (!operator || value == undefined) {
      return true;
    }
    switch(operator) {
      case "=":
        return result == value;
      case "*=":
        return result.contains(value);
      case "^=":
        return result.substr(0, value.length) == value;
      case "$=":
        return result.substr(result.length - value.length) == value;
      case "!=":
        return result != value;
      case "~=":
        return result.contains(value, " ");
      case "|=":
        return result.contains(value, "-");
    }
    return false;
  }
};
Selectors.Pseudo = new Hash({
  /**
   * @return {?}
   */
  empty : function() {
    return!(this.innerText || (this.textContent || "")).length;
  },
  /**
   * @param {?} selector
   * @return {?}
   */
  not : function(selector) {
    return!Element.match(this, selector);
  },
  /**
   * @param {string} item
   * @return {?}
   */
  contains : function(item) {
    return(this.innerText || (this.textContent || "")).contains(item);
  },
  /**
   * @return {?}
   */
  "first-child" : function() {
    return Selectors.Pseudo.index.call(this, 0);
  },
  /**
   * @return {?}
   */
  "last-child" : function() {
    var curNode = this;
    for (;curNode = curNode.nextSibling;) {
      if (curNode.nodeType == 1) {
        return false;
      }
    }
    return true;
  },
  /**
   * @return {?}
   */
  "only-child" : function() {
    var prev = this;
    for (;prev = prev.previousSibling;) {
      if (prev.nodeType == 1) {
        return false;
      }
    }
    var curNode = this;
    for (;curNode = curNode.nextSibling;) {
      if (curNode.nodeType == 1) {
        return false;
      }
    }
    return true;
  },
  /**
   * @param {string} argument
   * @param {?} local
   * @return {?}
   */
  "nth-child" : function(argument, local) {
    argument = argument == undefined ? "n" : argument;
    var parsed = Selectors.Utils.parseNthArgument(argument);
    if (parsed.special != "n") {
      return Selectors.Pseudo[parsed.special].call(this, parsed.a, local);
    }
    /** @type {number} */
    var count = 0;
    local.positions = local.positions || {};
    var uid = $uid(this);
    if (!local.positions[uid]) {
      var self = this;
      for (;self = self.previousSibling;) {
        if (self.nodeType != 1) {
          continue;
        }
        count++;
        var position = local.positions[$uid(self)];
        if (position != undefined) {
          count = position + count;
          break;
        }
      }
      local.positions[uid] = count;
    }
    return local.positions[uid] % parsed.a == parsed.b;
  },
  /**
   * @param {number} index
   * @return {?}
   */
  index : function(index) {
    var prev = this;
    /** @type {number} */
    var count = 0;
    for (;prev = prev.previousSibling;) {
      if (prev.nodeType == 1 && ++count > index) {
        return false;
      }
    }
    return count == index;
  },
  /**
   * @param {?} i
   * @param {?} local
   * @return {?}
   */
  even : function(i, local) {
    return Selectors.Pseudo["nth-child"].call(this, "2n+1", local);
  },
  /**
   * @param {?} i
   * @param {?} local
   * @return {?}
   */
  odd : function(i, local) {
    return Selectors.Pseudo["nth-child"].call(this, "2n", local);
  }
});
Element.Events.domready = {
  /**
   * @param {Function} fn
   * @return {undefined}
   */
  onAdd : function(fn) {
    if (Browser.loaded) {
      fn.call(this);
    }
  }
};
(function() {
  /**
   * @return {undefined}
   */
  var domready = function() {
    if (Browser.loaded) {
      return;
    }
    /** @type {boolean} */
    Browser.loaded = true;
    window.fireEvent("domready");
    document.fireEvent("domready");
  };
  switch(Browser.Engine.name) {
    case "webkit":
      (function() {
        if (["loaded", "complete"].contains(document.readyState)) {
          domready();
        } else {
          arguments.callee.delay(50);
        }
      })();
      break;
    case "trident":
      /** @type {Element} */
      var temp = document.createElement("div");
      (function() {
        if ($try(function() {
          temp.doScroll("left");
          return $(temp).inject(document.body).set("html", "temp").dispose();
        })) {
          domready();
        } else {
          arguments.callee.delay(50);
        }
      })();
      break;
    default:
      window.addEvent("load", domready);
      document.addEvent("DOMContentLoaded", domready);
  }
})();
var JSON = new Hash({
  /**
   * @param {string} obj
   * @return {?}
   */
  encode : function(obj) {
    switch($type(obj)) {
      case "string":
        return'"' + obj.replace(/[\x00-\x1f\\"]/g, JSON.$replaceChars) + '"';
      case "array":
        return "[" + String(obj.map(JSON.encode).filter($defined)) + "]";
      case "object":
      ;
      case "hash":
        /** @type {Array} */
        var string = [];
        Hash.each(obj, function(value, key) {
          var json = JSON.encode(value);
          if (json) {
            string.push(JSON.encode(key) + ":" + json);
          }
        });
        return "{" + string + "}";
      case "number":
      ;
      case "boolean":
        return String(obj);
      case false:
        return "null";
    }
    return null;
  },
  $specialChars : {
    "\b" : "\\b",
    "\t" : "\\t",
    "\n" : "\\n",
    "\f" : "\\f",
    "\r" : "\\r",
    '"' : '\\"',
    "\\" : "\\\\"
  },
  /**
   * @param {string} chr
   * @return {?}
   */
  $replaceChars : function(chr) {
    return JSON.$specialChars[chr] || "\\u00" + Math.floor(chr.charCodeAt() / 16).toString(16) + (chr.charCodeAt() % 16).toString(16);
  },
  /**
   * @param {string} string
   * @param {boolean} secure
   * @return {?}
   */
  decode : function(string, secure) {
    if ($type(string) != "string" || !string.length) {
      return null;
    }
    if (secure && !/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/.test(string.replace(/\\./g, "@").replace(/"[^"\\\n\r]*"/g, ""))) {
      return null;
    }
    return eval("(" + string + ")");
  }
});
Native.implement([Hash, Array, String, Number], {
  /**
   * @return {?}
   */
  toJSON : function() {
    return JSON.encode(this);
  }
});
var Cookie = new Class({
  Implements : Options,
  options : {
    path : false,
    domain : false,
    duration : false,
    secure : false,
    document : document
  },
  /**
   * @param {string} key
   * @param {?} options
   * @return {undefined}
   */
  initialize : function(key, options) {
    /** @type {string} */
    this.key = key;
    this.setOptions(options);
  },
  /**
   * @param {string} value
   * @return {?}
   */
  write : function(value) {
    /** @type {string} */
    value = encodeURIComponent(value);
    if (this.options.domain) {
      value += "; domain=" + this.options.domain;
    }
    if (this.options.path) {
      value += "; path=" + this.options.path;
    }
    if (this.options.duration) {
      /** @type {Date} */
      var date = new Date;
      date.setTime(date.getTime() + this.options.duration * 24 * 60 * 60 * 1E3);
      value += "; expires=" + date.toGMTString();
    }
    if (this.options.secure) {
      value += "; secure";
    }
    /** @type {string} */
    this.options.document.cookie = this.key + "=" + value;
    return this;
  },
  /**
   * @return {?}
   */
  read : function() {
    var matches = this.options.document.cookie.match("(?:^|;)\\s*" + this.key.escapeRegExp() + "=([^;]*)");
    return matches ? decodeURIComponent(matches[1]) : null;
  },
  /**
   * @return {?}
   */
  dispose : function() {
    (new Cookie(this.key, $merge(this.options, {
      duration : -1
    }))).write("");
    return this;
  }
});
/**
 * @param {string} key
 * @param {string} data
 * @param {string} options
 * @return {?}
 */
Cookie.write = function(key, data, options) {
  return(new Cookie(key, options)).write(data);
};
/**
 * @param {?} key
 * @return {?}
 */
Cookie.read = function(key) {
  return(new Cookie(key)).read();
};
/**
 * @param {Object} key
 * @param {string} options
 * @return {?}
 */
Cookie.dispose = function(key, options) {
  return(new Cookie(key, options)).dispose();
};
var Swiff = new Class({
  Implements : [Options],
  options : {
    id : null,
    height : 1,
    width : 1,
    container : null,
    properties : {},
    params : {
      quality : "high",
      allowScriptAccess : "always",
      wMode : "transparent",
      swLiveConnect : true
    },
    callBacks : {},
    vars : {}
  },
  /**
   * @return {?}
   */
  toElement : function() {
    return this.object;
  },
  /**
   * @param {?} path
   * @param {Function} options
   * @return {undefined}
   */
  initialize : function(path, options) {
    this.instance = "Swiff_" + $time();
    this.setOptions(options);
    options = this.options;
    var id = this.id = options.id || this.instance;
    var container = $(options.container);
    Swiff.CallBacks[this.instance] = {};
    var params = options.params;
    var vars = options.vars;
    var callBacks = options.callBacks;
    var properties = $extend({
      height : options.height,
      width : options.width
    }, options.properties);
    var self = this;
    var callBack;
    for (callBack in callBacks) {
      Swiff.CallBacks[this.instance][callBack] = function(matcherFunction) {
        return function() {
          return matcherFunction.apply(self.object, arguments);
        };
      }(callBacks[callBack]);
      /** @type {string} */
      vars[callBack] = "Swiff.CallBacks." + this.instance + "." + callBack;
    }
    params.flashVars = Hash.toQueryString(vars);
    if (Browser.Engine.trident) {
      /** @type {string} */
      properties.classid = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
      params.movie = path;
    } else {
      /** @type {string} */
      properties.type = "application/x-shockwave-flash";
      properties.data = path;
    }
    /** @type {string} */
    var build = '<object id="' + id + '"';
    var key;
    for (key in properties) {
      build += " " + key + '="' + properties[key] + '"';
    }
    build += ">";
    var par;
    for (par in params) {
      if (params[par]) {
        build += '<param name="' + par + '" value="' + params[par] + '" />';
      }
    }
    build += "</object>";
    this.object = (container ? container.empty() : new Element("div")).set("html", build).firstChild;
  },
  /**
   * @param {(Node|string)} element
   * @return {?}
   */
  replaces : function(element) {
    element = $(element, true);
    element.parentNode.replaceChild(this.toElement(), element);
    return this;
  },
  /**
   * @param {Object} element
   * @return {?}
   */
  inject : function(element) {
    $(element, true).appendChild(this.toElement());
    return this;
  },
  /**
   * @return {?}
   */
  remote : function() {
    return Swiff.remote.apply(Swiff, [this.toElement()].extend(arguments));
  }
});
Swiff.CallBacks = {};
/**
 * @param {Element} obj
 * @param {string} fn
 * @return {?}
 */
Swiff.remote = function(obj, fn) {
  var afterValue = obj.CallFunction('<invoke name="' + fn + '" returntype="javascript">' + __flash__argumentsToXML(arguments, 2) + "</invoke>");
  return eval(afterValue);
};
var Fx = new Class({
  Implements : [Chain, Events, Options],
  options : {
    fps : 50,
    unit : false,
    duration : 500,
    link : "ignore",
    /**
     * @param {number} pos
     * @return {?}
     */
    transition : function(pos) {
      return-(Math.cos(Math.PI * pos) - 1) / 2;
    }
  },
  /**
   * @param {?} options
   * @return {undefined}
   */
  initialize : function(options) {
    this.subject = this.subject || this;
    this.setOptions(options);
    this.options.duration = Fx.Durations[this.options.duration] || this.options.duration.toInt();
    var wait = this.options.wait;
    if (wait === false) {
      /** @type {string} */
      this.options.link = "cancel";
    }
  },
  /**
   * @return {undefined}
   */
  step : function() {
    var time = $time();
    if (time < this.time + this.options.duration) {
      var delta = this.options.transition((time - this.time) / this.options.duration);
      this.set(this.compute(this.from, this.to, delta));
    } else {
      this.set(this.compute(this.from, this.to, 1));
      this.complete();
    }
  },
  /**
   * @param {string} now
   * @return {?}
   */
  set : function(now) {
    return now;
  },
  /**
   * @param {?} from
   * @param {?} to
   * @param {number} delta
   * @return {?}
   */
  compute : function(from, to, delta) {
    return Fx.compute(from, to, delta);
  },
  /**
   * @param {Function} cb
   * @return {?}
   */
  check : function(cb) {
    if (!this.timer) {
      return true;
    }
    switch(this.options.link) {
      case "cancel":
        this.cancel();
        return true;
      case "chain":
        this.chain(cb.bind(this, Array.slice(arguments, 1)));
        return false;
    }
    return false;
  },
  /**
   * @param {Object} from
   * @param {number} to
   * @return {?}
   */
  start : function(from, to) {
    if (!this.check(arguments.callee, from, to)) {
      return this;
    }
    /** @type {Object} */
    this.from = from;
    /** @type {number} */
    this.to = to;
    /** @type {number} */
    this.time = 0;
    this.startTimer();
    this.onStart();
    return this;
  },
  /**
   * @return {?}
   */
  complete : function() {
    if (this.stopTimer()) {
      this.onComplete();
    }
    return this;
  },
  /**
   * @return {?}
   */
  cancel : function() {
    if (this.stopTimer()) {
      this.onCancel();
    }
    return this;
  },
  /**
   * @return {undefined}
   */
  onStart : function() {
    this.fireEvent("start", this.subject);
  },
  /**
   * @return {undefined}
   */
  onComplete : function() {
    this.fireEvent("complete", this.subject);
    if (!this.callChain()) {
      this.fireEvent("chainComplete", this.subject);
    }
  },
  /**
   * @return {undefined}
   */
  onCancel : function() {
    this.fireEvent("cancel", this.subject).clearChain();
  },
  /**
   * @return {?}
   */
  pause : function() {
    this.stopTimer();
    return this;
  },
  /**
   * @return {?}
   */
  resume : function() {
    this.startTimer();
    return this;
  },
  /**
   * @return {?}
   */
  stopTimer : function() {
    if (!this.timer) {
      return false;
    }
    /** @type {number} */
    this.time = $time() - this.time;
    this.timer = $clear(this.timer);
    return true;
  },
  /**
   * @return {?}
   */
  startTimer : function() {
    if (this.timer) {
      return false;
    }
    /** @type {number} */
    this.time = $time() - this.time;
    this.timer = this.step.periodical(Math.round(1E3 / this.options.fps), this);
    return true;
  }
});
/**
 * @param {number} from
 * @param {?} to
 * @param {number} delta
 * @return {?}
 */
Fx.compute = function(from, to, delta) {
  return(to - from) * delta + from;
};
Fx.Durations = {
  "short" : 250,
  normal : 500,
  "long" : 1E3
};
Fx.CSS = new Class({
  Extends : Fx,
  /**
   * @param {?} element
   * @param {string} property
   * @param {Array} values
   * @return {?}
   */
  prepare : function(element, property, values) {
    values = $splat(values);
    var values1 = values[1];
    if (!$chk(values1)) {
      values[1] = values[0];
      values[0] = element.getStyle(property);
    }
    var parsed = values.map(this.parse);
    return{
      from : parsed[0],
      to : parsed[1]
    };
  },
  /**
   * @param {string} value
   * @return {?}
   */
  parse : function(value) {
    value = $lambda(value)();
    value = typeof value == "string" ? value.split(" ") : $splat(value);
    return value.map(function(val) {
      /** @type {string} */
      val = String(val);
      /** @type {boolean} */
      var found = false;
      Fx.CSS.Parsers.each(function(parser, dataAndEvents) {
        if (found) {
          return;
        }
        var parsed = parser.parse(val);
        if ($chk(parsed)) {
          found = {
            value : parsed,
            /** @type {Function} */
            parser : parser
          };
        }
      });
      found = found || {
        value : val,
        parser : Fx.CSS.Parsers.String
      };
      return found;
    });
  },
  /**
   * @param {Array} from
   * @param {Array} to
   * @param {number} delta
   * @return {?}
   */
  compute : function(from, to, delta) {
    /** @type {Array} */
    var computed = [];
    Math.min(from.length, to.length).times(function(i) {
      computed.push({
        value : from[i].parser.compute(from[i].value, to[i].value, delta),
        parser : from[i].parser
      });
    });
    computed.$family = {
      name : "fx:css:value"
    };
    return computed;
  },
  /**
   * @param {string} value
   * @param {?} unit
   * @return {?}
   */
  serve : function(value, unit) {
    if ($type(value) != "fx:css:value") {
      value = this.parse(value);
    }
    /** @type {Array} */
    var returned = [];
    value.each(function(bit) {
      returned = returned.concat(bit.parser.serve(bit.value, unit));
    });
    return returned;
  },
  /**
   * @param {?} element
   * @param {string} property
   * @param {string} value
   * @param {?} unit
   * @return {undefined}
   */
  render : function(element, property, value, unit) {
    element.setStyle(property, this.serve(value, unit));
  },
  /**
   * @param {string} selector
   * @return {?}
   */
  search : function(selector) {
    if (Fx.CSS.Cache[selector]) {
      return Fx.CSS.Cache[selector];
    }
    var to = {};
    Array.each(document.styleSheets, function(sheet, dataAndEvents) {
      var href = sheet.href;
      if (href && (href.contains("://") && !href.contains(document.domain))) {
        return;
      }
      var which = sheet.rules || sheet.cssRules;
      Array.each(which, function(rule, dataAndEvents) {
        if (!rule.style) {
          return;
        }
        var selectorText = rule.selectorText ? rule.selectorText.replace(/^\w+/, function(m3) {
          return m3.toLowerCase();
        }) : null;
        if (!selectorText || !selectorText.test("^" + selector + "$")) {
          return;
        }
        Element.Styles.each(function(value, style) {
          if (!rule.style[style] || Element.ShortStyles[style]) {
            return;
          }
          /** @type {string} */
          value = String(rule.style[style]);
          to[style] = value.test(/^rgb/) ? value.rgbToHex() : value;
        });
      });
    });
    return Fx.CSS.Cache[selector] = to;
  }
});
Fx.CSS.Cache = {};
Fx.CSS.Parsers = new Hash({
  Color : {
    /**
     * @param {string} value
     * @return {?}
     */
    parse : function(value) {
      if (value.match(/^#[0-9a-f]{3,6}$/i)) {
        return value.hexToRgb(true);
      }
      return(value = value.match(/(\d+),\s*(\d+),\s*(\d+)/)) ? [value[1], value[2], value[3]] : false;
    },
    /**
     * @param {Array} from
     * @param {?} to
     * @param {number} delta
     * @return {?}
     */
    compute : function(from, to, delta) {
      return from.map(function(dataAndEvents, i) {
        return Math.round(Fx.compute(from[i], to[i], delta));
      });
    },
    /**
     * @param {Array} value
     * @return {?}
     */
    serve : function(value) {
      return value.map(Number);
    }
  },
  Number : {
    /** @type {function (*): number} */
    parse : parseFloat,
    /** @type {function (number, ?, number): ?} */
    compute : Fx.compute,
    /**
     * @param {string} value
     * @param {?} unit
     * @return {?}
     */
    serve : function(value, unit) {
      return unit ? value + unit : value;
    }
  },
  String : {
    parse : $lambda(false),
    compute : $arguments(1),
    serve : $arguments(0)
  }
});
Fx.Tween = new Class({
  Extends : Fx.CSS,
  /**
   * @param {?} element
   * @param {?} options
   * @return {undefined}
   */
  initialize : function(element, options) {
    this.element = this.subject = $(element);
    this.parent(options);
  },
  /**
   * @param {string} property
   * @param {string} now
   * @return {?}
   */
  set : function(property, now) {
    if (arguments.length == 1) {
      /** @type {string} */
      now = property;
      property = this.property || this.options.property;
    }
    this.render(this.element, property, now, this.options.unit);
    return this;
  },
  /**
   * @param {Object} property
   * @param {number} from
   * @param {string} to
   * @return {?}
   */
  start : function(property, from, to) {
    if (!this.check(arguments.callee, property, from, to)) {
      return this;
    }
    var args = Array.flatten(arguments);
    this.property = this.options.property || args.shift();
    var parsed = this.prepare(this.element, this.property, args);
    return this.parent(parsed.from, parsed.to);
  }
});
Element.Properties.tween = {
  /**
   * @param {string} options
   * @return {?}
   */
  set : function(options) {
    var tween = this.retrieve("tween");
    if (tween) {
      tween.cancel();
    }
    return this.eliminate("tween").store("tween:options", $extend({
      link : "cancel"
    }, options));
  },
  /**
   * @param {string} options
   * @return {?}
   */
  get : function(options) {
    if (options || !this.retrieve("tween")) {
      if (options || !this.retrieve("tween:options")) {
        this.set("tween", options);
      }
      this.store("tween", new Fx.Tween(this, this.retrieve("tween:options")));
    }
    return this.retrieve("tween");
  }
};
Element.implement({
  /**
   * @param {?} endValues
   * @param {?} property
   * @param {?} from
   * @return {?}
   */
  tween : function(endValues, property, from) {
    this.get("tween").start(arguments);
    return this;
  },
  /**
   * @param {?} how
   * @return {?}
   */
  fade : function(how) {
    var fade = this.get("tween");
    /** @type {string} */
    var o = "opacity";
    var A;
    how = $pick(how, "toggle");
    switch(how) {
      case "in":
        fade.start(o, 1);
        break;
      case "out":
        fade.start(o, 0);
        break;
      case "show":
        fade.set(o, 1);
        break;
      case "hide":
        fade.set(o, 0);
        break;
      case "toggle":
        var flag = this.retrieve("fade:flag", this.get("opacity") == 1);
        fade.start(o, flag ? 0 : 1);
        this.store("fade:flag", !flag);
        /** @type {boolean} */
        A = true;
        break;
      default:
        fade.start(o, arguments);
    }
    if (!A) {
      this.eliminate("fade:flag");
    }
    return this;
  },
  /**
   * @param {string} start
   * @param {string} end
   * @return {?}
   */
  highlight : function(start, end) {
    if (!end) {
      end = this.retrieve("highlight:original", this.getStyle("background-color"));
      end = end == "transparent" ? "#fff" : end;
    }
    var tween = this.get("tween");
    tween.start("background-color", start || "#ffff88", end).chain(function() {
      this.setStyle("background-color", this.retrieve("highlight:original"));
      tween.callChain();
    }.bind(this));
    return this;
  }
});
Fx.Morph = new Class({
  Extends : Fx.CSS,
  /**
   * @param {?} element
   * @param {?} options
   * @return {undefined}
   */
  initialize : function(element, options) {
    this.element = this.subject = $(element);
    this.parent(options);
  },
  /**
   * @param {string} now
   * @return {?}
   */
  set : function(now) {
    if (typeof now == "string") {
      now = this.search(now);
    }
    var p;
    for (p in now) {
      this.render(this.element, p, now[p], this.options.unit);
    }
    return this;
  },
  /**
   * @param {Object} from
   * @param {?} to
   * @param {number} delta
   * @return {?}
   */
  compute : function(from, to, delta) {
    var now = {};
    var p;
    for (p in from) {
      now[p] = this.parent(from[p], to[p], delta);
    }
    return now;
  },
  /**
   * @param {Object} properties
   * @return {?}
   */
  start : function(properties) {
    if (!this.check(arguments.callee, properties)) {
      return this;
    }
    if (typeof properties == "string") {
      properties = this.search(properties);
    }
    var from = {};
    var to = {};
    var p;
    for (p in properties) {
      var parsed = this.prepare(this.element, p, properties[p]);
      from[p] = parsed.from;
      to[p] = parsed.to;
    }
    return this.parent(from, to);
  }
});
Element.Properties.morph = {
  /**
   * @param {string} options
   * @return {?}
   */
  set : function(options) {
    var morph = this.retrieve("morph");
    if (morph) {
      morph.cancel();
    }
    return this.eliminate("morph").store("morph:options", $extend({
      link : "cancel"
    }, options));
  },
  /**
   * @param {string} options
   * @return {?}
   */
  get : function(options) {
    if (options || !this.retrieve("morph")) {
      if (options || !this.retrieve("morph:options")) {
        this.set("morph", options);
      }
      this.store("morph", new Fx.Morph(this, this.retrieve("morph:options")));
    }
    return this.retrieve("morph");
  }
};
Element.implement({
  /**
   * @param {Object} props
   * @return {?}
   */
  morph : function(props) {
    this.get("morph").start(props);
    return this;
  }
});
(function() {
  /** @type {function (?): undefined} */
  var qualifier = Fx.prototype.initialize;
  /**
   * @param {?} i
   * @return {undefined}
   */
  Fx.prototype.initialize = function(i) {
    qualifier.call(this, i);
    var m = this.options.transition;
    if (typeof m == "string" && (m = m.split(":"))) {
      var tags = Fx.Transitions;
      tags = tags[m[0]] || tags[m[0].capitalize()];
      if (m[1]) {
        tags = tags["ease" + m[1].capitalize() + (m[2] ? m[2].capitalize() : "")];
      }
      this.options.transition = tags;
    }
  };
})();
/**
 * @param {Object} transition
 * @param {?} params
 * @return {?}
 */
Fx.Transition = function(transition, params) {
  params = $splat(params);
  return $extend(transition, {
    /**
     * @param {?} pos
     * @return {?}
     */
    easeIn : function(pos) {
      return transition(pos, params);
    },
    /**
     * @param {number} pos
     * @return {?}
     */
    easeOut : function(pos) {
      return 1 - transition(1 - pos, params);
    },
    /**
     * @param {number} pos
     * @return {?}
     */
    easeInOut : function(pos) {
      return pos <= 0.5 ? transition(2 * pos, params) / 2 : (2 - transition(2 * (1 - pos), params)) / 2;
    }
  });
};
Fx.Transitions = new Hash({
  linear : $arguments(0)
});
/**
 * @param {Object} transitions
 * @return {undefined}
 */
Fx.Transitions.extend = function(transitions) {
  var transition;
  for (transition in transitions) {
    Fx.Transitions[transition] = new Fx.Transition(transitions[transition]);
  }
};
Fx.Transitions.extend({
  /**
   * @param {?} p
   * @param {Array} x
   * @return {?}
   */
  Pow : function(p, x) {
    return Math.pow(p, x[0] || 6);
  },
  /**
   * @param {number} p
   * @return {?}
   */
  Expo : function(p) {
    return Math.pow(2, 8 * (p - 1));
  },
  /**
   * @param {?} p
   * @return {?}
   */
  Circ : function(p) {
    return 1 - Math.sin(Math.acos(p));
  },
  /**
   * @param {number} p
   * @return {?}
   */
  Sine : function(p) {
    return 1 - Math.sin((1 - p) * Math.PI / 2);
  },
  /**
   * @param {?} p
   * @param {number} x
   * @return {?}
   */
  Back : function(p, x) {
    x = x[0] || 1.618;
    return Math.pow(p, 2) * ((x + 1) * p - x);
  },
  /**
   * @param {number} p
   * @return {?}
   */
  Bounce : function(p) {
    var value;
    /** @type {number} */
    var a = 0;
    /** @type {number} */
    var b = 1;
    for (;1;a += b, b /= 2) {
      if (p >= (7 - 4 * a) / 11) {
        /** @type {number} */
        value = -Math.pow((11 - 6 * a - 11 * p) / 4, 2) + b * b;
        break;
      }
    }
    return value;
  },
  /**
   * @param {number} p
   * @param {Array} x
   * @return {?}
   */
  Elastic : function(p, x) {
    return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x[0] || 1) / 3);
  }
});
["Quad", "Cubic", "Quart", "Quint"].each(function(transition, dataAndEvents) {
  Fx.Transitions[transition] = new Fx.Transition(function(pos) {
    return Math.pow(pos, [dataAndEvents + 2]);
  });
});
var Request = new Class({
  Implements : [Chain, Events, Options],
  options : {
    url : "",
    data : "",
    headers : {
      "X-Requested-With" : "XMLHttpRequest",
      Accept : "text/javascript, text/html, application/xml, text/xml, */*"
    },
    async : true,
    format : false,
    method : "post",
    link : "ignore",
    isSuccess : null,
    emulation : true,
    urlEncoded : true,
    encoding : "utf-8",
    evalScripts : false,
    evalResponse : false
  },
  /**
   * @param {?} options
   * @return {undefined}
   */
  initialize : function(options) {
    this.xhr = new Browser.Request;
    this.setOptions(options);
    this.options.isSuccess = this.options.isSuccess || this.isSuccess;
    this.headers = new Hash(this.options.headers);
  },
  /**
   * @return {undefined}
   */
  onStateChange : function() {
    if (this.xhr.readyState != 4 || !this.running) {
      return;
    }
    /** @type {boolean} */
    this.running = false;
    /** @type {number} */
    this.status = 0;
    $try(function() {
      this.status = this.xhr.status;
    }.bind(this));
    if (this.options.isSuccess.call(this, this.status)) {
      this.response = {
        text : this.xhr.responseText,
        xml : this.xhr.responseXML
      };
      this.success(this.response.text, this.response.xml);
    } else {
      this.response = {
        text : null,
        xml : null
      };
      this.failure();
    }
    /** @type {function (): undefined} */
    this.xhr.onreadystatechange = $empty;
  },
  /**
   * @return {?}
   */
  isSuccess : function() {
    return this.status >= 200 && this.status < 300;
  },
  /**
   * @param {string} text
   * @return {?}
   */
  processScripts : function(text) {
    if (this.options.evalResponse || /(ecma|java)script/.test(this.getHeader("Content-type"))) {
      return $exec(text);
    }
    return text.stripScripts(this.options.evalScripts);
  },
  /**
   * @param {string} text
   * @param {?} xml
   * @return {undefined}
   */
  success : function(text, xml) {
    this.onSuccess(this.processScripts(text), xml);
  },
  /**
   * @return {undefined}
   */
  onSuccess : function() {
    this.fireEvent("complete", arguments).fireEvent("success", arguments).callChain();
  },
  /**
   * @return {undefined}
   */
  failure : function() {
    this.onFailure();
  },
  /**
   * @return {undefined}
   */
  onFailure : function() {
    this.fireEvent("complete").fireEvent("failure", this.xhr);
  },
  /**
   * @param {string} name
   * @param {string} value
   * @return {?}
   */
  setHeader : function(name, value) {
    this.headers.set(name, value);
    return this;
  },
  /**
   * @param {string} name
   * @return {?}
   */
  getHeader : function(name) {
    return $try(function() {
      return this.xhr.getResponseHeader(name);
    }.bind(this));
  },
  /**
   * @param {Function} cb
   * @return {?}
   */
  check : function(cb) {
    if (!this.running) {
      return true;
    }
    switch(this.options.link) {
      case "cancel":
        this.cancel();
        return true;
      case "chain":
        this.chain(cb.bind(this, Array.slice(arguments, 1)));
        return false;
    }
    return false;
  },
  /**
   * @param {Object} options
   * @return {?}
   */
  send : function(options) {
    if (!this.check(arguments.callee, options)) {
      return this;
    }
    /** @type {boolean} */
    this.running = true;
    var type = $type(options);
    if (type == "string" || type == "element") {
      options = {
        data : options
      };
    }
    var old = this.options;
    options = $extend({
      data : old.data,
      url : old.url,
      method : old.method
    }, options);
    var data = options.data;
    var url = options.url;
    var method = options.method;
    switch($type(data)) {
      case "element":
        data = $(data).toQueryString();
        break;
      case "object":
      ;
      case "hash":
        data = Hash.toQueryString(data);
    }
    if (this.options.format) {
      /** @type {string} */
      var format = "format=" + this.options.format;
      /** @type {string} */
      data = data ? format + "&" + data : format;
    }
    if (this.options.emulation && ["put", "delete"].contains(method)) {
      /** @type {string} */
      var _method = "_method=" + method;
      /** @type {string} */
      data = data ? _method + "&" + data : _method;
      /** @type {string} */
      method = "post";
    }
    if (this.options.urlEncoded && method == "post") {
      /** @type {string} */
      var encoding = this.options.encoding ? "; charset=" + this.options.encoding : "";
      this.headers.set("Content-type", "application/x-www-form-urlencoded" + encoding);
    }
    if (data && method == "get") {
      /** @type {string} */
      url = url + (url.contains("?") ? "&" : "?") + data;
      /** @type {null} */
      data = null;
    }
    this.xhr.open(method.toUpperCase(), url, this.options.async);
    this.xhr.onreadystatechange = this.onStateChange.bind(this);
    this.headers.each(function(value, key) {
      if (!$try(function() {
        this.xhr.setRequestHeader(key, value);
        return true;
      }.bind(this))) {
        this.fireEvent("exception", [key, value]);
      }
    }, this);
    this.fireEvent("request");
    this.xhr.send(data);
    if (!this.options.async) {
      this.onStateChange();
    }
    return this;
  },
  /**
   * @return {?}
   */
  cancel : function() {
    if (!this.running) {
      return this;
    }
    /** @type {boolean} */
    this.running = false;
    this.xhr.abort();
    /** @type {function (): undefined} */
    this.xhr.onreadystatechange = $empty;
    this.xhr = new Browser.Request;
    this.fireEvent("cancel");
    return this;
  }
});
(function() {
  var attributes = {};
  ["get", "post", "put", "delete", "GET", "POST", "PUT", "DELETE"].each(function($1) {
    /**
     * @return {?}
     */
    attributes[$1] = function() {
      var params = Array.link(arguments, {
        url : String.type,
        /** @type {function (Object): ?} */
        data : $defined
      });
      return this.send($extend(params, {
        method : $1.toLowerCase()
      }));
    };
  });
  Request.implement(attributes);
})();
Element.Properties.send = {
  /**
   * @param {string} options
   * @return {?}
   */
  set : function(options) {
    var send = this.retrieve("send");
    if (send) {
      send.cancel();
    }
    return this.eliminate("send").store("send:options", $extend({
      data : this,
      link : "cancel",
      method : this.get("method") || "post",
      url : this.get("action")
    }, options));
  },
  /**
   * @param {string} options
   * @return {?}
   */
  get : function(options) {
    if (options || !this.retrieve("send")) {
      if (options || !this.retrieve("send:options")) {
        this.set("send", options);
      }
      this.store("send", new Request(this.retrieve("send:options")));
    }
    return this.retrieve("send");
  }
};
Element.implement({
  /**
   * @param {Object} url
   * @return {?}
   */
  send : function(url) {
    var sender = this.get("send");
    sender.send({
      data : this,
      url : url || sender.options.url
    });
    return this;
  }
});
Request.HTML = new Class({
  Extends : Request,
  options : {
    update : false,
    evalScripts : true,
    filter : false
  },
  /**
   * @param {string} text
   * @return {?}
   */
  processHTML : function(text) {
    var match = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    text = match ? match[1] : text;
    /** @type {Element} */
    var container = new Element("div");
    return $try(function() {
      /** @type {string} */
      var root = "<root>" + text + "</root>";
      var doc;
      if (Browser.Engine.trident) {
        doc = new ActiveXObject("Microsoft.XMLDOM");
        /** @type {boolean} */
        doc.async = false;
        doc.loadXML(root);
      } else {
        /** @type {(Document|null)} */
        doc = (new DOMParser).parseFromString(root, "text/xml");
      }
      root = doc.getElementsByTagName("root")[0];
      /** @type {number} */
      var i = 0;
      var valuesLen = root.childNodes.length;
      for (;i < valuesLen;i++) {
        var child = Element.clone(root.childNodes[i], true, true);
        if (child) {
          container.grab(child);
        }
      }
      return container;
    }) || container.set("html", text);
  },
  /**
   * @param {?} text
   * @return {undefined}
   */
  success : function(text) {
    var options = this.options;
    var response = this.response;
    response.html = text.stripScripts(function(script) {
      response.javascript = script;
    });
    var temp = this.processHTML(response.html);
    response.tree = temp.childNodes;
    response.elements = temp.getElements("*");
    if (options.filter) {
      response.tree = response.elements.filter(options.filter);
    }
    if (options.update) {
      $(options.update).empty().adopt(response.tree);
    }
    if (options.evalScripts) {
      $exec(response.javascript);
    }
    this.onSuccess(response.tree, response.elements, response.html, response.javascript);
  }
});
Element.Properties.load = {
  /**
   * @param {string} options
   * @return {?}
   */
  set : function(options) {
    var load = this.retrieve("load");
    if (load) {
      send.cancel();
    }
    return this.eliminate("load").store("load:options", $extend({
      data : this,
      link : "cancel",
      update : this,
      method : "get"
    }, options));
  },
  /**
   * @param {string} options
   * @return {?}
   */
  get : function(options) {
    if (options || !this.retrieve("load")) {
      if (options || !this.retrieve("load:options")) {
        this.set("load", options);
      }
      this.store("load", new Request.HTML(this.retrieve("load:options")));
    }
    return this.retrieve("load");
  }
};
Element.implement({
  /**
   * @return {?}
   */
  load : function() {
    this.get("load").send(Array.link(arguments, {
      data : Object.type,
      url : String.type
    }));
    return this;
  }
});
Request.JSON = new Class({
  Extends : Request,
  options : {
    secure : true
  },
  /**
   * @param {?} options
   * @return {undefined}
   */
  initialize : function(options) {
    this.parent(options);
    this.headers.extend({
      Accept : "application/json",
      "X-Request" : "JSON"
    });
  },
  /**
   * @param {string} text
   * @return {undefined}
   */
  success : function(text) {
    this.response.json = JSON.decode(text, this.options.secure);
    this.onSuccess(this.response.json, text);
  }
});
