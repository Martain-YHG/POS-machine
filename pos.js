function printInventory(inputs) {
        var list=loadAllItems()
        var discount=loadPromotions()[0].barcodes;
        var disCount=0;
        var dateDigitToString = function (num) {//创建一个dateDigitToString函数使时间为标准格式. 
            return num < 10 ? '0' + num : num;
        };//把个位数的十位置加“0”凑成两位数，
        var Rightnow=new Date(); //实例一个时间对象；
         var year=dateDigitToString(Rightnow.getFullYear());   //获取系统的年；
         var Month=dateDigitToString(Rightnow.getMonth()+1);   //获取系统月份，由于月份是从0开始计算，所以要加1
         var day=dateDigitToString(Rightnow.getDate()); // 获取系统日，
         var hours=dateDigitToString(Rightnow.getHours()); //获取系统时，
         var minutes=dateDigitToString(Rightnow.getMinutes()); //分
         var seconds=dateDigitToString(Rightnow.getSeconds()); //秒a
    var stringOutput='***<没钱赚商店>购物清单***\n打印时间:'+year.toString()+'年'+Month+'月'+day.toString()+'日 '+hours.toString()+':'+minutes.toString()+':'+seconds.toString()+'\n----------------------\n';
    var sum=0;
    var save=0;
    for(var i=0;i<list.length;i++){//用商品清单遍历inputs，weishangpinzengjiacount属性
        list[i].count=0;
        for(var j=0;j<inputs.length;j++){
            if(inputs[j].indexOf('-')!=-1){
                if(inputs[j][9]==list[i].barcode[9]){
                      list[i].count=parseInt(inputs[j][inputs[j].length-1]);
                }
            }
            else if(list[i].barcode==inputs[j]){
                list[i].count++;
            }
        }
    }
    for(i=0;i<list.length;i++){//遍历折扣清单为商品增加discount属性
        list[i].discount=0;
        for(j=0;j<discount.length;j++){
            if(list[i].barcode==discount[j]){
                disCount=Math.floor(list[i].count/3);
                if(disCount>=1){
                list[i].discount=disCount;
                }
            }
        }
        if(list[i].count!=0){
        stringOutput+='名称:'+list[i].name+',数量:'+list[i].count+list[i].unit+',单价:'+list[i].price.toFixed(2)+'(元),小计:'+(list[i].price*(list[i].count-list[i].discount)).toFixed(2)+'(元)\n';
         sum+=list[i].price*list[i].count;
        }
    }
    stringOutput+='----------------------\n挥泪赠送商品:\n'
    for(i=0;i<list.length;i++){
        if(list[i].discount!=0){
            stringOutput+='名称:'+list[i].name+',数量:'+list[i].discount+list[i].unit+'\n'
            save+=list[i].price*list[i].discount;
        }
    }
    sum=sum-save;
    stringOutput+='----------------------\n总计:'+sum.toFixed(2)+'(元)\n节省:'+save.toFixed(2)+'(元)\n**********************';
    console.log(stringOutput)
}
