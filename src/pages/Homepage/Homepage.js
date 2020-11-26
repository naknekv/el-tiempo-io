import './Homepage.scss';

import { EuiFlexGrid, EuiSpacer } from '@elastic/eui';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
import { setRequestMnpsStart } from '../../redux/actions';

const Homepage = () => {
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();
  const municipalities = useSelector(
    ({ requestMunicipalities }) => requestMunicipalities.municipalities,
  );
  const selected = useSelector(
    ({ requestSelected }) => requestSelected.selected,
  );
  const isPending = useSelector(
    ({ requestMunicipalities }) => requestMunicipalities.isPending,
  );
  const error = useSelector(
    ({ requestMunicipalities }) => requestMunicipalities.error,
  );

  useEffect(() => dispatch(setRequestMnpsStart()), [dispatch]);

  useEffect(() => {
    setOptions(
      municipalities.map((option) => ({
        label: option.NOMBRE_CAPITAL,
        codigoine: option.CODIGOINE,
        codprov: option.CODPROV,
      })),
    );
  }, [municipalities]);

  return (
    <div className="Homepage">
      <EuiSpacer />
      <Link to="signin">Sign In</Link>
      <EuiSpacer />
      <SearchBar options={options} />
      {selected && (
        <EuiFlexGrid columns={3}>
          <Card mnp={selected} />
        </EuiFlexGrid>
      )}
    </div>
  );
};

export default Homepage;
