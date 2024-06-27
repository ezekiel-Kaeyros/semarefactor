'use client';
import { Button } from '@/app/common/ui/button/Button';
import React, { useState } from 'react';

interface Question {
  label: string;
  responses: Response[];
}

interface Response {
  label: string;
  questions?: Question[];
}

interface FormData {
  title: string;
  phone_number_id: string;
  company: string;
}

const DynamicForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    phone_number_id: '',
    company: '',
  });
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleQuestionChange = (questionIndex: number, value: string) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex].label = value;
      return newQuestions;
    });
  };

  const handleResponseChange = (
    questionIndex: number,
    responseIndex: number,
    value: string
  ) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex].responses[responseIndex].label = value;
      return newQuestions;
    });
  };

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { label: '', responses: [{ label: '' }] },
    ]);
  };

  const handleAddAnswer = (questionIndex: number) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      const existingAnswers = newQuestions[questionIndex].responses;

      const useClientAnswerExists = existingAnswers.some(
        (answer) => answer.label === 'Use Client'
      );

      if (!useClientAnswerExists) {
        newQuestions[questionIndex].responses.push({
          label: 'Use Client',
          questions: [],
        });
      } else {
        newQuestions[questionIndex].responses.push({ label: '' });
      }

      return newQuestions;
    });
  };

  const handleRemoveQuestion = (questionIndex: number) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions.splice(questionIndex, 1);
      return newQuestions;
    });
  };

  // handle add nested question
  const handleAddNestedQuestion = (
    questionIndex: number,
    responseIndex: number
  ) => {
    // setQuestions((prevQuestions) => {
    //   const newQuestions = [...prevQuestions];
    //   newQuestions[questionIndex].responses[responseIndex].questions = [
    //     ...newQuestions[questionIndex].responses[responseIndex].questions,
    //     { label: '' },
    //   ];
    //   return newQuestions;
    // });
  };

  const handleRemoveAnswer = (questionIndex: number, responseIndex: number) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      const responses = newQuestions[questionIndex].responses;

      responses.splice(responseIndex, 1);

      if (responses.length > 0) {
        responses.forEach((response) => {
          response.questions = undefined;
        });
      }

      return newQuestions;
    });
  };

  const renderQuestions = (
    parentQuestionIndex?: number,
    parentResponseIndex?: number
  ) => {
    return questions.map((question, questionIndex) => {
      const isChildQuestion = parentQuestionIndex !== undefined;
      const isChildOfCurrentQuestion =
        isChildQuestion && parentQuestionIndex === questionIndex;

      return (
        <div className="my-4" key={questionIndex}>
          <label className='text-lg flex gap-x-2 font-bold mb-2"'>
            Question {questionIndex + 1}:
            <input
              type="text"
              value={question.label}
              onChange={(e) =>
                handleQuestionChange(questionIndex, e.target.value)
              }
              className="border rounded px-2 py-1 ml-2"
            />
            <Button
              className="w-16"
              onClick={() => handleRemoveQuestion(questionIndex)}
            >
              -Q
            </Button>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
              onClick={() => handleAddAnswer(questionIndex)}
            >
              +A
            </button>
          </label>

          {question.responses.map((response, responseIndex) => (
            <div className="my-4 ml-2" key={responseIndex}>
              <label className="flex gap-x-2 text-md font-semibold mb-1">
                Answer {responseIndex + 1}:
                <input
                  type="text"
                  value={response.label}
                  className="border rounded px-2 py-1 ml-2"
                  onChange={(e) =>
                    handleResponseChange(
                      questionIndex,
                      responseIndex,
                      e.target.value
                    )
                  }
                />
                <Button
                  className="w-16"
                  onClick={() =>
                    handleRemoveAnswer(questionIndex, responseIndex)
                  }
                >
                  -A
                </Button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded mt-2"
                  onClick={() =>
                    handleAddNestedQuestion(questionIndex, responseIndex)
                  }
                >
                  + Q
                </button>
              </label>

              {isChildOfCurrentQuestion &&
                renderQuestions(questionIndex, responseIndex)}
            </div>
          ))}
        </div>
      );
    });
  };

  const convertToJSON = () => {
    const jsonStructure = questions.map((question) =>
      convertToJSONHelper(question)
    );
    // ;
  };

  const convertToJSONHelper = (question: Question): any => {
    return {
      label: question.label,
      responses: question.responses.map((response) => ({
        label: response.label,
        questions: response.questions
          ? response.questions.map(convertToJSONHelper)
          : undefined,
      })),
    };
  };

  const handleSubmit = () => {
    // Handle form submission, you can access the formData and questions here
    // ;
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>{renderQuestions()}</div>
      <button onClick={handleAddQuestion}>Add Question</button>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <button onClick={convertToJSON}>Convert to JSON</button>
    </form>
  );
};

export default DynamicForm;
