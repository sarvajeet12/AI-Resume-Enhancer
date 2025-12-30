import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import RatingSection from '../components/RatingSection';

const Ratings = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <RatingSection />
      </motion.div>
    </Layout>
  );
};

export default Ratings;

