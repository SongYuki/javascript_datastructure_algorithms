# You Don't Know JS

标签（空格分隔）： 

---

由于JavaScript不必理解就可以使用，因此通常来说很难真正理解语言本身，这就是我们面临的挑战。

## Part 1 作用域和闭包 ##
## chapter 1 作用域是什么 ##
在传统编译语言的流程中，程序中的一段源代码在执行之前会经历三个步骤，统称为“编译”

 - tokenizing/lexing
   分词tokenizing和词法分析lexing之间的区别是非常微妙，晦涩的，主要差异在于词法单元的识别是通过**有状态**还是**无状态**的方式进行的。
 - parsing
   这个过程是将词法单元流（数组）转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树。这个树称为抽象语法树（Abstract Syntax Tree,**AST**）
 - generator
   将AST转换为可执行代码的过程称为代码生成。这个过程与语言，目标平台等息息相关。

```JavaScript
    function foo(a){
        console.log(a);//2
    }
    foo(2);
```

**异常**

ReferenceError同作用域判别失败相关，而TypeError则代表作用域判别成功了，但是对结果的操作是非法或不合理的。

**eval()**
在严格模式的程序中，eval(...)在运行时有其自己的词法作用域，意味着其中的声明无法修改所在的作用域。
```javascript
    function foo(str){
        "use strict";
        eval(str);
        console.log(a);//ReferenceError: a is not defined
    }
    foo("var a=2");
```
    
**with**
with通常被当作重复引用同一个对象中的多个属性的快捷方式，可以不需要重复引用对象本身。
这不仅仅是为了方便地访问对象属性：
```javascript
    function foo(obj){
        with(obj){
            a=2;
        }
    }
    /*foo()函数接受一个obj参数，该参数是一个对象引用，并对这个对象引用执行了with(obj){}*/
    var o1={
        a:3
    };
    var o2={
        b:3
    };
    foo(o1);
    console.log(o1.a);//2
    foo(o2);
    console.log(o2.a);//undefined
    console.log(a);//2,a被泄漏到全局作用域上了
```
 **with可以将一个没有或有多个属性的对象处理为一个完全隔离的词法作用域，因此这个对象的属性也会被定义为在这个作用域中的词法标识符。**也就是说尽管with块可以将一个对象处理为词法作用域，但是这个块内部正常的var声明并不会被限制在这个块的作用域中，而是被添加到with所处的函数作用域中。
 
 eval()和with，这两个机制的副作用是引擎无法在编译时对作用域查找进行优化，因为引擎只能谨慎地认为这样的优化是无效的。使用这其中任何一个机制都将导致代码运行变慢。**不要使用它们**
 
 ## chapter 3 函数作用域和块作用域 ##
 **全局命名空间**
 **模块管理**
 
 **函数作用域**
 函数不需要函数名（至少函数名可以不污染所在作用域），并且能够自动运行。
```javascript
     var a =2;
     (function foo(){
        var a=3;
        console.log(a);//3
    })();//函数表达式
    console.log(a);//2
```
函数声明和函数表达式之间最重要的区别是它们的名称标识符将会绑定在何处。

（function foo(){..}）作为函数表达式意味着foo只能在..所代表的位置中被访问，外部作用域则不行。foo变量名被隐藏在自身中意味着不会非必要地污染外部作用域。

**匿名和具名**
```javacript
    setTimeout(function(){
        console.log("I waited 1 second!");},1000)//匿名函数表达式，函数表达式可以匿名，函数声明则不可以省略函数名
```
匿名函数表达式的几个缺点：

 - 匿名函数在栈追踪中不会显示出有意义的函数名，使得调试很困难
 - 如果没有函数名，当函数需要引用自身时只能使用已经过期的arguments.callee引用，比如在递归中。另一个函数需要引用自身的例子，是在事件触发后事件监听器需要解绑自身。
 - 匿名函数省略了对于代码可读性/可理解性很重要的函数名。一个描述性的名称可以让代码不言自明。
 

```JavaScript
    setTimeout(function timeoutHandler(){
        console.log("I waited 1 second!");},1000);
        //行内函数表达式非常强大且有用——匿名和具名之间的区别并不会对这点有任何影响
```

IIFE（Immediately Invoked Function Expression）立即执行函数表达式
```javascript
    var a=2;
    (function IIFE(){
        var a=3;
        console.log(a);//3
    })();
    console.log(a);//2
```

**IIFE另一个非常普遍的进阶用法是把它们当作函数调用并传递参数进去**
```javascript
    var a=2;
    (function IIFE(global){
        var a=3;
        console.log(a);//3
        console.log(global.a);//2})(window);
        //将window对象的引用传递进去，但将参数命名为global，因此在代码风格上对全局对象的引用变得比引用一个没有“全局”字样的变量更加清晰
        console.log(a);//2
```

**解决undefined标识符的默认值被错误覆盖导致的异常**。将一个参数命名为undefined，但是在对应的位置不传入任何值，这样就可以保证在代码块中undefined标识符的值真的是undefined:
```javascript
    undefined=true;//给其他代码挖了一个大坑，绝对不要这样做
    (function IIFE(undefined){
        var a;
        if(a===undefined){
            console.log("Undefined is safe here!");
        }})();
```

**IIFE还有一种变化的用途是倒置代码的运行顺序，将需要运行的函数放在第二位，在IIFE执行之后当作参数传递进去。**这种模式在UMD（Universal Module Definition）项目中被广泛使用。
```javascript
    var a=2;
    (function IIFE(def){
        def(window);
    })(function def(global){
        var a=3;
        console.log(a);//3
        console.log(global.a);//2});
```



    
    
 
 

    


