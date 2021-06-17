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
        let result = "";
        let status = null;
        if (token){
            const r = await WebpayPlus.Transaction.commit(token);
            console.log(r);
            result = `La transacción se ha ejecutado correctamente => tarjeta: 'XXXX XXXX XXXX ${r.card_detail.card_number}' ,codigo de autorizacion: '${r.authorization_code}'`;
            if (r.response_code === 0) {
                status = 'AUTHORIZED';
            } else {
                status = 'REJECTED';
            }
        }
        else{
            status = 'ABORTED';
            result = "Ocurrio un error en la transacción"
        }

        resp.render("webpay-plus/commit",{result, status}) 

      });
}


/*

{
  vci: 'TSY',
  amount: 1128,
  status: 'AUTHORIZED',
  buy_order: 'O-57701',
  session_id: 'S-31321',
  card_detail: { card_number: '6623' },
  accounting_date: '0616',
  transaction_date: '2021-06-17T01:28:35.278Z',
  authorization_code: '1213',
  payment_type_code: 'VN',
  response_code: 0,
  installments_number: 0
}
*/