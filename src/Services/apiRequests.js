import axios from "axios";

const api_base_URL = "https://mern-store-backend-sigma.vercel.app/api";

export const getAPI = (path) => {

    const userDtl = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {}
    const token = userDtl.token

    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${api_base_URL}${path}`,
        headers: { 'Authorization': `Bearer ${token}` },
    };

    return axios(config)
        .then(function (response) {
            return response.data

        })
        .catch(function (error) {
            //console.log("errrrr", error.response.status)
            return { error: true, message: error }
        });
}

export const getSingleAPI = (path, id) => {

    const userDtl = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {}
    const token = userDtl.token

    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${api_base_URL}${path}/${id}`,
        headers: { 'Authorization': `Bearer ${token}` },
    };

    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return { error: true, message: error }
        });
}

export const postAPI = (path, body) => {

    const userDtl = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {}
    const token = userDtl.token

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${api_base_URL}${path}`,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        data: body
    };

    return axios(config)
        // .then(function (response) {
        //     return response.data
        // })
        .then((response) => {
            if (response?.status == 200 || response?.status == 201 || response?.status == 202) {
                return response?.data
            } else {
                throw new Error(response)
            }
        })
        .catch(function (error) {
            return { error: true, message: error }
        });


}

export const patchAPI = (path, body) => {

    const userDtl = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {}
    const token = userDtl.token

    var config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `${api_base_URL}${path}`,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        data: body
    };

    return axios(config)
        .then(function (response) {
           
            return response.data
        })
        .catch(function (error) {
            
            return { error: true, message: error }
        });


}



export const deleteAPI = (path, id) => {

    const token = JSON.parse(localStorage.getItem('token'));

    var config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${api_base_URL}${path}/${id}`,
        headers: { 'Authorization': `Bearer ${token}` },

    };

    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return { error: true, message: error }
        });


}

export const fileUploadApi = async (url, file) => {
    let body = new FormData();
    body.append("file", file, file.name);
    return axios
        .post(url, body, { withCredentials: false })
        .then((response) => {
            if (response?.status == 200 || response?.status == 201 || response?.status == 202) {
                return response?.data?.data
            } else {
                throw new Error(response)
            }
        })
        .catch((error) => {
            return { error: true, message: error?.message }
        });
}


//  export const getAPIqs = (path, body) => {

//       const token = JSON.parse(localStorage.getItem('token'));

//       var config = {
//           method: 'patch',
//           maxBodyLength: Infinity,
//           url: `${api_base_URL}${path}`,
//           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/x-www-form-urlencoded' } ,
//           data: body
//       };

//       return axios(config)
//           .then(function (response) {
//               return response.data.data
//           })
//           .catch(function (error) {
//               return { error: true, message: error }
//           });
//   }



export const UploadSingleImage = async (singleFile) => {

    try {
        let singleImagelUrl = '';
        if (singleFile) {
            const thumbnailFormData = new FormData();
            thumbnailFormData.append('file', singleFile);
            const thumbnailResponse = await axios.post(`${api_base_URL}/upload`, thumbnailFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            singleImagelUrl = thumbnailResponse.data.url;
            
        }


        return singleImagelUrl;


    } catch (error) {
        console.error(error);
    }



}



export const UploadMultipleImage = async (multipleFile) => {

    try {
        let multipleImageUrls = [];
        if (multipleFile.length > 0) {
            const imageUploadPromises = multipleFile.map(image => {
                const imageFormData = new FormData();
                imageFormData.append('file', image);
                return axios.post(`${api_base_URL}/upload`, imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            });

            const imageResponses = await Promise.all(imageUploadPromises);
            multipleImageUrls = imageResponses.map(response => response.data.url);
        }

        return multipleImageUrls;

    } catch (error) {
        console.error(error);
    }


}