import styled from 'styled-components';
import { Card } from '@material-ui/core';

export const StyledCard = styled(Card)`
    width: 400px;
    display: inline-block;
    margin: 5px;
    transition: .3s;
    &:hover {
        box-shadow: 2px 2px 10px black;
        transition: .3s;
    }
`;