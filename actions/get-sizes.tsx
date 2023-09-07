import { Size } from "@/types";
import axios from "axios";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/sizes`;

const getSizes = async (): Promise<Size[]> => {
  const {data} = await axios.get(URL);

  return data;
};

export default getSizes;