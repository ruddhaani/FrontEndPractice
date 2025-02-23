import { Component, Input } from '@angular/core';
import { VideoDetails } from '../../modules/VideoDetails';

@Component({
  selector: 'app-video',
  imports: [],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {
  @Input() videoDetails : VideoDetails = new VideoDetails("","","","");
}
