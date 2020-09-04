import React, { useState, useEffect } from "react";

export const useFetch = ( url ) => {

    console.log("33333333333333");
    //const [page, setPage] = useState(1);

    const [json, setJson] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const response = await fetch(url);
        const jsonData = await response.json();
        //const [user] = jsonData.results;
       // const [user] = jsonData;
        setJson(jsonData);
        setLoading(false);

    };

    useEffect(() => {
        fetchUser();
    }, [url]);

    return { json, loading };
};