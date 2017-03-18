/**
 * Created by sunyx on 2017/3/18.
 * 通过变量arguments(实际上不是一个数组，而是一个类似数组的对象)
 * 完成sum()函数使之能对任意数量的参数执行求和运算
 */
function sumOnSteroids(){
    var i,
        res = 0,
        number_of_params = arguments.length;
    for (i=0;i<number_of_params;i++){
        res += arguments[i];
    }
    return res;
}
sumOnSteroids(1,1,1);

sumOnSteroids(1,2,3,4);

sumOnSteroids(1,2,3,4,4,3,2,1);

sumOnSteroids(5);

sumOnSteroids();