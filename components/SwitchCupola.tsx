import { type FC } from 'react';
import { EyeClose } from './Icons/EyeClose';
import { Eye } from './Icons/Eye';

interface Props {
  hidden: boolean;
  onClick: () => void;
}

export const SwitchCupola: FC<Props> = ({ hidden, onClick }) => {
  return (
    <button className='absolute bottom-4 right-4 z-50' onClick={onClick}>
      {hidden ? (
        <EyeClose width={32} height={32} color="white" />
      ) : (
        <Eye width={32} height={32} color="white" />
      )}
    </button>
  );
}
