/**
 * Created by sunyx on 16-10-28.
 *
 * 1.在有clang和llvm的compiler-rt程序库的环境下支持
 * 备注:clang是一个C/C++/Objective-C/Objective-C++程序语言的编译器前端，采用了底层虚拟机llvm作为其后端
 * 作为llvm编译器工具集的前端(front-end)目的是输出代码对应的抽象语法树(abstract syntax tree)并将代码编译成llvm Bitcode
 * 接着在后端使用llvm编译成平台相关的机器语言
 * 在clang语言中，使用Stmt来代表statement clang代码的单元(unit)皆为语句(statement)语法树的节点(node)类型就是Stmt
 * 另外Clang的表达式(expression)也是语句的一种，clang使用expr来代表expression,expr本身继承自stmt
 * 节点之下有子节点列表(sub-node-list)
 *
 * Question:为什么做语法树需要设计一门新的语言？新的语言能够简化语法树的表达么
 * clang本身性能优异，其生成的ast所耗用掉的内存仅仅是gcc的20%左右
 *
 * clang可以编译自身，能够自举，能够把自己拆分成抽象语法树么？
 *
 * like c4 c language compile c language
 *
 * 最新版的clang成功建制boost c++ libraries 并且几乎通过了所有测验
 * clang/llvm能够编译可运作的linux核心
 * clang能够编译出可运作的hotspot java virtual machine
 * clang3.0能够重建超过91%Debian成品
 * clang/llvm能够编译出nexus 7修改版可运作的android linux核心
 * clang完成所有c++14特性
 *
 * 一个现代编译器的主要工作流程如下：源代码(source code)->预处理器(preprocessor)->编译器(compiler)->汇编程序(assembler)->目标代码(object code)
 *->链接器(linker)->可执行文件(executables)，最后打包号的文件就可以给电脑去判读运行了
 *
 * 当人们发现为不同类型的cpu编写可重用软件的开销要明显高于编写编译器时，人们发明了高级编程语言，能在多种架构之下被编译
 * 由于早期的计算机内存很少，当大家实现编译器时，遇到了很多技术难题
 * 由于新的编程语言支持的功能越来越多，计算机的架构越来越复杂，这使得编译器也越来越复杂
 *
 * 制作某种语言的第一个能编译器，要么需要使用其它语言来编写，要么就像hart和levin制作lisp编译器那样，用解释器来运行编译器
 *
 * 编译器所输出于虚拟机上运行之代码，编译器和编译器输出的运行平台有可能相同，也有可能不同，因此，对于这类编译器，不去区分它是本地编译器还是交叉编译器
 *
 * 扩展：源代码
 * 对于编译语言来说，C/C++/JAVA 源代码的修改不能改变已经生成的目标代码，如果需要目标代码作出相应的修改，必须重新编译
 * 但是一些脚本语言perl/python不需要重新编译，修改完代码可以直接执行看到修改的结果
 *
 * 更多的时候是用C/C++这样的编译语言来写核心需要速度的部分 用perl/python/lua等这样的动态语言来做核心的扩展，例如界面，管理配置等
 *
 *
 * 扩展：预处理器
 * 一些预处理器只能够执行相对简单的文本替换和宏展开，而另一些则有着完全成熟的编程语言的能力
 *
 * 词法预处理器：只需要词法分析，在语法分析之前，根据用户定义的规则，进行简单的词法单元替换
 *
 * 句法预处理器：由lisp家族语言引进的，作用是根据若干用户定义的规则转换语法树
 *
 * 语言专门化：作为模板引擎的预处理器：任何一般目的预处理器，例如M4，都可以当成模板引擎(template engine)使用
 *
 * 扩展：汇编语言assembly language
 * 在不同的设备中，汇编语言对应着不同的机器语言指令集，一种汇编语言专用于某种计算机系统结构，而不像很多高级语言，可以在不同系统平台之间移植
 * intel汇编和at&t汇编
 */
