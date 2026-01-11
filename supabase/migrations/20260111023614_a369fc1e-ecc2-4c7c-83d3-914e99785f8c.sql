-- Fix: Block anonymous access to profiles table
CREATE POLICY "Block anonymous access to profiles"
ON public.profiles
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Fix: Block anonymous access to bookings table  
CREATE POLICY "Block anonymous access to bookings"
ON public.bookings
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Fix: Block anonymous access to orders table
CREATE POLICY "Block anonymous access to orders"
ON public.orders
FOR SELECT
USING (auth.uid() IS NOT NULL);