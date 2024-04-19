import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeminiService } from './gemini.service';
import { GoogleGenerativeAI } from '@google/generative-ai';


@Component({
  selector: 'app-asistente-ia',
  templateUrl: './asistente-ia.component.html',
  styleUrls: ['./asistente-ia.component.scss']
})
export class AsistenteIAComponent {
   // variables (two-way binding)
   prompt = "texto"
   result = "procesando..."
   // generative AI
   apiKey = "AIzaSyACRZhR_TnmticRhpOolXD00TVILiXhh_8"
   genAI = new GoogleGenerativeAI(this.apiKey)
   model = this.genAI.getGenerativeModel({model : "gemini-pro"})
   // boolean flag
   writing = false;
   // proc. response
   questions : Array<{ input: string; result: string}> = [];
 
 
   // constructor neeedted for async request
   constructor(private googleGeminiPro : GeminiService){
     this.googleGeminiPro.initialize(this.apiKey)
   }
 
   // function that gets the user's input
   onUserInput(){
     // testing
     console.log("click!")
     // checking input
     console.log(this.prompt)
     // calling function to execute request
     this.generate()
   }
 
   async generate(){
     // updating flag
     this.writing = true;
     // response request
     const result = await this.googleGeminiPro.generateText(this.prompt)
     // processing response
     this.questions.push({ input: this.prompt, result: ''})
     // executing function that displays response in a gradual like way
     this.write(result,0)
   }
 
   // displays response
   write(result: string, index: number){
     this.questions[this.questions.length -1].result = result.slice(0, index);
     if(index < result.length){
       setTimeout(() => {
         this.write(result, index +1);
       })
     } else {
       this.writing = false;
       this.prompt = '';
     }
   }
 
   // adjusts how fast the text is displayed
   randomVelocity():number{
     const velocity = Math.floor(Math.random() * 25 + 1)
     return velocity
   }
}
