/**
 * Created by sunyx on 2017/3/19.
 *
 * 声明一个变量时没有使用var语句，该变量就会被默认为全局变量
 *
 * 单一var模式，仅在函数体内的第一行使用一个var 来定义这个作用域中所有需要的变量
 *
 * hoisting提升：当javascript执行过程进入新函数时，这个函数内被声明的所有变量都会被移动（提升）到函数最开始的地方
 * 被提升的只有变量的声明，而与之相关的赋值操作并不会被提升，它还在其原来的位置上
 */
var a = 123;

function f0() {
    alert(a);
    var a = 1;
    alert(a);
}

f();

function f1() {
    var a;//same as:var a = undefined
    alert(a);//undefined
    a = 1;
    alert(a);//1
}