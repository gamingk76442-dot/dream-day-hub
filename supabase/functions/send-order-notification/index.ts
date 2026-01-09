import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  product_name: string;
  quantity: number;
  unit_price: number;
}

interface OrderNotificationRequest {
  customer_name: string;
  customer_email: string;
  order_id: string;
  total_amount: number;
  items: OrderItem[];
  owner_email?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      customer_name, 
      customer_email, 
      order_id, 
      total_amount, 
      items,
      owner_email 
    }: OrderNotificationRequest = await req.json();

    console.log("Sending order notification for order:", order_id);

    const itemsHtml = items.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.product_name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${(item.unit_price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join("");

    // Send confirmation to customer
    const customerEmail = await resend.emails.send({
      from: "Orders <onboarding@resend.dev>",
      to: [customer_email],
      subject: "Order Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Thank you for your order, ${customer_name}!</h1>
          <p>We've received your order and it's being processed.</p>
          
          <h2 style="color: #666; margin-top: 24px;">Order Details</h2>
          <p><strong>Order ID:</strong> ${order_id.slice(0, 8).toUpperCase()}</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="padding: 8px; text-align: left;">Product</th>
                <th style="padding: 8px; text-align: center;">Qty</th>
                <th style="padding: 8px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 12px 8px; font-weight: bold;">Total</td>
                <td style="padding: 12px 8px; text-align: right; font-weight: bold; color: #2563eb;">$${total_amount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          
          <p style="margin-top: 24px; color: #666;">
            We'll notify you when your order is confirmed.
          </p>
          
          <p style="margin-top: 24px; color: #999; font-size: 12px;">
            If you have any questions, please reply to this email.
          </p>
        </div>
      `,
    });

    console.log("Customer email sent:", customerEmail);

    // Send notification to owner if email provided
    if (owner_email) {
      const ownerNotification = await resend.emails.send({
        from: "Orders <onboarding@resend.dev>",
        to: [owner_email],
        subject: `New Order from ${customer_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">New Order Received!</h1>
            <p><strong>Customer:</strong> ${customer_name}</p>
            <p><strong>Email:</strong> ${customer_email}</p>
            <p><strong>Order ID:</strong> ${order_id.slice(0, 8).toUpperCase()}</p>
            
            <h2 style="color: #666; margin-top: 24px;">Order Items</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <thead>
                <tr style="background: #f5f5f5;">
                  <th style="padding: 8px; text-align: left;">Product</th>
                  <th style="padding: 8px; text-align: center;">Qty</th>
                  <th style="padding: 8px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 12px 8px; font-weight: bold;">Total</td>
                  <td style="padding: 12px 8px; text-align: right; font-weight: bold; color: #2563eb;">$${total_amount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            
            <p style="margin-top: 24px;">
              <a href="#" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View in Dashboard</a>
            </p>
          </div>
        `,
      });

      console.log("Owner notification sent:", ownerNotification);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Notification emails sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending order notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
