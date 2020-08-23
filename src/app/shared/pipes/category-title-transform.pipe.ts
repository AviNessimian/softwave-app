
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'categoryTitleTransform'})
export class CategoryTitleTransform implements PipeTransform {

  transform(value: string): string {

    switch(value) { 
        case 'cat1': { 
           
           return 'רגולציה ותקנים';
        } 
        case 'cat2': { 
           
            return 'פיתוח תוכנה';
         } 
         case 'cat3': { 
           
            return 'סייבר ואבטחת מידע';
         } 
         case 'cat4': { 
           
            return 'מערכות ליבה';
         } 
         case 'cat5': { 
           
            return 'Data';
         } 
         case 'cat6': { 
           
            return 'תשתיות ותקשורת';
         } 
         case 'cat7': { 
           
            return 'חדשנות';
         } 
         case 'cat8': { 
           
            return 'מבקר IT';
         } 

        default: { 
           return '';
        } 
     } 
  }
}