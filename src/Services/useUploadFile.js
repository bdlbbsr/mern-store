import { useContext, useState } from 'react';
import {fileUploadApi} from "./apiRequests"

export function usePostFile() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const create = async (url, file) => {
        try {
            setLoading(true);
            const response = await fileUploadApi(url, file);
            if (response) {
                setData(response);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    return { create, data, loading };
}