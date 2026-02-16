import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AiAssistance } from '../_models/aiassisstance';
import { AiAssistancResponse } from '../_models/aiassisstanceresponse';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  request: AiAssistance;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAiAssisatnce(request: AiAssistance): Observable<AiAssistancResponse> {
    return this.http.post<AiAssistancResponse>(this.baseUrl + 'ai/assist', request);
  }
}
 