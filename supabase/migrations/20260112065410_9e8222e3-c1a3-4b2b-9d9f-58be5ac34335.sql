-- Drop and recreate the products SELECT policy as PERMISSIVE
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;

CREATE POLICY "Anyone can view active products" 
ON public.products 
FOR SELECT 
USING (is_active = true OR public.has_role(auth.uid(), 'admin'));