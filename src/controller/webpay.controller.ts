import { WebpayPlus } from 'transbank-sdk'; // ES6

export class WebPayController {

    static createTransaction = async(request: any, response: any) => {
        const buyOrder = "O-57701";
        const sessionId = "S-31321";
        const amount = 1128;
        const returnUrl = "http://localhost:4000/webpay_plus/commit";

        const createResponse = await WebpayPlus.Transaction.create(
            buyOrder, 
            sessionId, 
            amount, 
            returnUrl
          );

        response.send(createResponse);
    }
}