import styled from 'styled-components';

const Img = styled.img`
    width: 70px;
    opacity: 0.3;
    position: absolute;
    margin-left: 310px;
    transition: .3s;
    &.highlight {
        transition: .3s;
        box-shadow: 1px 1px 10px black;
        border-radius: 50px;
        opacity: 0.7;
    }
`;

export const EmployeeImg = styled(Img)`
    margin-top: 130px;
`;

export const CompanyImg = styled(Img)`
    margin-top: 110px;
`;

export const ProjectImg = styled(Img)`
    margin-top: 90px;
`;