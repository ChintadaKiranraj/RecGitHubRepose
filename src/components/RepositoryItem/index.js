import './index.css'

const RepositoryItem = props => {
  const {item} = props

  const {avatarUrl, name, starsCount, forksCount, issuesCount} = item

  return (
    <li className="item">
      <img src={avatarUrl} alt="hi" className="avatar-url" />
      <h1
        style={{
          color: '#e73959',
          fontFamily: 'Roboto',
          fontWeight: '500',
          fontSize: '15px',
        }}
      >
        {name}
      </h1>

      <div className="icon-text">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="image"
          />
        </div>
        <p>{starsCount}</p>
      </div>

      <div className="icon-text">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="image"
          />
        </div>
        <p> {forksCount}</p>
      </div>

      <div className="icon-text">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="image"
          />
        </div>
        <p>{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
