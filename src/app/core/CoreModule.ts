import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CoreRouterModule } from './infrastructure/router/CoreRouterModule';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, IonicModule, CoreRouterModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
  ],
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() presentInParent: CoreModule) {
    if (presentInParent) {
      throw new Error(`CoreModule is already loaded. Import only in AppModule`);
    }
  }
}
