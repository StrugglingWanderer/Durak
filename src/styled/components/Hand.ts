import styled, { css } from 'styled-components';
import Card, { defineCardSize } from 'styled/components/Card';

interface Opts {
  width?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
}

export function createHand(opts: Opts = {}) {
  const width = opts.width;
  const overlap = opts.overlap || 0;

  const cardSize = defineCardSize({
    width: opts.cardWidth,
    height: opts.cardHeight,
  });
  const [cardWidth, cardHeight] = [cardSize.width, cardSize.height];

  const Hand = styled.ul`
    list-style: none;
    flex: none;

    ${width &&
    css`
      width: ${width}px;
    `}

    height: ${cardHeight}px;
    display: flex;
    justify-content: center;

    &:not(:empty)::after {
      --remaining-width: ${cardWidth - overlap}px;
      content: '';
      width: ${overlap}px;
    }
  `;

  const CardInHandContainer = styled.li`
    --card-container-width: ${cardWidth - overlap}px;

    position: relative;
    width: var(--card-container-width);
    transition: width 500ms;

    &.card-enter {
      width: 0px;
    }
    &.card-enter-active {
      width: var(--card-container-width);
    }
    &.card-exit-active {
      width: 0px;
    }
  `;

  const CardInHand = styled(Card).attrs({ width: cardWidth, height: cardHeight })`
    position: absolute;
    top: 0;
    left: 0;
  `;

  return { Hand, CardInHandContainer, CardInHand };
}
