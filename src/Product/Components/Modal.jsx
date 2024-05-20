import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Modal from 'react-modal';
import ReactStars from 'react-rating-stars-component';
import { Carousel } from 'react-responsive-carousel';
import { CiChat2, CiBookmark } from 'react-icons/ci';
import { IoShareOutline } from 'react-icons/io5';
import { PiChartBarThin } from 'react-icons/pi';
import { IoMdClose } from 'react-icons/io';
import { Review } from './Review';
import { useContext, useRef, useState } from 'react';
import { ProductContext } from '../Contexts';
import { useEffect } from 'react';
import { LogInContext } from '../../Login/Context/LogInContext';
import { toast } from 'sonner';
import { addCommentInProduct } from '../../Firebase/Functions';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement(document.getElementById('root'));

const ProductView = ({ isOpen, closeModal }) => {
  const { productToShowInModal, SetProductToShowInModal } =
    useContext(ProductContext);
  const textAreaRef = useRef();
  const [val, setVal] = useState('');
  const [rating, setRating] = useState(0);
  const { productsList, setProductsList } = useContext(ProductContext);

  const navigate = useNavigate();

  const { user } = useContext(LogInContext);
  const onInputChange = (e) => {
    setVal(e.target.value);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.scrollHeight + 'px';
    }
  }, [val]);

  const onChangeStarsRating = (newRating) => {
    setRating(newRating);
  };

  const onComment = () => {
    if (!val) {
      toast.warning('You need to write something first!');
      return;
    }

    const comment = {
      Message: val,
      UserName: user.displayName,
      UserUID: user.uid,
      UserPhotoURL: user.photoURL,
      UserDescription: user.profileDesc,
      Rating: rating,
    };

    if (!comment.UserDescription) {
      comment.UserDescription = 'User without description';
    }

    toast.promise(addCommentInProduct(productToShowInModal.id, comment), {
      loading: 'Saving comment...',
      error: 'An error ocurred while trying to comment.',
      success: () => {
        const commentsUpdated = productToShowInModal.comments;
        commentsUpdated.push(comment);
        const newAverageRating =
          commentsUpdated.reduce(
            (partialSum, currentComment) => partialSum + currentComment.Rating,
            0
          ) / commentsUpdated.length;
        const newProduct = {
          ...productToShowInModal,
          comments: commentsUpdated,
          averageRating: newAverageRating,
        };
        const targetProductIndex = productsList.findIndex(
          (product) => product.id === productToShowInModal.id
        );
        const currentProducts = [...productsList];
        currentProducts[targetProductIndex].commentsCount =
          commentsUpdated.length;
        setProductsList(currentProducts);
        SetProductToShowInModal(newProduct);
        setVal('');
        setRating(0);
        return 'Comment sended!';
      },
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={closeModal} width={600}>
        <div className="font-mono">
          <div className="flex flex-col sm:flex-col">
            <div className="flex justify-between">
              <img src={productToShowInModal?.picture} className="size-16" />
              <button
                onClick={closeModal}
                className="text-5xl font-black hover:text-orange-400"
              >
                <IoMdClose />
              </button>
            </div>
            <div className="sm:flex sm:flex-row sm:gap-4">
              <div>
                <h1 className="font-black text-2xl">
                  {productToShowInModal?.productName}
                </h1>
                <h2>{productToShowInModal?.productShortDescription}</h2>
              </div>
              <div className="sm:flex sm:flex-col sm:gap-4">
                <div className="flex my-3">
                  <button className="rounded-md border-2 border-neutral-400 mr-3 py-2 px-2 text-black hover:border-orange-400">
                    Visit
                  </button>
                  <button className="border-4 border-orange-300 rounded-md flex items-center text-center justify-center text-black p-1.5  lg:w-80 cursor-default  ">
                    <div className="flex flex-row justify-center items-center gap-4">
                      <p className="text-sm"> Average rating </p>
                      {
                        <ReactStars
                          value={productToShowInModal?.averageRating}
                          edit={false}
                          count={5}
                          size={34}
                          activeColor="#ffd700"
                          isHalf={true}
                        ></ReactStars>
                      }
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-slate-500">Free</p>
              </div>
              <div>
                <p>{productToShowInModal?.longDescription}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                <button className="inline-flex gap-1 items-center hover:text-orange-400">
                  <CiChat2 />
                  Discuss
                </button>
                <button className="inline-flex gap-1 items-center hover:text-orange-400">
                  <CiBookmark />
                  Collect
                </button>
                <button className="inline-flex gap-1 items-center hover:text-orange-400">
                  <IoShareOutline />
                  Share
                </button>
                <button className="inline-flex gap-1 items-center hover:text-orange-400">
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
                    src={productToShowInModal?.MediaLink}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="h-52"
                  ></iframe>
                </div>
                <div>
                  <img
                    src="https://ph-files.imgix.net/d7022da1-ff88-4e46-afa4-18bf281b5d52.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=368&h=220&fit=max&dpr=1"
                    className="w-96 h-52"
                  />
                </div>
                <div>
                  <img
                    src="https://ph-files.imgix.net/a1971dd7-cfbb-4712-9ebe-980e6b6cc5ba.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=368&h=220&fit=max&dpr=1"
                    className="h-52"
                  />
                </div>
                <div>
                  <img
                    src="https://ph-files.imgix.net/39c85f7e-9d0a-4dbc-8a43-5592ed51f42f.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=368&h=220&fit=max&dpr=1"
                    className="h-52"
                  />
                </div>
              </Carousel>
              <div className="flex flex-col w-3/5 border-t border-b border-gray-400 items-center p-3 mb-4">
                {user ? (
                  <>
                    <div className="flex w-full md:flex-row items-center p-3 mb-4">
                      <h2 className="font-semibold p-3">
                        What do you think of {productToShowInModal?.productName}
                        ?
                      </h2>
                      <ReactStars
                        value={rating}
                        count={5}
                        size={34}
                        activeColor="#ffd700"
                        isHalf={true}
                        onChange={onChangeStarsRating}
                      ></ReactStars>
                    </div>
                    <div className="flex justify-between w-full">
                      <img
                        src={user?.photoURL}
                        className="w-10 h-10 rounded-full m-4"
                      />
                      <textarea
                        className="focus:outline-none flex-1 rounded-lg p-3 resize-none"
                        type="text"
                        placeholder="What's on your mind?"
                        value={val}
                        onChange={onInputChange}
                        rows="2"
                        ref={textAreaRef}
                      ></textarea>
                    </div>
                    <div className="flex w-full justify-end items-end m-2.5">
                      <button
                        onClick={onComment}
                        className="w-36 bg-red-500 rounded-md flex items-center text-center justify-center text-white p-1.5 hover:bg-red-600"
                      >
                        Comment
                      </button>
                    </div>
                  </>
                ) : (
                  <div
                    className="flex flex-col cursor-pointer"
                    onClick={() => {
                      navigate('/LogIn', { replace: true });
                    }}
                  >
                    <p className="font-black text-2xl"> LogIn to comment! </p>
                    <img src="LogIn.svg" className="size-48" />
                  </div>
                )}
              </div>
              {productToShowInModal?.comments?.map((comment) => (
                <Review key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductView;
