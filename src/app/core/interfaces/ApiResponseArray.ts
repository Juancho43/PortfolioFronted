export interface ApiResponseArray<T>{
    success: boolean;
    message?: string;
    data?: T | T[]; 
    errors? : any;
}