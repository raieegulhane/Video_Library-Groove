import axios from "axios";

export const getCategoryByIdService = (categoryId) => {
    const response = axios.get(`/api/category/${categoryId}`);
    return(response);
}