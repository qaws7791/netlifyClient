import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import styled from "styled-components";

const Container = styled.div`
    background-color: indianred;
    width:400px;
    padding:50px;

`

const Header = styled.div`
    height:80px;
`

const Title = styled.h1`
    color:#fff;
    font-size:3em;
    text-align:right;
`
const SubTitle = styled.h1`
    color:#fff;
    text-align:right;
`

const TodoitemContainer = styled.li`
    list-style:none;
    background-color:#ccc;
    border-radius:2px;
    height:30px;
    margin-bottom:20px;
    padding:10px;
`
const Todolist = styled.ul`
    list-style:none;
`

const GET_TODO = gql`
 query {
     todos {
         id
         name
         did
     }
 }
`;


// ADD_Cat은 mutation이름이 아니라 그냥 wrapping하는것 
// 여기서 variables에서 받아오는 정보의 타입을 정의
const ADD_TODO = gql`
    mutation ADD_TODO($name: String!){ 
        createTodo(name: $name) {
        name
        did
        }
    }
`;

const DELETE_TODO = gql`
    mutation DELETE_TODO($id: ID!){
        deleteTodo(id:$id)
    }
`;

export default () => {

    
    const { loading, data, refetch } = useQuery(GET_TODO, {
         pollInterval:500,
    });
    const [name, setName] = useState('');
    const [addTodo] = useMutation(ADD_TODO);
    const onChangeName = e => {
        setName(e.target.value);
      };

    return (
        <Container>
        <Header>
            <Title>Todo List</Title>
            <SubTitle>using merng</SubTitle>
        </Header>
        
        {loading && <h1>loading...</h1>}
        <Todolist>
        {data?.todos?.map( c => (
                <Todoitem name={c.name} id={c.id}>
                    
                </Todoitem>
            ))}
        </Todolist>
            

         <input value={name} onChange={onChangeName} />
         <button onClick={e => {
            e.preventDefault();
            addTodo({
                variables: {name: name}
            });
            refetch();
        }}>ada</button>
        {/* <Createbtn></Createbtn> */}
        </Container>
        
    )
}

const Todoitem = ({name,id}) => {
    const [deleteTodo] = useMutation(DELETE_TODO,{
        refetchQueries:['GET_TODO']
    });

    return(
    <TodoitemContainer>
    <p>{name}</p>
    <button onClick={e => {
            e.preventDefault();
            deleteTodo({
                variables:{id:id}
            });
        }}>
            삭제
    </button>
    </TodoitemContainer>
    )
}