import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';

//@ts-ignore
import * as Razorpay from 'razorpay';



export type RazorpayPaymentDetails = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

@Injectable()
export class PaymentService {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
  }


  async createOrder(amount: string): Promise<any> {
    if (!amount) {
      throw new BadRequestException('Amount should be provided');
    }

    try {
      const options = {
        amount: Number(amount) , // Convert to smallest unit (paise)
        currency: 'INR',
        receipt: 'receipt_' + Math.random().toString(36).substring(7),
      };

      const order = await this.razorpay.orders.create(options);
      return order;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw new InternalServerErrorException('Failed to create Razorpay order');
    }
  }

  async verifyPayment(order: RazorpayPaymentDetails) {
    const secret = process.env.RAZORPAY_SECRET_KEY;
    console.log(secret);
    console.log(order);

    if (!secret) {
      throw new InternalServerErrorException('Razorpay secret key missing');
    }

    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = order;

      const sign = razorpay_order_id + '|' + razorpay_payment_id;
      console.log(sign);
      const expectedSign = crypto
        .createHmac('sha256', secret)
        .update(sign)
        .digest('hex');

      if (razorpay_signature === expectedSign) {
        return { status: true, message: 'Payment verified successfully' };
      } else {
        return { status: false, message: 'Payment verification failed — signature mismatch' };
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new InternalServerErrorException('Failed to verify Razorpay payment');
    }
  }
}
