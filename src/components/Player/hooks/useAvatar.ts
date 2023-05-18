import { useState } from 'react';
import { log } from 'helpers';
import { Player } from 'types/state';

function useAvatar(player: Player) {
  const [avatar, setAvatar] = useState<string>();

  if (player.avatar) {
    const image = new Image();

    image.onload = () => setAvatar(player.avatar);
    image.onerror = image.onabort = () => log.imageFailed(image.src);

    image.src = player.avatar;
  }

  return avatar;
}

export default useAvatar;
