function ChangerDropdown (props) {

  const selectedOption = (value) => {
    return props.selectedOption(value, props.book);
  }
    return (
        <div className="book-shelf-changer">
        <select defaultValue={props.book.shelf || 'None'} onChange={e => selectedOption(e.target.value)}>
          <option  value="None" disabled>
            Move to...
          </option>
          <option  value="currentlyReading">Currently Reading</option>
          <option  value="wantToRead">Want to Read</option>
          <option  value="read">Read</option>
          {props.book.shelf ? <option   value="none">None</option>: null}
        </select>
      </div>
    )
}

export default ChangerDropdown;