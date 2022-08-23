import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// const SERVICES = [

// ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [

        // ...SERVICES,
      ],
    };
  }
 }
