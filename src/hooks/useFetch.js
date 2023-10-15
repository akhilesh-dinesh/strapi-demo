import { useEffect, useState } from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await fetch(url)
                const jsondata = await res.json();

                setData(jsondata.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);

            }
        }
        fetchData();
    }, [url])
    return {loading, error, data}
}