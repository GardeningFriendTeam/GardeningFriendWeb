import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root'
})
export class GeminiTextService {

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
