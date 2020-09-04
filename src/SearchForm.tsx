import React, { useState } from "react";
import useCustomForm from "./hooks/useCustomForm";
import { Field, IFieldProps } from "./Field";
import { SearchComboFields } from "./SearchComboFields";
import ApiServices from './services/ApiServices'
import { ILicenceDTO } from './DTO'

//https://www.telerik.com/blogs/how-to-build-custom-forms-react-hooks

// default value for each of the fields on the form, key should be the field id
const initialValues = {
    status: "1",    // All
    field: "0"      // --Select Field--
};

const SearchForm = () => {
    const [loading, setLoading] = useState(true);
    const [submitSuccess, setSubmitSuccess] = useState(null);
    const [searchError, setSearchError] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
    } = useCustomForm({
        initialValues,
        onSubmit: values => {
            console.log("oooonsubmit");
        }
    });

    const myhandleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        console.log("==>myhandleSubmit");
        console.log({ values });
        // console.log(this.state.values);

        if (validateForm()) {
            // await submitForm();
            const submitSuccess: boolean = await submitForm();
            //console.log(searchState.error);
            //console.log("jsonData retrieved after submitForm=>" + JSON.stringify({ searchState.jsonData }));
            //this.setState({ submitSuccess });
            setSubmitSuccess(submitSuccess);
        }
    }

    function validateForm(): boolean {
        // TODO - validate form
        return true;
    }

    function getUrl() {
        // 'https://pokeapi.co/api/v2/pokemon/1' TODO remove it
        console.log("getUrl==>");
        console.log({ values });
        let url = "https://health-products.canada.ca/api/natural-licences/productlicence/?lang=en&type=json";
        if ((`${values.field}` + '') === "8") {
            url += `&id=${values.criteria}`;
        }
        console.log(url);
        return url;
    }

    async function submitForm() { 
        const service = new ApiServices(getUrl());
        const { error, jsonData } = await service.doGet();
        setSearchError(error);

        if (!error) {
            // Map the API return to our DTO
            // TODO - is there a better way to do the mapping?
            const DTOs: ILicenceDTO[] = [] as Array<ILicenceDTO>;
            jsonData.map(data => {
                const dto: ILicenceDTO = {
                    licence_number: data.licence_number,
                    product_name: data.product_name,
                    flag_primary_name: data.flag_primary_name,
                    flag_product_status: data.flag_product_status
                };
                DTOs.push(dto);

            });
            setSearchResult(DTOs);
        }
        return true;
    }

    let searchFieldSetting: IFieldProps = {
        id: "field",
        label: "Search Field",
        editor: "dropdown",
        options: ["--Select Field--|0", "Brand Name(s)|1", "Medicinal Ingredient|4", "NPN/DIN-HM*|8"],
        onChange: handleChange
    };

    let operatorSetting: IFieldProps = {
        id: "operator",
        label: "Operator",
        editor: "dropdown",
        options: ["Contains|0", "Begins with|1", "Exactly equals|2", "Does not contain|3"],
        onChange: handleChange
    };

    let fieldValueSetting: IFieldProps = {
        id: "criteria",
        label: "Criterion",
        onChange: handleChange 
    };

    return (
        <div>
            <form onSubmit={myhandleSubmit}>
                <div className="alert alert-info" role="alert">
                    Search Criteria
                </div>

                <Field id="status" label="Current Status" editor="dropdown"
                    options={["All|5", "Active|1"]} onChange={handleChange} />
 
                <SearchComboFields searchField={searchFieldSetting} operator={operatorSetting} fieldValue={fieldValueSetting} />

                <button type="submit">Submit</button>
            </form>

            <div>
                {/* TODO 
                1. display loading sign when the calling the service
                2. display the proper message if the service call returns status!=200
                3. format the all elements in the DTO
                 */}
                {searchResult.length > 0 && 
                searchResult.map(dto =>
                    (<div>{dto.product_name}</div>))
                }
                 
                {/* ref https://dev.to/camilomejia/fetch-data-with-react-hooks-and-typescript-390c
                    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' &&
        service.payload.results.map(starship => (
          <div key={starship.url}>{starship.name}</div>
        ))}
      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>

                {JSON.stringify(searchState.jsonData)}
                 */}
       
            </div>

        </div>
    );
};

export default SearchForm;