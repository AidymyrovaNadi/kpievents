import styled from 'styled-components'
import SelectDatepicker from 'react-select-datepicker';

const StyledSelectDatepicker = styled(SelectDatepicker)`
  .rid_date-container {
    > div {
      margin: 0 15px 10px 0;
      &:last-child {
        margin-right: 0;
      }
     
      select {
      	height: 54px;
        color: var(--gray-light);
        font-size: 16px;
        padding: 14px;
        border-radius: 15px;
        border: none;
        text-align: center;
        appearance: none;
      }
    }
    .rid_day-container select {
      width: 70px;
    }
    .rid_month-container select {
      width: 110px;
    }
    .rid_year-container select {
      width: 100px;
    }
  }
`

const DateContainer = styled.div`
  margin-left:10px;
`

export { StyledSelectDatepicker, DateContainer }
