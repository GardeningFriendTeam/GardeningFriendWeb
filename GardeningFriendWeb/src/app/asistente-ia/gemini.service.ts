import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { GoogleGenerativeAI } from '@google/generative-ai';

// model information
const GEMINI_PRO_ENDPOINT = 'https://language.googleapis.com/v1beta1/projects/';
const PROJECT_ID = 'artmaster-c3e26';
// TODO: hide this property! (ideally it shoudn't be visible!)
//const API_KEY = 'AIzaSyACRZhR_TnmticRhpOolXD00TVILiXhh_8';


@Injectable({
  providedIn: 'root'
})
export class GeminiService {

   // config variables
   genAI: any;
   model: any;
 
   // sets basic values
   initialize(key: string, config?: any){
     this.genAI = new GoogleGenerativeAI(key);
     let model = config ? config : {model : 'gemini-pro'}
     this.model = this.genAI.getGenerativeModel(model)
   }
 
   // sends request to generate text
   async generateText(prompt: string){
     // testing
     console.log(prompt)
     
     // validation
     if(!this.model){
       return;
     }
 
     try{
       // processing request
       const result = await this.model.generateContent(prompt)
       // processing response
       const response = await result.response
 
       return response.text()
 
     } catch (e){
         console.error(e)
         return "an error has occurred"
     }
  }
}
