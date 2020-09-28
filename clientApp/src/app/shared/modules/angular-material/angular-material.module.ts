import { NgModule } from '@angular/core';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';

const materialImports: any[] = [
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatIconModule,
  MatBadgeModule,
  MatCardModule,
  MatDividerModule,
  MatTableModule
];

@NgModule({
  imports: materialImports,
  exports: materialImports
})
export class AngularMaterialModule { }
