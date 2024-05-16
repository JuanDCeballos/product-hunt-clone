import { TopLaunches } from '../../Home/Components/TopLaunches.jsx';
import { RelatedTopicsComponent } from './RelatedTopicsComponent.jsx';
import { ProductsFeedComponent } from './ProductsFeedComponent.jsx';
import { FiltersComponent } from './FiltersComponent.jsx';

export const HomePageComponent = () => {
  return (
    <>
      <div className="flex flex-row mt-12">
        <div className="w-3/5 border-r border-inherit px-12 flex flex-col space-y-8 ml-36 mr-10">
          <div className="flex flex-col space-y-12 ">
            <ProductsFeedComponent />
          </div>
        </div>

        <div className="w-1/5">
          <FiltersComponent />
          <RelatedTopicsComponent />
        </div>
      </div>
    </>
  );
};
