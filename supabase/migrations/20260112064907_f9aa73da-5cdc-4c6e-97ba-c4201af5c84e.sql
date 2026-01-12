-- Add INSERT policy for order_items to allow creating items for recent orders
CREATE POLICY "Allow order item creation for recent orders"
ON public.order_items FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id
    AND orders.created_at > NOW() - INTERVAL '5 minutes'
  )
);