import Razorpay from 'razorpay';

// Lazy initialization of Razorpay client
let razorpay = null;

const getRazorpayClient = () => {
  if (!razorpay) {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!keyId || !keySecret) {
      throw new Error('Razorpay credentials are not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env file.');
    }
    
    razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });
  }
  
  return razorpay;
};

export const createOrder = async ({ amount, currency = 'INR', receipt, notes }) => {
  try {
    const client = getRazorpayClient();
    const safeReceipt = (receipt || `rec_${Date.now()}`).toString().slice(0, 40);
    const order = await client.orders.create({
      amount: amount * 100, // amount in paise
      currency,
      receipt: safeReceipt,
      notes: notes || { source: 'AI Resume Enhancer' }
    });
    return order;
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    throw error;
  }
};

export const createCustomer = async (email, name) => {
  try {
    const client = getRazorpayClient();
    const customer = await client.customers.create({
      name: name || email,
      email: email
    });

    return customer;
  } catch (error) {
    console.error('Razorpay customer creation error:', error);
    throw error;
  }
};

export const verifyPayment = async (paymentId, orderId) => {
  try {
    // In local/dev flows we may pass a mock payment id to bypass Razorpay validation
    if (!paymentId || paymentId.startsWith('mock')) {
      return true;
    }

    const client = getRazorpayClient();
    const payment = await client.payments.fetch(paymentId);
    const isCaptured = payment.status === 'captured';
    const matchesOrder = orderId ? payment.order_id === orderId : true;
    return isCaptured && matchesOrder;
  } catch (error) {
    console.error('Payment verification error:', error);
    return false;
  }
};

