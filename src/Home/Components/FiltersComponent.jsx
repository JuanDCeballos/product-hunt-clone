import { useContext, useState } from 'react';
import Select from 'react-dropdown-select';
import {
  categoryOptions,
  platformOptions,
  productTypeOptions,
} from '../helpers/const';
import { ProductContext } from '../../Product/Contexts';

export const FiltersComponent = () => {
  const { addFilter, cleanFilter, isGettingData } = useContext(ProductContext);

  const [category, setCategory] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [productType, setProductType] = useState([]);

  const setFilters = () => {
    if (!category && !platform && !productType) {
      cleanFilter();
      return;
    }

    addFilter(getNames(category), getNames(platform), getNames(productType));
  };

  const clearFilters = () => {
    setCategory([]);
    setPlatform([]);
    setProductType([]);

    cleanFilter();
  };

  const getButtonStyleByIsGettingData = (isGettingData) => {
    if (!isGettingData) {
      return 'w-full text-white transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-90  duration-300 h-8 rounded-lg mt-3';
    }
    return 'w-full text-white transition ease-in-out delay-150 bg-red-100 h-8 rounded-lg mt-3 cursor-not-allowed';
  };

  const getNames = (data) => {
    if (data.length <= 0 || data == {}) {
      return [];
    }

    const result = [];
    data?.forEach((obj) => result.push(obj.name));
    return result;
  };

  return (
    <div className="flex flex-col gap-3 p-6 rounded-lg shadow-lg">
      <h1>Category</h1>
      <Select
        options={categoryOptions}
        labelField="name"
        valueField="id"
        color="#FEA34D"
        multi
        onChange={(val) => setCategory(val)}
        values={category}
        disabled={isGettingData}
      />

      <h1>Platform</h1>
      <Select
        options={platformOptions}
        labelField="name"
        valueField="id"
        color="#FEA34D"
        multi
        onChange={(val) => setPlatform(val)}
        values={platform}
        disabled={isGettingData}
      />

      <h1>Product Type</h1>
      <Select
        options={productTypeOptions}
        labelField="name"
        valueField="id"
        color="#FEA34D"
        multi
        onChange={(val) => setProductType(val)}
        values={productType}
        disabled={isGettingData}
      />

      <button
        className={getButtonStyleByIsGettingData(isGettingData)}
        onClick={setFilters}
        disabled={isGettingData}
      >
        Aply filters
      </button>
      <button
        className={getButtonStyleByIsGettingData(isGettingData)}
        onClick={clearFilters}
        disabled={isGettingData}
      >
        Clear filters
      </button>
    </div>
  );
};
