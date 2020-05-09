import React from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_CATS = gql`
 query {
     cats {
         id
         name
     }
 }
`;

// ADD_Cat은 mutation이름이 아니라 그냥 wrapping하는것 
// 여기서 variables에서 받아오는 정보의 타입을 정의
const ADD_CAT = gql`
    mutation ADD_Cat($name: String!){ 
	createCat(name: $name) {
    id
    name
  }
}
`;

export default () => {

    
    //const [addCat, {data}] = useMutation(ADD_CAT);
     const { loading, data } = useQuery(GET_CATS);

    return (
        <div>
        {loading && <h1>loading...</h1>}
        <h1>name</h1>
        {data?.cats?.map( c => (
            <p> {c.name}</p>
        ))}
        {/* <button onClick={e => {
            e.preventDefault();
            addCat({
                variables: {name: "cat3"}
            });
        }}>ada</button> */}
        </div>
        
    )
}
