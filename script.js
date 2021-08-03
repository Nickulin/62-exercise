const log = function (a, b, ...rest){// ...rest - все остальные переменные
    console.log(a, b, rest);
};

log('basic', 'rest', 'operator', 'usege'); //basic rest [ 'operator', 'usege' ]

function calcOrDouble(a, b = 2){
    //b = b|| 2; - undefined  
    console.log(a*b);  
}
calcOrDouble(10);