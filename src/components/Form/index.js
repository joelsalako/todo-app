import { useState } from 'react';
import './styles.scss';
import { MdAddCircle } from 'react-icons/md';
import * as database from '../../database';

export default function Form({ onAddTask }) {
  const allStatus = [
    { id: 'co', statusText: 'Completed' },
    { id: 'op', statusText: 'Open' },
  ];

  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(allStatus[0].statusText);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMesages, setErrorMessages] = useState([]);

  // handle form submission
  const handleFormSubmission = async (event) => {
    event.preventDefault();
    // Hide Success Message
    setSuccessMessage(false); //For conditional rendering
    const data = {
      description,
      status,
    };
    //Validating the data
    const formValidation = [];

    if (description === '') {
      formValidation.push('Desription Cannot be empty.');
    }

    if (description.length < 5) {
      formValidation.push('Description cannot be less than 5 characters');
    }

    if (status === '') {
      formValidation.push('You must select status.');
    }

    setErrorMessages(formValidation);

    if (formValidation.length === 0) {
      //Valid data.

      //Attempt to save to database
      const savedId = await database.save(data);
      if (savedId.length > 0) {
        onAddTask(description, status, savedId);
        //Display Success Message
        setSuccessMessage(true);
        //Clear the form
        setDescription('');
        setStatus('');
      } else {
        setErrorMessages(['Data not saved, Try again']);
      }
    }
  };

  return (
    <form
      className="task-form-component"
      onSubmit={handleFormSubmission}
    >
      {/* Conditionally Show success Feedback */}
      {successMessage && (
        <div className="success-message">Task Added Successfully</div>
      )}
      {/* Conditionally display the error message */}
      {errorMesages.length > 0 && (
        <div className="form-validation">
          Invalid data:
          <ul>
            {errorMesages.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {/* End of customer feedback*/}
      <div className="add-container">
        <div>
          <h2>Add a new Task</h2>
        </div>
        {/* Description */}
        <label>
          Description:
          <input
            type="text"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            placeholder="Enter Description here"
            maxLength={200}
            required={true}
          />
        </label>
        {/* Status select */}
        <div className="status-container">
          <label>
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">-select-</option>
              {allStatus.map((item) => (
                <option
                  key={item.id}
                  value={item.statusText}
                >
                  {item.statusText}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* Add New Task Button */}
        <button>
          <MdAddCircle />
          Add
        </button>
      </div>
    </form>
  );
}
