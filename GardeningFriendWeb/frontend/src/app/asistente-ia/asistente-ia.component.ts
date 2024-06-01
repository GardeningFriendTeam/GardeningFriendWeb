import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SanitizeTextPipe } from './sanitize-text.pipe';
import Groq from "groq-sdk";
import { environment } from 'src/environment/environment';
import { it } from 'node:test';

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
  // groq AI properties
  Groq = require("groq-sdk")
  groq = new Groq({
    apiKey : environment.groqApiKey,
    dangerouslyAllowBrowser: true
  })
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
  constructor(){
  }

  // ------------------------------- FUNCTIONALITIES ------------------------------//
  async main(prompt:string) {
    const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "mixtral-8x7b-32768",
      }).then((chatCompletion) => {
        return chatCompletion.choices[0].message.content  
      });

      let reference = completion 
      return reference
  }
  // --------------------- GROK LLM functionalities ----------------------------//
  


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
    const result = await this.main(this.prompt)
    console.log(result)
    //processing response
    // executing function that displays response in a gradual like way
    //this.write(result,0)
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
