import { Component, Input } from '@angular/core';
import { VideoDetails } from '../../modules/VideoDetails';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent {
  @Input() videoDetails : VideoDetails = new VideoDetails("" , "" , "" , "");
}
