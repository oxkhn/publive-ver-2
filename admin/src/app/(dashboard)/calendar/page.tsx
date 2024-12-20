// MUI Imports
import AppFullCalendar from '@/libs/styles/AppFullCalendar'
import ReduxProvider from '@/redux-store/ReduxProvider'
import Card from '@mui/material/Card'

// Component Imports
import CalendarWrapper from '@views/app/calendar/CalendarWrapper'

// Styled Component Imports

const CalendarApp = () => {
    return (
        <Card className='overflow-visible'>
            <AppFullCalendar className='app-calendar'>{/* <CalendarWrapper /> */}</AppFullCalendar>
        </Card>
    )
}

export default CalendarApp
