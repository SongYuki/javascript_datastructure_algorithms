/**
 * Created by sunyx on 2016/11/2.
 *
 * Document Object Model 是个由JavaScript节点对象组成的层次结构/树
 *
 * HTML文档被浏览器解析并转换为一个由节点对象组成以体现当前文档的树状结构
 * DOM的目的是使用JavaScript操作（删除，添加，替换，创建事件及修改）为当前文档提供一个编程接口
 * */

console.log(Node.ELEMENT_NODE)//输出1=元素节点的数值代号值，只是个数值分类，用于描述从特定Javascript接口/构造函数构造出的特定节点的类型

for(var key in Node){
    console.log(key,'='+Node[key]);
}

/*
ELEMENT_NODE = 1
ATTRIBUTE_NODE = 2 属性节点类似元素节点，但不参与实际的DOM树结构，ATTRIBUTE_NODE不在DOM4中使用
TEXT_NODE = 3
CDATA_SECTION_NODE = 4
ENTITY_REFERENCE_NODE = 5
ENTITY_NODE = 6
PROCESSING_INSTRUCTION_NODE = 7
COMMENT_NODE = 8 注释
DOCUMENT_NODE = 9
DOCUMENT_TYPE_NODE = 10
DOCUMENT_FRAGMENT_NODE = 11
NOTATION_NODE = 12
DOCUMENT_POSITION_DISCONNECTED = 1
DOCUMENT_POSITION_PRECEDING = 2
DOCUMENT_POSITION_FOLLOWING = 4
DOCUMENT_POSITION_CONTAINS = 8
DOCUMENT_POSITION_CONTAINED_BY = 16
DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32
 */

/**
 * 最常见的节点接口在浏览器中的实现模型
 * Object < Node < Element < HTMLElement < HTML*Element
 * Object < Node < Attr(DOM4 ABANDON)
 * Object < Node < CharacterData < Text
 * Object < Node < Document < HTMLDocument
 * Object < Node < DocumentFragment
 * 继承链
 * Node只是一个JavaScript构造函数，因此在逻辑上，Node与所有JavaScript里的对象一样，从Object.prototype继承
 *
 * 所有的节点都从它们的构造函数和原型链上继承了一套属性与方法，这些属性和方法都是用于操作，查看，以及遍历DOM的基础值与函数
 *
 * 因为JavaScript可变且动态的天性，给DOM添加自定义的方法与属性是可行的
 * 但扩展原生对象会带来一些问题，所以这么做或许不是个好主意
 */

//获取一个元素节点对象
var nodeAnchor = document.querySelector('a');
//创建用于储存元素节点对象属性名的属性数组
var props = [];

//遍历元素节点对象，获取所有的属性和方法名（包括继承的）
for (var key in nodeAnchor){
    props.push(key);
}

//按字母顺序输出属性和方法名列表
console.log(props.sort());

/**
 * 节点对象的nodeType与nodeName返回值
 * 直接记住这些更常见节点的数值代号是有道理的，毕竟我们只需要处理5个数值代号
 */

console.log(
    document.doctype,
    document.doctype.nodeName,
    document.doctype.nodeType
);

console.log(
    document.nodeName,
    document.nodeType
);

console.log(
    document.createDocumentFragment().nodeName,
    document.createDocumentFragment().nodeType
)

console.log(
    document.querySelector('a').nodeName,
    document.querySelector('a').nodeType
);

console.log(
    document.querySelector('a').firstChild.nodeName,
    document.querySelector('a').firstChild.nodeType
);

console.log(document.querySelector('a').nodeType===1);

console.log(document.querySelector('a').nodeType===Node.ELEMENT_NODE);

console.log(document.doctype.nodeValue);
console.log(document.nodeValue);
console.log(document.createDocumentFragment().nodeValue);
console.log(document.querySelector('a').nodeValue);//输出null

console.log(document.querySelector('a').firstChild.nodeValue);//输出hi(text_content)

/**
 * Text或者Comment节点值可以通过赋给nodeValue属性新的字符串来设定
 * document.body.firstElementChild.nodeValue = 'hi'
 */


var elementNode = document.createElement('div');
console.log(elementNode,elementNode.nodeType);//输出<div>1 元素节点

var textNode = document.createTextNode('Hi');
console.log(textNode,textNode.nodeType);//输出Text{}3 文本节点

//<div id="A"></div> 创建一个strong元素与文本节点，并添加到DOM
document.getElementById('A').innerHTML = '<strong>Hi</strong>';

//创建一个div元素与文本节点来替换<span id="B"></div>  注意span#B被替换掉了
document.getElementById('B').outerHTML = ''+'<div id="B" class="new">Whats Shaking</div>';

//<div id="C"></div> 创建一个文本节点并用它更新div#C
document.getElementById('C').textContent = 'dude';

//<div id="D"></div> 创建一个文本节点并用它更新div#D
document.getElementById('D').innerText = 'Keep it';

//<div id="E"></div> 创建一个文本节点并用它更新div#E  注意div#E没了
document.getElementById('E').outerText = 'real!';

console.log(document.body.innerHTML);
/**
 * output:
 * <div id="A"><strong>Hi</strong></div>
 * <div id="B" class="new">Whats Shaking</div>
 * <span id="C">dude</span>
 * <div id="D">Keep it</div>
 * real!
 */

//<i id="elm">最近</i>

var elm = document.getElementById('elm');

elm.insertAdjacentHTML('beforebegin','<span>你好-</span>');
elm.insertAdjacentHTML('afterbegin','<span>年轻人-</span>');
elm.insertAdjacentHTML('beforeend','<span>-怎么</span>');
elm.insertAdjacentHTML('afterend','<span>-样？</span>');

console.log(document.body.innerHTML);
/**
 * output:
 * <span>你好-</span><i id="A"><span>年轻人-</span><span>-怎么</span></i><span>-样?</span>
 *
 * innerHTML属性会将字符串中找到的HTML元素都转换成实际的DOM节点，而textContent只能用来构造文本节点
 *
 * document.write()也可以用来同步创建，添加节点到DOM
 * .write()方法会在页面加载，解析时就将传给它的值输出到页面上，会阻塞正被加载的HTML文档的解析
 *
 * innerHTML调用了一个沉重且高消耗的HTML解析器，而文本节点生成几乎不足为虑，因此，省着点用innerHTML和它的小伙伴们
 *
 * innertext能意识到央视，不会返回隐藏元素的文本内容，而textcontent则会返回
 */








