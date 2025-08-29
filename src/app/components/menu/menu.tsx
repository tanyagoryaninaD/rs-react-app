import '../../../styles/Menu.scss';
import SearchCountry from './searchCountry';
import SelectYear from './selectYear';

export default function Menu() {
  return (
    <div className="menu">
      <SearchCountry />
      <SelectYear />
    </div>
  );
}
