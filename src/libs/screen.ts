export class ScreenSetting{

    public width: number = 0;
    public height: number = 0;

    public outboundOffset = 30;
    constructor(w: number, h: number){
        this.width = w;
        this.height =h;
    }
}