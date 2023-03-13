import axios from "axios";
import {
  searchEndpoint,
  imagesEndpoint,
  breedsEndpoint,
  likeEndpoint,
} from "@base/config/config";

//INFO we could split services based on pages or make use of a hook or a lib like React Query in order to destructure isLoading, errors etc
//instead of handling them inside the componenets directly

export const getCatsAPI = async (req: {}) => {
  return axios({
    method: "get",
    headers: {
      "x-api-key":
        "live_DUPDONtit1Sw1X2QcgsptRI3uTBYWqdlJaVET8pS1mFqAQEPDh0coZrb3rjOaQZl", //should be passed through .env variables
    },
    url: searchEndpoint,
    params: req,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getCatById = async (id: string) => {
  return axios({
    method: "get",
    headers: {
      "x-api-key":
        "live_DUPDONtit1Sw1X2QcgsptRI3uTBYWqdlJaVET8pS1mFqAQEPDh0coZrb3rjOaQZl", //should be passed through .env variables
    },
    url: imagesEndpoint + id,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getCatBreeds = async () => {
  return axios({
    method: "get",
    headers: {
      "x-api-key":
        "live_DUPDONtit1Sw1X2QcgsptRI3uTBYWqdlJaVET8pS1mFqAQEPDh0coZrb3rjOaQZl", //should be passed through .env variables
    },
    url: breedsEndpoint,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getCatBreedById = async (req: {}) => {
  return axios({
    method: "get",
    headers: {
      "x-api-key":
        "live_DUPDONtit1Sw1X2QcgsptRI3uTBYWqdlJaVET8pS1mFqAQEPDh0coZrb3rjOaQZl", //should be passed through .env variables
    },
    url: searchEndpoint,
    params: req,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getLikedCatByID = async (req: {}) => {
  return axios({
    method: "get",
    headers: {
      "x-api-key":
        "live_DUPDONtit1Sw1X2QcgsptRI3uTBYWqdlJaVET8pS1mFqAQEPDh0coZrb3rjOaQZl", //should be passed through .env variables
    },
    url: likeEndpoint,
    params: req,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const likeACat = async (req: {}) => {
  return axios({
    method: "post",
    headers: {
      "x-api-key":
        "live_DUPDONtit1Sw1X2QcgsptRI3uTBYWqdlJaVET8pS1mFqAQEPDh0coZrb3rjOaQZl", //should be passed through .env variables
    },
    url: likeEndpoint,
    data: req,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getFavouriteCats = async (req: {}) => {
  return axios({
    method: "get",
    headers: {
      "x-api-key":
        "live_DUPDONtit1Sw1X2QcgsptRI3uTBYWqdlJaVET8pS1mFqAQEPDh0coZrb3rjOaQZl", //should be passed through .env variables
    },
    url: likeEndpoint,
    params: req,
  })
    .then((response) => response.data)
    .catch((error) => error);
  // .catch((error) => {
  //   throw error;
  // });
};

export const removeFavouriteCat = async (id: string) => {
  return axios({
    method: "DELETE",
    headers: {
      "x-api-key":
        "live_DUPDONtit1Sw1X2QcgsptRI3uTBYWqdlJaVET8pS1mFqAQEPDh0coZrb3rjOaQZl", //should be passed through .env variables
    },
    url: likeEndpoint + id,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
