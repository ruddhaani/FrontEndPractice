import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoListComponent } from './components/video-list/video-list.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    VideoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practice';
}
