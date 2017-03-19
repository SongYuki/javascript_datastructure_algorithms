/**
 * Created by sunyx on 2017/3/19.
 *
 * 函数实际上也是一种数据，可以把一个函数赋值给一个变量
 *
 * Js中函数也是一种数据，只不过这种特殊的数据类型有两个重要的特性
 * 1.它们包含的是代码
 * 2.它们是可执行（调用）的
 *
 * 函数可以像其他数据那样被定义删除拷贝以及当成参数传递给其他函数
 */

var f = function () {
    return 1;
};

//function literal notation 函数标识记法

//named function expression 命名函数表达式

var f = function myFunc() {
    return 1;
};

var sum = function (a,b) {
    return a+b;
};

var add = sum;
typeof  add;

add(1,2);

function invokeAdd(a,b) {
    return a()+b();
}

function one() {
    return 1;
}

function two() {
    return 2;
}

invokeAdd(one,two);

invokeAdd(function () {return 1;},function () {return 2;});

invokeAdd(
    function () {
        return 1;
    },
    function () {
        return 2;
    }
);

/*
 当把函数a传递给函数b,并且由b来执行a时，a就成了一个回调函数callback functions
 如果这时a还是一个无名函数称为匿名回调函数
 */

function multiplyByTwo(a,b,c) {
    var i,ar = [];
    for(i=0;i<3;i++){
        ar[i] = arguments[i]*2;
    }
    return ar;
}

function addOne(a) {
    return a+1;
}

multiplyByTwo(1,2,3);
addOne(100);

function multiplyByTwo(a,b,c,callback) {
    var i,ar = [];
    for(i=0;i<3;i++){
        ar[i] = callback(arguments[i]*2);
    }
    return ar;
}

var myarr = [];
myarr = multiplyByTwo(1,2,3,addOne);

//可以使用匿名函数代替addOne()这样可以节省一个额外的全局变量
multiplyByTwo(1,2,3,function (a) {
    return a+1;
});

//使用匿名函数也更易于随时根据需求调整代码
multiplyByTwo(1,2,3,function (a) {
    return a+2;
});

//即时函数--在定义之后可以立即调用
(
    function () {
        alert('boo');
    }
)();

/**
 * 只需将匿名函数的定义放在一对括号中，外面再紧跟一对括号即可
 * 第二对括号起到的是立即调用的作用
 * 同时也是向匿名函数传递参数的地方
 */

(
    function (name) {
        alert('Hello '+name+'!');
    }
)('dude');

//也可以将第一对括号闭合于第二对括号之后，两种做法都有效
(
    function () {

    }());

(function () {

})();

/**
 * 使用即时（自调）匿名函数的好处是不会产生任何全局变量。
 * 缺点在于这样的函数是无法重复执行的（除非你将它放在某个循环或其他函数中）
 * 使得即时函数非常适合于执行一些一次性的或初始化的任务
 */

var result = (function () {
    var i = 100,
        string = 'bucks';
    return string;
    return i;
}());

var result = function () {
    var i = 100,
        string = 'bucks';
    return string;
    return i;
}();//不到最后你就不知道result是一个函数还是一个即时函数的返回值

result;

//内部私有函数，函数与其他类型的值本质上是一样的，在一个函数内部定义另一个函数
function outer(param) {
    function inner(theinput) {
        return theinput*2;
    }
    return 'The result is'+inner(param);
}

var outer = function (param) {
    var inner = function (theinput) {
        return theinput*2;
    };
    return 'The result is'+inner(param);
};

outer(2);

outer(8);

inner(2);

/**
 * 返回函数的函数
 * 函数始终会有一个返回值即便不是显式返回也会隐式返回一个undefined
 * 既然函数能返回一个唯一值，那么这个值就有可能是另一个函数
 */

function a() {
    alert('A!');
    return function () {
        alert('B!');
    };
}

var newFunc = a();
newFunc();

a()();

/**
 * 能重写自己的函数
 * 由于一个函数可以返回另一个函数，可以用新的函数覆盖旧的
 * 可以通过上面a()的返回值来重写a()函数自己
 * a = a();
 */

function a() {
    alert('A!');
    a = function () {
        alert('B!');
    };
}

var a = (function () {
    function someSetup() {
        var setup = 'done';
    }
    function actualWork() {
        alert('Worky-worky');
    }

    someSetup();
    return actualWork;
}());

var a = (function () {
    function someSetup() {
        var setup = 'done';
        alert(setup);
    }
    function actualWork() {
        alert('Worky-worky');
    }

    someSetup();
    return actualWork();
}());

