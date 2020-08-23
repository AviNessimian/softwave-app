import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { CategoryTitleTransform } from './pipes/category-title-transform.pipe';


@NgModule({
  imports: [CommonModule,
    NgbModule,
    FontAwesomeModule],

  declarations: [CategoryTitleTransform],

  exports: [NgbModule,
    FontAwesomeModule,
    CategoryTitleTransform],

  entryComponents: [
  ],
  providers: [SharedModule]
})
export class SharedModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab, far);
  }

  static forRoot() {
    return {
        ngModule: SharedModule,
        providers: [SharedModule],
    };
 }

}
