import { WebpayPlus } from 'transbank-sdk'; // ES6

const asyncHandler = (fn: any) => (req: any, resp: any, next: any) => {
    return Promise.resolve(fn(req, resp, next)).catch((error) => {
      console.log(error);
      next();
    });
  };

export class WebPayController {

    static createTransaction = async(req: any, resp: any, next: any) => {
        WebpayPlus.configureWebpayPlusForTesting();
        const buyOrder = "O-57701";
        const sessionId = "S-31321";
        const amount = 1128;
        const returnUrl = `${req.protocol}://${req.get("host")}/webpay-plus/commit`;
        const r:any = await WebpayPlus.Transaction.create(
            buyOrder, 
            sessionId, 
            amount, 
            returnUrl
          );
          resp.render("redirect-transbank",{ url: r.url, token: r.token})    
        //response.send(createResponse);
    }

    static commitTransaction2 = async(req: any, resp: any, next: any) => {
        WebpayPlus.configureWebpayPlusForTesting();
        console.log(req);
        let token = req.body?.token_ws;
        const commitResponse = await WebpayPlus.Transaction.commit(token);
        console.log(commitResponse);
        const result = "";
        const transaction = {};
        const status = "";
        resp.render("webpay-plus/commit",{result, transaction, status})    
    }

    static commitTransaction = asyncHandler(async function (req: any, resp: any, next: any) {
        let token = req.body?.token_ws;
      
        if (token){
            const commitResponse = await WebpayPlus.Transaction.commit(token);
            let viewData = {
                token,
                commitResponse,
              };
            console.log(commitResponse);
        }
        
      
        
        const result = "";
        const transaction = {};
        const status = "";
        resp.render("webpay-plus/commit",{result, transaction, status}) 
        /*
        resp.render("webpay_plus/commit", {
          step: "Confirmar Transacción",
          stepDescription:
            "En este paso tenemos que confirmar la transacción con el objetivo de avisar a " +
            "Transbank que hemos recibido la transacción ha sido recibida exitosamente. En caso de que " +
            "no se confirme la transacción, ésta será reversada.",
          viewData,
        });*/
      });
}