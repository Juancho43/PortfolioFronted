export interface ApiResponseArray<T>{
    success: boolean;
    message?: string;
    data?: T[]; 
    errors? : any;
}