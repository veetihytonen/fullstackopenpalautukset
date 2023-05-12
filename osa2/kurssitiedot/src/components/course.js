const Header = ({ course }) => <h3>{course}</h3>


const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>


const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <p>
            <b> total of {total} exercises </b>
        </p>
    )

}


const Course = ({ course }) => {

    return (
        <>
            <Header course={course.name} />
            <span>
                {course.parts.map(part => <Part key={part.id} part={part} />)}
            </span>
            <Total parts={course.parts} />
        </>
    )
}

export default Course