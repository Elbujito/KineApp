import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthFirebaseComponent} from './index';
const routes: Routes = [
    {
        path: '',
        component: AuthFirebaseComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class AuthRoutingModule {}
