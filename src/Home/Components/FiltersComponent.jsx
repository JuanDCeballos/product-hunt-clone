import { useState } from 'react';
import Select from 'react-dropdown-select';
import {
  categoryOptions,
  platformOptions,
  productTypeOptions,
} from '../helpers/const';

export const FiltersComponent = () => {
  const [category, setCategory] = useState({});
  const [platform, setPlatform] = useState({});
  const [productType, setProductType] = useState({});

  const printValues = () => {
    console.log(category.name);
    console.log(platform.name);
    console.log(productType.name);
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
      />

      <h1>Platform</h1>
      <Select
        options={platformOptions}
        labelField="name"
        valueField="id"
        color="#FEA34D"
        multi
        onChange={(val) => setPlatform(val)}
      />

      <h1>Product Type</h1>
      <Select
        options={productTypeOptions}
        labelField="name"
        valueField="id"
        color="#FEA34D"
        multi
        onChange={(val) => setProductType(val)}
      />

      <button
        className="w-full text-white transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-90  duration-300 h-8 rounded-lg mt-3"
        onClick={printValues}
      >
        Aply filters
      </button>
    </div>
  );
};
