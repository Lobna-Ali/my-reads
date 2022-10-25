function ChangerDropdown (props) {

  const selectedOption = (value) => {
    return props.selectedOption(value, props.book);
  }
    return (
        <div className="book-shelf-changer">
        <select defaultValue='None' onChange={e => selectedOption(e.target.value)}>
          <option  value="None" disabled>
            Move to...
          </option>
          <option  value="currentlyReading">Currently Reading</option>
          <option  value="wantToRead">Want to Read</option>
          <option  value="read">Read</option>
          <option   value="none">None</option>
        </select>
      </div>
    )
}

export default ChangerDropdown;