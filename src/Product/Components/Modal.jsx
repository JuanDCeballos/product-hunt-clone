import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Modal from 'react-modal';
import ReactStars from 'react-rating-stars-component';
import { Carousel } from 'react-responsive-carousel';
import { BiSolidUpArrow } from 'react-icons/bi';
import { CiChat2, CiBookmark } from 'react-icons/ci';
import { IoShareOutline } from 'react-icons/io5';
import { PiChartBarThin } from 'react-icons/pi';
import Review from './Review';

Modal.setAppElement(document.getElementById('root'));

const ProductView = ({ isOpen, closeModal, product }) => {

  const { picture, productName, productShortDescription, RatingCount
  } = product;

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={closeModal} width={600}>
        <div className='font-mono'>
          <div className='flex flex-col sm:flex-col'>
            <img
              src={picture}
              className='size-16'
            />
            <div className='sm:flex sm:flex-row sm:gap-4'>
              <div>
                <h1 className='font-black text-2xl'>{productName}</h1>
                <h2>{productShortDescription}</h2>
              </div>
              <div className='sm:flex sm:flex-row sm:gap-4'>
                <div className='flex my-3'>
                  <button className='rounded-md border-2 border-neutral-400 mr-3 py-2 px-2 text-black hover:border-orange-400'>
                    Visit
                  </button>
                  <button className='bg-red-500 rounded-md flex items-center text-center justify-center text-white p-1.5 hover:bg-red-600 lg:w-52'>
                    <BiSolidUpArrow /> UPVOTE {RatingCount}
                  </button>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <div>
                <p className='text-slate-500'>Free</p>
              </div>
              <div>
                <p>
                  Meet Notion Calendar — integrated and synced with all your
                  Google Calendar events. (1) Simplify time management. (2)
                  Fully integrated with your Notion workspace. (3) All your
                  commitments in one place.
                </p>
              </div>
              <div className='flex flex-wrap gap-1'>
                <button className='inline-flex gap-1 items-center hover:text-orange-400'>
                  <CiChat2 />
                  Discuss
                </button>
                <button className='inline-flex gap-1 items-center hover:text-orange-400'>
                  <CiBookmark />
                  Collect
                </button>
                <button className='inline-flex gap-1 items-center hover:text-orange-400'>
                  <IoShareOutline />
                  Share
                </button>
                <button className='inline-flex gap-1 items-center hover:text-orange-400'>
                  <PiChartBarThin />
                  Stats
                </button>
              </div>
              <Carousel
                showStatus={false}
                showThumbs={false}
                showIndicators={false}
                width={368}
              >
                <div>
                  <iframe
                    src='https://www.youtube.com/embed/C4Q2ezioTUM?si=5ICB4qL4rbhNggBk'
                    title='YouTube video player'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerPolicy='strict-origin-when-cross-origin'
                    allowFullScreen
                    className='h-52'
                  ></iframe>
                </div>
                <div>
                  <img
                    src='https://ph-files.imgix.net/d7022da1-ff88-4e46-afa4-18bf281b5d52.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=368&h=220&fit=max&dpr=1'
                    className='w-96 h-52'
                  />
                </div>
                <div>
                  <img
                    src='https://ph-files.imgix.net/a1971dd7-cfbb-4712-9ebe-980e6b6cc5ba.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=368&h=220&fit=max&dpr=1'
                    className='h-52'
                  />
                </div>
                <div>
                  <img
                    src='https://ph-files.imgix.net/39c85f7e-9d0a-4dbc-8a43-5592ed51f42f.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=368&h=220&fit=max&dpr=1'
                    className='h-52'
                  />
                </div>
              </Carousel>
              <div className='flex flex-col max-w-7xl bg-slate-200 border-2 border-slate-300 rounded-md items-center p-3 mb-4 md:justify-between md:flex-row'>
                <h2 className='font-semibold'>What do you think of {productName}?</h2>
                <ReactStars
                  count={5}
                  size={34}
                  activeColor='#ffd700'
                ></ReactStars>
              </div>
              <Review />
              <Review />
              <Review />
              <Review />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductView;
