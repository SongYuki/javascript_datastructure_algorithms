/**
 * Created by sunyx on 16-10-28.
 *
 * 有人主张应包括支持匿名函数(函数字面量，function literals):anonymous function一类无需定义标识符（函数名）的函数或子程序
 *
 * 用途1：排序（尝试将类按名称排序）
 * a = [10,'10',10.0]
 * a.sort(lambda x,y:cmp(x._class_._name_,y._class_._name_))
 * print a
 * [10.0,10,'10']
 * 上述10.0的类名是"float" 10的类名是"int" '10'的类名是"str" 排序后的顺序为"float""int""str" 示例中的匿名函数就是lambda表达式
 * lambda x,y:cmp(...)
 * 接受两个变量x和y 通过内部函数cmp()返回两者的比较值
 *
 * 下面的例子将按长度为字符串列表排序：
 * a = ['three','two','four']
 * a.sort(lambda x,y:cmp(len(x),len(y)))
 * print a
 * ['two','four','three']
 */
