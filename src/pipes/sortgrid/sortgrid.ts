
import { Injectable, Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SortgridPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'sortgrid',
})
export class SortgridPipe implements PipeTransform {
  transform(array:Array<any>, args?) {
    
        // Check if array exists, in this case array contains articles and args is an array that has 1 element : !id
    
        if(array) {
    
          // get the first element
    
          let orderByValue = args[0]
          let byVal = 1
    
          // check if exclamation point 
    
          if(orderByValue.charAt(0) == "!") {
    
            // reverse the array
    
            byVal = -1
            orderByValue = orderByValue.substring(1)
          }
          console.log("byVal",byVal);
          console.log("orderByValue",orderByValue);
    
          array.sort((a: any, b: any) => {
            if(a[orderByValue] < b[orderByValue]) {
              return -1*byVal;
            } else if (a[orderByValue] > b[orderByValue]) {
              return 1*byVal;
            } else {
              return 0;
            }
          });
          return array;
        }
        //
      }
}


