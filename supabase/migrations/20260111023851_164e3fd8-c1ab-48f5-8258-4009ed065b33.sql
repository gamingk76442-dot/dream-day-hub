-- Drop the overly permissive policy that allows any authenticated user to see all profiles
DROP POLICY IF EXISTS "Block anonymous access to profiles" ON public.profiles;

-- Drop similar overly permissive policies on other tables
DROP POLICY IF EXISTS "Block anonymous access to bookings" ON public.bookings;
DROP POLICY IF EXISTS "Block anonymous access to orders" ON public.orders;