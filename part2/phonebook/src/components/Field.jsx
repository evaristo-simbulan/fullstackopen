const Field = ({ inputName, inputValue, onValueUpdate }) => {
    return (
        <div>
            {inputName}: <input value={inputValue}
                onChange={onValueUpdate} />
        </div>
    )
}

export default Field