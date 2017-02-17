/**
 * Created by sunyx on 2016/10/31.
 *
 *所有非本地对象都是宿主对象(host object)
 * 即由ECMAScript实现的宿主环境提供的对象
 * 所有BOM和DOM都是宿主对象
 *
 * 作用域：某些变量的适用范围
 * ECMAScript中只存在一种作用域——公用作用域
 */
 obj._color_ = "red";
/** 这段代码中属性color是私有的，这些下划线并不改变这些属性是公用属性的事实
 * 它只是告诉其他开发者，应该把该属性看作私有的
 *
 * 静态作用域定义的属性和方法任何时候都能从同一个位置访问
 * 严格说来，ECMAScript并没有静态作用域
 * 它可以给构造函数提供属性和方法
 * 构造函数只是函数，函数是对象，对象可以有属性和方法
 */
 function sayHi(){
   alert("hi");
 }

 sayHi.alternate = function () {
     alert("hola");
 };

sayHi();
sayHi.alternate();  //alternate()也是sayHi()公用作用域中的方法，而不是静态方法

/**
 * 关键字this总是指向调用该方法的对象
 */
var oCar = new Object;
oCar.color = "red";
oCar.showColor = function () {
    alert(this.color);
};

var oCars = new Object;
oCars.color = "red";
//noinspection JSAnnotator
oCars.showColor = function () {
    alert(oCars.color);
}; //这个属性实际上是指向函数的指针，意味着该属性是个方法

/**
 * 在实例化对象时，总是不能恶恶顶开发者会使用什么样的变量名
 * 使用this 即可在任意多个地方重用同一函数
 */

function showColor(){
    alert(this.color);
}

var oCar1 = new Object;
oCar1.color = "red";
oCar1.showColor = showColor;

var oCar2 = new Object;
oCar2.color = "blue";
oCar2.showColor = showColor;

oCar1.showColor();
oCar2.showColor();

/**
 * 定义类或对象
 * 1.工厂方式
 */
function showColor(){
    alert(this.color);
}

function createCar(sColor,iDoors,iMpg) {
    var oTempCar = new Object;
    oTempCar.color = sColor;
    oTempCar.doors = iDoors;
    oTempCar.mpg = iMpg;
    oTempCar.showColor = showColor;
    return oTempCar;
}

var oCar1 = createCar("red",4,23);
var oCar2 = createCar("blue",3,25);
oCar1.showColor();
oCar2.showColor();


