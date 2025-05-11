import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface State {
  startDate: Date;
  endDate: Date;
  key: string;
}
interface Props {
  onChangeDateRange: (item: RangeKeyDict) => void;
  state: State[];
}

export const DatePickerRange: React.FC<Props> = ({
  onChangeDateRange,
  state,
}) => {
  return (
    <div className="block">
      <DateRangePicker
        onChange={(item) => onChangeDateRange(item)}
        showDateDisplay={false}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        showMonthAndYearPickers={true}
        showPreview={true}
      />
    </div>
  );
};
