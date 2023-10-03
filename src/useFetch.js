import { useState, useEffect } from "react";
// custom hook to fetch data from db.json

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() =>{
        const abortConst = new AbortController();
        
        //timeout to simulate loading speeds in an actual webpage
        setTimeout(()=> {
            fetch(url, { signal: abortConst.signal})
            .then(res => {
                console.log(res);
                if (!res.ok){
                    throw Error('could not fetch the Pizza data');
                }
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setData(data)
                setIsLoading(false)
                setError(null);
            })
            .catch( err => {
                if(err.name === 'AbortError'){
                    console.log('fetch aborted')
                } else {
                    setError(err.message);
                    setIsLoading(false);
                }
            })
        }, 200);
        
        return () => abortConst.abort();
    }, [url] );
    return {data, isLoading, error}
}
export default useFetch;