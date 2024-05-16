import { ProductReducerTypes } from '../Types';

export const ProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ProductReducerTypes.setProductToShowInModal:
      return {
        ...state,
        productToShowInModal: action.payload,
      };

    case ProductReducerTypes.setProductEdit:
      return {
        ...state,
        productToEdit: action.payload,
      };

    case ProductReducerTypes.deleteProductToEdit:
      return {
        ...state,
        productToEdit: undefined,
      };

    case ProductReducerTypes.deleteProductToShowInModal:
      return {
        ...state,
        productToShowInModal: undefined,
      };

    case ProductReducerTypes.error:
      return {
        ...state,
        productToEdit: undefined,
        productToShowInModal: undefined,
        errorMessage: action.payload,
      };

    case ProductReducerTypes.addFilters:
      return {
        ...state,
        categories: action.payload.categories,
        platform: action.payload.platform,
        productType: action.payload.productType,
      };

    case ProductReducerTypes.cleanFilters:
      return {
        ...state,
        categories: undefined,
        platform: undefined,
        productType: undefined,
      };
    default:
      return state;
  }
};
