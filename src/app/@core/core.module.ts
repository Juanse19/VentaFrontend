

import { ModuleWithProviders, NgModule} from '@angular/core';

import { SharedModule } from './backends/shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
  ],
  declarations: [],
})
export class CoreModule {

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
      ],
    };
  }
}
