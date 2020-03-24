/**
 * 定义一函数，输入值为起始index和增量 function move(0,1); 共需要上下左右四个函数
 * 1.如果i==j,i=i+j,j=0
 * 2.如果i!=j,i++
 * 3.如果i==0,i++
 * 新增delete(flag)和循环j处理2024情况
 * i为0则不可能与后面发生关系，continue
 * j不为0且与i没有发生关系，说明i已经不能和后面j发生关系了,break j循环
 */
for (let i = 0; i < 3; i++) {
    let j = i + 1;
    if (i.value != 0) {
        if (i.value == j.value) {
            i.value = i.value + j.value;
            j.value = 0;

        }

    }
}
for (let i = 0; i < 3; i++) {
    if (i == 0)
        continue;
    for (let j = i + 1; j < 4; j++) {

        if (i.value == j.value) {
            i.value = i.value + j.value;
            j.value = 0;
            break;
       }
       if(j!=0){
           break;
       }
    }
}
/**
 * 函数二
 * 1.建立双重循环,如i==0,j=i+1且j<3,且j!=0,则i=j,j=0
 */
for (let i = 0; i < 3; i++) {
    if (i.value == 0) {
        for (let j = i + 1; j < 4; j++) {
            if (j.value != 0) {
                i.value = j.value;
                j.value = 0;
            }
        }
    }
}
/**
 * 判断胜利
 * 
 */