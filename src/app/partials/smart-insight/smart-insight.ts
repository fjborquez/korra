import { Statistics } from './../../interfaces/statistics.interface';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-smart-insight',
  imports: [],
  templateUrl: './smart-insight.html',
  styleUrl: './smart-insight.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 bg-gradient-to-br from-primary to-primary-container rounded-[2rem] p-8 text-on-primary flex flex-col md:flex-row justify-between items-center relative overflow-hidden'
  }
})
export class SmartInsight {
  @Input() statistics!: Statistics | null;
}
