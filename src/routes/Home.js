import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import "./Home.css";


const Container = styled.div`
    
    background-color: #FC9D9A;
    min-width:300px;
    width:100%;
    padding:50px;
    font-family: 'Nanum Pen Script', cursive;
    font-size:1rem;
    
    

`

const Header = styled.div`
    padding-bottom:50px;
`

const Title = styled.h1`
    color:#fff;
    font-size:3rem;
    line-height:1;
    text-align:right;
`
const SubTitle = styled.h1`

    color:#fff;
    text-align:right;

    &::after {
        content:'';
        position: relative;
        display:block;
        top:20px;
        width:100%;
        height:1px;
        background-color:#fff;
    }
`

const TodoitemContainer = styled.li`
    position: relative;
    list-style:none;
    background-color:#F9CDAD;
    border-radius:2px;
    margin-bottom:20px;
    padding:10px;
    color: #fff;
    
`
const DelBtn = styled.button`
    display: inline-block;
    background-color:#FFAE7D;
    
    border: none;
    border-radius:4px;
    padding:3px 7px;
    color: #fff;
    font-size:1.0rem;
    font-family: 'Nanum Pen Script', cursive;
`

const UpdateBtn = styled.button`
    display: inline-block;
    background-color:#FFAE7D;
    margin-right:10px;
    border: none;
    border-radius:4px;
    padding:3px 7px;
    color: #fff;
    font-size:1.0rem;
    font-family: 'Nanum Pen Script', cursive;
`
const AddBtn = styled.button`
display: inline-block;
position: absolute;
right:0;
top:8px;
background-color:#FFAE7D;
margin-right:10px;
border: none;
border-radius:4px;
padding:3px 7px;
color: #fff;
font-size:1.0rem;
font-family: 'Nanum Pen Script', cursive;
`

const Todolist = styled.ul`
    list-style:none;
`

const InputText = styled.input`
    width: 100%;
    border: none;
    background-color:#ccc;
    border-radius:2px;
    color:#fff;
    position: relative;
    height:50px;
    margin-bottom:20px;
    padding:10px 0px;
    font-size: 1rem;
    font-family: 'Nanum Pen Script', cursive;
    text-indent:10px;
    
`
const InputEdit = styled.input`
    width:100%;
    border: none;
    background-color:#F9CDAD;
    border-radius:2px;
    color:#fff;
    position: relative;
    height:100%;
    font-size: 1rem;
    font-family: 'Nanum Pen Script', cursive;
    overflow: visible;
`

const InputBox = styled.div`
    position: relative;
`

const BtnBox = styled.div`
    display: inline-block;
    position: relative;
    text-align:right;
    top:8px;
    right:10px;
`

const Content = styled.p`
    display:inline-block;
`
//////////////////////////////styled-component//////////////////////////////////////

const GET_TODO = gql`
 query {
     todos {
         id
         name
         did
     }
 }
`;



// ADD_TODO은 mutation이름이 아니라 그냥 wrapping하는것 
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

const UPDATE_TODO = gql`
    mutation UPDATE_TODO($id: ID!, $name: String!,$did:Boolean){
        updateTodo(id:$id, name:$name, did:$did){
            name
        }
    }
`

const ME = gql`
    query ME{
        me{
            username
        }
    }
`
export default () => {

    const {_,username} = useQuery(ME,{});
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
            <Title> {username} Todo List</Title>
            <SubTitle>using merng</SubTitle>
        </Header>
        
        {loading && <h1>loading...</h1>}
        <Todolist>
        {data?.todos?.map( c => (
                <Todoitem name={c.name} id={c.id}>
                    
                </Todoitem>
            ))}
        </Todolist>
            
        <InputBox>
        <InputText type={"text"} maxLength={10} value={name} onChange={onChangeName} />
         <AddBtn onClick={e => {
            e.preventDefault();
            addTodo({
                variables: {name: name}
            });
            refetch();
        }}>ADD</AddBtn>
        </InputBox>
         
        {/* <CreateDelbtn></CreateDelbtn> */}
        </Container>
        
    )
}

const Todoitem = ({name,id}) => {
    const [deleteTodo] = useMutation(DELETE_TODO,{
        refetchQueries:['GET_TODO']
    });

    const [updateTodo] = useMutation(UPDATE_TODO, {});
    const [content, setName] = useState(name);
    const onChangeName = e => {
        setName(e.target.value);
      };

    const [editing,setEdit] = useState(false);


    return(
    <TodoitemContainer>
        {
            editing ? <InputEdit type="text" value={content} onChange={onChangeName} /> : <Content>{content}</Content>
        }
    <BtnBox>
    {
        editing ?
        <UpdateBtn onClick={e => {
            e.preventDefault();
            setEdit(false);
            if(name !== content){
                updateTodo({
                    variables: {id:id,name:content,did:false}
                }).then(console.log("update!",content));
                
            }
            
        }}>
            UPDATE
        </UpdateBtn>

        :

        <UpdateBtn onClick={e => {
            e.preventDefault();
            setEdit(true);
        }}>
            EDIT
        </UpdateBtn>
    }

    <DelBtn onClick={e => {
            e.preventDefault();
            deleteTodo({
                variables:{id:id}
            });
        }}>
            DELETE
    </DelBtn>
    </BtnBox>
    
    </TodoitemContainer>
    )
}