import styled from 'styled-components';

const SVGIcon = styled.span`
  aspect-ratio: 1;
  width: 1.4em;
  display: inline-block;

  & > * {
    width: 100%;
    height: 100%;
    color: inherit;
  }
`;

export default SVGIcon;
