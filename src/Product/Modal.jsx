import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Modal from 'react-modal';
import ReactStars from 'react-rating-stars-component';
import { Carousel } from 'react-responsive-carousel';
import { BiSolidUpArrow } from 'react-icons/bi';
import { CiChat2, CiBookmark } from 'react-icons/ci';
import { IoShareOutline } from 'react-icons/io5';
import { PiChartBarThin } from 'react-icons/pi';

Modal.setAppElement(document.getElementById('root'));

const ProductView = ({ isOpen, closeModal }) => {
  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <div className='font-mono'>
          <div className='flex flex-col sm:flex-col'>
            <img
              src='https://ph-files.imgix.net/fb840955-b221-4af8-bb41-cc040a28fcf0.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=48&h=48&fit=crop&dpr=1'
              className='size-16'
            />
            <h1 className='font-black text-2xl'>Notion Calendar</h1>
            <div className='sm:flex sm:flex-row sm:gap-4'>
              <h2>Beautifully designed for your work and life</h2>
              <div className='flex my-3'>
                <button className='rounded-md border-2 border-neutral-600 mr-3 py-2 px-2 text-black'>
                  Visit
                </button>
                <button className='bg-red-500 rounded-md flex items-center text-center justify-center text-white'>
                  <BiSolidUpArrow />
                  80 UPVOTE
                </button>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <div>
                <p>Free</p>
              </div>
              <div>
                <p>
                  Meet Notion Calendar — integrated and synced with all your
                  Google Calendar events. (1) Simplify time management. (2)
                  Fully integrated with your Notion workspace. (3) All your
                  commitments in one place.
                </p>
              </div>
              <div className='flex flex-wrap'>
                <button className='inline-flex'>
                  <CiChat2 />
                  Discuss
                </button>
                <button className='inline-flex'>
                  <CiBookmark />
                  Collect
                </button>
                <button className='inline-flex'>
                  <IoShareOutline />
                  Share
                </button>
                <button className='inline-flex'>
                  <PiChartBarThin />
                  Stats
                </button>
              </div>
              <Carousel
                showStatus={false}
                showThumbs={false}
                showIndicators={false}
              >
                <div>
                  <iframe
                    src='https://www.youtube.com/embed/C4Q2ezioTUM?si=5ICB4qL4rbhNggBk'
                    title='YouTube video player'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerPolicy='strict-origin-when-cross-origin'
                    allowFullScreen
                  ></iframe>
                </div>
                <div>
                  <img src='https://ph-files.imgix.net/d7022da1-ff88-4e46-afa4-18bf281b5d52.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=368&h=220&fit=max&dpr=1' />
                </div>
                <div>
                  <img src='https://ph-files.imgix.net/a1971dd7-cfbb-4712-9ebe-980e6b6cc5ba.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=368&h=220&fit=max&dpr=1' />
                </div>
                <div>
                  <img src='https://ph-files.imgix.net/39c85f7e-9d0a-4dbc-8a43-5592ed51f42f.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=368&h=220&fit=max&dpr=1' />
                </div>
              </Carousel>
              <div className='bg-slate-200 border-2 border-slate-300 rounded-md'>
                <h2>What do you think of Notion?</h2>
                <ReactStars
                  count={5}
                  size={24}
                  activeColor='#ffd700'
                ></ReactStars>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductView;
