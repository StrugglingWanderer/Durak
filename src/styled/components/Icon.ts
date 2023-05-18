import styled from 'styled-components';

interface Props {
  cover?: boolean;
  image?: string;
}

const Icon = styled.span<Props>`
  width: 2em;
  height: 2em;
  display: inline-block;

  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.image});
  background-size: ${(props) => (props.cover ? 'cover' : 'contain')};
`;

export default Icon;
