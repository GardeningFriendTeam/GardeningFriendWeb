import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import Groq from "groq-sdk";
import { environment } from 'src/environments/environment';

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
  // text-to-speak functionality
  synth = window.speechSynthesis;
  // flag dialog info
  flagDialog = false;
  // loader flag
  loaderFlag = false
  // flag synth audio
  flagStopEnabled = false
  // icon text-to-speech
  iconTextToSpeech = "../../assets/iconos/icons8-voice-50.png"

   // constructor (it's needed in order to initialize the services)
  constructor(){
  }

  // ------------------------------- FUNCTIONALITIES ------------------------------//
  // -------------------------- GROK LLM functionalities ----------------------------//
  async main(prompt:string) {
    // activating flag
    this.loaderFlag = true
    // executing request
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
      // flag off
      this.loaderFlag = false
      // return statement
      let result : string = completion ?? ""
      return result
  }
  // -------------------------- process user's input ----------------------------//
  onUserInput(){
     // testing
    console.log("click!")
     // checking input
    console.log(this.prompt)
     // calling function to execute request
    this.generate()
  }

  async generate(){
    // response request
    const result = await this.main(this.prompt)
    console.log(result)
    //processing response
    // executing function that displays response in a gradual like way
    this.result = result
    
  }


  textToSpeech(){
    if (this.flagStopEnabled){
      this.stopTextToSpeech()
    } else {
      this.speakText()
    }
  }

  speakText(){
    // text to read
    const utternance = new SpeechSynthesisUtterance(this.result);
    // reading function on
    this.synth.speak(utternance)
    // updating flag
    this.flagStopEnabled = !this.flagStopEnabled 
    // updating icon
    this.iconTextToSpeech = "../../assets/iconos/icons8-pause-30.png"
  }

  stopTextToSpeech(){
    // stop synth audio function
    this.synth.cancel()
    // updating flag
    this.flagStopEnabled = !this.flagStopEnabled 
    // updating icon
    this.iconTextToSpeech = "../../assets/iconos/icons8-voice-50.png"
  }


  showDialogIA(){
    // switches flags state to display or hide dialog image
    this.flagDialog = !this.flagDialog;
  }
  

}
