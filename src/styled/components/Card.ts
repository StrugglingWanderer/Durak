import styled, { css } from 'styled-components';
import { excludeForwardingProps } from 'helpers/styled-components';
import log from 'helpers/log';
import { cardFaces, cardBack } from 'assets';
import { Card, Suit, SizeObj } from 'types/card';

const sprite = {
  src: cardFaces,
  width: 2987.7,
  height: 1056.7,
  gapX: 37.4979,
  gapY: 18.762,
  suits: <Suit[]>['clubs', 'hearts', 'spades', 'diamonds'],
  card: {
    width: 178.583,
    height: 249.449,
    borderRadius: 8.542,
  },
};

interface Props {
  value?: Card;
  width?: number;
  height?: number;
  bgColor?: string;
  flipped?: boolean;
}

const Card = styled.div.withConfig<Props>(
  excludeForwardingProps('value', 'width', 'height'),
)((props) => {
  const { value, bgColor, flipped } = props;
  const [rank, suit] = value ?? [];

  //* Applying size
  const size = defineCardSize({ width: props.width, height: props.height });
  const [width, height] = [size.width, size.height];

  let suitIndex: number | undefined;
  if (suit) suitIndex = sprite.suits.indexOf(suit);

  const diffWidth = Math.abs(sprite.card.width - width),
    diffHeight = Math.abs(sprite.card.height - height);

  const factor =
    diffWidth > diffHeight ? width / sprite.card.width : height / sprite.card.height;

  //* Other properties
  const borderRadius = sprite.card.borderRadius * factor,
    bgWidth = sprite.width * factor;

  let offsetX: number | undefined, offsetY: number | undefined;
  if (rank && suitIndex !== undefined && suitIndex >= 0) {
    offsetX = (sprite.card.width + sprite.gapX) * (rank - 1) * factor;
    offsetY = (sprite.card.height + sprite.gapY) * suitIndex * factor;
  }

  return css`
    --box-shadow-color: gray;

    flex: none;
    position: relative;
    width: ${width}px;
    height: ${height}px;
    border-radius: ${borderRadius}px;

    background-color: ${bgColor ?? 'white'};

    ${offsetX !== undefined &&
    offsetY !== undefined &&
    css`
      background-image: url(${sprite.src});
      background-position-x: ${-offsetX}px;
      background-position-y: ${-offsetY}px;
      background-size: ${bgWidth}px;
      background-repeat: no-repeat;
    `}

    ${flipped &&
    css`
      background: url(${cardBack}) center / cover;
    `}

    box-shadow: 0.5px 2px 5px var(--box-shadow-color);
  `;
});

type DefineCardSizeOpts = {
  spriteCardWidth?: number;
  spriteCardHeight?: number;
  defaultSize?: SizeObj;
};

/**
 * Defines the card size by the sprite aspect ratio.
 * * If neither a `size` nor an `opts.defaultSize` was passed, uses the sprite card size.
 */
export function defineCardSize(size: SizeObj, opts: DefineCardSizeOpts = {}) {
  //* Validating
  validateCardSize(size.width);
  validateCardSize(size.height);
  validateCardSize(opts.defaultSize?.width);
  validateCardSize(opts.defaultSize?.height);

  //* Applying defaults
  const defaultOpts: Required<DefineCardSizeOpts> = {
    spriteCardWidth: sprite.card.width,
    spriteCardHeight: sprite.card.height,
    defaultSize: { width: 70 },
  };

  const { spriteCardWidth, spriteCardHeight, defaultSize } = {
    ...defaultOpts,
    ...opts,
  };

  let { width, height } = size;

  //* Apply default size if `size` is empty
  if (!width && !height) {
    width = defaultSize.width;
    height = defaultSize.height;
  }

  //* Define another side of card if only one was passed
  const aspectRatio: number = spriteCardWidth / spriteCardHeight;

  if (!width && height) width = aspectRatio * height;
  if (!height && width) height = width / aspectRatio;

  //* Use the sprite card size values if `defaultSize` is empty
  if (!width && !height) {
    width = spriteCardWidth;
    height = spriteCardHeight;
  }

  return { width, height } as Required<SizeObj>;
}

/**
 * Validates card size to be positive if it is not `undefined`.
 */
function validateCardSize(size: number | undefined) {
  if (size && size < 0) log.invalidCardSize(size);
}

export default Card;
