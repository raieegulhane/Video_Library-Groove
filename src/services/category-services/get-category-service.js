import axios from "axios";

export const getCategoriesService = () => {
    const response = axios.get("/api/categories");
    return(response);
}