import styled from "styled-components";

export const HistoryContainer = styled.main`

    flex:1;
    padding:3.5rem;
    display:flex;
    flex-direction:column;
    overflow:auto;

    h1 {
        font-size:1.5rem;
        color:${props => props.theme['gray-100']};

    }

  
`

export const HistoryList = styled.div`
    flex:1;
    
    margin-top:2rem;

    table {
        width: 100%;
        border-collapse:collapse;
        min-width: 600px;
    }

    th{
        background-color:${props => props.theme['gray-600']};
        padding:1rem;
        text-align:left;
        color:${props => props.theme['gray-100']};
        font-size: 0.875rem;
        line-height:1.6;

        &:first-child {
            border-top-left-radius:8px;
            padding-left:1.5rem;

        }

        &:lost-child {
            border-top-right-radius:8px;
            padding-right:1.5rem;
        }
    }

    td {
        background-color:${props => props.theme['gray-700']};
        padding:1rem;
        border-top:4px solid ${props => props.theme['gray-800']};
        font-size: 0.875rem;
        line-height:1.6;

        &:first-child {
            width:50%;
            padding-left:1.5rem;

        }

        &:lost-child {
         padding-right:1.5rem;
        }
    }


`
const STATUS_COLORS = {
    yellow: 'yellow',
    red: 'red',
    green: 'green'
} as const

interface StatusProps {
    statusColor: keyof typeof STATUS_COLORS
}
export const Status = styled.span<StatusProps>`
    display:flex;
    align-items:center;
    gap:0.5rem;


    &::before {
        content: "";
        width:0.5rem;
        height: 0.5rem;
        border-radius:999px;
        background:${props => props.theme[STATUS_COLORS[props.statusColor]]};

    }
 
`