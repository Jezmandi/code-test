import axios from "axios";
import { Product } from "../interfaces";

interface GetDataParams {
  // page: number,
  limit: number;
  skip: number;
}

interface ResponseData {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const getData = (params: GetDataParams) => {
  return axios.get<ResponseData>(`https://dummyjson.com/products`, { params });
};
