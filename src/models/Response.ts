export class Response<T> {

    constructor(isSuccess: boolean, message: string) {
        this.isSuccess = isSuccess;
        this.message = message;
    }

    public isSuccess: boolean;

    public message: string;

    public static ok<T>(message: string = 'success'): Response<T> {
        return new Response(true, message);
    }

    public static fail<T>(message: string = 'fail'): Response<T> {
        return new Response(false, message);
    }
}