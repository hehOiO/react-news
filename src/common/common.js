function recursion(value = [],arr=[],prevPath='',response=[]){
    if(value.length<=0  || arr.length<=0){
        return response;
    }
    let nowArr =value[0]
    let result = '';
    for(var i=0;i<arr.length;i++){
        if(nowArr == arr[i].path){
            result = {
                path:prevPath + '/' +arr[i].path,
                name:arr[i].name,
                children:arr[i].children?arr[i].children:[]
            };
            response.push({
                path:result.path,
                name:result.name
            });
            break;
        }
        
    }
    value.shift();
    return recursion(value,result.children,result.path,response)
}
export function findRouter(router,routerMap){
    if(router == undefined || routerMap == undefined || routerMap.length<=0){
        return ''
    }
    let routerArr = router.split('/');
    routerArr.shift();
    return recursion(routerArr,routerMap,'',[]);
}