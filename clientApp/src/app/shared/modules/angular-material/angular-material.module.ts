import { NgModule } from '@angular/core';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

const materialImports: any[] = [
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatIconModule,
  MatBadgeModule,
  MatCardModule,
  MatDividerModule
];

@NgModule({
  imports: materialImports,
  exports: materialImports
})
export class AngularMaterialModule { }
