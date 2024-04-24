import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';


@Injectable({
  providedIn: 'root'
})
export class GeminiImgService {

  // config variables
  genAI: any;
  model: any;
  
  // sets basic values
  initialize(key: string, config?: any){
    this.genAI = new GoogleGenerativeAI(key);
    let model = config ? config : {model : 'gemini-pro-vision'}
    this.model = this.genAI.getGenerativeModel(model)
  }

  // creating async request
  async getImgFeedback(data : any){

    // prompt specification
    const prompt = "que opinas de mi cultivo?"
    
    // validation:
    if(!this.model){
      return
    }

    //processing results
    try{
      // formulating request (passing promt and image as arguments)
      const result = await this.model.generateContent([prompt,data])
      // capturing response
      const response = await result.response
      // returning response
      return response.text()

    } catch(e){
      // showing errors
      console.error(e)
      return "an error has occurred!"
    }


  }

}
