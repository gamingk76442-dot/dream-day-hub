-- Fix update_updated_at function search path
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Drop overly permissive booking insert policy and create a better one
DROP POLICY IF EXISTS "Users can create bookings" ON public.bookings;
CREATE POLICY "Anyone can create bookings with valid data" ON public.bookings 
  FOR INSERT 
  WITH CHECK (
    customer_name IS NOT NULL 
    AND customer_email IS NOT NULL 
    AND service_type IS NOT NULL 
    AND booking_date IS NOT NULL
  );