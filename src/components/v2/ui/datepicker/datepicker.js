import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

export const PeriodSelector = ({bucetador}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
  
    const handleStartDateChange = (date) => {
      setStartDate(date);
    };
  
    const handleEndDateChange = (date) => {
      setEndDate(date);
    };
    setDefaultLocale(pt)

    
  
    return (
      <div className='period-selector'>
        
        De<DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          dateFormat="dd/MM/yyyy"
          endDate={endDate}
          placeholderText="Data de início"
        />


        Até<DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          dateFormat="dd/MM/yyyy"
          endDate={endDate}
          minDate={startDate}
          placeholderText="Data de término"
        />

        <button onClick={()=>bucetador(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])}>Filtrar</button>
      </div>
    );
  };