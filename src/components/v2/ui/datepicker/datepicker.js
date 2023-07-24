import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

export const PeriodSelector = ({bucetador}) => {
    let i_dt = new Date(); 
    i_dt.setMonth(i_dt.getMonth()-1);
    i_dt.setDate(1)

    let f_dt = new Date(); 
    f_dt.setMonth(f_dt.getMonth()-1);
    
    const [startDate, setStartDate] = useState(i_dt);
    const [endDate, setEndDate] = useState(f_dt);
  
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