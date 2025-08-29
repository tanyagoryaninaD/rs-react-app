import '../../../styles/Menu.scss';
import SearchCountry from './searchCountry';
import SelectYear from './selectYear';
import SortCounties from './sortCounties';

export default function Menu() {
  return (
    <div className="menu">
      <SearchCountry />
      <SelectYear />
      <SortCounties />
    </div>
  );
}
