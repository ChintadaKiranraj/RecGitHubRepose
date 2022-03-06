import './index.css'

const LanguageFilteredItem = props => {
  console.log('language filtered item')
  const {eachLanguage, onClickActive, isActive} = props
  const {id, language} = eachLanguage

  const onClickButton = () => {
    onClickActive(id)
  }

  const Active = isActive ? 'ActiveTab' : ''

  return (
    <button
      type="button"
      onClick={onClickButton}
      className={`${Active} language-button`}
    >
      {language}
    </button>
  )
}

export default LanguageFilteredItem
