function ChangerDropdown (props) {
console.log(props)
  const selectedOption = (value) => {
    return props.selectedOption(value, props.book);
  }
    return (
        <div className="book-shelf-changer">
        <select defaultValue={(props.search && props.book.shelf === 'none' || !props.book.shelf) ? 'default' :  props.book.shelf} onChange={e => selectedOption(e.target.value)}>
          <option  value="default" disabled>
            Move to...
          </option>
          <option  value="currentlyReading">Currently Reading</option>
          <option  value="wantToRead">Want to Read</option>
          <option  value="read">Read</option>
          {!props.search ? <option   value="none">None</option>: null}
        </select>
      </div>
    )
}

export default ChangerDropdown;