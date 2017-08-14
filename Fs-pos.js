'use strict'
var inputs=getInput('barcode.txt');
var standardList=toStandardList(inputs);
var string=printList(standardList);
outPut(string,'list.txt');
//读取文件并返回字符串
function getInput(intfile){//用readFileSync同步读取，而不是异步，异步你只能讲需要使用数据的代码全部放入callback中
  var fs=require('fs');
  var array=fs.readFileSync(intfile,'utf-8');
  array=array.split(',');//记住返回值
  return array;
}
//将文件写入
function outPut(string,outfile){
    var fs=require('fs');
    fs.writeFile(outfile,string,function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('ok');
      }
    });
  }
  //返回系统时间字符串。
  function printTime(){
           var dateDigitToString = function (num) {
              return num < 10 ? '0' + num : num;
           };//把个位数的十位置加“0”凑成两位数，
           var Rightnow=new Date(); //实例一个时间对象；
           var year=dateDigitToString(Rightnow.getFullYear());   //获取系统的年；
           var Month=dateDigitToString(Rightnow.getMonth()+1);   //获取系统月份，由于月份是从0开始计算，所以要加1
           var day=dateDigitToString(Rightnow.getDate()); // 获取系统日，
           var hours=dateDigitToString(Rightnow.getHours()); //获取系统时，
           var minutes=dateDigitToString(Rightnow.getMinutes()); //分
           var seconds=dateDigitToString(Rightnow.getSeconds()); //秒a
           var string=year.toString()+'年'+Month+'月'+day.toString()+'日 '+hours.toString()+':'+minutes.toString()+':'+seconds.toString()+'\n----------------------\n';
           return string;
      }
      //将inputs转换成每个对象元素具有count，discount属性的标准对象
  //接受传入的数据，遍历输出具有count，discount属性的数组。
  function toStandardList(inputs){
         var allItemList=loadAllItems();//得到所有商品清单
         var discountList=[];//买三送一商品清单
         var discount=0;
         var temp=[];
         //得到折扣的列表
         for(var i=0,length=loadPromotions().length;i<length;++i){
            if(loadPromotions()[i].type=='BUY_TWO_GET_ONE_FREE'){
                discountList=loadPromotions()[i].barcodes;
            }
         }
         //给所有商品增加count属性
         for(i=0;i<allItemList.length;i++){
            allItemList[i].count=0;
            for(var j=0;j<inputs.length;j++){
                if(inputs[j].indexOf('-')!=-1){
                    temp=inputs[j].split('-');
                    if(temp[0]==allItemList[i].barcode){
                       allItemList[i].count=parseInt(temp[1]);
                     }
                }
                else if(allItemList[i].barcode==inputs[j]){
                    allItemList[i].count++;
                }
            }
         }
         for(i=0;i<allItemList.length;i++){
            allItemList[i].discount=0;
            for(j=0;j<discountList.length;j++){
                if(allItemList[i].barcode==discountList[j]){
                    discount=Math.floor(allItemList[i].count/3);
                    if(discount>=1){
                    allItemList[i].discount=discount;
                    }
                }
            }//alert(allItemList[i].discount)
         }
         return allItemList;
      }
  //将标准格式数据输入，打印清单。
  function printList(array){
          var string=printTime();
          var sum=0;
          var save=0;
          for(var i=0;i<array.length;i++){
              if(array[i].count!=0){
                       string+='名称:'+array[i].name+',数量:'+array[i].count+array[i].unit+',单价:'+array[i].price.toFixed(2)+'(元),小计:'+(array[i].price*(array[i].count-array[i].discount)).toFixed(2)+'(元)\n';
                       sum+=array[i].price*array[i].count;
              }
          }
          string+='----------------------\n挥泪赠送商品:\n';
          for(i=0;i<array.length;i++){
              if(array[i].discount!=0){
                     string+='名称:'+array[i].name+',数量:'+array[i].discount+array[i].unit+'\n'
                     save+=array[i].price*array[i].discount;
              }
          }
          sum=sum-save;
          string+='----------------------\n总计:'+sum.toFixed(2)+'(元)\n节省:'+save.toFixed(2)+'(元)\n**********************';
          return string;
      }
  function loadAllItems() {
      return [
          {
              barcode: 'ITEM000000',
              name: '可口可乐',
              unit: '瓶',
              price: 3.00
          },
          {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
          },
          {
              barcode: 'ITEM000002',
              name: '苹果',
              unit: '斤',
              price: 5.50
          },
          {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
          },
          {
              barcode: 'ITEM000004',
              name: '电池',
              unit: '个',
              price: 2.00
          },
          {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
          }
      ];
  }

  function loadPromotions() {
      return [
          {
              type: 'BUY_TWO_GET_ONE_FREE',
              barcodes: [
                  'ITEM000000',
                  'ITEM000001',
                  'ITEM000005'
              ]
          }
      ];
  }
