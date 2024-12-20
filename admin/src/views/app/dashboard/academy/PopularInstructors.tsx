// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'

type DataType = {
  name: string
  profession: string
  totalCourses: number
  avatar: string
}

// Vars
const data: DataType[] = [
  { 
    name: 'Content Creation Mastery', 
    profession: 'Content Marketing', 
    totalCourses: 20, 
    avatar: '/images/avatars/1.png' 
  },
  { 
    name: 'Affiliate Marketing 101', 
    profession: 'Affiliate Marketing', 
    totalCourses: 15, 
    avatar: '/images/avatars/2.png' 
  },
  { 
    name: 'Personal Branding for KOLs', 
    profession: 'Branding & Identity', 
    totalCourses: 12, 
    avatar: '/images/avatars/3.png' 
  },
  { 
    name: 'Mastering Short-form Video Content', 
    profession: 'Video Production', 
    totalCourses: 25, 
    avatar: '/images/avatars/4.png' 
  }
];



const PopularInstructors = () => {
  return (
    <Card className='bs-full'>
      <CardHeader title='Popular Instructors' action={<OptionMenu options={['Refresh', 'Update', 'Share']} />} />
      <Divider />
      <div className='flex justify-between plb-4 pli-6'>
        <Typography className='uppercase'>instructors</Typography>
        <Typography className='uppercase'>courses</Typography>
      </div>
      <Divider />
      <CardContent className='flex flex-col gap-4'>
        {data.map((item, i) => (
          <div key={i} className='flex items-center gap-4'>
            <CustomAvatar size={34} src={item.avatar} />
            <div className='flex justify-between items-center is-full gap-4'>
              <div>
                <Typography className='font-medium' color='text.primary'>
                  {item.name}
                </Typography>
                <Typography variant='body2'>{item.profession}</Typography>
              </div>
              <Typography className='font-medium' color='text.primary'>
                {item.totalCourses}
              </Typography>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default PopularInstructors
