import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { addProduct } from '../../Firebase/Functions';
import { LogInContext } from '../../Login/Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductForm = () => {
  const { user } = useContext(LogInContext);

  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const SaveData = async (data) => {
    if (!data) {
      toast.error('An error ocurred, try again!');
      return;
    }

    const newProduct = { ...data, createdBy: user.uid };

    toast.promise(addProduct(newProduct), {
      loading: 'Añadiendo producto...',
      success: 'Product added successfully!',
      error: 'An error ocurred while trying to save data.',
    });

    navigate('/', { replace: true });
  };

  return (
    <>
      <div className="max-w-4xl mt-16 mx-auto">
        <form
          onSubmit={handleSubmit(SaveData)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Basic Information</h2>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="id"
                >
                  ID
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="id"
                  disabled={true}
                  type="text"
                  placeholder="ID"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  {...register('Category', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="category"
                >
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                  <option value="category3">Category 3</option>
                </select>
                {errors.Category && (
                  <p className="mt-2 text-red-500 text-xs">
                    This field is required
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="shortDescription"
                >
                  Product Short Description
                </label>
                <textarea
                  {...register('productShortDescription', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="shortDescription"
                  placeholder="Product short description"
                />
                {errors.productShortDescription && (
                  <p className="mt-2 text-red-500 text-xs">
                    This field is required
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="platform"
                >
                  Product Platform
                </label>
                <select
                  {...register('productPlatform', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="platform"
                >
                  <option value="platform1">Platform 1</option>
                  <option value="platform2">Platform 2</option>
                  <option value="platform3">Platform 3</option>
                </select>
                {errors.productPlatform && (
                  <p className="mt-2 text-red-500 text-xs">
                    This field is required
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Media Links</h2>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="mediaLink1"
                >
                  Media Link 1
                </label>
                <input
                  {...register('MediaLink1', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="mediaLink1"
                  type="text"
                  placeholder="Media Link 1"
                />
                {errors.MediaLink1 && (
                  <p className="mt-2 text-red-500 text-xs">
                    This field is required
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="pictureLink"
                >
                  Picture Link
                </label>
                <input
                  {...register('picture', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="pictureLink"
                  type="text"
                  placeholder="Picture Link"
                />
                {errors.picture && (
                  <p className="mt-2 text-red-500 text-xs">
                    This field is required
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <div className="mb-4"></div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="longDescription"
                >
                  Product Long Description
                </label>
                <textarea
                  {...register('longDescription', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="longDescription"
                  placeholder="Product long description"
                />
                {errors.longDescription && (
                  <p className="mt-2 text-red-500 text-xs">
                    This field is required
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="productType"
                >
                  Software Product Type
                </label>
                <select
                  {...register('softwareProductType', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="productType"
                >
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                  <option value="type3">Type 3</option>
                </select>
                {errors.softwareProductType && (
                  <p className="mt-2 text-red-500 text-xs">
                    This field is required
                  </p>
                )}
              </div>
              <div className="mb-4"></div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="productName"
                >
                  Product Name
                </label>
                <input
                  {...register('productName', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="productName"
                  type="text"
                  placeholder="Product Name"
                />
                {errors.productName && (
                  <p className="mt-2 text-red-500 text-xs">
                    This field is required
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
