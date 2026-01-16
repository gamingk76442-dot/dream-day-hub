-- Create service reviews table
CREATE TABLE public.service_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.service_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved reviews
CREATE POLICY "Anyone can view approved reviews"
  ON public.service_reviews
  FOR SELECT
  USING (is_approved = true);

-- Anyone can submit reviews
CREATE POLICY "Anyone can submit reviews"
  ON public.service_reviews
  FOR INSERT
  WITH CHECK (customer_name IS NOT NULL AND rating >= 1 AND rating <= 5 AND review_text IS NOT NULL);

-- Admins can manage all reviews
CREATE POLICY "Admins can manage all reviews"
  ON public.service_reviews
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert sample reviews for each service
INSERT INTO public.service_reviews (service_id, customer_name, rating, review_text, is_approved) VALUES
('photography-video', 'Sarah Johnson', 5, 'Absolutely stunning photos! The team captured every special moment of our wedding. The same-day highlights were a beautiful surprise for our guests.', true),
('photography-video', 'Michael Chen', 5, 'Professional, creative, and so easy to work with. Our corporate event photos exceeded all expectations. Highly recommend!', true),
('photography-video', 'Emma Williams', 4, 'Great quality photos and quick turnaround. The drone footage was spectacular. Will definitely use again.', true),
('dj-entertainment', 'David Rodriguez', 5, 'Best DJ we could have asked for! Kept the dance floor packed all night. The lighting effects were incredible.', true),
('dj-entertainment', 'Lisa Thompson', 5, 'Amazing MC skills and the music selection was perfect. Our guests are still talking about how great the party was!', true),
('dj-entertainment', 'James Wilson', 4, 'Professional setup and great sound quality. Very responsive to our playlist requests.', true),
('catering-services', 'Amanda Foster', 5, 'The food was absolutely divine! Every dish was perfectly prepared and beautifully presented. Our guests raved about it for weeks.', true),
('catering-services', 'Robert Kim', 5, 'Excellent service and delicious food. They accommodated all our dietary restrictions without any issues.', true),
('catering-services', 'Jennifer Davis', 4, 'Great variety and quality. The bar service was exceptional. Would definitely recommend.', true),
('floral-design', 'Nicole Martinez', 5, 'The arrangements were breathtaking! They understood our vision perfectly and exceeded expectations.', true),
('floral-design', 'Christopher Brown', 5, 'Stunning centerpieces and the bridal bouquet was absolutely gorgeous. True artists!', true),
('floral-design', 'Rachel Green', 5, 'Fresh, beautiful flowers that lasted throughout our entire event. The team was so creative and helpful.', true),
('event-decoration', 'Daniel Lee', 5, 'They completely transformed our venue into a magical wonderland. Every detail was perfect!', true),
('event-decoration', 'Stephanie Clark', 4, 'Beautiful decorations and professional setup. The lighting design really set the mood.', true),
('event-decoration', 'Kevin White', 5, 'Incredible attention to detail. Our guests thought they walked into a fairytale. Highly recommend!', true),
('event-planning', 'Michelle Taylor', 5, 'Stress-free planning from start to finish! They handled everything perfectly and our day was flawless.', true),
('event-planning', 'Andrew Harris', 5, 'Worth every penny. The coordination on the day was seamless. We could relax and enjoy our celebration.', true),
('event-planning', 'Laura Anderson', 5, 'The most organized and responsive team. They anticipated every need and solved problems before we even knew about them.', true);