import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    ActiveLanguage: 'ALL',
    FilteredList: [],
    activeTabId: 'ALL',
    apiStatusCode: apiStatus.initial,
  }

  componentDidMount() {
    this.getFilteredLanguages()
    console.log('component did mount')
  }

  getFilteredLanguages = async () => {
    const {ActiveLanguage} = this.state

    this.setState({
      apiStatusCode: apiStatus.inProgress,
    })

    try {
      const url = `https://apis.ccbp.in/popular-repos?language=${ActiveLanguage}`

      const response = await fetch(url)

      if (response.ok) {
        const data = await response.json()

        const listOfArray = data.popular_repos

        const updatedList = listOfArray.map(each => ({
          avatarUrl: each.avatar_url,
          forksCount: each.forks_count,
          id: each.id,
          name: each.name,
          starsCount: each.stars_count,
          issuesCount: each.issues_count,
        }))

        this.setState({
          FilteredList: [...updatedList],
          apiStatusCode: apiStatus.success,
        })

        console.log('fetching is successfully completed')
      }
    } catch (error) {
      console.log(error)

      this.setState({
        apiStatusCode: apiStatus.failure,
      })
      console.log('api status is failed')
    }
  }

  onClickActive = activeId => {
    this.setState(
      {
        ActiveLanguage: activeId,
        activeTabId: activeId,
        apiStatusCode: apiStatus.initial,
      },
      this.getFilteredLanguages,
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  fetchingInProgress = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  fetchedSuccessFully = () => {
    const {FilteredList} = this.state

    return (
      <ul className="repository-items">
        {FilteredList.map(item => (
          <RepositoryItem item={item} key={item.id} />
        ))}
      </ul>
    )
  }

  renderRepository = () => {
    const {apiStatusCode} = this.state
    switch (apiStatusCode) {
      case apiStatus.success:
        return this.fetchedSuccessFully()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.inProgress:
        return this.fetchingInProgress()
      default:
        return <h1>fetching is nothing</h1>
    }
  }

  render() {
    const {activeTabId} = this.state

    return (
      <div className="popular-container">
        <h1 style={{fontFamily: 'Lobster'}}>popular</h1>
        <ul>
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              eachLanguage={eachLanguage}
              key={eachLanguage.id}
              onClickActive={this.onClickActive}
              isActive={activeTabId === eachLanguage.id}
            />
          ))}
        </ul>
        {this.renderRepository()}
      </div>
    )
  }
}

export default GithubPopularRepos
