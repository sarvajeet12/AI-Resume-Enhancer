import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { reviewAPI } from '../api/review';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RatingSection = () => {
  const { isAuthenticated } = useAuthStore();
  const [ratings, setRatings] = useState([]);
  const [stats, setStats] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetchReviews();
    fetchStats();
    if (isAuthenticated) {
      fetchUserReview();
    }
  }, [isAuthenticated]);

  const fetchReviews = async () => {
    try {
      const response = await reviewAPI.getReviews({ limit: 6 });
      setRatings(response.data.reviews || []);
    } catch (error) {
      console.error('Failed to fetch reviews');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await reviewAPI.getReviewStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch review stats');
    }
  };

  const fetchUserReview = async () => {
    try {
      const response = await reviewAPI.getUserReview();
      if (response.data.review) {
        setUserReview(response.data.review);
      }
    } catch (error) {
      console.error('Failed to fetch user review');
    }
  };


  const displayStats = stats || {
    averageRating: 0,
    totalRatings: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isMobile = window.innerWidth < 768;
      const gap = 24; // 1.5rem = 24px
      
      // Get all cards
      const cards = Array.from(container.querySelectorAll('[data-card-index]'));
      if (cards.length === 0) return;
      
      const currentScroll = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      
      // Find the first card that's at least partially visible
      let currentCardIndex = -1;
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const cardLeft = card.offsetLeft;
        const cardRight = cardLeft + card.offsetWidth;
        
        if (cardLeft <= currentScroll + containerWidth && cardRight > currentScroll) {
          currentCardIndex = i;
          break;
        }
      }
      
      // If no card found, use the first one
      if (currentCardIndex === -1) {
        currentCardIndex = 0;
      }
      
      // Calculate target index (move back by 1 on mobile, 2 on desktop)
      const scrollStep = isMobile ? 1 : 2;
      const targetIndex = Math.max(0, currentCardIndex - scrollStep);
      const targetCard = cards[targetIndex];
      
      if (targetCard) {
        const targetScroll = isMobile 
          ? targetCard.offsetLeft
          : targetCard.offsetLeft - gap;
        
        container.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: 'smooth',
        });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isMobile = window.innerWidth < 768;
      const gap = 24; // 1.5rem = 24px
      
      // Get all cards
      const cards = Array.from(container.querySelectorAll('[data-card-index]'));
      if (cards.length === 0) return;
      
      const currentScroll = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const maxScroll = container.scrollWidth - containerWidth;
      
      // If we're at or near the start (within 10px), start from card 0
      let leftmostCardIndex = 0;
      if (currentScroll > 10) {
        // Find the leftmost card that's at least partially visible
        for (let i = 0; i < cards.length; i++) {
          const card = cards[i];
          const cardLeft = card.offsetLeft;
          const cardRight = cardLeft + card.offsetWidth;
          
          // Check if card is visible in the viewport
          if (cardLeft < currentScroll + containerWidth && cardRight > currentScroll) {
            leftmostCardIndex = i;
            break;
          }
        }
      }
      
      // Calculate target index (move forward by 1 on mobile, 2 on desktop)
      // This will be the new leftmost card to show
      const scrollStep = isMobile ? 1 : 2;
      const targetIndex = Math.min(cards.length - 1, leftmostCardIndex + scrollStep);
      const targetCard = cards[targetIndex];
      
      if (targetCard) {
        // Scroll to show the target card as the leftmost visible card
        // On desktop, account for the gap to show 2 cards properly
        const targetScroll = isMobile 
          ? targetCard.offsetLeft
          : targetCard.offsetLeft - gap;
        
        container.scrollTo({
          left: Math.min(maxScroll, Math.max(0, targetScroll)),
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl sm:text-3xl">What Our Users Say</h2>
        <p className="text-text-primary text-xs mt-4 max-w-2xl mx-auto">
          Join thousands of satisfied users who have transformed their careers with Resume Enhancer
        </p>
      </motion.div>
      {/* Testimonials Horizontal Scroll */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-text-primary text-sm">Loading reviews...</p>
        </div>
      ) : ratings && ratings.length > 0 ? (
        <div className="relative mb-12 max-w-3xl mx-auto">
          {/* Left Navigation Button */}
          <button
            onClick={scrollLeft}
            className=" hidden lg:block absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-nav-bg border border-yellow-500/30 hover:border-yellow-500/50 rounded-full p-2 shadow-lg hover:bg-yellow-500/10 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-yellow-400" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth mx-auto w-full snap-x snap-mandatory overflow-y-hidden"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
            onWheel={(e) => {
              // Prevent vertical scrolling when scrolling horizontally on cards
              if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
                e.stopPropagation();
                scrollContainerRef.current?.scrollBy({
                  left: e.deltaX,
                  behavior: 'auto',
                });
              }
            }}
            onTouchStart={(e) => {
              // Prevent vertical scroll on touch devices
              const touch = e.touches[0];
              const startX = touch.clientX;
              const startY = touch.clientY;
              
              const handleTouchMove = (moveEvent) => {
                const moveTouch = moveEvent.touches[0];
                const deltaX = Math.abs(moveTouch.clientX - startX);
                const deltaY = Math.abs(moveTouch.clientY - startY);
                
                if (deltaX > deltaY) {
                  moveEvent.preventDefault();
                }
              };
              
              const handleTouchEnd = () => {
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
              };
              
              document.addEventListener('touchmove', handleTouchMove, { passive: false });
              document.addEventListener('touchend', handleTouchEnd);
            }}
          >
            {ratings.map((rating, index) => (
              <motion.div
                key={rating._id || index}
                data-card-index={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-nav-bg p-6 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-all flex-shrink-0 w-full md:w-[calc(50%-0.75rem)] snap-start"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-base ${
                        i < rating.rating ? 'text-yellow-400' : 'text-gray-600'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-text-primary text-xs mb-4 italic">"{rating.comment}"</p>
                <div>
                  <p className=" text-xs">
                    {rating.userId?.email?.split('@')[0] || 'Anonymous'}
                  </p>
                  <p className="text-xs text-text-primary">
                    {new Date(rating.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={scrollRight}
            className=" hidden lg:block absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-nav-bg border border-yellow-500/30 hover:border-yellow-500/50 rounded-full p-2 shadow-lg hover:bg-yellow-500/10 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-yellow-400" />
          </button>
        </div>
      ) : (
        <div className="text-center py-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-nav-bg p-8 rounded-lg border border-yellow-500/10"
          >
            <p className="text-text-primary text-sm mb-2">No reviews yet</p>
            <p className="text-text-primary text-xs">
              Be the first to share your experience!
            </p>
          </motion.div>
        </div>
      )}

      {/* User Review Info */}
      {isAuthenticated && userReview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-nav-bg p-8 rounded-lg border border-yellow-500/10 mb-6"
        >
          <div className="text-center">
            <h3 className="mb-2 text-2xl">Your Review</h3>
            <p className="text-text-primary text-xs mb-4">
              Thank you for sharing your experience! Reviews are created when you enhance a resume.
            </p>
            <div className="bg-body-bg p-4 rounded-lg">
              <div className="flex items-center gap-1 justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-base ${
                      i < userReview.rating ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              {userReview.comment && (
                <p className="text-text-primary text-xs italic">"{userReview.comment}"</p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {!isAuthenticated && (
        <div className="text-center">
          <p className="text-text-primary text-xs mb-4">
            Sign in to share your experience and help others
          </p>
          <Link
            to="/login"
            className="inline-block px-3.5 py-2.5 text-xs gradient-yellow text-white rounded-lg  hover:opacity-90 transition-opacity "
          >
            Sign In to Rate
          </Link>
        </div>
      )}
    </section>
  );
};

export default RatingSection;

