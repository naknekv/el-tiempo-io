import './Card.scss';

import { EuiButtonIcon, EuiCard, EuiFlexItem } from '@elastic/eui';
import { useDispatch } from 'react-redux';

import { pinMunicipality, unpinMunicipality } from '../../redux/actions';

const Card = ({ mnp, pinned }) => {
  const dispatch = useDispatch();

  const handlePin = (action, selected) => {
    if (action === 'PIN') dispatch(pinMunicipality(selected));
    else if (action === 'UNPIN') dispatch(unpinMunicipality(selected));
  };

  const buttonToShow = pinned ? (
    <EuiButtonIcon
      iconType="pinFilled"
      aria-label="Eliminar"
      onClick={() => handlePin('UNPIN', mnp)}
    />
  ) : (
    <EuiButtonIcon
      iconType="pin"
      aria-label="Guardar"
      onClick={() => handlePin('PIN', mnp)}
    />
  );

  return (
    <EuiFlexItem>
      <EuiCard
        title={
          <>
            {mnp.municipio.NOMBRE_CAPITAL} {buttonToShow}
          </>
        }
        description={
          <>
            Temperatura actual: {mnp.temperatura_actual}. Probabilidad de
            lluvia: {mnp.lluvia}
          </>
        }
      />
    </EuiFlexItem>
  );
};

export default Card;
