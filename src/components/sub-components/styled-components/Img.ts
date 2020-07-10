import styled from 'styled-components';

const Img = styled.img`
    width: 100px;
    opacity: 0.3;
    position: absolute;
    transition: .3s;
    &.highlight {
        transition: .3s;
        box-shadow: 1px 1px 10px black;
        border-radius: 50px;
        opacity: 0.7;
    }
`;

export const EmployeeImg = styled(Img)`
    margin-top: 100px;
    margin-left: 250px;
`;

export const CompanyImg = styled(Img)`
    margin-top: 50px;
    margin-left: 280px;
`;

export const ProjectImg = styled(Img)`
    margin-top: 50px;
    margin-left: 270px;
`;