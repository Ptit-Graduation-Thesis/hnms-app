import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import isoWeek from 'dayjs/plugin/isoWeek'
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear'

type DayjsParamType = string | number | dayjs.Dayjs | Date | null | undefined
type DateType = string | number | Date

dayjs.extend(utc)
dayjs.extend(isoWeek)
dayjs.extend(isoWeeksInYear)

export const dayjsFormat = dayjs.utc
export const formatDateTime = (dateTime: DayjsParamType) => dayjsFormat(dateTime).utc().format('HH:mm DD/MM/YYYY')
export const formatLocalDateTime = (dateTime: DayjsParamType) => dayjs(dateTime).format('HH:mm DD/MM/YYYY')
export const formatDate = (dateTime: DayjsParamType) => dayjsFormat(dateTime).utc().format('DD/MM/YYYY')
export const formatDateDayMonth = (dateTime: DayjsParamType) => dayjs(dateTime).format('DD/MM')
export const formatDateMonthYear = (dateTime: DayjsParamType) => dayjs(dateTime).format('MM/YYYY')
export const formatYearMonth = (dateTime: DayjsParamType) => dayjs(dateTime).format('YYYY/MM')
export const formatTime = (dateTime: DayjsParamType) => dayjs(dateTime).format('HH:mm')
export const formatInputDate = (dateTime: DayjsParamType) => dayjsFormat(dateTime).format('YYYY-MM-DD')
export const formatLocalDate = (dateTime: DayjsParamType) => dayjs(dateTime).format('YYYY-MM-DD')
export const localDate = (dateTime: DayjsParamType) => dayjs(dateTime).format('DD-MM-YYYY')
export const formatLocalHour = (dateTime: DayjsParamType) => dayjs(dateTime).format('HH:mm')
export const formatUTCHour = (dateTime: DayjsParamType) => dayjsFormat(dateTime).format('HH:mm')
export const formatLocalDateTimeDatabase = (dateTime: DayjsParamType) =>
  dayjsFormat(dateTime).format('YYYY-MM-DD HH:mm')

export const getYear = (dateTime: DateType) => new Date(dateTime).getFullYear()
export const getMonth = (dateTime: DateType) => new Date(dateTime).getMonth()
export const getDate = (dateTime: DateType) => new Date(dateTime).getDate()
export const getIsoWeek = (dateTime: DayjsParamType) => dayjs(dateTime).isoWeek()
export const getDay = (dateTime: DayjsParamType) => dayjs(dateTime).isoWeekday()
