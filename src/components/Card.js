import React, { useState } from "react";
import "./components.css";
import Form from "./Form";

function Card(props) {
  const [modal, setModal] = useState(false);
  const [questionArray, setQuesArray] = useState([]);

  const [data, setData] = useState({
    title: "",
    description: "",
    val: [],
    selectedItem: "",
    question: "",
    questions: [],
    ddvals: [],
    mcvals: [],
    dd: "",
    mc: "",
    checkboxes: {
      Phone: false,
      Nationality: false,
      CurrentResidence: false,
      IdNumber: false,
      DateOfBirth: false,
      Gender: false,
    },
  });
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setData((prev) => ({
      ...prev,
      checkboxes: {
        ...prev.checkboxes,
        [name]: checked,
      },
    }));
  };
  const handleSave = () => {
    if (data.question == "" || data.selectedItem == "") {
      alert("Question/Type cannot be empty!");
      return;
    }
    const obj = {
      question: data.question,
      type: data.selectedItem,
      dropdownvals: data.ddvals,
      mcvals: data.mcvals,
    };
    setData((prevState) => ({
      ...prevState,
      question: "",
      selectedItem: "",
      ddvals: [],
      mcvals: [],
      questions: [...prevState.questions, obj],
    }));
  };

  const deleteQuestion = (i) => {
    setData((prevData) => {
      const newQuestions = [...prevData.questions];
      newQuestions.splice(i, 1);
      return {
        ...prevData,
        questions: newQuestions,
      };
    });
  };
  /* selected item variable for dropdown */
  const setSelectedItem = (e) => {
    setData((prevState) => ({
      ...prevState,
      selectedItem: e.target.value,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const addValue = (key, value) => {
    if (value == "") {
      alert("Option cannot be emtpy!");
      return;
    }
    setData((prevState) => ({
      ...prevState,
      [key]: [...prevState[key], value],
      dd: "",
      mc: "",
    }));
  };
  const deleteValue = (key, index) => {
    setData((prevState) => {
      const updatedValues = [...prevState[key]];
      updatedValues.splice(index, 1);
      return { ...prevState, [key]: updatedValues };
    });
  };
  const handleSubmit = () => {
    props.onSubmit(data);
  };

  return (
    <div className="Card">
      <div>
        <label for="title">Program Title</label>
        <input
          type="text"
          name="title"
          placeholder="Summer Internship Program"
          value={data.title}
          onChange={(e) => handleInputChange(e)}
        ></input>
      </div>
      <div>
        <label for="description">Program Description</label>
        <input
          type="text"
          name="description"
          onChange={(e) => handleInputChange(e)}
          value={data.description}
          placeholder="You can provide all information about the program here. Please make sure to set the expectation and keep it clear"
        ></input>
      </div>
      <div className="card-title">Personal Information</div>
      <div>
        <label for="name">First Name</label>
      </div>
      <div>
        <label for="lastname">Last Name</label>
      </div>
      <div>
        <label for="Email">Email</label>
      </div>
      <div>
        {[
          "Phone",
          "Nationality",
          "Current Residence",
          "ID Number",
          "Date of Birth",
          "Gender",
        ].map((data, i) => {
          return (
            <div>
              <label for={data}>{data}</label>
              <input type="checkbox" name={data} onChange={handleCheckbox} />
            </div>
          );
        })}
      </div>

      <div>
        {data.questions.map((data, i) => {
          return (
            <div>
              <span>{data.question}</span>
              <button onClick={() => deleteQuestion(i)}>X</button>
            </div>
          );
        })}
        <button onClick={() => toggleModal()}>+ Add a question</button>
      </div>

      <button onClick={handleSubmit}>Submit</button>

      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h2>Select Question Type</h2>
            <label for="dropdown">Type</label>
            <select
              value={data.selectedItem}
              onChange={(e) => setSelectedItem(e)}
              className="dropdown"
              name="dropdown"
              id="dropdown"
            >
              <option value="">select</option>
              <option value="Paragraph">Paragraph</option>
              <option value="YesNo">Yes/No</option>
              <option value="Dropdown">Dropdown</option>
              <option value="Date">Date</option>
              <option value="Number">Number</option>
              <option value="MultipleChoice">MultipleChoice</option>
            </select>
            <label for="input">Question</label>
            <input
              name="question"
              type="text"
              placeholder="type here"
              value={data.question}
              onChange={(e) => handleInputChange(e)}
            />

            {data.selectedItem === "Dropdown" && (
              <div>
                <label for="">Enter drop down values</label>
                <br />
                {data.ddvals.map((data, i) => {
                  return (
                    <div>
                      <span>{data}</span>
                      <button onClick={() => deleteValue("ddvals", i)}>
                        X
                      </button>
                    </div>
                  );
                })}
                <input
                  name="dd"
                  value={data.dd}
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                  required
                ></input>

                <button onClick={() => addValue("ddvals", data.dd)}>+</button>
              </div>
            )}

            {data.selectedItem === "MultipleChoice" && (
              <div>
                <label for="">Enter Multiple Choice values</label>
                <br />
                {data.mcvals.map((data, i) => {
                  return (
                    <div>
                      <span>{data}</span>
                      <button onClick={() => deleteValue("mcvals", i)}>
                        X
                      </button>
                    </div>
                  );
                })}
                <input
                  name="mc"
                  value={data.mc}
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                ></input>

                <button onClick={() => addValue("mcvals", data.mc)}>+</button>
              </div>
            )}

            <button onClick={handleSave}>Save</button>
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
