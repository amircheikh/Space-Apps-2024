export interface HorizonsQueryInput {
  COMMAND: string;  
  CENTER: string;   
  START_TIME: string; 
  STOP_TIME: string;  
  STEP_SIZE: string; 
}

export interface HorizonsRoute {
  time: string;            
  ra: string;             
  dec: string;             
  delta: number;           
  apmag: number;          
  s_o_t: string;          
}

export interface HorizonsResponse {
  routes: HorizonsRoute[]; 
}
