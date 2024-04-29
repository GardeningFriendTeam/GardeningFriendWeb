import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GeminiTextService } from './gemini-text.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiImgService } from './gemini-img.service';
import { SanitizeTextPipe } from './sanitize-text.pipe';

@Component({
  selector: 'app-asistente-ia',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './asistente-ia.component.html',
  styleUrls: ['./asistente-ia.component.scss']
})
export class AsistenteIaComponent {
  // ------------------------------- VARIABLES ------------------------------//
  // variables (two-way binding)
  prompt = "texto"
  result = "procesando..."
  // generative AI
  apiKey = "AIzaSyACRZhR_TnmticRhpOolXD00TVILiXhh_8" //hide key in final version!
  genAI = new GoogleGenerativeAI(this.apiKey)
  modelText = this.genAI.getGenerativeModel({model : "gemini-pro"}) //only text
  modelImg = this.genAI.getGenerativeModel({model: "gemini-pro-vision"}) // process images
  // boolean flag
  writing = false;
  // proc. response
  questions : Array<{ input: string; result: string}> = [];
  // preview url image
  imageSelected : any;
  // text-to-speak functionality
  synth = window.speechSynthesis;
  // flag dialog info
  flagDialog = false;

   // constructor (it's needed in order to initialize the services)
  constructor(private googleGeminiPro : GeminiTextService, private geminiProVision : GeminiImgService){
    // initializing services needed to interact with gemini LLM
    this.googleGeminiPro.initialize(this.apiKey)
    this.geminiProVision.initialize(this.apiKey)

  }

    // ------------------------------- METHODS ------------------------------//
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

  // --------------------- IA IMAGE PROCESSING ----------------------------//
  async getFile(event:Event){
    // storing image in local variable
    const target = event.target as HTMLInputElement
    // validation
    if(target.files && target.files.length > 0){
      const file = target.files[0];
      console.log(file)
      // parsing image
      const data = await this.fileToGenerativePart(file)
      // running service to send request to the LLM
      this.runRequestAiImg(data)
    }

  }

  async fileToGenerativePart(file: File) {
    // parses image 
    const base64EncodedDataPromise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error)
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  async runRequestAiImg(data:any){
    // updating flag
    this.writing = true;
    // response request
    const result = await this.geminiProVision.getImgFeedback(data)
    // updading input field
    this.questions.push({ input: this.prompt, result: ''});
    // executing function that displays response in a gradual like way
    this.write(result,0);
  }


  textToSpeech(){
    // text to read
    const utternance = new SpeechSynthesisUtterance(this.questions[0].result);
    // reading function on
    this.synth.speak(utternance);
  }


  showDialogIA(){
    // switches flags state to display or hide dialog image
    this.flagDialog = !this.flagDialog;
  }

}
