import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  CamelToHumanPipe, DaysHoursSecondsPipe, BytesConvertFilterPipe, EpochToDateFilterPipe, StrToMacPipe, SafePipe, ArrayOrderByPipe,
  FormatTrafficUnitsPipe, DateAgoPipe, FormatCellPipe, UniqueFilterPipe, ArrayToStrPipe, TimeFormat, DateFormat, DateAndTimeFormat,
  CveToDateFilterPipe, MacFilterPipe, AssessmentDateFilterPipe, SplitPipe, GreetPipe, TruncFilePipe, EpochToTimeFilterPipe, BytesConvertNoUnitsFilterPipe,EpochToDateFormatFilterPipe,MinuteSecondFormatPipe
} from './app.filter.pipe';

@NgModule({
  declarations: [
    CamelToHumanPipe,
    DaysHoursSecondsPipe,
    BytesConvertFilterPipe,
    BytesConvertNoUnitsFilterPipe,
    EpochToDateFilterPipe,
    EpochToTimeFilterPipe,
    StrToMacPipe,
    SafePipe, MacFilterPipe, ArrayOrderByPipe, AssessmentDateFilterPipe, SplitPipe, GreetPipe, TruncFilePipe,
    FormatTrafficUnitsPipe,
    DateAgoPipe,
    FormatCellPipe,
    UniqueFilterPipe,
    ArrayToStrPipe,
    TimeFormat,
    DateFormat,
    DateAndTimeFormat,
    CveToDateFilterPipe,
    EpochToDateFormatFilterPipe,
    MinuteSecondFormatPipe
  ],
  imports: [CommonModule],
  exports: [
    CamelToHumanPipe,
    DaysHoursSecondsPipe,
    BytesConvertFilterPipe,
    BytesConvertNoUnitsFilterPipe,
    EpochToDateFilterPipe,
    EpochToTimeFilterPipe,
    StrToMacPipe,
    SafePipe, MacFilterPipe, ArrayOrderByPipe, AssessmentDateFilterPipe, SplitPipe, GreetPipe, TruncFilePipe,
    FormatTrafficUnitsPipe,
    DateAgoPipe,
    FormatCellPipe,
    UniqueFilterPipe,
    ArrayToStrPipe,
    TimeFormat,
    DateFormat,
    DateAndTimeFormat,
    CveToDateFilterPipe,
    EpochToDateFormatFilterPipe,
    MinuteSecondFormatPipe
  ],
  providers: [DatePipe]
})
export class AppFilterPipeModule {
}
