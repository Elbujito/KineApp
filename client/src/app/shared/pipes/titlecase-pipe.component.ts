import { Component } from '@angular/core';

@Component({
  selector: 'app-titlecase-pipe',
  template: `
          {{message}}
  `
})
export class TitleCasePipeComponent {
  public message = 'MédiNotes';

}
