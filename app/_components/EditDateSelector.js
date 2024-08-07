import { differenceInDays, isPast, isSameDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { isAlreadyBooked } from "@/app/_lib/helpers";

function EditDateSelector({ cabin, settings, bookedDates, range, setRange }) {
  const { minBookingLength, maxBookingLength } = settings || {};
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;
  const { regularPrice, discount } = cabin || {};
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);

  return (
    <div className="flex flex-col justify-between border-l border-t border-primary-800">
      <DayPicker
        classNames={{
          month_caption: `text-center josefin`,
          today: `text-slate-50 font-bold`,
          selected: `bg-accent-500 text-slate-300 josefin font-bold`,
          range_middle: `bg-accent-300 josefin`,
          nav: `hidden`,
        }}
        className="pt-12 place-self-center"
        selected={displayRange}
        onSelect={setRange}
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 0)}
        captionLayout="dropdown"
        numberOfMonths={1}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((bookedDate) => isSameDay(bookedDate, curDate))
        }
      />

      <div className="flex items-center justify-between px-2 bg-accent-500 text-primary-800 h-[72px] mt-8">
        <div className="flex gap-6 items-baseline">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span>/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total </span>
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => setRange({ from: undefined, to: undefined })}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default EditDateSelector;
