import Header from './Course/Header'
import Content from './Course/Content'
import Total from './Course/Total'

const Course = ({courses}) => {
    return (
        <>
            {courses.map(course => (
                <div key={course.id}>
                    <Header course={course}></Header>
                    <Content course={course}></Content>
                    <Total course={course}></Total>
                </div>
            ))}
        </> 
    )
}

export default Course