import styled from 'styled-components';
import BorderColorIcon from '@material-ui/icons/BorderColor';

export const EditIcon = styled(BorderColorIcon)`
    cursor: pointer;
    opacity: 0.5;
    transition: .3s;
    &:hover {
        padding: 1px;
        opacity: 1;
        transition: .3s;
    }
`;