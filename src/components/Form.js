import Card from "./Card";
import axios from "axios";

function Form() {
  const submitForm = async (formData) => {
    const ques = {};

    formData.questions.forEach((data, i) => {
      if (data.type === "Dropdown") {
        ques[data.type] = [data.question, ...data.dropdownvals];
      } else if (data.type === "MultipleChoice") {
        ques[data.type] = [data.question, ...data.mcvals];
      } else {
        ques[data.type] = [data.question];
      }
    });

    const obj = {
      id: Math.floor(10000 + Math.random() * 90000).toString(),
      Title: formData.title,
      Description: formData.description,
      Email: "temp",
      PersonalInfoOptions: formData.checkboxes,
      CustomQuestions: ques,
    };

    fetch("https://localhost:7109/api/Form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("success", data);
      })
      .then((res) => {
        console.log(JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async () => {
    /*
    try {
      const res = await axios.post("https://localhost:7109/api/Form", data);
    } catch (err) {
      console.log(err);
    }
      */
  };

  return (
    <div>
      <Card onSubmit={submitForm} />
    </div>
  );
}

export default Form;
