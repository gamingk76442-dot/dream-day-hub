import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface StatusUpdateRequest {
  customer_name: string;
  customer_email: string;
  order_id: string;
  new_status: string;
  total_amount: number;
}

const getStatusInfo = (status: string) => {
  switch (status) {
    case "confirmed":
      return {
        title: "Order Confirmed! 🎉",
        message: "Great news! Your order has been confirmed and is being prepared.",
        color: "#22c55e",
        icon: "✓",
      };
    case "processing":
      return {
        title: "Order Being Processed 📦",
        message: "Your order is now being processed and will be ready for shipping soon.",
        color: "#3b82f6",
        icon: "⚙️",
      };
    case "shipped":
      return {
        title: "Order Shipped! 🚚",
        message: "Your order is on its way! You should receive it soon.",
        color: "#8b5cf6",
        icon: "📬",
      };
    case "completed":
      return {
        title: "Order Completed ✨",
        message: "Your order has been delivered. Thank you for your purchase!",
        color: "#10b981",
        icon: "🎁",
      };
    case "cancelled":
      return {
        title: "Order Cancelled",
        message: "Your order has been cancelled. If you have any questions, please contact us.",
        color: "#ef4444",
        icon: "✕",
      };
    default:
      return {
        title: "Order Update",
        message: `Your order status has been updated to: ${status}`,
        color: "#6b7280",
        icon: "ℹ️",
      };
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      customer_name, 
      customer_email, 
      order_id, 
      new_status,
      total_amount,
    }: StatusUpdateRequest = await req.json();

    console.log(`Sending status update email for order ${order_id}: ${new_status}`);

    const statusInfo = getStatusInfo(new_status);

    const emailResponse = await resend.emails.send({
      from: "Order Updates <onboarding@resend.dev>",
      to: [customer_email],
      subject: `${statusInfo.title} - Order #${order_id.slice(0, 8).toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: ${statusInfo.color}; padding: 32px; text-align: center;">
            <span style="font-size: 48px;">${statusInfo.icon}</span>
            <h1 style="color: white; margin: 16px 0 0 0; font-size: 24px;">${statusInfo.title}</h1>
          </div>
          
          <div style="padding: 32px;">
            <p style="font-size: 16px; color: #333; margin-bottom: 24px;">
              Hi ${customer_name},
            </p>
            
            <p style="font-size: 16px; color: #333; margin-bottom: 24px;">
              ${statusInfo.message}
            </p>
            
            <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Order ID</p>
              <p style="margin: 0; color: #333; font-size: 18px; font-weight: bold;">#${order_id.slice(0, 8).toUpperCase()}</p>
            </div>
            
            <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Order Total</p>
              <p style="margin: 0; color: ${statusInfo.color}; font-size: 24px; font-weight: bold;">$${total_amount.toFixed(2)}</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%); border-radius: 8px; padding: 20px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Current Status</p>
              <span style="display: inline-block; background: ${statusInfo.color}; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; text-transform: capitalize;">
                ${new_status}
              </span>
            </div>
            
            <p style="margin-top: 32px; color: #999; font-size: 12px; text-align: center;">
              If you have any questions about your order, please reply to this email.
            </p>
          </div>
          
          <div style="background: #f5f5f5; padding: 24px; text-align: center;">
            <p style="margin: 0; color: #999; font-size: 12px;">
              Thank you for shopping with us!
            </p>
          </div>
        </div>
      `,
    });

    console.log("Status update email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Status update email sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending status update email:", error);
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
