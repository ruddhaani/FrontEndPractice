export class VideoDetails {
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;


    constructor(title: string, description: string, thumbnailUrl: string, videoUrl: string) {
        this.title = title;
        this.description = description;
        this.thumbnailUrl = thumbnailUrl;
        this.videoUrl = videoUrl
    }
}