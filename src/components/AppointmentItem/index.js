import './index.css'

const List = props => {
  const {appointmentDetails, onClickStar} = props
  const {id, title, date, isStarred} = appointmentDetails
  const starClickClass = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const isStarClicked = () => {
    onClickStar(id)
  }
  return (
    <li className="list-ele">
      <div className="title-star">
        <p className="title">{title}</p>
        <button
          data-testid="star"
          className="star-btn"
          type="button"
          onClick={isStarClicked}
        >
          <img className="star" src={starClickClass} alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}
export default List
