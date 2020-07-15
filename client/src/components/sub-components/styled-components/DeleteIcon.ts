import styled from 'styled-components';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export const DeleteIcon = styled(DeleteForeverIcon)`
    cursor: pointer;
    opacity: 0.5;
    transition: .3s;
    &:hover {
        padding: 1px;
        opacity: 1;
        transition: .3s;
    }
`;