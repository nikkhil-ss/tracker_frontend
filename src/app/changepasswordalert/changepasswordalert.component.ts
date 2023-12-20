import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-changepasswordalert',
  templateUrl: './changepasswordalert.component.html',
  styleUrls: ['./changepasswordalert.component.css']
})
export class ChangepasswordalertComponent {
  @Input() message: any;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
  
}






