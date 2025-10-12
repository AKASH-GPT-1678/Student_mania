import { Controller } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Post, Body } from '@nestjs/common';
import { RazorpayOrder } from './dto/order..dto';
import { RazorpayPaymentDetails } from './payment.service';
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post('create-order')
  async createOrder(@Body('amount') amount: string) {
    return this.paymentService.createOrder(amount);
  }

  @Post('verify-order')
  async verifyOrder(@Body() order : RazorpayPaymentDetails) {
    try {
      
      const payment = await this.paymentService.verifyPayment(order);
    } catch (error) {
      
    }

  }

}

