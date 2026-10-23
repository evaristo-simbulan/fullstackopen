import Field from "./Field"

const PersonForm = ({ onAddPerson, onNameChange, onNumberChange, newName, newNumber }) => {
    return (
        <form onSubmit={onAddPerson}>
            <Field inputName='name' inputValue={newName} onValueUpdate={onNameChange} />
            <Field inputName='number' inputValue={newNumber} onValueUpdate={onNumberChange} />
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm