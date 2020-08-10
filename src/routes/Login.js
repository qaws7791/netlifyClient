import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import styled from "styled-components";

const Login_user = gql`
    mutation Login_user($id: String!, $password: String!){
        login(username:$id, password:$password)
    }
`
export default () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser] = useMutation(Login_user, {});

    const onChangeId = e => {
        setId(e.target.value);
      };

    const onChangePassword = e => {
    setPassword(e.target.value);
    };

    return(
        <>
            <p>Id:</p><input type="text" onChange={onChangeId}></input>
            <p>password:</p><input type="text" onChange={onChangePassword}></input>
            <button onClick={ e => {
                e.preventDefault();
                loginUser({
                    variables: {id:id, password:password}
                });
            }}>Login</button>
        </>
    )
}