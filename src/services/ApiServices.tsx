import React, { constructor } from 'react';

//https://github.com/shubhamd99/react-typescript-pokemonapi/blob/master/src/components/PokemonSearch.tsx
interface ISearchState {
    error: boolean,
    jsonData: any,
}

class ApiServices {
    constructor(private url: string) {
        this.url = url;
    }

    // retrieve data
    async doGet(): Promise<ISearchState> {
        console.log("----ApiServices:doGet")

        // let searchState: ISearchState = { error: false, jsonData: null };
        
        //    return fetch(this.url)     // TODO add header
        //         .then(res => {
        //             if (res.status !== 200) {
        //                 searchState.error = true;     // TODO how to use setter
        //             };
        //             res.json().then(data => {
        //                 console.log("doGet==>" + JSON.stringify(data));
        //                 searchState.error = false;     // TODO how to use setter
        //                 searchState.jsonData = data;
        //             })
        //         })

        //    // return searchState;
        // }


        return fetch(this.url)     // TODO add header
            .then(res => {
                if (res.status !== 200) {
                    return {
                        error: true,
                        jsonData: null,
                    };
                }
                return res.json()
            })
            .then(data => {
                //console.log("doGet==>" + JSON.stringify(data));
                return {
                    error: false,     // TODO how to use setter
                    jsonData: data,
                };
            })
    }
}

export default ApiServices;