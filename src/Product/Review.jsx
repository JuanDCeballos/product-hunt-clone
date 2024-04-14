import ReactStars from 'react-rating-stars-component';

const Review = () => {
  return (
    <div>
      <div className='flex gap-2 items-center'>
        <div>
          <img
            src='https://ph-avatars.imgix.net/6982560/original.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=40&h=40&fit=crop&dpr=1'
            className='rounded-full'
          />
        </div>
        <div>
          <div className='flex flex-row gap-2'>
            <a className='text-base font-semibold' href=''>
              John Doe
            </a>
            <button className='text-xs text-orange-500'>Follow</button>
          </div>
          <p className='text-sm'>Founder & Leadership</p>
        </div>
      </div>
      <div>
        <div>
          <ReactStars
            count={5}
            activeColor='#2563eb'
            size={24}
            value={5}
            edit={false}
          ></ReactStars>
        </div>
        <p className='text-lg italic font-normal text-slate-500'>
          I use Notion for all my document keeping as of now. Amazing to use.
        </p>
      </div>
      <hr className='mt-8' />
    </div>
  );
};

export default Review;
