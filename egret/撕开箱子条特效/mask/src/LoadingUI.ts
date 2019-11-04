//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
       
    }
    private onAddToStage(event:egret.Event){
        this.createView();
    }

    private textField:egret.TextField;

    private createView():void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.textColor=0xffffff;
        this.textField.y = this.stage.stageHeight/2+100;
        this.textField.width = 640;
        this.textField.textAlign = "center";
        this.textField.text="test";
    }
    
    public showTriangle(){
        var loading_json = RES.getRes("loading_2c9ca445_json");
        var loading_png = RES.getRes("loading_534533_png");
        //创建动画工厂
        var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(loading_json,loading_png);
        //创建 MovieClip，将工厂生成的 MovieClipData 传入参数
        var mc: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("loading"));
        this.addChild(mc);
        mc.play(-1);
        //console.log(mc.width);
        mc.x=(this.stage.stageWidth-mc.width*1.5)/2;
        mc.y=this.stage.stageHeight/2-mc.height;
    }

    public setProgress(current:number, total:number):void {
        this.textField.text = `Loading...${current}/${total}`;
    }
}
