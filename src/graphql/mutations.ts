import { gql } from '@apollo/client'

export const StartSession = gql`
mutation($sessionId: String!){
    defaultSession( sessionId: $sessionId) {
        boards{
            sessionId
            boardId
            title
            lists{
                sessionId
                listId
                listIndex
                boardId
                title
                tasks{
                    sessionId
                    listId
                    taskId
                    taskIndex
                    title
                    description
                 }
            }
        }
    }
}
`
export const updateBoard = gql`
mutation($sessionId: String!, $boardId: String!, $title: String! ){
    updateBoard( data: {sessionId: $sessionId,  boardId: $boardId, title: $title}) {
        modified
    }
}
`