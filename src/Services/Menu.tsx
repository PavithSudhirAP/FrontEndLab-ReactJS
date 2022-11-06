import axios from "axios";
import IDataList from "../Model/IDataList";

const getDataFromServer = () => {
    return axios.get<IDataList[]>(`http://localhost:3000/items`)
    .then(response => response.data);
}

const pushDataFromUser = ( formData : Omit<IDataList,"id"> ) => {
    return axios.post<IDataList>(
        `http://localhost:3000/items`, 
        formData, 
        {
            headers : {
                'Content-Type': 'application/json'
            }
        }
    ).then(response => response.data)
}

export {
    getDataFromServer,
    pushDataFromUser
};